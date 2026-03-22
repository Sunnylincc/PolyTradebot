import { executionAdapter, heuristicModelProvider, inMemorySkillStore, polymarketDataProvider } from "@/lib/providers/mock-providers";
import { addReflection, appendShortTermMemory, upsertSkillFromReflection } from "@/lib/services/memory-service";
import { recordDecision } from "@/lib/services/trading-service";
import { state, uid } from "@/lib/store/state";

export const runAgentCycle = async (agentId: string) => {
  const agent = state.agents.find((a) => a.id === agentId);
  if (!agent) throw new Error("Agent not found");

  const log = (step: string, detail: string) => state.auditLog.unshift({ id: uid("log"), step, agentId, detail, ts: new Date().toISOString() });

  try {
    agent.status = "running";
    log("observe_market", "Fetching live Polymarket markets.");
    const markets = await polymarketDataProvider.fetchLiveMarkets();

    log("build_short_context", "Building short-term memory context.");
    const short = state.shortTermMemory.filter((m) => m.agentId === agentId).slice(0, agent.shortTermMemoryConfig.windowSize);

    log("retrieve_long_memory", "Retrieving relevant long-term skills.");
    const skills = await inMemorySkillStore.searchSkills(agentId, "");

    log("generate_decision", "Generating trade decision.");
    const generated = await heuristicModelProvider.generateDecision({ agent, markets, memory: short.map((s) => s.content), skills });

    const marketId = markets[0]?.id;
    if (!marketId) throw new Error("No market data available.");
    if (generated.size > state.settings.maxPositionSize) throw new Error("Risk check failed: max position size breached");

    const decision = recordDecision({ ...generated, agentId, marketId, mode: agent.mode });

    log("execute", `Executing ${decision.mode} decision ${decision.id}.`);
    const execution = await executionAdapter.execute({ decision, allowRealTrading: state.settings.allowRealTrading });
    state.executions.unshift({ ...execution, id: uid("exec"), timestamp: new Date().toISOString() });

    log("reflect", "Running post-trade reflection.");
    const reflected = await heuristicModelProvider.reflect({ agent, decision, execution: state.executions[0] });
    const reflection = addReflection({ ...reflected, agentId, relatedTradeIds: [decision.id] });

    appendShortTermMemory({
      agentId,
      type: "decision",
      content: decision.reasoningSummary,
      confidence: decision.confidence,
      tags: [decision.action, decision.side],
    });

    upsertSkillFromReflection(reflection);
    log("memory_update", "Memory updated and skill extraction checked.");
    return { decision, execution: state.executions[0], reflection };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown runtime error";
    state.auditLog.unshift({ id: uid("log"), step: "error", agentId, ts: new Date().toISOString(), detail: message });
    agent.status = "error";
    throw error;
  }
};

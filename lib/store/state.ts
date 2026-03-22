import { Agent, AgentRun, BacktestRun, Execution, Market, Reflection, SettingsState, ShortTermMemoryItem, Skill, TradeDecision } from "@/lib/core/types";
import { demoAgents, demoBacktests, demoDecisions, demoExecutions, demoMarkets, demoReflections, demoSettings, demoShortMemory, demoSkills } from "@/lib/seed/demo-data";

export interface AppState {
  agents: Agent[];
  runs: AgentRun[];
  markets: Market[];
  decisions: TradeDecision[];
  executions: Execution[];
  reflections: Reflection[];
  skills: Skill[];
  shortTermMemory: ShortTermMemoryItem[];
  backtests: BacktestRun[];
  settings: SettingsState;
  auditLog: Array<{ id: string; step: string; agentId?: string; ts: string; detail: string }>;
}

export const state: AppState = {
  agents: [...demoAgents],
  runs: [],
  markets: [...demoMarkets],
  decisions: [...demoDecisions],
  executions: [...demoExecutions],
  reflections: [...demoReflections],
  skills: [...demoSkills],
  shortTermMemory: [...demoShortMemory],
  backtests: [...demoBacktests],
  settings: { ...demoSettings },
  auditLog: [],
};

export const uid = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

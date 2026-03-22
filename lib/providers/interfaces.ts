import { Agent, Execution, Market, Reflection, Skill, TradeDecision } from "@/lib/core/types";

export interface MarketDataProvider {
  fetchLiveMarkets(): Promise<Market[]>;
  fetchHistoricalMarkets(from: string, to: string): Promise<Market[]>;
}

export interface ModelProvider {
  generateDecision(input: { agent: Agent; markets: Market[]; memory: string[]; skills: Skill[] }): Promise<Omit<TradeDecision, "id" | "timestamp" | "agentId" | "marketId" | "mode">>;
  reflect(input: { agent: Agent; decision: TradeDecision; execution: Execution }): Promise<Omit<Reflection, "id" | "timestamp" | "agentId" | "relatedTradeIds">>;
}

export interface ExecutionProvider {
  execute(input: { decision: TradeDecision; allowRealTrading: boolean }): Promise<Omit<Execution, "id" | "timestamp">>;
}

export interface MemoryStore {
  searchSkills(agentId: string, query: string): Promise<Skill[]>;
}

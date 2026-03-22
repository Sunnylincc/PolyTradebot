export type RunMode = "dry" | "real";
export type AgentStatus = "idle" | "running" | "paused" | "error";
export type DecisionAction = "enter" | "exit" | "hold";
export type DecisionSide = "yes" | "no";

export interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  mode: RunMode;
  model: string;
  riskProfile: "low" | "medium" | "high";
  marketScope: string[];
  strategySeed: string;
  shortTermMemoryConfig: { windowSize: number; ttlSeconds: number };
  longTermMemoryConfig: { skillLimit: number; reflectionDepth: number };
  createdAt: string;
  updatedAt: string;
}

export interface AgentRun {
  id: string;
  agentId: string;
  status: "running" | "completed" | "failed";
  startTime: string;
  endTime?: string;
  summary?: string;
}

export interface Market {
  id: string;
  source: "polymarket";
  question: string;
  slug: string;
  category: string;
  yesPrice: number;
  noPrice: number;
  volume: number;
  liquidity: number;
  endDate: string;
  active: boolean;
  timestamp: string;
}

export interface TradeDecision {
  id: string;
  agentId: string;
  marketId: string;
  action: DecisionAction;
  side: DecisionSide;
  size: number;
  confidence: number;
  reasoningSummary: string;
  supportingSignals: string[];
  mode: RunMode;
  timestamp: string;
}

export interface Execution {
  id: string;
  decisionId: string;
  status: "filled" | "rejected" | "staged";
  filledPrice: number;
  filledSize: number;
  fees: number;
  mode: RunMode;
  exchangeOrderId?: string;
  timestamp: string;
}

export interface Reflection {
  id: string;
  agentId: string;
  relatedTradeIds: string[];
  summary: string;
  whatWorked: string;
  whatFailed: string;
  hypothesisUpdate: string;
  confidence: number;
  tags: string[];
  timestamp: string;
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  structuredRule: { trigger: string; action: string; constraints: string };
  sourceAgentId: string;
  sourceReflectionIds: string[];
  usageCount: number;
  winRateEstimate: number;
  confidence: number;
  createdAt: string;
}

export interface ShortTermMemoryItem {
  id: string;
  agentId: string;
  type: "observation" | "decision" | "reflection" | "hypothesis";
  content: string;
  confidence: number;
  tags: string[];
  timestamp: string;
}

export interface SettingsState {
  defaultMode: RunMode;
  allowRealTrading: boolean;
  maxPositionSize: number;
  maxDailyLoss: number;
  perAgentRiskCap: number;
  modelProvider: "openai" | "mock";
  retentionDays: number;
}

export interface BacktestRun {
  id: string;
  agentIds: string[];
  from: string;
  to: string;
  pnlCurve: Array<{ time: string; value: number }>;
  winRate: number;
  drawdown: number;
  lessons: string[];
  createdAt: string;
}

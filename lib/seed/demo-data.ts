import { Agent, BacktestRun, Execution, Market, Reflection, SettingsState, ShortTermMemoryItem, Skill, TradeDecision } from "@/lib/core/types";

const now = new Date();
const isoMinus = (minutes: number) => new Date(now.getTime() - minutes * 60_000).toISOString();

export const demoMarkets: Market[] = [
  {
    id: "m1",
    source: "polymarket",
    question: "Will the US Fed cut rates by June 2026?",
    slug: "fed-rate-cut-june-2026",
    category: "macro",
    yesPrice: 0.58,
    noPrice: 0.42,
    volume: 481200,
    liquidity: 128000,
    endDate: "2026-06-30T00:00:00.000Z",
    active: true,
    timestamp: isoMinus(1),
  },
  {
    id: "m2",
    source: "polymarket",
    question: "Will ETH spot ETF net inflows be positive this week?",
    slug: "eth-etf-inflows-positive-week",
    category: "crypto",
    yesPrice: 0.64,
    noPrice: 0.36,
    volume: 301090,
    liquidity: 89000,
    endDate: "2026-03-29T00:00:00.000Z",
    active: true,
    timestamp: isoMinus(1),
  },
  {
    id: "m3",
    source: "polymarket",
    question: "Will US CPI YoY print below 3.0% in April 2026?",
    slug: "us-cpi-below-3-apr-2026",
    category: "macro",
    yesPrice: 0.47,
    noPrice: 0.53,
    volume: 219030,
    liquidity: 52200,
    endDate: "2026-04-15T00:00:00.000Z",
    active: true,
    timestamp: isoMinus(1),
  },
];

export const demoAgents: Agent[] = [
  {
    id: "a1",
    name: "Alpha-9 Momentum",
    status: "running",
    mode: "dry",
    model: "gpt-4.1-mini",
    riskProfile: "medium",
    marketScope: ["macro", "crypto"],
    strategySeed: "Follow flow shifts with macro confirmation and downside stop discipline.",
    shortTermMemoryConfig: { windowSize: 20, ttlSeconds: 1800 },
    longTermMemoryConfig: { skillLimit: 100, reflectionDepth: 3 },
    createdAt: isoMinus(7200),
    updatedAt: isoMinus(4),
  },
  {
    id: "a2",
    name: "Sentinel Mean-Rev",
    status: "paused",
    mode: "dry",
    model: "gpt-4.1",
    riskProfile: "low",
    marketScope: ["macro"],
    strategySeed: "Fade overstretched implied probabilities during low-liquidity windows.",
    shortTermMemoryConfig: { windowSize: 24, ttlSeconds: 2400 },
    longTermMemoryConfig: { skillLimit: 120, reflectionDepth: 4 },
    createdAt: isoMinus(5400),
    updatedAt: isoMinus(18),
  },
];

export const demoDecisions: TradeDecision[] = [
  {
    id: "d1",
    agentId: "a1",
    marketId: "m2",
    action: "enter",
    side: "yes",
    size: 1200,
    confidence: 0.79,
    reasoningSummary: "ETF net-flow trend and options skew both suggest positive sentiment continuation.",
    supportingSignals: ["Flow acceleration", "Cross-market risk-on"],
    mode: "dry",
    timestamp: isoMinus(16),
  },
  {
    id: "d2",
    agentId: "a2",
    marketId: "m1",
    action: "hold",
    side: "no",
    size: 300,
    confidence: 0.56,
    reasoningSummary: "Price moved near fair-value band; waiting for macro print before fade.",
    supportingSignals: ["Mean reversion boundary", "Event risk"],
    mode: "dry",
    timestamp: isoMinus(9),
  },
];

export const demoExecutions: Execution[] = [
  {
    id: "e1",
    decisionId: "d1",
    status: "filled",
    filledPrice: 0.64,
    filledSize: 1200,
    fees: 2.4,
    mode: "dry",
    timestamp: isoMinus(15),
  },
  {
    id: "e2",
    decisionId: "d2",
    status: "staged",
    filledPrice: 0,
    filledSize: 0,
    fees: 0,
    mode: "dry",
    timestamp: isoMinus(8),
  },
];

export const demoReflections: Reflection[] = [
  {
    id: "r1",
    agentId: "a1",
    relatedTradeIds: ["d1"],
    summary: "Momentum entry aligned with flow and improved as volatility stabilized.",
    whatWorked: "Signal confluence and sizing discipline.",
    whatFailed: "Execution slightly late in cycle.",
    hypothesisUpdate: "Prioritize first 10 minutes after flow inflection.",
    confidence: 0.74,
    tags: ["momentum", "etf-flows"],
    timestamp: isoMinus(6),
  },
];

export const demoSkills: Skill[] = [
  {
    id: "s1",
    title: "Flow-Confirmed Momentum Entry",
    description: "Enter only when directional flow and implied-vol trend are aligned.",
    structuredRule: {
      trigger: "3 consecutive positive flow deltas + rising implied vol percentile",
      action: "enter yes with scaled sizing",
      constraints: "cap at 2.5% per position",
    },
    sourceAgentId: "a1",
    sourceReflectionIds: ["r1"],
    usageCount: 11,
    winRateEstimate: 0.68,
    confidence: 0.72,
    createdAt: isoMinus(1200),
  },
];

export const demoShortMemory: ShortTermMemoryItem[] = [
  {
    id: "stm1",
    agentId: "a1",
    type: "observation",
    content: "ETH ETF flow pace +18% over 4h baseline.",
    confidence: 0.81,
    tags: ["flow", "etf"],
    timestamp: isoMinus(12),
  },
  {
    id: "stm2",
    agentId: "a1",
    type: "hypothesis",
    content: "Flow persistence likely to hold until US open liquidity increase.",
    confidence: 0.64,
    tags: ["hypothesis"],
    timestamp: isoMinus(10),
  },
];

export const demoBacktests: BacktestRun[] = [
  {
    id: "b1",
    agentIds: ["a1", "a2"],
    from: "2025-10-01T00:00:00.000Z",
    to: "2026-02-28T23:00:00.000Z",
    pnlCurve: [
      { time: "2025-10-01", value: 0 },
      { time: "2025-11-15", value: 3120 },
      { time: "2025-12-31", value: 8450 },
      { time: "2026-01-30", value: 11210 },
      { time: "2026-02-28", value: 14180 },
    ],
    winRate: 0.71,
    drawdown: -0.08,
    lessons: ["Avoid entries before macro event windows.", "Skill reuse improved hit rate by 11%."],
    createdAt: isoMinus(40),
  },
];

export const demoSettings: SettingsState = {
  defaultMode: "dry",
  allowRealTrading: false,
  maxPositionSize: 2500,
  maxDailyLoss: 5000,
  perAgentRiskCap: 0.25,
  modelProvider: "mock",
  retentionDays: 90,
};

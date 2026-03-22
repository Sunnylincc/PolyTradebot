import { ExecutionProvider, MarketDataProvider, MemoryStore, ModelProvider } from "@/lib/providers/interfaces";
import { state, uid } from "@/lib/store/state";

const normalizeGamma = (raw: any) => ({
  id: String(raw.id),
  source: "polymarket" as const,
  question: raw.question,
  slug: raw.slug,
  category: raw.category || "uncategorized",
  yesPrice: Number(raw.outcomePrices?.[0] ?? raw.lastTradePrice ?? 0.5),
  noPrice: 1 - Number(raw.outcomePrices?.[0] ?? raw.lastTradePrice ?? 0.5),
  volume: Number(raw.volume ?? 0),
  liquidity: Number(raw.liquidity ?? 0),
  endDate: raw.endDate ?? new Date().toISOString(),
  active: Boolean(raw.active),
  timestamp: new Date().toISOString(),
});

export const polymarketDataProvider: MarketDataProvider = {
  async fetchLiveMarkets() {
    try {
      const res = await fetch("https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=50", { cache: "no-store" });
      if (!res.ok) throw new Error(`Gamma API ${res.status}`);
      const payload = (await res.json()) as any[];
      const normalized = payload.slice(0, 25).map(normalizeGamma);
      if (normalized.length) {
        state.markets = normalized;
        return normalized;
      }
      return state.markets;
    } catch {
      return state.markets;
    }
  },
  async fetchHistoricalMarkets(from, to) {
    const start = new Date(from).getTime();
    const end = new Date(to).getTime();
    return state.markets.filter((m) => {
      const ts = new Date(m.timestamp).getTime();
      return ts >= start && ts <= end;
    });
  },
};

export const heuristicModelProvider: ModelProvider = {
  async generateDecision({ markets, memory }) {
    const anchor = markets[0];
    const confidence = Math.min(0.9, 0.52 + memory.length * 0.05);
    return {
      action: "enter",
      side: anchor.yesPrice >= 0.5 ? "yes" : "no",
      size: 250 + memory.length * 50,
      confidence,
      reasoningSummary: `Heuristic decision from market skew (${anchor.yesPrice.toFixed(2)}) + ${memory.length} active memory snippets.`,
      supportingSignals: ["Market skew", "Skill retrieval", "Short-memory hypothesis"],
    };
  },
  async reflect() {
    return {
      summary: "Trade executed within risk limits and maintained strategy consistency.",
      whatWorked: "Risk caps respected and thesis-to-action alignment stayed high.",
      whatFailed: "Execution latency reduced edge window slightly.",
      hypothesisUpdate: "Tighten trigger threshold for high-volatility markets.",
      confidence: 0.69,
      tags: ["risk", "execution"],
    };
  },
};

export const executionAdapter: ExecutionProvider = {
  async execute({ decision, allowRealTrading }) {
    if (decision.mode === "real" && !allowRealTrading) {
      return { decisionId: decision.id, status: "rejected", filledPrice: 0, filledSize: 0, fees: 0, mode: "real" };
    }
    return {
      decisionId: decision.id,
      status: "filled",
      filledPrice: 0.5 + Math.random() * 0.2,
      filledSize: decision.size,
      fees: Number((decision.size * 0.002).toFixed(2)),
      mode: decision.mode,
      exchangeOrderId: decision.mode === "real" && allowRealTrading ? uid("pm") : undefined,
    };
  },
};

export const inMemorySkillStore: MemoryStore = {
  async searchSkills(agentId, query) {
    const q = query.toLowerCase();
    return state.skills.filter((s) => (s.sourceAgentId === agentId || s.usageCount > 0) && `${s.title} ${s.description}`.toLowerCase().includes(q));
  },
};

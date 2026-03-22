import { TradeDecision } from "@/lib/core/types";
import { state, uid } from "@/lib/store/state";

export const listDecisions = () => state.decisions;
export const listExecutions = () => state.executions;

export const recordDecision = (decision: Omit<TradeDecision, "id" | "timestamp">) => {
  const row: TradeDecision = { ...decision, id: uid("dec"), timestamp: new Date().toISOString() };
  state.decisions.unshift(row);
  return row;
};

export const getRecentPnl = () => {
  return state.executions.reduce((acc, e) => {
    if (e.status !== "filled") return acc;
    return acc + e.filledSize * (Math.random() * 0.08 - 0.02);
  }, 0);
};

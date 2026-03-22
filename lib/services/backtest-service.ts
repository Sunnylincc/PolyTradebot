import { BacktestRun } from "@/lib/core/types";
import { state, uid } from "@/lib/store/state";

export const listBacktests = () => state.backtests;

export const runBacktest = (agentIds: string[], from: string, to: string): BacktestRun => {
  const points = 7;
  let value = 0;
  const pnlCurve = Array.from({ length: points }).map((_, i) => {
    value += Math.round((Math.random() - 0.2) * 3500);
    return { time: `T${i + 1}`, value };
  });
  const run: BacktestRun = {
    id: uid("backtest"),
    agentIds,
    from,
    to,
    pnlCurve,
    winRate: Math.max(0.45, Math.min(0.88, 0.55 + Math.random() * 0.3)),
    drawdown: -Math.random() * 0.2,
    lessons: ["Winning runs correlate with strict risk caps.", "Skill reuse improves cross-market consistency."],
    createdAt: new Date().toISOString(),
  };
  state.backtests.unshift(run);
  return run;
};

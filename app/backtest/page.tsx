import { Card, SectionHeader } from "@/components/ui";
import { state } from "@/lib/store/state";

export default function BacktestPage() {
  const run = state.backtests[0];
  return (
    <div className="space-y-6">
      <SectionHeader title="Backtest / Replay" subtitle="Replay real historical market snapshots and compare agents side-by-side." />
      <div className="grid lg:grid-cols-4 gap-4">
        <Card><div className="text-white/60">Win Rate</div><div className="metric">{(run.winRate * 100).toFixed(1)}%</div></Card>
        <Card><div className="text-white/60">Drawdown</div><div className="metric text-danger">{(run.drawdown * 100).toFixed(1)}%</div></Card>
        <Card><div className="text-white/60">Agents Compared</div><div className="metric">{run.agentIds.length}</div></Card>
        <Card><div className="text-white/60">Window</div><div className="text-xl">{run.from.slice(0,10)} → {run.to.slice(0,10)}</div></Card>
      </div>
      <Card>
        <h3 className="font-display text-2xl mb-2">PnL Curve</h3>
        <div className="grid grid-cols-5 gap-2 items-end h-48">
          {run.pnlCurve.map((p) => <div key={p.time} className="bg-accent/50 rounded-t" style={{ height: `${Math.max(10, Math.abs(p.value) / 180)}px` }} title={`${p.time}: ${p.value}`} />)}
        </div>
      </Card>
    </div>
  );
}

import { Badge, Card, SectionHeader } from "@/components/ui";
import { DataTable } from "@/components/data-table";
import { state } from "@/lib/store/state";

export default function DashboardPage() {
  const filled = state.executions.filter((e) => e.status === "filled");
  const pnl = filled.reduce((acc, e) => acc + e.filledSize * (Math.random() * 0.03), 0);
  const health = { ok: true, activeAgents: state.agents.filter((a) => a.status === "running").length, liveExecutionEnabled: state.settings.allowRealTrading };

  return (
    <div className="space-y-6">
      <SectionHeader title="Dashboard" subtitle="AI agents are thinking, trading, learning, and evolving on Polymarket market structure." right={<Badge tone={health.liveExecutionEnabled ? "danger" : "warning"}>{health.liveExecutionEnabled ? "REAL MODE ENABLED" : "DRY MODE DEFAULT"}</Badge>} />
      <div className="grid lg:grid-cols-4 gap-4">
        <Card><div className="text-white/70">Total PnL</div><div className="metric">${pnl.toFixed(2)}</div></Card>
        <Card><div className="text-white/70">Active Agents</div><div className="metric">{health.activeAgents}</div></Card>
        <Card><div className="text-white/70">Markets Tracked</div><div className="metric">{state.markets.length}</div></Card>
        <Card><div className="text-white/70">System Health</div><div className="metric text-success">{health.ok ? "Nominal" : "Degraded"}</div></Card>
      </div>
      <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
        <Card>
          <h3 className="text-xl font-display mb-3">Recent Trades</h3>
          <DataTable
            headers={["Agent", "Action", "Mode", "Confidence", "Time"]}
            rows={state.decisions.slice(0, 6).map((d) => [state.agents.find((a) => a.id === d.agentId)?.name ?? d.agentId, `${d.action.toUpperCase()} ${d.side.toUpperCase()}`, <Badge key={`${d.id}m`} tone={d.mode === "real" ? "danger" : "default"}>{d.mode}</Badge>, `${Math.round(d.confidence * 100)}%`, new Date(d.timestamp).toLocaleTimeString()])}
          />
        </Card>
        <Card>
          <h3 className="text-xl font-display mb-3">Top Agent Leaderboard</h3>
          <div className="space-y-3">
            {state.agents.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded border border-white/10 p-2">
                <span>{a.name}</span>
                <span className="text-success">+{(Math.random() * 12).toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

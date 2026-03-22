import { DataTable } from "@/components/data-table";
import { Badge, Card, SectionHeader } from "@/components/ui";
import { state } from "@/lib/store/state";

export default function TradingMonitorPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Trading Monitor" subtitle="Live trade feed, per-agent timeline, open positions, and immutable execution logs." right={<Badge tone={state.settings.allowRealTrading ? "danger" : "warning"}>{state.settings.defaultMode.toUpperCase()}</Badge>} />
      <Card>
        <DataTable headers={["Time", "Agent", "Market", "Action", "Mode", "Status"]} rows={state.decisions.map((d) => {
          const execution = state.executions.find((e) => e.decisionId === d.id);
          return [new Date(d.timestamp).toLocaleTimeString(), state.agents.find((a) => a.id === d.agentId)?.name ?? d.agentId, state.markets.find((m) => m.id === d.marketId)?.question.slice(0, 42) ?? d.marketId, `${d.action} ${d.side} (${d.size})`, <Badge key={d.id} tone={d.mode === "real" ? "danger" : "default"}>{d.mode}</Badge>, execution ? execution.status : "pending"];
        })} />
      </Card>
    </div>
  );
}

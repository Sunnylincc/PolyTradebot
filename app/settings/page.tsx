import { Badge, Card, SectionHeader } from "@/components/ui";
import { state } from "@/lib/store/state";

export default function SettingsPage() {
  const s = state.settings;
  return (
    <div className="space-y-6">
      <SectionHeader title="Settings" subtitle="Environment config, safety guardrails, model provider, and storage retention." right={<Badge tone={s.allowRealTrading ? "danger" : "warning"}>{s.allowRealTrading ? "Real mode allowed" : "Real mode blocked"}</Badge>} />
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="space-y-2 text-sm">
          <p>Default mode: <strong>{s.defaultMode}</strong></p>
          <p>Model provider: <strong>{s.modelProvider}</strong></p>
          <p>Retention: <strong>{s.retentionDays} days</strong></p>
        </Card>
        <Card className="space-y-2 text-sm">
          <p>Max position size: <strong>{s.maxPositionSize}</strong></p>
          <p>Max daily loss: <strong>{s.maxDailyLoss}</strong></p>
          <p>Per-agent risk cap: <strong>{Math.round(s.perAgentRiskCap * 100)}%</strong></p>
        </Card>
      </div>
    </div>
  );
}

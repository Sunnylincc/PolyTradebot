import { DataTable } from "@/components/data-table";
import { Card, SectionHeader } from "@/components/ui";
import { state } from "@/lib/store/state";

export default function EvolutionPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Evolution Lab" subtitle="Compare agents, mutate profiles, and promote high-confidence reflections into reusable skills." />
      <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
        <Card>
          <h3 className="font-display text-2xl mb-3">Agent Comparison</h3>
          <DataTable headers={["Agent", "Status", "Fitness", "Mutation Action"]} rows={state.agents.map((a) => [a.name, a.status, (Math.random() * 5).toFixed(3), "Generate child"])} />
        </Card>
        <Card>
          <h3 className="font-display text-2xl mb-3">Promotion Queue</h3>
          <div className="space-y-2 text-sm">
            {state.reflections.map((r) => <div key={r.id} className="border border-white/10 rounded p-2"><p>{r.summary}</p><p className="text-white/60 mt-1">promote to skill candidate · {Math.round(r.confidence * 100)}%</p></div>)}
          </div>
        </Card>
      </div>
    </div>
  );
}

import { Badge, Card, SectionHeader } from "@/components/ui";
import { state } from "@/lib/store/state";

export default function MemoryPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Memory Explorer" subtitle="Short-term context drives the next action. Long-term memory captures reflections, lessons, and reusable skills." />
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-display text-2xl mb-3">Short-term Memory</h3>
          <div className="space-y-2">
            {state.shortTermMemory.map((m) => <div key={m.id} className="border border-white/10 rounded p-3"><div className="flex justify-between"><Badge>{m.type}</Badge><span className="text-xs text-white/50">{new Date(m.timestamp).toLocaleTimeString()}</span></div><p className="mt-2">{m.content}</p><p className="text-xs text-white/60 mt-2">confidence {Math.round(m.confidence * 100)}% · tags {m.tags.join(", ")}</p></div>)}
          </div>
        </Card>
        <Card>
          <h3 className="font-display text-2xl mb-3">Long-term Memory & Skill Library</h3>
          <div className="space-y-3">
            {state.skills.map((s) => <div key={s.id} className="border border-white/10 rounded p-3"><div className="flex justify-between"><h4>{s.title}</h4><Badge tone="success">{Math.round(s.confidence * 100)}%</Badge></div><p className="text-white/70 text-sm mt-1">{s.description}</p><p className="text-xs text-white/60 mt-2">Rule: {s.structuredRule.trigger} → {s.structuredRule.action}</p></div>)}
          </div>
        </Card>
      </div>
    </div>
  );
}

import { Badge, Card, SectionHeader } from "@/components/ui";
import { state } from "@/lib/store/state";

export const dynamic = "force-dynamic";

export default function AgentStudioPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Agent Studio" subtitle="Create, edit, clone, pause, and inspect every trading agent with transparent reasoning and memory controls." />
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
        <Card>
          <div className="flex justify-between mb-3"><h3 className="font-display text-2xl">Active Agents</h3><button className="px-3 py-2 rounded bg-accent text-black font-semibold">+ New Agent</button></div>
          <div className="space-y-2">
            {state.agents.map((agent) => (
              <div key={agent.id} className="border border-white/10 rounded p-3">
                <div className="flex justify-between"><h4 className="font-semibold">{agent.name}</h4><Badge tone={agent.status === "running" ? "success" : "default"}>{agent.status}</Badge></div>
                <p className="text-white/70 text-sm mt-2">{agent.strategySeed}</p>
                <div className="flex gap-2 mt-3 text-xs"><button className="px-2 py-1 rounded bg-white/10">Start</button><button className="px-2 py-1 rounded bg-white/10">Pause</button><button className="px-2 py-1 rounded bg-white/10">Clone</button><button className="px-2 py-1 rounded bg-white/10">Reset STM</button></div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-display text-2xl mb-3">Quick Config</h3>
          <div className="space-y-3 text-sm">
            <label className="block">Risk Level<select className="w-full mt-1 bg-black/50 border border-white/10 rounded p-2"><option>Low</option><option>Medium</option><option>High</option></select></label>
            <label className="block">Model<select className="w-full mt-1 bg-black/50 border border-white/10 rounded p-2"><option>gpt-4.1</option><option>gpt-4.1-mini</option><option>gpt-5-nano</option></select></label>
            <label className="block">Market Scope<input className="w-full mt-1 bg-black/50 border border-white/10 rounded p-2" defaultValue="macro, crypto" /></label>
            <label className="block">Reasoning Summary<textarea className="w-full mt-1 bg-black/50 border border-white/10 rounded p-2" rows={5} defaultValue={state.decisions[0]?.reasoningSummary ?? "No decisions yet."} /></label>
          </div>
        </Card>
      </div>
    </div>
  );
}

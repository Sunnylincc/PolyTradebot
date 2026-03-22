import { state, uid } from "@/lib/store/state";
import { NextResponse } from "next/server";

export async function GET() {
  const leaderboard = state.agents.map((a) => ({ agentId: a.id, name: a.name, fitness: Number((Math.random() * 5).toFixed(3)), status: a.status }));
  return NextResponse.json({ data: { leaderboard, suggestions: ["Mutate prompt entropy", "Promote reflection r1 into skill"] } });
}

export async function POST(req: Request) {
  const body = (await req.json()) as { parentAgentId: string; mutation: string };
  const parent = state.agents.find((a) => a.id === body.parentAgentId);
  if (!parent) return NextResponse.json({ error: "Parent not found" }, { status: 404 });
  const child = { ...parent, id: uid("agent"), name: `${parent.name} Child`, strategySeed: `${parent.strategySeed} | Mutation: ${body.mutation}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), status: "idle" as const };
  state.agents.push(child);
  return NextResponse.json({ data: child }, { status: 201 });
}

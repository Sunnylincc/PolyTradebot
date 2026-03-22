import { getShortTermMemory } from "@/lib/services/memory-service";
import { state } from "@/lib/store/state";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const agentId = searchParams.get("agentId") ?? undefined;
  return NextResponse.json({ data: { shortTerm: getShortTermMemory(agentId), reflections: state.reflections, skills: state.skills } });
}

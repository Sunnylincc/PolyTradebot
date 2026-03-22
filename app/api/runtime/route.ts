import { runAgentCycle } from "@/lib/services/runtime-service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json()) as { agentId: string };
  const data = await runAgentCycle(body.agentId);
  return NextResponse.json({ data });
}

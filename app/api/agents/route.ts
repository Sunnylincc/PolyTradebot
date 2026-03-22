import { createAgent, listAgents } from "@/lib/services/agent-service";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: listAgents() });
}

export async function POST(req: Request) {
  const body = await req.json();
  const data = createAgent(body);
  return NextResponse.json({ data }, { status: 201 });
}

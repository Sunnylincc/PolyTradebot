import { listBacktests, runBacktest } from "@/lib/services/backtest-service";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: listBacktests() });
}

export async function POST(req: Request) {
  const body = (await req.json()) as { agentIds: string[]; from: string; to: string };
  const run = runBacktest(body.agentIds, body.from, body.to);
  return NextResponse.json({ data: run }, { status: 201 });
}

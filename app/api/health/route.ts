import { state } from "@/lib/store/state";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: { ok: true, activeAgents: state.agents.filter((a) => a.status === "running").length, liveExecutionEnabled: state.settings.allowRealTrading } });
}

import { listDecisions, listExecutions } from "@/lib/services/trading-service";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: { decisions: listDecisions(), executions: listExecutions() } });
}

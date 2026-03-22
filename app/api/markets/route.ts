import { polymarketDataProvider } from "@/lib/providers/mock-providers";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await polymarketDataProvider.fetchLiveMarkets();
  return NextResponse.json({ data });
}

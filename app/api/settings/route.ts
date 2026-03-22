import { settingsSchema } from "@/lib/schemas/domain";
import { state } from "@/lib/store/state";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: state.settings });
}

export async function PUT(req: Request) {
  const body = await req.json();
  state.settings = settingsSchema.parse(body);
  return NextResponse.json({ data: state.settings });
}

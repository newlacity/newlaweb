import { NextRequest, NextResponse } from "next/server";
import { getDiscordUserFromRequest } from "@/lib/discord-staff";
import { interviewService } from "@/lib/interviews";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const user = getDiscordUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const date = request.nextUrl.searchParams.get("date");
  if (date) {
    const slots = await interviewService.getAvailableSlotsForDate(date);
    return NextResponse.json({ slots });
  }

  const dates = await interviewService.getDatesWithAvailability();
  return NextResponse.json({ dates });
}

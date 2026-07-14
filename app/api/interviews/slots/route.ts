import { NextRequest, NextResponse } from "next/server";
import { getDiscordUserFromRequest } from "@/lib/discord-staff";
import {
  interviewService,
  parseInterviewSlotKind,
  type InterviewSlotKind,
} from "@/lib/interviews";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function parseSlotKind(value: string | null): InterviewSlotKind {
  return parseInterviewSlotKind(value);
}

export async function GET(request: NextRequest) {
  const user = getDiscordUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const kind = parseSlotKind(request.nextUrl.searchParams.get("kind"));
  const date = request.nextUrl.searchParams.get("date");
  if (date) {
    const slots = await interviewService.getAvailableSlotsForDate(date, kind);
    return NextResponse.json({ slots });
  }

  const dates = await interviewService.getDatesWithAvailability(kind);
  return NextResponse.json({ dates });
}

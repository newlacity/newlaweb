import { NextRequest, NextResponse } from "next/server";
import { getDiscordUserFromRequest } from "@/lib/discord-staff";
import { interviewService } from "@/lib/interviews";
import { whitelistService } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const user = getDiscordUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const status = await whitelistService.checkStatus(user.id);
  if (!status.hasPassed) {
    return NextResponse.json(
      { error: "Quiz non validé" },
      { status: 403 },
    );
  }

  const booking = await interviewService.getUserBooking(user.id);
  return NextResponse.json({ booking });
}

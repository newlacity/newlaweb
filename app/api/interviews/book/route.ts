import { NextRequest, NextResponse } from "next/server";
import { getDiscordUserFromRequest } from "@/lib/discord-staff";
import { interviewService } from "@/lib/interviews";
import { whitelistService } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const user = getDiscordUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const status = await whitelistService.checkStatus(user.id);
  if (!status.hasPassed) {
    return NextResponse.json(
      { error: "Vous devez d'abord valider le quiz." },
      { status: 403 },
    );
  }

  const body = await request.json();
  const slotId = body?.slotId as string | undefined;
  if (!slotId) {
    return NextResponse.json({ error: "Créneau requis." }, { status: 400 });
  }

  const result = await interviewService.bookSlot(
    user.id,
    user.username,
    slotId,
  );

  if (!result.booking) {
    return NextResponse.json(
      { error: result.error ?? "Réservation impossible." },
      { status: 400 },
    );
  }

  return NextResponse.json({ booking: result.booking });
}

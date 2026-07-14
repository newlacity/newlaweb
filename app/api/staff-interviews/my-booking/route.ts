import { NextRequest, NextResponse } from "next/server";
import { getDiscordUserFromRequest } from "@/lib/discord-staff";
import { interviewService } from "@/lib/interviews";
import { staffDossierService } from "@/lib/staff-dossier";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const user = getDiscordUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const submitted = await staffDossierService.hasSubmitted(user.id);
  if (!submitted) {
    return NextResponse.json(
      { error: "Vous devez d'abord déposer votre dossier staff." },
      { status: 403 },
    );
  }

  const booking = await interviewService.getUserBooking(user.id, "staff");
  return NextResponse.json({ booking });
}

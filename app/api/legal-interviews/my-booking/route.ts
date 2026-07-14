import { NextRequest, NextResponse } from "next/server";
import { getDiscordUserFromRequest } from "@/lib/discord-staff";
import { interviewService } from "@/lib/interviews";
import { legalDossierService } from "@/lib/legal-dossier";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const user = getDiscordUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const submitted = await legalDossierService.hasSubmitted(user.id);
  if (!submitted) {
    return NextResponse.json(
      { error: "Vous devez d'abord déposer votre dossier légal." },
      { status: 403 },
    );
  }

  const booking = await interviewService.getUserBooking(user.id, "legal");
  return NextResponse.json({ booking });
}

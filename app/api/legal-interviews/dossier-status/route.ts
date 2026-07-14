import { NextRequest, NextResponse } from "next/server";
import { getDiscordUserFromRequest } from "@/lib/discord-staff";
import { legalDossierService } from "@/lib/legal-dossier";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const user = getDiscordUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const submitted = await legalDossierService.hasSubmitted(user.id);
  return NextResponse.json({ submitted });
}

import { NextRequest, NextResponse } from "next/server";
import { getDiscordUserFromRequest } from "@/lib/discord-staff";
import { interviewService } from "@/lib/interviews";
import { sendLegalBookingWebhook } from "@/lib/legal-interview-webhook";
import { legalDossierService } from "@/lib/legal-dossier";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
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

  const body = await request.json();
  const slotId = body?.slotId as string | undefined;
  if (!slotId) {
    return NextResponse.json({ error: "Créneau requis." }, { status: 400 });
  }

  const result = await interviewService.bookSlot(
    user.id,
    user.username,
    slotId,
    "legal",
  );

  if (!result.booking) {
    return NextResponse.json(
      { error: result.error ?? "Réservation impossible." },
      { status: 400 },
    );
  }

  const startsAt =
    result.startsAt ?? result.booking.interview_slots?.starts_at;
  if (startsAt) {
    await sendLegalBookingWebhook({
      bookingId: result.booking.id,
      user: {
        id: user.id,
        username: user.username,
        discriminator: user.discriminator,
      },
      startsAt,
    });
  } else {
    console.error("Webhook légal ignoré : startsAt manquant.");
  }

  return NextResponse.json({ booking: result.booking });
}

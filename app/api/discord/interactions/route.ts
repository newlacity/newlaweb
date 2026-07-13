import { NextRequest, NextResponse } from "next/server";
import { verifyDiscordRequest } from "@/lib/discord-verify";
import { isDiscordInterviewStaff } from "@/lib/discord-staff";
import {
  sendInterviewAcceptanceDm,
  sendInterviewRejectionDm,
} from "@/lib/interview-booking-dm";
import {
  buildInterviewRequestEmbed,
  INTERVIEW_ACCEPT_PREFIX,
  INTERVIEW_REJECT_PREFIX,
} from "@/lib/interview-webhook";
import { interviewService } from "@/lib/interviews";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 30;

interface DiscordInteraction {
  type: number;
  application_id: string;
  token: string;
  data?: { custom_id?: string };
  member?: {
    roles?: string[];
    user?: { id: string; username: string };
  };
  user?: { id: string; username: string };
}

function jsonResponse(body: object, status = 200) {
  return new NextResponse(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function ephemeral(content: string) {
  return jsonResponse({
    type: 4,
    data: { content, flags: 64 },
  });
}

function parseBookingId(customId: string): {
  action: "accept" | "reject";
  bookingId: string;
} | null {
  if (customId.startsWith(INTERVIEW_ACCEPT_PREFIX)) {
    return {
      action: "accept",
      bookingId: customId.slice(INTERVIEW_ACCEPT_PREFIX.length),
    };
  }
  if (customId.startsWith(INTERVIEW_REJECT_PREFIX)) {
    return {
      action: "reject",
      bookingId: customId.slice(INTERVIEW_REJECT_PREFIX.length),
    };
  }
  return null;
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get("X-Signature-Ed25519");
  const timestamp = request.headers.get("X-Signature-Timestamp");
  const publicKey = process.env.DISCORD_PUBLIC_KEY ?? "";
  const body = await request.text();

  if (!publicKey) {
    console.error("DISCORD_PUBLIC_KEY manquant sur Vercel.");
    return new NextResponse("Interaction endpoint not configured", {
      status: 500,
    });
  }

  if (!verifyDiscordRequest(body, signature, timestamp, publicKey)) {
    console.error("Signature interaction Discord invalide.");
    return new NextResponse("Invalid request signature", { status: 401 });
  }

  let interaction: DiscordInteraction;
  try {
    interaction = JSON.parse(body) as DiscordInteraction;
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  if (interaction.type === 1) {
    return jsonResponse({ type: 1 });
  }

  if (interaction.type !== 3 || !interaction.data?.custom_id) {
    return ephemeral("Interaction non prise en charge.");
  }

  const staffUser = interaction.member?.user ?? interaction.user;
  if (!staffUser?.id) {
    return ephemeral("Utilisateur introuvable.");
  }

  const staffRoles = interaction.member?.roles ?? [];
  if (!isDiscordInterviewStaff(staffUser.id, staffRoles)) {
    return ephemeral("Vous n'avez pas la permission de traiter cette demande.");
  }

  const parsed = parseBookingId(interaction.data.custom_id);
  if (!parsed?.bookingId) {
    return ephemeral("Bouton invalide.");
  }

  const booking = await interviewService.getBookingById(parsed.bookingId);
  if (!booking?.interview_slots?.starts_at) {
    return ephemeral("Demande introuvable.");
  }

  const startsAt = booking.interview_slots.starts_at;
  const player = {
    id: booking.user_id,
    username: booking.username,
  };

  if (booking.status !== "pending") {
    return jsonResponse({
      type: 7,
      data: {
        embeds: [
          buildInterviewRequestEmbed({
            user: player,
            startsAt,
            status: booking.status === "confirmed" ? "accepted" : "rejected",
          }),
        ],
        components: [],
      },
    });
  }

  if (parsed.action === "accept") {
    const result = await interviewService.acceptBooking(parsed.bookingId);
    if (!result.ok) {
      return ephemeral(result.error ?? "Impossible d'accepter cette demande.");
    }

    void sendInterviewAcceptanceDm({
      userId: booking.user_id,
      username: booking.username,
      startsAt,
    });

    return jsonResponse({
      type: 7,
      data: {
        embeds: [
          buildInterviewRequestEmbed({
            user: player,
            startsAt,
            status: "accepted",
            handledBy: staffUser.username,
          }),
        ],
        components: [],
      },
    });
  }

  const result = await interviewService.rejectBooking(parsed.bookingId);
  if (!result.ok) {
    return ephemeral(result.error ?? "Impossible de refuser cette demande.");
  }

  void sendInterviewRejectionDm({
    userId: booking.user_id,
    username: booking.username,
    startsAt,
  });

  return jsonResponse({
    type: 7,
    data: {
      embeds: [
        buildInterviewRequestEmbed({
          user: player,
          startsAt,
          status: "rejected",
          handledBy: staffUser.username,
        }),
      ],
      components: [],
    },
  });
}

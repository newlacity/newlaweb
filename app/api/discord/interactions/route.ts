import { NextRequest, NextResponse } from "next/server";
import { verifyDiscordRequest } from "@/lib/discord-verify";
import {
  isDiscordInterviewStaff,
  isDiscordLegalManager,
  isDiscordStaffManager,
} from "@/lib/discord-staff";
import {
  sendInterviewAcceptanceDm,
  sendInterviewRejectionDm,
} from "@/lib/interview-booking-dm";
import {
  buildInterviewRequestEmbed,
  INTERVIEW_ACCEPT_PREFIX,
  INTERVIEW_REJECT_PREFIX,
} from "@/lib/interview-webhook";
import {
  sendLegalAcceptanceDm,
  sendLegalRejectionDm,
} from "@/lib/legal-interview-booking-dm";
import {
  buildLegalRequestEmbed,
  LEGAL_ACCEPT_PREFIX,
  LEGAL_REJECT_PREFIX,
} from "@/lib/legal-interview-webhook";
import {
  sendStaffAcceptanceDm,
  sendStaffRejectionDm,
} from "@/lib/staff-interview-booking-dm";
import {
  buildStaffRequestEmbed,
  STAFF_ACCEPT_PREFIX,
  STAFF_REJECT_PREFIX,
} from "@/lib/staff-interview-webhook";
import { interviewService, InterviewBookingKind } from "@/lib/interviews";

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
  kind: InterviewBookingKind;
  action: "accept" | "reject";
  bookingId: string;
} | null {
  if (customId.startsWith(INTERVIEW_ACCEPT_PREFIX)) {
    return {
      kind: "whitelist",
      action: "accept",
      bookingId: customId.slice(INTERVIEW_ACCEPT_PREFIX.length),
    };
  }
  if (customId.startsWith(INTERVIEW_REJECT_PREFIX)) {
    return {
      kind: "whitelist",
      action: "reject",
      bookingId: customId.slice(INTERVIEW_REJECT_PREFIX.length),
    };
  }
  if (customId.startsWith(STAFF_ACCEPT_PREFIX)) {
    return {
      kind: "staff",
      action: "accept",
      bookingId: customId.slice(STAFF_ACCEPT_PREFIX.length),
    };
  }
  if (customId.startsWith(STAFF_REJECT_PREFIX)) {
    return {
      kind: "staff",
      action: "reject",
      bookingId: customId.slice(STAFF_REJECT_PREFIX.length),
    };
  }
  if (customId.startsWith(LEGAL_ACCEPT_PREFIX)) {
    return {
      kind: "legal",
      action: "accept",
      bookingId: customId.slice(LEGAL_ACCEPT_PREFIX.length),
    };
  }
  if (customId.startsWith(LEGAL_REJECT_PREFIX)) {
    return {
      kind: "legal",
      action: "reject",
      bookingId: customId.slice(LEGAL_REJECT_PREFIX.length),
    };
  }
  return null;
}

function buildInteractionUpdate(
  embeds: object[],
  mentionUserIds: string[] = [],
) {
  return {
    type: 7,
    data: {
      embeds,
      components: [] as object[],
      allowed_mentions: {
        parse: [] as string[],
        users: mentionUserIds,
      },
    },
  };
}

function buildEmbedForKind(
  kind: InterviewBookingKind,
  params: {
    user: { id: string; username: string };
    startsAt: string;
    status: "pending" | "accepted" | "rejected";
    handledById?: string;
  },
) {
  if (kind === "staff") {
    return buildStaffRequestEmbed(params);
  }
  if (kind === "legal") {
    return buildLegalRequestEmbed(params);
  }
  return buildInterviewRequestEmbed(params);
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
  const parsed = parseBookingId(interaction.data.custom_id);
  if (!parsed?.bookingId) {
    return ephemeral("Bouton invalide.");
  }

  const hasPermission =
    parsed.kind === "staff"
      ? isDiscordStaffManager(staffUser.id, staffRoles)
      : parsed.kind === "legal"
        ? isDiscordLegalManager(staffUser.id, staffRoles)
        : isDiscordInterviewStaff(staffUser.id, staffRoles);

  if (!hasPermission) {
    return ephemeral("Vous n'avez pas la permission de traiter cette demande.");
  }

  const booking = await interviewService.getBookingById(parsed.bookingId);
  if (!booking?.interview_slots?.starts_at) {
    return ephemeral("Demande introuvable.");
  }

  const bookingKind = booking.booking_kind ?? "whitelist";
  if (bookingKind !== parsed.kind) {
    return ephemeral("Type de demande invalide.");
  }

  const startsAt = booking.interview_slots.starts_at;
  const player = {
    id: booking.user_id,
    username: booking.username,
  };

  if (booking.status !== "pending") {
    return jsonResponse(
      buildInteractionUpdate([
        buildEmbedForKind(parsed.kind, {
          user: player,
          startsAt,
          status: booking.status === "confirmed" ? "accepted" : "rejected",
        }),
      ]),
    );
  }

  if (parsed.action === "accept") {
    const result = await interviewService.acceptBooking(parsed.bookingId);
    if (!result.ok) {
      return ephemeral(result.error ?? "Impossible d'accepter cette demande.");
    }

    const dmSent =
      parsed.kind === "staff"
        ? await sendStaffAcceptanceDm({
            userId: booking.user_id,
            username: booking.username,
            startsAt,
          })
        : parsed.kind === "legal"
          ? await sendLegalAcceptanceDm({
              userId: booking.user_id,
              username: booking.username,
              startsAt,
            })
          : await sendInterviewAcceptanceDm({
              userId: booking.user_id,
              username: booking.username,
              startsAt,
            });

    if (!dmSent) {
      console.error(
        "MP acceptation non envoyé pour",
        booking.user_id,
        booking.username,
      );
    }

    return jsonResponse(
      buildInteractionUpdate(
        [
          buildEmbedForKind(parsed.kind, {
            user: player,
            startsAt,
            status: "accepted",
            handledById: staffUser.id,
          }),
        ],
        [staffUser.id],
      ),
    );
  }

  const result = await interviewService.rejectBooking(parsed.bookingId);
  if (!result.ok) {
    return ephemeral(result.error ?? "Impossible de refuser cette demande.");
  }

  const dmSent =
    parsed.kind === "staff"
      ? await sendStaffRejectionDm({
          userId: booking.user_id,
          username: booking.username,
          startsAt,
        })
      : parsed.kind === "legal"
        ? await sendLegalRejectionDm({
            userId: booking.user_id,
            username: booking.username,
            startsAt,
          })
        : await sendInterviewRejectionDm({
            userId: booking.user_id,
            username: booking.username,
            startsAt,
          });

  if (!dmSent) {
    console.error(
      "MP refus non envoyé pour",
      booking.user_id,
      booking.username,
    );
  }

  return jsonResponse(
    buildInteractionUpdate(
      [
        buildEmbedForKind(parsed.kind, {
          user: player,
          startsAt,
          status: "rejected",
          handledById: staffUser.id,
        }),
      ],
      [staffUser.id],
    ),
  );
}

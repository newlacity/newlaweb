import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

const INTERVIEW_BOOKING_WEBHOOK_URL =
  process.env.INTERVIEW_BOOKING_WEBHOOK_URL ??
  "https://discord.com/api/webhooks/1526342320654385322/Mvgs-eVLOWMeE-QIaGXCL3lEiLG-L15YLd1OM4s3bmW8kEPkAw-fEmn56CPXWWdAsM_G";

const INTERVIEW_EMBED_IMAGE_URL =
  process.env.INTERVIEW_EMBED_IMAGE_URL ??
  process.env.INTERVIEW_CANCELLATION_EMBED_IMAGE_URL ??
  "https://www.newla.online/rejoignez-nous-embed.png";

interface InterviewWebhookUser {
  id: string;
  username: string;
  discriminator?: string;
}

export const INTERVIEW_ACCEPT_PREFIX = "int_a:";
export const INTERVIEW_REJECT_PREFIX = "int_r:";

export function buildInterviewActionButtons(bookingId: string) {
  return [
    {
      type: 1,
      components: [
        {
          type: 2,
          style: 3,
          label: "Accepter le rendez-vous",
          custom_id: `${INTERVIEW_ACCEPT_PREFIX}${bookingId}`,
        },
        {
          type: 2,
          style: 4,
          label: "Refuser le rendez-vous",
          custom_id: `${INTERVIEW_REJECT_PREFIX}${bookingId}`,
        },
      ],
    },
  ];
}

export function buildInterviewRequestEmbed(params: {
  user: InterviewWebhookUser;
  startsAt: string;
  status: "pending" | "accepted" | "rejected";
  handledBy?: string;
}) {
  const { user, startsAt, status, handledBy } = params;

  const discriminator =
    user.discriminator && user.discriminator !== "0"
      ? `#${user.discriminator}`
      : "";

  const slotDate = format(parseISO(startsAt), "EEEE d MMMM yyyy", {
    locale: fr,
  });
  const slotTime = format(parseISO(startsAt), "HH:mm", { locale: fr });
  const dateLabel = slotDate.charAt(0).toUpperCase() + slotDate.slice(1);

  const statusLabels = {
    pending: "⏳ En attente de validation",
    accepted: "✅ Rendez-vous accepté",
    rejected: "❌ Rendez-vous refusé",
  };

  const colors = {
    pending: 0x006bff,
    accepted: 0x22c55e,
    rejected: 0xef4444,
  };

  const description =
    status === "pending"
      ? [
          "Un joueur a **soumis une demande** d'entretien oral whitelist.",
          "",
          "**Action requise** — validez ou refusez ce créneau avec les boutons ci-dessous.",
        ].join("\n")
      : status === "accepted"
        ? [
            "La demande d'entretien a été **acceptée**.",
            handledBy ? `Traité par **${handledBy}**` : "",
          ]
            .filter(Boolean)
            .join("\n")
        : [
            "La demande d'entretien a été **refusée**.",
            handledBy ? `Traité par **${handledBy}**` : "",
          ]
            .filter(Boolean)
            .join("\n");

  return {
    title: "Demande d'entretien WL",
    description,
    color: colors[status],
    timestamp: new Date().toISOString(),
    fields: [
      {
        name: "Joueur",
        value: `${user.username}${discriminator}`,
        inline: true,
      },
      {
        name: "Discord",
        value: `<@${user.id}>`,
        inline: true,
      },
      {
        name: "Heure",
        value: `${slotTime} · 30 min`,
        inline: true,
      },
      {
        name: "Date",
        value: dateLabel,
        inline: true,
      },
      {
        name: "Statut",
        value: statusLabels[status],
        inline: false,
      },
      {
        name: "Discord ID",
        value: user.id,
        inline: false,
      },
    ],
    image: {
      url: INTERVIEW_EMBED_IMAGE_URL,
    },
  };
}

export async function sendInterviewBookingWebhook(params: {
  bookingId: string;
  user: InterviewWebhookUser;
  startsAt: string;
}): Promise<void> {
  const { bookingId, user, startsAt } = params;
  if (!INTERVIEW_BOOKING_WEBHOOK_URL) {
    console.warn("Webhook entretien : URL manquante.");
    return;
  }

  const payload = {
    allowed_mentions: {
      parse: [],
      users: [user.id],
    },
    embeds: [
      buildInterviewRequestEmbed({
        user,
        startsAt,
        status: "pending",
      }),
    ],
    components: buildInterviewActionButtons(bookingId),
  };

  try {
    const res = await fetch(INTERVIEW_BOOKING_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Erreur webhook entretien:", await res.text());
    }
  } catch (error) {
    console.error("Erreur envoi webhook entretien:", error);
  }
}

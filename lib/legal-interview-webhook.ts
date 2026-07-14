import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

const LEGAL_BOOKING_WEBHOOK_URL =
  process.env.LEGAL_BOOKING_WEBHOOK_URL ??
  process.env.DOSSIER_LEGAL_WEBHOOK_URL ??
  "";

const LEGAL_BOOKING_CHANNEL_ID = process.env.LEGAL_BOOKING_CHANNEL_ID ?? "";

const LEGAL_EMBED_IMAGE_URL =
  process.env.LEGAL_EMBED_IMAGE_URL ??
  process.env.INTERVIEW_EMBED_IMAGE_URL ??
  "https://www.newla.online/rejoignez-nous-embed.png";

interface LegalWebhookUser {
  id: string;
  username: string;
  discriminator?: string;
}

export const LEGAL_ACCEPT_PREFIX = "lgl_a:";
export const LEGAL_REJECT_PREFIX = "lgl_r:";

function parseWebhookUrl(url: string): { id: string; token: string } | null {
  const match = url.match(/webhooks\/(\d+)\/([^/?]+)/);
  if (!match) return null;
  return { id: match[1], token: match[2] };
}

async function resolveBookingChannelId(): Promise<string | null> {
  if (LEGAL_BOOKING_CHANNEL_ID) return LEGAL_BOOKING_CHANNEL_ID;

  if (!LEGAL_BOOKING_WEBHOOK_URL) return null;

  const parsed = parseWebhookUrl(LEGAL_BOOKING_WEBHOOK_URL);
  if (!parsed) return null;

  try {
    const res = await fetch(
      `https://discord.com/api/v10/webhooks/${parsed.id}/${parsed.token}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { channel_id?: string };
    return data.channel_id ?? null;
  } catch {
    return null;
  }
}

export function buildLegalActionButtons(bookingId: string) {
  return [
    {
      type: 1,
      components: [
        {
          type: 2,
          style: 3,
          label: "Accepter le rendez-vous",
          custom_id: `${LEGAL_ACCEPT_PREFIX}${bookingId}`,
        },
        {
          type: 2,
          style: 4,
          label: "Refuser le rendez-vous",
          custom_id: `${LEGAL_REJECT_PREFIX}${bookingId}`,
        },
      ],
    },
  ];
}

export function buildLegalRequestEmbed(params: {
  user: LegalWebhookUser;
  startsAt: string;
  status: "pending" | "accepted" | "rejected";
  handledById?: string;
}) {
  const { user, startsAt, status, handledById } = params;

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
    pending: 0x22c55e,
    accepted: 0x16a34a,
    rejected: 0xef4444,
  };

  const description =
    status === "pending"
      ? [
          "Un joueur a **soumis une demande** d'entretien pour son **dossier légal** (société / activité RP).",
          "",
          "**Action requise** — validez ou refusez ce créneau avec les boutons ci-dessous.",
        ].join("\n")
      : status === "accepted"
        ? [
            "La demande d'entretien dossier légal a été **acceptée**.",
            handledById ? `Traité par <@${handledById}>` : "",
          ]
            .filter(Boolean)
            .join("\n")
        : [
            "La demande d'entretien dossier légal a été **refusée**.",
            handledById ? `Traité par <@${handledById}>` : "",
          ]
            .filter(Boolean)
            .join("\n");

  return {
    title: "Entretien dossier légal",
    description,
    color: colors[status],
    timestamp: new Date().toISOString(),
    fields: [
      {
        name: "Porteur de projet",
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
        name: "Discord ID",
        value: user.id,
        inline: true,
      },
      {
        name: "Statut",
        value: statusLabels[status],
        inline: true,
      },
      {
        name: "Date",
        value: dateLabel,
        inline: true,
      },
    ],
    image: {
      url: LEGAL_EMBED_IMAGE_URL,
    },
  };
}

async function sendViaBotChannel(
  channelId: string,
  payload: object,
): Promise<boolean> {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) {
    console.warn("DISCORD_BOT_TOKEN manquant — envoi salon légal impossible.");
    return false;
  }

  const res = await fetch(
    `https://discord.com/api/v10/channels/${channelId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    console.error("Erreur envoi bot salon légal:", await res.text());
    return false;
  }

  return true;
}

async function sendViaWebhook(payload: object): Promise<boolean> {
  if (!LEGAL_BOOKING_WEBHOOK_URL) {
    console.error("LEGAL_BOOKING_WEBHOOK_URL / DOSSIER_LEGAL_WEBHOOK_URL manquant.");
    return false;
  }

  const res = await fetch(LEGAL_BOOKING_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error("Erreur webhook légal:", await res.text());
    return false;
  }

  return true;
}

export async function sendLegalBookingWebhook(params: {
  bookingId: string;
  user: LegalWebhookUser;
  startsAt: string;
}): Promise<void> {
  const { bookingId, user, startsAt } = params;

  const payload = {
    allowed_mentions: {
      parse: [],
      users: [user.id],
    },
    embeds: [
      buildLegalRequestEmbed({
        user,
        startsAt,
        status: "pending",
      }),
    ],
    components: buildLegalActionButtons(bookingId),
  };

  try {
    const channelId = await resolveBookingChannelId();
    if (channelId) {
      const sent = await sendViaBotChannel(channelId, payload);
      if (sent) return;
    }

    await sendViaWebhook(payload);
  } catch (error) {
    console.error("Erreur envoi webhook légal:", error);
  }
}

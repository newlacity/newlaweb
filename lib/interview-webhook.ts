import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

const INTERVIEW_BOOKING_WEBHOOK_URL =
  process.env.INTERVIEW_BOOKING_WEBHOOK_URL ??
  "https://discord.com/api/webhooks/1526342320654385322/Mvgs-eVLOWMeE-QIaGXCL3lEiLG-L15YLd1OM4s3bmW8kEPkAw-fEmn56CPXWWdAsM_G";

interface InterviewWebhookUser {
  id: string;
  username: string;
  discriminator?: string;
}

export async function sendInterviewBookingWebhook(params: {
  user: InterviewWebhookUser;
  startsAt: string;
}): Promise<void> {
  const { user, startsAt } = params;
  if (!INTERVIEW_BOOKING_WEBHOOK_URL) {
    console.warn("Webhook entretien : URL manquante.");
    return;
  }

  const discriminator =
    user.discriminator && user.discriminator !== "0"
      ? `#${user.discriminator}`
      : "";

  const slotDate = format(parseISO(startsAt), "EEEE d MMMM yyyy", {
    locale: fr,
  });
  const slotTime = format(parseISO(startsAt), "HH:mm", { locale: fr });

  const payload = {
    allowed_mentions: {
      parse: [],
      users: [user.id],
    },
    embeds: [
      {
        title: "Passage entretien WL",
        description: "Un joueur a réservé un entretien oral.",
        color: 0x006bff,
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
            name: "Date",
            value: slotDate.charAt(0).toUpperCase() + slotDate.slice(1),
            inline: false,
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
        ],
      },
    ],
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

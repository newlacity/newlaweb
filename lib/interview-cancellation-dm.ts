import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

const CANCELLATION_EMBED_IMAGE_URL =
  process.env.INTERVIEW_CANCELLATION_EMBED_IMAGE_URL ??
  "https://www.newla.online/rejoignez-nous-embed.png";

const WHITELIST_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.newla.online";

async function sendDiscordDirectMessage(
  userId: string,
  payload: { content?: string; embeds?: object[] },
): Promise<boolean> {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) {
    console.warn("DISCORD_BOT_TOKEN manquant — MP Discord impossible.");
    return false;
  }

  try {
    const channelRes = await fetch(
      "https://discord.com/api/v10/users/@me/channels",
      {
        method: "POST",
        headers: {
          Authorization: `Bot ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipient_id: userId }),
      },
    );

    if (!channelRes.ok) {
      console.error("Création canal DM échouée:", await channelRes.text());
      return false;
    }

    const channel = (await channelRes.json()) as { id: string };

    const msgRes = await fetch(
      `https://discord.com/api/v10/channels/${channel.id}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bot ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    if (!msgRes.ok) {
      console.error("Envoi MP Discord échoué:", await msgRes.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erreur envoi MP Discord:", error);
    return false;
  }
}

export async function sendInterviewCancellationDm(params: {
  userId: string;
  username: string;
  startsAt: string;
}): Promise<boolean> {
  const { userId, username, startsAt } = params;

  const slotDate = format(parseISO(startsAt), "EEEE d MMMM yyyy", {
    locale: fr,
  });
  const slotTime = format(parseISO(startsAt), "HH:mm", { locale: fr });
  const dateLabel = slotDate.charAt(0).toUpperCase() + slotDate.slice(1);

  return sendDiscordDirectMessage(userId, {
    embeds: [
      {
        description: [
          `Bonjour **${username}**,`,
          "",
          "Nous sommes **désolés du dérangement**. Votre entretien oral ne pourra pas avoir lieu à la date prévue en raison d'un **empêchement** de notre côté.",
          "",
          "Merci de **reprendre un nouveau créneau** sur le site pour planifier votre entretien.",
          "",
          "En attendant, vous pouvez prendre connaissance des règlements officiels du serveur :",
          "",
          "🔹 **Règlement Général**",
          `${WHITELIST_URL}/reglement-general`,
          "",
          "🔹 **Règlement Illégal**",
          `${WHITELIST_URL}/reglement-illegal`,
          "",
          "🔹 **Règlement des Sociétés**",
          `${WHITELIST_URL}/reglement-societes`,
          "",
          "Cordialement,",
          "**L'équipe NEW LA CITY**",
        ].join("\n"),
        color: 0x006bff,
        fields: [
          {
            name: "Date initiale",
            value: dateLabel,
            inline: true,
          },
          {
            name: "Heure",
            value: `${slotTime} · 30 min`,
            inline: true,
          },
          {
            name: "Reprendre un créneau",
            value: `[Accéder à la whitelist](${WHITELIST_URL}/whitelist)`,
            inline: false,
          },
        ],
        image: {
          url: CANCELLATION_EMBED_IMAGE_URL,
        },
        timestamp: new Date().toISOString(),
      },
    ],
  });
}

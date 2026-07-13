import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

async function sendDiscordDirectMessage(
  userId: string,
  content: string,
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
        body: JSON.stringify({ content }),
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

  const content = [
    `Bonjour **${username}**,`,
    "",
    "Nous sommes désolés du dérangement. Votre entretien oral prévu ne pourra pas avoir lieu en raison d'un empêchement de notre côté.",
    "",
    `**Date initiale :** ${dateLabel}`,
    `**Heure :** ${slotTime}`,
    "",
    "Merci de reprendre un nouveau créneau sur le site pour planifier votre entretien.",
    "",
    "Cordialement,",
    "**L'équipe NEW LA CITY**",
  ].join("\n");

  return sendDiscordDirectMessage(userId, content);
}

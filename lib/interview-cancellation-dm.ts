import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { sendDiscordDirectMessage } from "./discord-dm";

const CANCELLATION_EMBED_IMAGE_URL =
  process.env.INTERVIEW_CANCELLATION_EMBED_IMAGE_URL ??
  "https://www.newla.online/rejoignez-nous-embed.png";

const WHITELIST_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.newla.online";

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
          "Vous pouvez **reprendre un nouveau créneau** sur le site pour planifier votre entretien. Merci de votre compréhension.",
          "",
        ].join("\n"),
        color: 0x006bff,
        fields: [
          {
            name: "Heure",
            value: `${slotTime} · 30 min`,
            inline: true,
          },
          {
            name: "Date initiale",
            value: dateLabel,
            inline: true,
          },
          {
            name: "Reprendre un créneau",
            value: [
              `[Accéder à la whitelist](${WHITELIST_URL}/whitelist)`,
              "",
              "Pour aborder sereinement votre **prochain entretien**, nous vous conseillons de **préparer votre background** ou votre projet avant le rendez-vous.",
            ].join("\n"),
            inline: false,
          },
          {
            name: "\u200b",
            value: "Cordialement,\n**L'équipe NEW LA CITY**",
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

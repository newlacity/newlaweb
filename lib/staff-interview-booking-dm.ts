import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { sendDiscordDirectMessage } from "./discord-dm";

const EMBED_IMAGE_URL =
  process.env.STAFF_EMBED_IMAGE_URL ??
  process.env.INTERVIEW_EMBED_IMAGE_URL ??
  "https://www.newla.online/rejoignez-nous-embed.png";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.newla.online";

const STAFF_DOSSIER_URL = `${SITE_URL}/depot-dossier/staff`;

function formatSlotLabels(startsAt: string) {
  const slotDate = format(parseISO(startsAt), "EEEE d MMMM yyyy", {
    locale: fr,
  });
  const slotTime = format(parseISO(startsAt), "HH:mm", { locale: fr });
  return {
    dateLabel: slotDate.charAt(0).toUpperCase() + slotDate.slice(1),
    slotTime,
  };
}

export async function sendStaffAcceptanceDm(params: {
  userId: string;
  username: string;
  startsAt: string;
}): Promise<boolean> {
  const { userId, username, startsAt } = params;
  const { dateLabel, slotTime } = formatSlotLabels(startsAt);

  return sendDiscordDirectMessage(userId, {
    embeds: [
      {
        description: [
          `Bonjour **${username}**,`,
          "",
          "Bonne nouvelle ! Votre **demande d'entretien staff** a été **acceptée** par notre équipe.",
          "",
          "Nous vous attendons à l'horaire convenu sur le salon vocal Discord.",
        ].join("\n"),
        color: 0x22c55e,
        fields: [
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
            name: "\u200b",
            value: [
              "",
              "Pensez à **préparer votre candidature** : expérience en modération, disponibilités et motivation pour rejoindre l'équipe.",
            ].join("\n"),
            inline: false,
          },
          {
            name: "\u200b",
            value: "Cordialement,\n**L'équipe NEW LA CITY**",
            inline: false,
          },
        ],
        image: { url: EMBED_IMAGE_URL },
        timestamp: new Date().toISOString(),
      },
    ],
  });
}

export async function sendStaffRejectionDm(params: {
  userId: string;
  username: string;
  startsAt: string;
}): Promise<boolean> {
  const { userId, username, startsAt } = params;
  const { dateLabel, slotTime } = formatSlotLabels(startsAt);

  return sendDiscordDirectMessage(userId, {
    embeds: [
      {
        description: [
          `Bonjour **${username}**,`,
          "",
          "Nous sommes **désolés du dérangement**. Aucun gérant staff n'est **disponible** à l'horaire que vous aviez choisi.",
          "",
          "Veuillez **reprendre un nouveau créneau** sur le site pour planifier votre entretien staff. Merci de votre compréhension.",
        ].join("\n"),
        color: 0x006bff,
        fields: [
          {
            name: "Heure initiale",
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
              `[Accéder au dépôt de dossier staff](${STAFF_DOSSIER_URL})`,
              "",
              "Pour aborder sereinement votre **prochain entretien**, préparez votre expérience en modération, vos disponibilités et votre motivation.",
            ].join("\n"),
            inline: false,
          },
          {
            name: "\u200b",
            value: "Cordialement,\n**L'équipe NEW LA CITY**",
            inline: false,
          },
        ],
        image: { url: EMBED_IMAGE_URL },
        timestamp: new Date().toISOString(),
      },
    ],
  });
}

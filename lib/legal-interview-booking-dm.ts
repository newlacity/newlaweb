import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { sendDiscordDirectMessage } from "./discord-dm";

const EMBED_IMAGE_URL =
  process.env.LEGAL_EMBED_IMAGE_URL ??
  process.env.INTERVIEW_EMBED_IMAGE_URL ??
  "https://www.newla.online/rejoignez-nous-embed.png";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.newla.online";

const LEGAL_DOSSIER_URL = `${SITE_URL}/depot-dossier/legal`;

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

export async function sendLegalAcceptanceDm(params: {
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
          "Bonne nouvelle ! Votre **demande d'entretien dossier légal** a été **acceptée** par notre équipe.",
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
              "Pensez à **préparer votre business plan RP** : activité, tarifs, RH, financement et cohérence avec le règlement sociétés.",
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

export async function sendLegalRejectionDm(params: {
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
          "Nous sommes **désolés du dérangement**. Aucun responsable légal n'est **disponible** à l'horaire que vous aviez choisi.",
          "",
          "Veuillez **reprendre un nouveau créneau** sur le site pour planifier votre entretien dossier légal. Merci de votre compréhension.",
        ].join("\n"),
        color: 0x22c55e,
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
              `[Accéder au dépôt de dossier légal](${LEGAL_DOSSIER_URL})`,
              "",
              "Pour votre **prochain entretien**, préparez votre structure RP, votre grille tarifaire et votre plan de financement.",
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

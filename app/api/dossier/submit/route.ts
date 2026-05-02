import { NextRequest, NextResponse } from "next/server";
import { DISCORD_EMBED_FIELD_VALUE_MAX } from "@/lib/dossier-limits";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const DOSSIER_LEGAL_WEBHOOK_URL = process.env.DOSSIER_LEGAL_WEBHOOK_URL;
const DOSSIER_ILLEGAL_WEBHOOK_URL = process.env.DOSSIER_ILLEGAL_WEBHOOK_URL;

type DossierKind = "legal" | "illegal";

/** Titre en blanc gras dans un bloc ansi (les noms de champs Discord ne peuvent pas être colorés). */
function buildTitleBlock(questionTitle: string): string {
  const safe = questionTitle.replace(/```/g, "'''");
  return `\`\`\`ansi\n\u001b[1;37m${safe}\u001b[0m\n\`\`\``;
}

function trimAnswer(raw: unknown, maxLen: number): string {
  const s = String(raw ?? "").trim();
  if (!s) return "—";
  if (s.length <= maxLen) return s;
  return `${s.slice(0, Math.max(0, maxLen - 1))}…`;
}

/** Une valeur d’embed Discord ≤ 1024 car. : en-tête ansi + saut de ligne + réponse. */
function buildFormFieldValue(questionTitle: string, raw: unknown): string {
  const header = buildTitleBlock(questionTitle);
  const maxBody = Math.max(
    1,
    DISCORD_EMBED_FIELD_VALUE_MAX - header.length - 1,
  );
  const body = trimAnswer(raw, maxBody);
  return `${header}\n${body}`;
}

function buildFormFields(
  kind: DossierKind,
  body: Record<string, unknown>,
): { question: string; raw: unknown }[] {
  const common: [string, unknown][] = [
    ["1. Âge (IRL ou RP, précisez)", body.age],
    ["2. Disponibilités", body.disponibilites],
    ["3. Expérience RP / FiveM", body.experience],
    ["4. Motivation", body.motivation],
  ];

  if (kind === "legal") {
    const rows: [string, unknown][] = [
      ...common,
      ["5. Nom de la structure / société (RP)", body.nomStructure],
      ["6. Type d'activité légale", body.typeActivite],
      [
        "7. Grille tarifaire (prix produits / services)",
        body.prixProduitsEtServices,
      ],
      [
        "8. Rémunération employés (salaires, primes, extras)",
        body.salairesEtPrimes,
      ],
      [
        "9. Politique de recrutement & formation",
        body.politiqueRecrutement,
      ],
      ["10. Capital & financement", body.capitalEtFinancement],
      ["11. Informations complémentaires", body.details],
    ];
    return rows.map(([question, raw]) => ({ question, raw }));
  }

  const rows: [string, unknown][] = [
    ...common,
    ["5. Projets illégaux à venir", body.projetsAVenir],
    ["6. Zones à contrôler / influencer", body.controleZones],
    ["7. Lignes de drogue à gérer", body.lignesDrogue],
    ["8. Acquisition ou reprise de business", body.businessAAcquire],
    ["9. Informations complémentaires", body.details],
  ];
  return rows.map(([question, raw]) => ({ question, raw }));
}

export async function POST(request: NextRequest) {
  try {
    const discordCookie = request.cookies.get("discord_user");
    if (!discordCookie?.value) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const user = JSON.parse(discordCookie.value) as {
      id: string;
      username?: string;
      discriminator?: string;
    };

    if (!user?.id) {
      return NextResponse.json({ error: "Session invalide" }, { status: 401 });
    }

    const body = (await request.json()) as Record<string, unknown>;
    const kind = body.type;

    if (kind !== "legal" && kind !== "illegal") {
      return NextResponse.json(
        { error: "Type de dossier invalide" },
        { status: 400 },
      );
    }

    const webhookUrl =
      kind === "legal"
        ? DOSSIER_LEGAL_WEBHOOK_URL
        : DOSSIER_ILLEGAL_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("Webhook dossier non configuré pour:", kind);
      return NextResponse.json(
        { error: "Service temporairement indisponible" },
        { status: 503 },
      );
    }

    const formRows = buildFormFields(kind, body);
    const submittedFr = new Date().toLocaleString("fr-FR", {
      dateStyle: "full",
      timeStyle: "short",
    });

    const embedTitle =
      kind === "legal"
        ? "Dépôts de dossier : Légal"
        : "Dépôts de dossier : Illégal";

    const headerFields = [
      {
        name: "Répondant",
        value: `<@${user.id}>`,
        inline: true,
      },
      {
        name: "ID",
        value: `\`${user.id}\``,
        inline: true,
      },
    ];

    const embed = {
      title: embedTitle,
      description: `**Date** ${submittedFr}`,
      color: kind === "legal" ? 0x22c55e : 0xdc2626,
      fields: [
        ...headerFields,
        ...formRows.map((row) => ({
          name: "\u200b",
          value: buildFormFieldValue(row.question, row.raw),
          inline: false,
        })),
      ],
    };

    const payload = {
      allowed_mentions: { users: [user.id] },
      embeds: [embed],
    };

    const whRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!whRes.ok) {
      const errText = await whRes.text();
      console.error("Webhook dossier:", whRes.status, errText);
      return NextResponse.json(
        { error: "Échec de l'envoi vers Discord" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erreur /api/dossier/submit:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

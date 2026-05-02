import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const DOSSIER_LEGAL_WEBHOOK_URL = process.env.DOSSIER_LEGAL_WEBHOOK_URL;
const DOSSIER_ILLEGAL_WEBHOOK_URL = process.env.DOSSIER_ILLEGAL_WEBHOOK_URL;

/** Limite par réponse pour rester sous le plafond global d’embed Discord (~6000 car.). */
const MAX_VALUE_LEN = 380;

function trimValue(raw: unknown): string {
  const s = String(raw ?? "").trim();
  if (!s) return "—";
  if (s.length <= MAX_VALUE_LEN) return s;
  return `${s.slice(0, MAX_VALUE_LEN - 1)}…`;
}

type DossierKind = "legal" | "illegal";

function buildFormFields(
  kind: DossierKind,
  body: Record<string, unknown>,
): { name: string; value: string }[] {
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
    return rows.map(([name, v]) => ({ name, value: trimValue(v) }));
  }

  const rows: [string, unknown][] = [
    ...common,
    ["5. Projets illégaux à venir", body.projetsAVenir],
    ["6. Zones à contrôler / influencer", body.controleZones],
    ["7. Lignes de drogue à gérer", body.lignesDrogue],
    ["8. Acquisition ou reprise de business", body.businessAAcquire],
    ["9. Informations complémentaires", body.details],
  ];
  return rows.map(([name, v]) => ({ name, value: trimValue(v) }));
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

    const fields = buildFormFields(kind, body);
    const submittedFr = new Date().toLocaleString("fr-FR", {
      dateStyle: "full",
      timeStyle: "short",
    });

    const formTitle =
      kind === "legal"
        ? "Dépôt de dossier — Légal"
        : "Dépôt de dossier — Illégal";

    const discriminator =
      user.discriminator && user.discriminator !== "0"
        ? `#${user.discriminator}`
        : "";

    const embed = {
      title: `Réponses · ${formTitle}`,
      description:
        "**Nouvelle réponse au formulaire**\n" +
        `Horodatage : **${submittedFr}**\n\n` +
        "**Répondant**\n" +
        `${user.username ?? "—"}${discriminator} · \`${user.id}\``,
      color: kind === "legal" ? 0x2563eb : 0xdc2626,
      fields: fields.map((row) => ({
        name: row.name,
        value: row.value,
        inline: false,
      })),
      footer: { text: "Formulaire site · une ligne = une question (type Google Forms)" },
    };

    const payload = {
      content: `<@${user.id}>`,
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

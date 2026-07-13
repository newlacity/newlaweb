import { NextRequest } from "next/server";

const DEFAULT_INTERVIEW_ADMIN_ROLE_IDS = ["1430996155415920703"];

export function getInterviewAdminRoleIds(): string[] {
  const raw = process.env.INTERVIEW_ADMIN_ROLE_ID ?? "";
  const fromEnv = raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  return fromEnv.length ? fromEnv : DEFAULT_INTERVIEW_ADMIN_ROLE_IDS;
}

export const INTERVIEW_ADMIN_ROLE_ID = getInterviewAdminRoleIds()[0];

function getAdminDiscordIds(): string[] {
  const raw = process.env.INTERVIEW_ADMIN_DISCORD_IDS ?? "";
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

export interface AdminCheckResult {
  isAdmin: boolean;
  reason?: string;
}

export async function checkInterviewAdmin(
  userId: string,
): Promise<AdminCheckResult> {
  const allowlist = getAdminDiscordIds();
  if (allowlist.includes(userId)) {
    return { isAdmin: true };
  }

  const token = process.env.DISCORD_BOT_TOKEN;
  const guildId = process.env.DISCORD_GUILD_ID;

  if (!token || !guildId) {
    return {
      isAdmin: false,
      reason:
        "Bot Discord non configuré sur Vercel (DISCORD_BOT_TOKEN / DISCORD_GUILD_ID).",
    };
  }

  try {
    const res = await fetch(
      `https://discord.com/api/guilds/${guildId}/members/${userId}`,
      {
        headers: { Authorization: `Bot ${token}` },
        cache: "no-store",
      },
    );

    if (res.status === 404) {
      return {
        isAdmin: false,
        reason: "Vous devez être membre du serveur Discord NEW LA.",
      };
    }

    if (!res.ok) {
      console.error("Discord member fetch failed:", res.status, await res.text());
      return {
        isAdmin: false,
        reason:
          "Impossible de vérifier votre rôle Discord (bot ou permissions).",
      };
    }

    const member = (await res.json()) as { roles?: string[] };
    const memberRoles = member.roles ?? [];
    const adminRoleIds = getInterviewAdminRoleIds();
    const hasRole = adminRoleIds.some((roleId) => memberRoles.includes(roleId));

    if (!hasRole) {
      return {
        isAdmin: false,
        reason: `Rôle staff requis (IDs : ${adminRoleIds.join(", ")}). Rôles détectés : ${memberRoles.length ? memberRoles.join(", ") : "aucun"}.`,
      };
    }

    return { isAdmin: true };
  } catch (error) {
    console.error("checkInterviewAdmin:", error);
    return {
      isAdmin: false,
      reason: "Erreur lors de la vérification Discord.",
    };
  }
}

export async function hasInterviewAdminRole(
  userId: string,
): Promise<boolean> {
  const result = await checkInterviewAdmin(userId);
  return result.isAdmin;
}

export interface DiscordSessionUser {
  id: string;
  username: string;
  avatar?: string;
  discriminator?: string;
}

export function getDiscordUserFromRequest(
  request: NextRequest,
): DiscordSessionUser | null {
  const cookie = request.cookies.get("discord_user");
  if (!cookie?.value) return null;
  try {
    const user = JSON.parse(cookie.value) as DiscordSessionUser;
    return user?.id ? user : null;
  } catch {
    return null;
  }
}

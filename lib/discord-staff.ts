import { NextRequest } from "next/server";

const DEFAULT_INTERVIEW_ADMIN_ROLE_IDS = ["1430996155415920703"];
const DEFAULT_STAFF_MANAGER_ROLE_IDS = ["1519527026112073819"];
const DEFAULT_LEGAL_MANAGER_ROLE_IDS = ["1425942819755004004"];

export function getInterviewAdminRoleIds(): string[] {
  const fromEnv = (process.env.INTERVIEW_ADMIN_ROLE_ID ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  return [...new Set([...DEFAULT_INTERVIEW_ADMIN_ROLE_IDS, ...fromEnv])];
}

export const INTERVIEW_ADMIN_ROLE_ID = getInterviewAdminRoleIds()[0];

export function getStaffManagerRoleIds(): string[] {
  const fromEnv = (process.env.STAFF_MANAGER_ROLE_ID ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  return [...new Set([...DEFAULT_STAFF_MANAGER_ROLE_IDS, ...fromEnv])];
}

export const STAFF_MANAGER_ROLE_ID = getStaffManagerRoleIds()[0];

export function getLegalManagerRoleIds(): string[] {
  const fromEnv = (process.env.LEGAL_MANAGER_ROLE_ID ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  return [...new Set([...DEFAULT_LEGAL_MANAGER_ROLE_IDS, ...fromEnv])];
}

export const LEGAL_MANAGER_ROLE_ID = getLegalManagerRoleIds()[0];

function getAdminDiscordIds(): string[] {
  const raw = process.env.INTERVIEW_ADMIN_DISCORD_IDS ?? "";
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

function getStaffManagerDiscordIds(): string[] {
  const raw = process.env.STAFF_MANAGER_DISCORD_IDS ?? "";
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

function getLegalManagerDiscordIds(): string[] {
  const raw = process.env.LEGAL_MANAGER_DISCORD_IDS ?? "";
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

function memberHasAdminRole(
  memberRoles: string[],
  adminRoleIds: string[],
): boolean {
  return adminRoleIds.some((roleId) => memberRoles.includes(roleId));
}

export function isDiscordInterviewStaff(
  userId: string,
  memberRoles: string[] = [],
): boolean {
  if (getAdminDiscordIds().includes(userId)) return true;
  return memberHasAdminRole(memberRoles, getInterviewAdminRoleIds());
}

export function isDiscordStaffManager(
  userId: string,
  memberRoles: string[] = [],
): boolean {
  if (getStaffManagerDiscordIds().includes(userId)) return true;
  return memberHasAdminRole(memberRoles, getStaffManagerRoleIds());
}

export function isDiscordLegalManager(
  userId: string,
  memberRoles: string[] = [],
): boolean {
  if (getLegalManagerDiscordIds().includes(userId)) return true;
  return memberHasAdminRole(memberRoles, getLegalManagerRoleIds());
}

export function getInterviewPanelRoleIds(): string[] {
  return [
    ...new Set([
      ...getInterviewAdminRoleIds(),
      ...getStaffManagerRoleIds(),
      ...getLegalManagerRoleIds(),
    ]),
  ];
}

export function isDiscordInterviewPanelStaff(
  userId: string,
  memberRoles: string[] = [],
): boolean {
  if (getAdminDiscordIds().includes(userId)) return true;
  if (getStaffManagerDiscordIds().includes(userId)) return true;
  if (getLegalManagerDiscordIds().includes(userId)) return true;
  return memberHasAdminRole(memberRoles, getInterviewPanelRoleIds());
}

export interface AdminCheckResult {
  isAdmin: boolean;
  reason?: string;
  needsReauth?: boolean;
}

async function checkRolesViaUserOAuth(
  accessToken: string,
  guildId: string,
  adminRoleIds: string[],
): Promise<AdminCheckResult | null> {
  try {
    const res = await fetch(
      `https://discord.com/api/users/@me/guilds/${guildId}/member`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      },
    );

    if (res.status === 401 || res.status === 403) {
      return {
        isAdmin: false,
        needsReauth: true,
        reason:
          "Reconnectez-vous à Discord pour actualiser vos permissions staff.",
      };
    }

    if (!res.ok) {
      console.error("OAuth guild member fetch failed:", res.status);
      return null;
    }

    const member = (await res.json()) as { roles?: string[] };
    const memberRoles = member.roles ?? [];

    if (memberHasAdminRole(memberRoles, adminRoleIds)) {
      return { isAdmin: true };
    }

    return {
      isAdmin: false,
      reason: `Rôle staff requis (IDs : ${adminRoleIds.join(", ")}). Rôles détectés : ${memberRoles.length ? memberRoles.join(", ") : "aucun"}.`,
    };
  } catch (error) {
    console.error("checkRolesViaUserOAuth:", error);
    return null;
  }
}

async function checkRolesViaBot(
  userId: string,
  guildId: string,
  token: string,
  adminRoleIds: string[],
): Promise<AdminCheckResult> {
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
        "Impossible de vérifier votre rôle Discord (bot ou permissions). Reconnectez-vous.",
    };
  }

  const member = (await res.json()) as { roles?: string[] };
  const memberRoles = member.roles ?? [];

  if (memberHasAdminRole(memberRoles, adminRoleIds)) {
    return { isAdmin: true };
  }

  return {
    isAdmin: false,
    reason: `Rôle staff requis (IDs : ${adminRoleIds.join(", ")}). Rôles détectés : ${memberRoles.length ? memberRoles.join(", ") : "aucun"}.`,
  };
}

export async function checkInterviewPanelAccess(
  userId: string,
  accessToken?: string | null,
): Promise<AdminCheckResult> {
  const panelRoleIds = getInterviewPanelRoleIds();
  const guildId = process.env.DISCORD_GUILD_ID;

  if (getAdminDiscordIds().includes(userId)) {
    return { isAdmin: true };
  }
  if (getStaffManagerDiscordIds().includes(userId)) {
    return { isAdmin: true };
  }
  if (getLegalManagerDiscordIds().includes(userId)) {
    return { isAdmin: true };
  }

  if (accessToken && guildId) {
    const oauthResult = await checkRolesViaUserOAuth(
      accessToken,
      guildId,
      panelRoleIds,
    );
    if (oauthResult) return oauthResult;
  }

  const botToken = process.env.DISCORD_BOT_TOKEN;
  if (!botToken || !guildId) {
    return {
      isAdmin: false,
      reason:
        "Bot Discord non configuré. Reconnectez-vous à Discord pour vérifier votre rôle.",
      needsReauth: !accessToken,
    };
  }

  try {
    return await checkRolesViaBot(userId, guildId, botToken, panelRoleIds);
  } catch (error) {
    console.error("checkInterviewPanelAccess:", error);
    return {
      isAdmin: false,
      reason: "Erreur lors de la vérification Discord.",
    };
  }
}

export async function checkInterviewAdmin(
  userId: string,
  accessToken?: string | null,
): Promise<AdminCheckResult> {
  const allowlist = getAdminDiscordIds();
  if (allowlist.includes(userId)) {
    return { isAdmin: true };
  }

  const adminRoleIds = getInterviewAdminRoleIds();
  const guildId = process.env.DISCORD_GUILD_ID;

  if (accessToken && guildId) {
    const oauthResult = await checkRolesViaUserOAuth(
      accessToken,
      guildId,
      adminRoleIds,
    );
    if (oauthResult) return oauthResult;
  }

  const botToken = process.env.DISCORD_BOT_TOKEN;
  if (!botToken || !guildId) {
    return {
      isAdmin: false,
      reason:
        "Bot Discord non configuré. Reconnectez-vous à Discord pour vérifier votre rôle.",
      needsReauth: !accessToken,
    };
  }

  try {
    return await checkRolesViaBot(userId, guildId, botToken, adminRoleIds);
  } catch (error) {
    console.error("checkInterviewAdmin:", error);
    return {
      isAdmin: false,
      reason: "Erreur lors de la vérification Discord.",
    };
  }
}

export async function checkInterviewPanelFromRequest(
  request: NextRequest,
): Promise<AdminCheckResult & { user: DiscordSessionUser | null }> {
  const user = getDiscordUserFromRequest(request);
  if (!user) {
    return { isAdmin: false, user: null, reason: "Non authentifié" };
  }

  const accessToken = request.cookies.get("discord_access_token")?.value;
  const result = await checkInterviewPanelAccess(user.id, accessToken);
  return { ...result, user };
}

export async function checkInterviewAdminFromRequest(
  request: NextRequest,
): Promise<AdminCheckResult & { user: DiscordSessionUser | null }> {
  const user = getDiscordUserFromRequest(request);
  if (!user) {
    return { isAdmin: false, user: null, reason: "Non authentifié" };
  }

  const accessToken = request.cookies.get("discord_access_token")?.value;
  const result = await checkInterviewPanelAccess(user.id, accessToken);
  return { ...result, user };
}

export async function hasInterviewAdminRole(
  userId: string,
  accessToken?: string | null,
): Promise<boolean> {
  const result = await checkInterviewAdmin(userId, accessToken);
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

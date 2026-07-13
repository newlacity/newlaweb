import { NextRequest } from "next/server";

export const INTERVIEW_ADMIN_ROLE_ID =
  process.env.INTERVIEW_ADMIN_ROLE_ID ?? "1430996155415920703";

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

export async function hasInterviewAdminRole(
  userId: string,
): Promise<boolean> {
  const token = process.env.DISCORD_BOT_TOKEN;
  const guildId = process.env.DISCORD_GUILD_ID;
  if (!token || !guildId) return false;

  try {
    const res = await fetch(
      `https://discord.com/api/guilds/${guildId}/members/${userId}`,
      {
        headers: { Authorization: `Bot ${token}` },
        next: { revalidate: 60 },
      },
    );
    if (!res.ok) return false;
    const member = (await res.json()) as { roles?: string[] };
    return member.roles?.includes(INTERVIEW_ADMIN_ROLE_ID) ?? false;
  } catch {
    return false;
  }
}

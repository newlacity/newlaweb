import { NextRequest, NextResponse } from "next/server";
import {
  getDiscordUserFromRequest,
  hasInterviewAdminRole,
} from "@/lib/discord-staff";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const user = getDiscordUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const isAdmin = await hasInterviewAdminRole(user.id);
  return NextResponse.json({ isAdmin });
}

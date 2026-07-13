import { NextRequest, NextResponse } from "next/server";
import {
  getDiscordUserFromRequest,
  hasInterviewAdminRole,
} from "@/lib/discord-staff";
import { interviewService } from "@/lib/interviews";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function requireAdmin(request: NextRequest) {
  const user = getDiscordUserFromRequest(request);
  if (!user) return { error: NextResponse.json({ error: "Non authentifié" }, { status: 401 }) };
  const isAdmin = await hasInterviewAdminRole(user.id);
  if (!isAdmin) return { error: NextResponse.json({ error: "Accès refusé" }, { status: 403 }) };
  return { user };
}

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  const from =
    request.nextUrl.searchParams.get("from") ??
    new Date().toISOString().slice(0, 10);
  const to =
    request.nextUrl.searchParams.get("to") ??
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const slots = await interviewService.getAdminSlots(from, to);
  return NextResponse.json({ slots });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  const body = await request.json();
  const { date } = body as { date?: string };

  if (!date) {
    return NextResponse.json({ error: "Date requise." }, { status: 400 });
  }

  const result = await interviewService.createSlots(auth.user!.id, date);

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ created: result.created });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  const body = await request.json();
  const { slotId, isActive } = body as { slotId?: string; isActive?: boolean };

  if (!slotId || typeof isActive !== "boolean") {
    return NextResponse.json({ error: "Paramètres invalides." }, { status: 400 });
  }

  const result = await interviewService.toggleSlotActive(slotId, isActive);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  const slotId = request.nextUrl.searchParams.get("slotId");
  if (!slotId) {
    return NextResponse.json({ error: "slotId requis." }, { status: 400 });
  }

  const result = await interviewService.deleteSlot(slotId);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

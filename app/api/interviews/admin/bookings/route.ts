import { NextRequest, NextResponse } from "next/server";
import {
  getDiscordUserFromRequest,
  hasInterviewAdminRole,
} from "@/lib/discord-staff";
import { interviewService } from "@/lib/interviews";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const user = getDiscordUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const isAdmin = await hasInterviewAdminRole(user.id);
  if (!isAdmin) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const bookings = await interviewService.getAllBookings();
  return NextResponse.json({ bookings });
}

export async function DELETE(request: NextRequest) {
  const user = getDiscordUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const isAdmin = await hasInterviewAdminRole(user.id);
  if (!isAdmin) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const bookingId = request.nextUrl.searchParams.get("bookingId");
  if (!bookingId) {
    return NextResponse.json({ error: "bookingId requis." }, { status: 400 });
  }

  const result = await interviewService.cancelBooking(bookingId);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

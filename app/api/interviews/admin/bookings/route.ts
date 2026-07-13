import { NextRequest, NextResponse } from "next/server";
import {
  checkInterviewAdminFromRequest,
} from "@/lib/discord-staff";
import { interviewService } from "@/lib/interviews";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const check = await checkInterviewAdminFromRequest(request);
  if (!check.user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }
  if (!check.isAdmin) {
    return NextResponse.json(
      { error: check.reason ?? "Accès refusé", needsReauth: check.needsReauth },
      { status: 403 },
    );
  }

  const bookings = await interviewService.getAllBookings();
  return NextResponse.json({ bookings });
}

export async function DELETE(request: NextRequest) {
  const check = await checkInterviewAdminFromRequest(request);
  if (!check.user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }
  if (!check.isAdmin) {
    return NextResponse.json(
      { error: check.reason ?? "Accès refusé", needsReauth: check.needsReauth },
      { status: 403 },
    );
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

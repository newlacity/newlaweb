import { NextRequest, NextResponse } from "next/server";
import {
  checkInterviewAdminFromRequest,
} from "@/lib/discord-staff";
import { sendInterviewCancellationDm } from "@/lib/interview-cancellation-dm";
import { sendInterviewRejectionDm } from "@/lib/interview-booking-dm";
import {
  sendLegalRejectionDm,
} from "@/lib/legal-interview-booking-dm";
import {
  sendStaffRejectionDm,
} from "@/lib/staff-interview-booking-dm";
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

  const existing = await interviewService.getBookingById(bookingId);
  if (!existing?.interview_slots?.starts_at) {
    return NextResponse.json({ error: "Réservation introuvable." }, { status: 404 });
  }

  const result = await interviewService.cancelBooking(bookingId);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const startsAt = result.booking?.interview_slots?.starts_at;
  const bookingKind = existing.booking_kind ?? "whitelist";
  let dmSent = false;
  if (result.booking?.user_id && startsAt) {
    if (existing.status === "pending") {
      dmSent =
        bookingKind === "staff"
          ? await sendStaffRejectionDm({
              userId: result.booking.user_id,
              username: result.booking.username,
              startsAt,
            })
          : bookingKind === "legal"
            ? await sendLegalRejectionDm({
                userId: result.booking.user_id,
                username: result.booking.username,
                startsAt,
              })
            : await sendInterviewRejectionDm({
                userId: result.booking.user_id,
                username: result.booking.username,
                startsAt,
              });
    } else {
      dmSent = await sendInterviewCancellationDm({
        userId: result.booking.user_id,
        username: result.booking.username,
        startsAt,
      });
    }
  }

  return NextResponse.json({ ok: true, dmSent });
}

import { NextRequest, NextResponse } from "next/server";
import {
  checkInterviewAdminFromRequest,
} from "@/lib/discord-staff";
import { interviewService } from "@/lib/interviews";
import { getUpcomingBookableDates } from "@/lib/interview-schedule";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function requireAdmin(request: NextRequest) {
  const check = await checkInterviewAdminFromRequest(request);
  if (!check.user) {
    return {
      error: NextResponse.json({ error: "Non authentifié" }, { status: 401 }),
    };
  }
  if (!check.isAdmin) {
    return {
      error: NextResponse.json(
        {
          error: check.reason ?? "Accès refusé",
          needsReauth: check.needsReauth,
        },
        { status: 403 },
      ),
    };
  }
  return { user: check.user };
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
  const { date, dates, daysAhead } = body as {
    date?: string;
    dates?: string[];
    daysAhead?: number;
  };

  if (daysAhead && daysAhead > 0) {
    const capped = Math.min(Math.floor(daysAhead), 60);
    const targetDates = getUpcomingBookableDates(capped);
    const result = await interviewService.createSlotsForDates(
      auth.user!.id,
      targetDates,
    );

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      created: result.created,
      datesProcessed: result.datesProcessed,
      skippedDates: result.skippedDates,
      message: `${result.created} créneau(x) ajouté(s) sur ${targetDates.length} date(s).${
        result.skippedDates
          ? ` ${result.skippedDates} date(s) avaient déjà des créneaux.`
          : ""
      }`,
    });
  }

  if (dates?.length) {
    const result = await interviewService.createSlotsForDates(
      auth.user!.id,
      dates,
    );

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      created: result.created,
      datesProcessed: result.datesProcessed,
      skippedDates: result.skippedDates,
      message: `${result.created} créneau(x) ajouté(s) sur ${dates.length} date(s).`,
    });
  }

  if (!date) {
    return NextResponse.json(
      { error: "Date, dates ou daysAhead requis." },
      { status: 400 },
    );
  }

  const result = await interviewService.createSlots(auth.user!.id, date);

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  if (result.alreadyExists) {
    return NextResponse.json({
      created: 0,
      message: `${result.total} créneau(x) existent déjà pour cette date.`,
    });
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

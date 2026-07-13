import { getSupabase } from "./supabase";
import {
  getParisCalendarDate,
  getScheduledSlotStartsForDate,
  getTodayParisDateString,
  isBookableCalendarDate,
  isBookableSlotStart,
  SLOT_DURATION_MINUTES,
  sortSlotsForDisplay,
} from "./interview-schedule";

export { SLOT_DURATION_MINUTES };

export interface InterviewSlot {
  id: string;
  starts_at: string;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface InterviewBooking {
  id: string;
  slot_id: string;
  user_id: string;
  username: string;
  status: "confirmed" | "cancelled";
  created_at: string;
  updated_at: string;
  interview_slots?: InterviewSlot;
}

export interface SlotWithBooking extends InterviewSlot {
  booking: InterviewBooking | null;
}

function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** Crée des créneaux de 30 min entre startTime et endTime (exclu) pour une date YYYY-MM-DD. */
export function buildSlotTimestamps(
  date: string,
  startTime: string,
  endTime: string,
): string[] {
  const startMin = parseTimeToMinutes(startTime);
  const endMin = parseTimeToMinutes(endTime);
  if (endMin <= startMin) return [];

  const timestamps: string[] = [];
  for (let min = startMin; min + SLOT_DURATION_MINUTES <= endMin; min += SLOT_DURATION_MINUTES) {
    const h = Math.floor(min / 60);
    const m = min % 60;
    const hh = String(h).padStart(2, "0");
    const mm = String(m).padStart(2, "0");
    timestamps.push(`${date}T${hh}:${mm}:00`);
  }
  return timestamps;
}

export const interviewService = {
  async getAvailableSlotsForDate(date: string): Promise<InterviewSlot[]> {
    if (!isBookableCalendarDate(date)) return [];

    const supabase = getSupabase();
    const dayStart = `${date}T00:00:00`;
    const dayEnd = `${date}T23:59:59`;

    const { data: slots, error } = await supabase
      .from("interview_slots")
      .select("*")
      .eq("is_active", true)
      .gte("starts_at", dayStart)
      .lte("starts_at", dayEnd)
      .order("starts_at", { ascending: true });

    if (error || !slots) {
      console.error("getAvailableSlotsForDate:", error);
      return [];
    }

    const { data: bookings } = await supabase
      .from("interview_bookings")
      .select("slot_id")
      .eq("status", "confirmed")
      .in(
        "slot_id",
        slots.map((s) => s.id),
      );

    const bookedIds = new Set(bookings?.map((b) => b.slot_id) ?? []);
    const available = slots.filter(
      (s) =>
        !bookedIds.has(s.id) &&
        getParisCalendarDate(s.starts_at) === date &&
        isBookableSlotStart(s.starts_at),
    );
    const order = sortSlotsForDisplay(available.map((s) => s.starts_at));
    const orderIndex = new Map(order.map((t, i) => [t, i]));
    return available.sort(
      (a, b) => (orderIndex.get(a.starts_at) ?? 0) - (orderIndex.get(b.starts_at) ?? 0),
    );
  },

  async getDatesWithAvailability(): Promise<string[]> {
    const supabase = getSupabase();
    const today = getTodayParisDateString();

    const { data: slots } = await supabase
      .from("interview_slots")
      .select("id, starts_at")
      .eq("is_active", true)
      .gte("starts_at", `${today}T00:00:00`)
      .order("starts_at", { ascending: true });

    if (!slots?.length) return [];

    const { data: bookings } = await supabase
      .from("interview_bookings")
      .select("slot_id")
      .eq("status", "confirmed")
      .in(
        "slot_id",
        slots.map((s) => s.id),
      );

    const bookedIds = new Set(bookings?.map((b) => b.slot_id) ?? []);
    const dates = new Set<string>();
    for (const slot of slots) {
      const dateStr = getParisCalendarDate(slot.starts_at);
      if (
        !bookedIds.has(slot.id) &&
        isBookableCalendarDate(dateStr) &&
        isBookableSlotStart(slot.starts_at)
      ) {
        dates.add(dateStr);
      }
    }
    return Array.from(dates).sort();
  },

  async getUserBooking(userId: string): Promise<InterviewBooking | null> {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("interview_bookings")
      .select("*, interview_slots(*)")
      .eq("user_id", userId)
      .eq("status", "confirmed")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("getUserBooking:", error);
      return null;
    }
    return data;
  },

  async bookSlot(
    userId: string,
    username: string,
    slotId: string,
  ): Promise<{
    booking: InterviewBooking | null;
    startsAt?: string;
    error?: string;
  }> {
    const supabase = getSupabase();

    const existing = await this.getUserBooking(userId);
    if (existing) {
      return { booking: null, error: "Vous avez déjà un entretien réservé." };
    }

    const { data: slot, error: slotError } = await supabase
      .from("interview_slots")
      .select("*")
      .eq("id", slotId)
      .eq("is_active", true)
      .single();

    if (slotError || !slot) {
      return { booking: null, error: "Créneau introuvable ou indisponible." };
    }

    if (!isBookableSlotStart(slot.starts_at)) {
      return {
        booking: null,
        error: "Les réservations pour le jour même ne sont pas autorisées.",
      };
    }

    if (new Date(slot.starts_at) <= new Date()) {
      return { booking: null, error: "Ce créneau est déjà passé." };
    }

    const { data: taken } = await supabase
      .from("interview_bookings")
      .select("id")
      .eq("slot_id", slotId)
      .eq("status", "confirmed")
      .maybeSingle();

    if (taken) {
      return { booking: null, error: "Ce créneau vient d'être réservé." };
    }

    const { data: booking, error } = await supabase
      .from("interview_bookings")
      .insert([{ slot_id: slotId, user_id: userId, username, status: "confirmed" }])
      .select("*, interview_slots(*)")
      .single();

    if (error) {
      console.error("bookSlot:", error);
      return { booking: null, error: "Impossible de réserver ce créneau." };
    }

    const startsAt =
      booking?.interview_slots?.starts_at ?? slot.starts_at ?? undefined;

    return { booking, startsAt };
  },

  async createSlots(
    createdBy: string,
    date: string,
    _startTime?: string,
    _endTime?: string,
  ): Promise<{
    created: number;
    total?: number;
    alreadyExists?: boolean;
    error?: string;
  }> {
    const timestamps = getScheduledSlotStartsForDate(date);
    if (!timestamps.length) {
      return { created: 0, error: "Aucun créneau pour cette date." };
    }

    const supabase = getSupabase();
    const rows = timestamps.map((starts_at) => ({
      starts_at,
      is_active: true,
      created_by: createdBy,
    }));

    const { data, error } = await supabase
      .from("interview_slots")
      .upsert(rows, { onConflict: "starts_at", ignoreDuplicates: true })
      .select();

    if (error) {
      console.error("createSlots:", error);
      return { created: 0, error: "Erreur lors de la création des créneaux." };
    }

    const created = data?.length ?? 0;
    if (created === 0) {
      const { count } = await supabase
        .from("interview_slots")
        .select("*", { count: "exact", head: true })
        .in("starts_at", timestamps);

      if (count && count > 0) {
        return { created: 0, alreadyExists: true, total: count };
      }
    }

    return { created };
  },

  async createSlotsForDates(
    createdBy: string,
    dates: string[],
  ): Promise<{
    created: number;
    datesProcessed: number;
    skippedDates: number;
    error?: string;
  }> {
    let created = 0;
    let datesProcessed = 0;
    let skippedDates = 0;

    for (const date of dates) {
      const result = await this.createSlots(createdBy, date);
      if (result.error && !result.alreadyExists) {
        return {
          created,
          datesProcessed,
          skippedDates,
          error: result.error,
        };
      }
      if (result.alreadyExists) {
        skippedDates += 1;
      } else {
        created += result.created;
        datesProcessed += 1;
      }
    }

    return { created, datesProcessed, skippedDates };
  },

  async getAdminSlots(from: string, to: string): Promise<SlotWithBooking[]> {
    const supabase = getSupabase();
    const { data: slots, error } = await supabase
      .from("interview_slots")
      .select("*")
      .gte("starts_at", `${from}T00:00:00`)
      .lte("starts_at", `${to}T23:59:59`)
      .order("starts_at", { ascending: true });

    if (error || !slots) return [];

    const { data: bookings } = await supabase
      .from("interview_bookings")
      .select("*")
      .eq("status", "confirmed")
      .in(
        "slot_id",
        slots.map((s) => s.id),
      );

    const bookingBySlot = new Map(
      bookings?.map((b) => [b.slot_id, b]) ?? [],
    );

    const withBookings = slots.map((slot) => ({
      ...slot,
      booking: bookingBySlot.get(slot.id) ?? null,
    }));
    const order = sortSlotsForDisplay(withBookings.map((s) => s.starts_at));
    const orderIndex = new Map(order.map((t, i) => [t, i]));
    return withBookings.sort(
      (a, b) =>
        (orderIndex.get(a.starts_at) ?? 0) - (orderIndex.get(b.starts_at) ?? 0),
    );
  },

  async deleteSlot(slotId: string): Promise<{ ok: boolean; error?: string }> {
    const supabase = getSupabase();

    const { data: booking } = await supabase
      .from("interview_bookings")
      .select("id")
      .eq("slot_id", slotId)
      .eq("status", "confirmed")
      .maybeSingle();

    if (booking) {
      return { ok: false, error: "Impossible de supprimer un créneau déjà réservé." };
    }

    const { error } = await supabase
      .from("interview_slots")
      .delete()
      .eq("id", slotId);

    if (error) {
      return { ok: false, error: "Erreur lors de la suppression." };
    }
    return { ok: true };
  },

  async toggleSlotActive(
    slotId: string,
    isActive: boolean,
  ): Promise<{ ok: boolean; error?: string }> {
    const supabase = getSupabase();
    const { error } = await supabase
      .from("interview_slots")
      .update({ is_active: isActive })
      .eq("id", slotId);

    if (error) return { ok: false, error: "Erreur lors de la mise à jour." };
    return { ok: true };
  },

  async getAllBookings(): Promise<InterviewBooking[]> {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("interview_bookings")
      .select("*, interview_slots(*)")
      .eq("status", "confirmed")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("getAllBookings:", error);
      return [];
    }
    return data ?? [];
  },

  async cancelBooking(
    bookingId: string,
  ): Promise<{ ok: boolean; error?: string }> {
    const supabase = getSupabase();
    const { error } = await supabase
      .from("interview_bookings")
      .update({ status: "cancelled" })
      .eq("id", bookingId);

    if (error) return { ok: false, error: "Erreur lors de l'annulation." };
    return { ok: true };
  },
};

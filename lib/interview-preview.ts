import {
  getScheduledSlotStartsForDate,
  getUpcomingBookableDates,
  isBookableSlotStart,
} from "./interview-schedule";

export function isLocalPreviewEnabled(): boolean {
  return process.env.NODE_ENV === "development";
}

export function getPreviewAvailableDates(): string[] {
  return getUpcomingBookableDates(14);
}

export function getPreviewSlotsForDate(
  date: string,
): { id: string; starts_at: string }[] {
  return getScheduledSlotStartsForDate(date)
    .filter(isBookableSlotStart)
    .map((starts_at, i) => ({
      id: `preview-${date}-${i}`,
      starts_at,
    }));
}

export function getPreviewBooking(startsAt: string) {
  return {
    id: "preview-booking",
    slot_id: "preview-slot",
    username: "JoueurDemo",
    status: "pending" as const,
    interview_slots: { starts_at: startsAt },
  };
}

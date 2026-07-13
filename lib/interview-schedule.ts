import { addDays, format, getDay, parseISO } from "date-fns";

export const SLOT_DURATION_MINUTES = 30;

/** 0 = dimanche, 6 = samedi */
function isWeekendDay(dayOfWeek: number): boolean {
  return dayOfWeek === 0 || dayOfWeek === 6;
}

export function getTodayParisDateString(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** Réservation interdite le jour même (fuseau Paris). */
export function isBookableCalendarDate(dateStr: string): boolean {
  return dateStr > getTodayParisDateString();
}

export function isBookableSlotStart(startsAt: string): boolean {
  const dateStr = startsAt.slice(0, 10);
  if (!isBookableCalendarDate(dateStr)) return false;
  return new Date(startsAt) > new Date();
}

function slotsFromTo(
  date: string,
  startH: number,
  startM: number,
  endH: number,
  endM: number,
): string[] {
  const result: string[] = [];
  let min = startH * 60 + startM;
  const endMin = endH * 60 + endM;
  while (min <= endMin) {
    const hh = String(Math.floor(min / 60)).padStart(2, "0");
    const mm = String(min % 60).padStart(2, "0");
    result.push(`${date}T${hh}:${mm}:00`);
    min += SLOT_DURATION_MINUTES;
  }
  return result;
}

/** Créneaux du soir / après-midi pour la date calendaire. */
function getEveningSlotsForDate(date: string): string[] {
  const dow = getDay(parseISO(`${date}T12:00:00`));
  if (isWeekendDay(dow)) {
    return slotsFromTo(date, 16, 0, 23, 30);
  }
  return slotsFromTo(date, 20, 0, 23, 30);
}

/** Suite après minuit (créneaux affichés le lendemain calendaire). */
function getMorningContinuationSlotsForDate(date: string): string[] {
  const prevDate = format(addDays(parseISO(`${date}T12:00:00`), -1), "yyyy-MM-dd");
  const prevDow = getDay(parseISO(`${prevDate}T12:00:00`));

  if (isWeekendDay(prevDow)) {
    return slotsFromTo(date, 0, 0, 3, 30);
  }
  return slotsFromTo(date, 0, 0, 0, 0);
}

/** Créneaux 0h–3h30 affichés après le bloc soirée (ex. 00h en bas après 23h30). */
export function sortSlotsForDisplay(timestamps: string[]): string[] {
  const isAfterMidnight = (iso: string) => {
    const h = parseInt(iso.slice(11, 13), 10);
    return h < 4;
  };
  const evening = timestamps.filter((t) => !isAfterMidnight(t)).sort();
  const afterMidnight = timestamps.filter((t) => isAfterMidnight(t)).sort();
  return [...evening, ...afterMidnight];
}

/** Tous les créneaux prévus pour une date calendaire selon les règles staff. */
export function getScheduledSlotStartsForDate(date: string): string[] {
  return sortSlotsForDisplay([
    ...getEveningSlotsForDate(date),
    ...getMorningContinuationSlotsForDate(date),
  ]);
}

export function getScheduleLabelForDate(date: string): string {
  const dow = getDay(parseISO(`${date}T12:00:00`));
  const morning = getMorningContinuationSlotsForDate(date);
  const hasMorning = morning.length > 0;

  if (isWeekendDay(dow)) {
    const base = "Week-end : 16h → 4h (lendemain matin)";
    if (hasMorning) return `${base} · matin 0h–3h30 inclus`;
    return base;
  }
  const base = "Semaine : 20h → 0h30";
  if (hasMorning) return `${base} · matin 0h inclus`;
  return base;
}

export function getUpcomingBookableDates(daysAhead = 21): string[] {
  const today = getTodayParisDateString();
  const dates: string[] = [];
  for (let i = 1; i <= daysAhead; i++) {
    dates.push(format(addDays(parseISO(`${today}T12:00:00`), i), "yyyy-MM-dd"));
  }
  return dates;
}

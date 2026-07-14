"use client";

import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { CalendarCheck, Clock, Globe, Loader2, Mic } from "lucide-react";
import {
  getPreviewAvailableDates,
  getPreviewBooking,
  getPreviewSlotsForDate,
} from "@/lib/interview-preview";
import { getTodayParisDateString } from "@/lib/interview-schedule";

interface InterviewSlot {
  id: string;
  starts_at: string;
}

interface InterviewBooking {
  id: string;
  slot_id: string;
  username: string;
  status?: "pending" | "confirmed" | "cancelled" | "rejected";
  interview_slots?: { starts_at: string };
}

interface InterviewBookingProps {
  showSuccessBanner?: boolean;
  onLogout?: () => void;
  previewMode?: boolean;
  variant?: "whitelist" | "staff" | "legal";
}

const LEGAL_COPY = {
  pendingTitle: "Demande envoyée !",
  confirmedTitle: "Vous êtes inscrit !",
  pendingSubtitle:
    "Votre demande d'entretien dossier légal est en attente de validation.",
  confirmedSubtitle: "Votre entretien dossier légal est confirmé.",
  pendingInfo:
    "Vous recevrez un message Discord dès que votre créneau sera accepté ou refusé par l'équipe légale.",
  confirmedInfo:
    "Rejoignez le salon vocal Discord à l'heure indiquée. Un responsable légal vous attendra pour votre entretien.",
  calendarTitle: "Planifier votre entretien dossier légal",
  calendarSubtitle:
    "Choisissez un créneau pour présenter votre projet de société / activité légale.",
  successBanner:
    "Dossier légal envoyé ! Choisissez votre créneau d'entretien ci-dessous.",
  brandLabel: "Dossier légal NEW LA",
  description:
    "Entretien individuel avec un responsable légal pour valider votre structure RP, votre business plan et la cohérence avec le règlement sociétés.",
};

const STAFF_COPY = {
  pendingTitle: "Demande envoyée !",
  confirmedTitle: "Vous êtes inscrit !",
  pendingSubtitle:
    "Votre demande d'entretien staff est en attente de validation par l'équipe.",
  confirmedSubtitle:
    "Votre entretien de candidature staff est confirmé.",
  pendingInfo:
    "Vous recevrez un message Discord dès que votre créneau sera accepté ou refusé par un gérant staff.",
  confirmedInfo:
    "Rejoignez le salon vocal Discord à l'heure indiquée. Un gérant staff vous attendra pour votre entretien.",
  calendarTitle: "Planifier votre entretien staff",
  calendarSubtitle:
    "Choisissez un créneau pour votre entretien de recrutement staff.",
  successBanner:
    "Dossier staff envoyé ! Choisissez votre créneau d'entretien ci-dessous.",
  brandLabel: "Recrutement NEW LA",
  description:
    "Entretien individuel avec un gérant staff pour discuter de votre candidature, votre expérience en modération et vos disponibilités.",
};

const WHITELIST_COPY = {
  pendingTitle: "Demande envoyée !",
  confirmedTitle: "Vous êtes inscrit !",
  pendingSubtitle:
    "Votre demande d'entretien est en attente de validation par le staff.",
  confirmedSubtitle: "Votre entretien oral background est confirmé.",
  pendingInfo:
    "Vous recevrez un message Discord dès que votre créneau sera accepté ou refusé par l'équipe.",
  confirmedInfo:
    "Rejoignez le salon vocal Discord à l'heure indiquée. Un membre du staff vous attendra pour votre entretien.",
  calendarTitle: "Planifier votre entretien oral",
  calendarSubtitle:
    "Choisissez un créneau pour votre entretien de whitelist.",
  successBanner:
    "Quiz validé ! Le rôle « Quizz validé » a été ajouté. Choisissez votre créneau ci-dessous.",
  brandLabel: "Staff NEW LA",
  description:
    "Entretien individuel avec un membre du staff pour valider votre background RP et finaliser votre accès au serveur.",
};

const VARIANT_COPY = {
  whitelist: WHITELIST_COPY,
  staff: STAFF_COPY,
  legal: LEGAL_COPY,
} as const;

const VARIANT_API_BASE = {
  whitelist: "/api/interviews",
  staff: "/api/staff-interviews",
  legal: "/api/legal-interviews",
} as const;

const ACCENT = "#006BFF";

function formatSlotTime(iso: string) {
  return format(parseISO(iso), "HH:mm", { locale: fr });
}

function formatSlotDate(iso: string) {
  return format(parseISO(iso), "EEEE d MMMM yyyy", { locale: fr });
}

function formatSlotDayHeader(date: Date) {
  return format(date, "EEEE d MMMM", { locale: fr });
}

const calendarFormatters = {
  formatWeekdayName: (date: Date) => {
    const name = format(date, "EEEE", { locale: fr });
    return name.charAt(0).toUpperCase() + name.slice(1);
  },
};

function BrandLogo({ centered = false }: { centered?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2.5 mb-8 ${centered ? "justify-center" : ""}`}
    >
      <img
        src="/logo.png"
        alt="NEW LA"
        width={36}
        height={36}
        className="w-9 h-9 object-contain"
      />
      <span className="font-bold text-white text-lg tracking-tight">NEW LA</span>
    </div>
  );
}

function isLocalhost(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  );
}

async function fetchWithTimeout(
  url: string,
  ms = 8000,
): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export function InterviewBooking({
  showSuccessBanner = false,
  onLogout,
  previewMode = false,
  variant = "whitelist",
}: InterviewBookingProps) {
  const copy = VARIANT_COPY[variant];
  const apiBase = VARIANT_API_BASE[variant];
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<InterviewBooking | null>(null);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [slots, setSlots] = useState<InterviewSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(previewMode);

  useEffect(() => {
    setIsPreview(previewMode || isLocalhost());
  }, [previewMode]);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      setLoading(true);
      const preview = previewMode || isLocalhost();
      try {
        if (preview) {
          setBooking(null);
          setAvailableDates(getPreviewAvailableDates());
          return;
        }

        const [bookingRes, datesRes] = await Promise.all([
          fetchWithTimeout(`${apiBase}/my-booking`),
          fetchWithTimeout(`/api/interviews/slots?kind=${variant}`),
        ]);

        if (cancelled) return;

        if (bookingRes?.ok) {
          const data = await bookingRes.json();
          setBooking(data.booking ?? null);
        }

        if (datesRes?.ok) {
          const data = await datesRes.json();
          setAvailableDates(data.dates ?? []);
        } else {
          setAvailableDates([]);
        }
      } catch {
        if (!cancelled) {
          setBooking(null);
          setAvailableDates([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [previewMode, apiBase, variant]);

  useEffect(() => {
    if (!selectedDate) {
      setSlots([]);
      return;
    }
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    setLoadingSlots(true);
    setSelectedSlotId(null);

    if (isPreview) {
      setSlots(getPreviewSlotsForDate(dateStr));
      setLoadingSlots(false);
      return;
    }

    fetchWithTimeout(`/api/interviews/slots?date=${dateStr}&kind=${variant}`)
      .then((r) => (r?.ok ? r.json() : { slots: [] }))
      .then((data) => setSlots(data.slots ?? []))
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate, isPreview, previewMode, variant]);

  const handleBook = async () => {
    if (!selectedSlotId) return;
    setSubmitting(true);
    setError(null);
    try {
      if (isPreview) {
        const slot = slots.find((s) => s.id === selectedSlotId);
        if (slot) {
          setBooking(getPreviewBooking(slot.starts_at));
        }
        return;
      }
      const res = await fetch(`${apiBase}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId: selectedSlotId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur lors de la réservation.");
        return;
      }
      setBooking(data.booking);
    } catch {
      setError("Erreur réseau.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: ACCENT }} />
      </div>
    );
  }

  if (booking?.interview_slots?.starts_at) {
    const startsAt = booking.interview_slots.starts_at;
    const isPending = booking.status === "pending";
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-neutral-900/80 backdrop-blur rounded-xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="px-8 pt-8 pb-6 text-center border-b border-white/10">
            <BrandLogo centered />
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: `${ACCENT}22` }}
            >
              <CalendarCheck className="w-7 h-7" style={{ color: ACCENT }} />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">
              {isPending ? copy.pendingTitle : copy.confirmedTitle}
            </h2>
            <p className="text-white/50 text-sm">
              {isPending ? copy.pendingSubtitle : copy.confirmedSubtitle}
            </p>
          </div>
          <div className="px-8 py-6 space-y-4">
            <div className="rounded-lg bg-white/5 border border-white/10 p-4">
              <p className="text-xs uppercase tracking-wide text-white/40 mb-1">
                Date
              </p>
              <p className="text-white font-semibold capitalize">
                {formatSlotDate(startsAt)}
              </p>
              <p className="text-white/60 text-sm mt-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {formatSlotTime(startsAt)} · 30 min
              </p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              {isPending ? copy.pendingInfo : copy.confirmedInfo}
            </p>
            {!isPending && (
              <button
                onClick={() =>
                  (window.location.href = "https://discord.gg/newlacity")
                }
                className="w-full text-white py-3 px-6 rounded-full font-semibold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: ACCENT }}
              >
                Rejoindre le Discord
              </button>
            )}
            {onLogout && (
              <button
                onClick={onLogout}
                className="w-full text-white/50 py-2 text-sm hover:text-white"
              >
                Se déconnecter
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex flex-col items-center px-4 py-8">
      {showSuccessBanner && copy.successBanner && (
        <div className="w-full max-w-7xl mb-4 rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-3 text-center">
          <p className="text-green-400 text-sm">{copy.successBanner}</p>
        </div>
      )}

      {isPreview && (
        <div className="w-full max-w-7xl mb-4 rounded-lg bg-blue-500/10 border border-blue-500/20 px-4 py-2 text-center">
          <p className="text-blue-300 text-xs">
            Aperçu localhost — données de démonstration
          </p>
        </div>
      )}

      <div className="w-full max-w-7xl bg-neutral-900/70 backdrop-blur rounded-xl shadow-2xl border border-white/10 overflow-hidden">
        <div className="grid lg:grid-cols-[320px_1fr_320px] min-h-[680px] items-stretch">
          {/* Colonne gauche */}
          <div className="p-10 border-b lg:border-b-0 lg:border-r border-white/10">
            <BrandLogo />

            <p className="text-white/40 text-sm mb-1">{copy.brandLabel}</p>
            <h1 className="text-2xl font-bold text-white mb-6 leading-tight">
              {copy.calendarTitle}
            </h1>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Clock className="w-4 h-4 text-white/30 shrink-0" />
                <span>30 min</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mic className="w-4 h-4 text-white/30 shrink-0" />
                <span>Entretien vocal Discord</span>
              </li>
            </ul>

            <p className="text-white/40 text-sm leading-relaxed mb-4">
              {copy.description}
            </p>
            <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-xs text-white/40 space-y-1">
              <p>Semaine : 20h → 0h30</p>
              <p>Week-end : 16h → 4h</p>
              <p className="text-blue-300/80 pt-1">
                Réservation à partir de demain uniquement.
              </p>
            </div>
          </div>

          {/* Colonne centrale — calendrier */}
          <div className="p-10 border-b lg:border-b-0 lg:border-r border-white/10">
            <h2 className="text-lg font-bold text-white mb-6">
              Sélectionnez une date et une heure
            </h2>

            {availableDates.length === 0 ? (
              <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-6 text-center">
                <p className="text-blue-300 text-sm">
                  Aucun créneau disponible pour le moment. Revenez plus tard ou
                  contactez le staff sur Discord.
                </p>
              </div>
            ) : (
              <>
                <div className="w-full">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    const key = format(date, "yyyy-MM-dd");
                    return (
                      !availableDates.includes(key) ||
                      key <= getTodayParisDateString()
                    );
                  }}
                  modifiers={{
                    available: (date) =>
                      availableDates.includes(format(date, "yyyy-MM-dd")),
                  }}
                  modifiersClassNames={{
                    available:
                      "bg-[#006BFF]/20 text-[#006BFF] font-medium hover:bg-[#006BFF]/30 rounded-full",
                  }}
                  locale={fr}
                  formatters={calendarFormatters}
                  className="w-full p-0"
                  classNames={{
                    months: "flex flex-col w-full",
                    month: "space-y-3 w-full",
                    caption:
                      "flex justify-center relative items-center mb-3 w-full h-10",
                    caption_label: "text-base font-semibold text-white",
                    nav: "flex items-center",
                    nav_button:
                      "h-9 w-9 bg-transparent border border-white/20 text-white rounded-full p-0 opacity-80 hover:opacity-100 inline-flex items-center justify-center shrink-0",
                    nav_button_previous: "absolute left-0",
                    nav_button_next: "absolute right-0",
                    table: "w-full border-collapse",
                    head_row: "flex w-full",
                    head_cell:
                      "text-white/40 flex-1 text-center font-normal text-[0.7rem] leading-tight py-1",
                    row: "flex w-full mt-1",
                    cell: "flex-1 h-11 flex items-center justify-center text-sm p-0 relative",
                    day: "h-10 w-10 p-0 font-normal text-white rounded-full hover:bg-white/10 aria-selected:opacity-100",
                    day_selected:
                      "!bg-[#006BFF] !text-white hover:!bg-[#006BFF] hover:!text-white font-semibold",
                    day_today: "bg-white/10 text-white",
                    day_outside: "text-white/20 opacity-50",
                    day_disabled:
                      "text-white/20 opacity-40 hover:bg-transparent",
                  }}
                />
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-white/40 text-sm">
                    <Globe className="w-4 h-4 shrink-0" />
                    <span>Fuseau horaire</span>
                  </div>
                  <p className="text-white/60 text-sm mt-1 ml-6">
                    Heure de Paris (UTC+1 / UTC+2)
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Colonne droite — créneaux */}
          <div className="p-8 bg-black/20 flex flex-col h-full min-h-[680px] lg:min-h-0">
            {selectedDate ? (
              <>
                <h3 className="text-sm font-semibold text-white capitalize mb-4 shrink-0">
                  {formatSlotDayHeader(selectedDate)}
                </h3>

                {loadingSlots ? (
                  <div className="flex flex-1 items-center justify-center">
                    <Loader2
                      className="w-6 h-6 animate-spin"
                      style={{ color: ACCENT }}
                    />
                  </div>
                ) : slots.length === 0 ? (
                  <p className="text-white/40 text-sm text-center flex-1 flex items-center justify-center">
                    Aucun créneau libre ce jour-là.
                  </p>
                ) : (
                  <div className="flex flex-col flex-1 min-h-0 gap-2 overflow-y-auto pr-1">
                    {slots.map((slot) => {
                      const isSelected = selectedSlotId === slot.id;
                      return (
                        <div key={slot.id} className="flex flex-1 gap-2 min-h-[2.75rem]">
                          <button
                            type="button"
                            onClick={() => setSelectedSlotId(slot.id)}
                            className={`flex-1 h-full py-3 px-4 rounded-md text-sm font-semibold border-2 transition-all ${
                              isSelected
                                ? "border-white bg-white/10 text-white"
                                : "border-white text-white bg-transparent hover:bg-white/10"
                            }`}
                          >
                            {formatSlotTime(slot.starts_at)}
                          </button>
                          {isSelected && (
                            <button
                              type="button"
                              onClick={handleBook}
                              disabled={submitting}
                              className="py-2.5 px-4 rounded-md text-sm font-semibold text-white shrink-0 disabled:opacity-60 flex items-center gap-1.5"
                              style={{ backgroundColor: ACCENT }}
                            >
                              {submitting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                "Confirmer"
                              )}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {error && (
                  <p className="text-red-400 text-xs mt-3 text-center shrink-0">
                    {error}
                  </p>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 min-h-0 text-center">
                <Clock className="w-10 h-10 text-white/20 mb-3" />
                <p className="text-white/40 text-sm">
                  Sélectionnez une date pour voir les horaires disponibles
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-white/25 text-xs mt-6">
        Propulsé par NEW LA · Planification d&apos;entretiens
      </p>
    </div>
  );
}

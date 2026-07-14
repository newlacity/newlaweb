"use client";

import { useCallback, useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarPlus,
  Loader2,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { getPreviewSlotsForDate } from "@/lib/interview-preview";
import { getScheduleLabelForDate } from "@/lib/interview-schedule";

const isDevPreview = process.env.NODE_ENV === "development";

function getPreviewAdminSlots(date: string): SlotWithBooking[] {
  return getPreviewSlotsForDate(date).map((slot, i) => ({
    ...slot,
    is_active: true,
    booking:
      i === 2
        ? { id: "preview-b1", username: "JoueurDemo", user_id: "123456789" }
        : null,
  }));
}

const PREVIEW_BOOKINGS: BookingRow[] = [
  {
    id: "preview-b1",
    username: "JoueurDemo",
    user_id: "123456789",
    interview_slots: {
      starts_at: `${format(new Date(), "yyyy-MM-dd")}T15:00:00`,
    },
  },
];

interface SlotWithBooking {
  id: string;
  starts_at: string;
  is_active: boolean;
  booking: {
    id: string;
    username: string;
    user_id: string;
    status?: string;
  } | null;
}

interface BookingRow {
  id: string;
  username: string;
  user_id: string;
  status?: string;
  interview_slots?: { starts_at: string };
}

type Tab = "slots" | "bookings";

function formatSlot(iso: string) {
  return format(parseISO(iso), "EEE d MMM yyyy · HH:mm", { locale: fr });
}

const calendarFormatters = {
  formatWeekdayName: (date: Date) => {
    const abbr = format(date, "EEE", { locale: fr }).replace(".", "");
    return abbr.charAt(0).toUpperCase() + abbr.slice(1);
  },
};

const panelCalendarClassNames = {
  months: "flex flex-col w-full",
  month: "space-y-4 w-full",
  caption: "flex justify-center relative items-center mb-2 h-10",
  caption_label: "text-base font-semibold text-white capitalize",
  nav: "flex items-center",
  nav_button:
    "h-9 w-9 inline-flex items-center justify-center rounded-lg border border-white/20 bg-transparent text-white opacity-80 hover:opacity-100 hover:bg-white/10 p-0",
  nav_button_previous: "absolute left-0",
  nav_button_next: "absolute right-0",
  table: "w-full border-collapse",
  head_row: "flex w-full mb-1",
  head_cell:
    "text-white/50 flex-1 min-w-0 text-center font-medium text-xs sm:text-sm py-2 px-0.5",
  row: "flex w-full mt-1",
  cell: "flex-1 min-w-0 flex items-center justify-center p-0.5",
  day: "h-10 w-10 max-w-full mx-auto p-0 font-normal text-white rounded-lg hover:bg-white/10 aria-selected:opacity-100",
  day_selected: "bg-[#006BFF] text-white hover:bg-[#006BFF] font-semibold",
  day_today: "bg-white/10 text-white ring-1 ring-white/20",
  day_outside: "text-white/25 opacity-60",
  day_disabled: "text-white/20 opacity-40 hover:bg-transparent",
};

export default function PanelEntretiensPage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminReason, setAdminReason] = useState<string | null>(null);
  const [needsReauth, setNeedsReauth] = useState(false);
  const [tab, setTab] = useState<Tab>("slots");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [slots, setSlots] = useState<SlotWithBooking[]>([]);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [creating, setCreating] = useState(false);
  const [bulkCreating, setBulkCreating] = useState(false);
  const [bulkDays, setBulkDays] = useState(14);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkAdmin = useCallback(async () => {
    if (isDevPreview) {
      setIsAdmin(true);
      setLoading(false);
      return;
    }
    const authRes = await fetch("/api/auth/check");
    if (!authRes.ok) {
      window.location.href = "/api/auth/discord";
      return;
    }
    const adminRes = await fetch("/api/interviews/admin/check");
    if (adminRes.ok) {
      const data = await adminRes.json();
      setIsAdmin(data.isAdmin);
      if (!data.isAdmin && data.reason) {
        setAdminReason(data.reason);
      }
      setNeedsReauth(Boolean(data.needsReauth));
    }
    setLoading(false);
  }, []);

  const loadSlots = useCallback(async (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    if (isDevPreview) {
      setSlots(getPreviewAdminSlots(dateStr));
      return;
    }
    const res = await fetch(
      `/api/interviews/admin/slots?from=${dateStr}&to=${dateStr}`,
    );
    if (res.ok) {
      const data = await res.json();
      setSlots(data.slots ?? []);
    }
  }, []);

  const loadBookings = useCallback(async () => {
    if (isDevPreview) {
      setBookings(PREVIEW_BOOKINGS);
      return;
    }
    const res = await fetch("/api/interviews/admin/bookings");
    if (res.ok) {
      const data = await res.json();
      setBookings(data.bookings ?? []);
    }
  }, []);

  useEffect(() => {
    checkAdmin();
  }, [checkAdmin]);

  useEffect(() => {
    if (isAdmin && tab === "slots") {
      loadSlots(selectedDate);
    }
  }, [isAdmin, tab, selectedDate, loadSlots]);

  useEffect(() => {
    if (isAdmin && tab === "bookings") {
      loadBookings();
    }
  }, [isAdmin, tab, loadBookings]);

  const handleCreateSlots = async () => {
    setCreating(true);
    setMessage(null);
    setError(null);
    try {
      if (isDevPreview) {
        setMessage("8 créneau(x) de 30 min ajouté(s) (aperçu localhost).");
        loadSlots(selectedDate);
        return;
      }
      const res = await fetch("/api/interviews/admin/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: format(selectedDate, "yyyy-MM-dd"),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
        return;
      }
      if (data.message) {
        setMessage(data.message);
      } else {
        setMessage(`${data.created} créneau(x) de 30 min ajouté(s).`);
      }
      loadSlots(selectedDate);
    } finally {
      setCreating(false);
    }
  };

  const handleBulkCreateDates = async () => {
    setBulkCreating(true);
    setMessage(null);
    setError(null);
    try {
      if (isDevPreview) {
        setMessage(
          `${bulkDays} date(s) générée(s) avec créneaux (aperçu localhost).`,
        );
        return;
      }
      const res = await fetch("/api/interviews/admin/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ daysAhead: bulkDays }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
        return;
      }
      setMessage(data.message ?? `${data.created} créneau(x) ajouté(s).`);
      loadSlots(selectedDate);
    } finally {
      setBulkCreating(false);
    }
  };

  const handleDeleteSlot = async (slotId: string) => {
    if (isDevPreview) {
      setSlots((prev) => prev.filter((s) => s.id !== slotId));
      return;
    }
    const res = await fetch(
      `/api/interviews/admin/slots?slotId=${slotId}`,
      { method: "DELETE" },
    );
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Erreur");
      return;
    }
    loadSlots(selectedDate);
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (isDevPreview) {
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      return;
    }
    setMessage(null);
    setError(null);
    const res = await fetch(
      `/api/interviews/admin/bookings?bookingId=${bookingId}`,
      { method: "DELETE" },
    );
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Erreur lors de l'annulation.");
      return;
    }
    if (data.dmSent === false) {
      setError(
        "Réservation annulée, mais le MP Discord n'a pas pu être envoyé (DMs fermés ou bot indisponible).",
      );
    } else {
      setMessage("Réservation annulée — MP envoyé au joueur.");
    }
    loadBookings();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Accès refusé</h1>
          <p className="text-white/60 text-sm mb-6">
            {adminReason ??
              "Vous devez posséder le rôle staff autorisé sur Discord pour accéder à ce panel."}
          </p>
          {needsReauth && (
            <button
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                window.location.href = "/api/auth/discord";
              }}
              className="inline-block bg-[#006BFF] text-white py-2.5 px-6 rounded-lg font-medium hover:bg-[#0052CC]"
            >
              Reconnecter Discord
            </button>
          )}
          {!needsReauth && (
            <a
              href="/api/auth/discord"
              className="inline-block bg-[#006BFF] text-white py-2.5 px-6 rounded-lg font-medium hover:bg-[#0052CC]"
            >
              Se connecter avec Discord
            </a>
          )}
          <p className="text-white/40 text-xs mt-4">
            Panel staff : /panel/entretiens · Rôles : recruteur WL ou gérant staff
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">
          Panel — Entretiens oraux
        </h1>
        <p className="text-white/60 text-sm mb-8">
          Gérez les disponibilités (créneaux de 30 min) et consultez les
          réservations.
        </p>

        {isDevPreview && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-3 mb-6">
            <p className="text-blue-300 text-xs">
              Mode aperçu localhost — données de démonstration, sans connexion
              Discord ni Supabase.
            </p>
          </div>
        )}

        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab("slots")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === "slots"
                ? "bg-[#006BFF] text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <CalendarPlus className="w-4 h-4" />
            Disponibilités
          </button>
          <button
            onClick={() => setTab("bookings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === "bookings"
                ? "bg-[#006BFF] text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <Users className="w-4 h-4" />
            Réservations
          </button>
        </div>

        {tab === "slots" && (
          <div className="space-y-6 lg:space-y-8">
            <div className="bg-[#006BFF]/10 border border-[#006BFF]/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-white font-semibold text-lg mb-2">
                Ajouter des dates
              </h2>
              <p className="text-white/60 text-sm mb-4">
                Génère les créneaux pour plusieurs jours d&apos;un coup (à partir
                de demain). Sans ça, les joueurs ne voient qu&apos;une seule date.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[7, 14, 21, 30].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setBulkDays(days)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      bulkDays === days
                        ? "bg-[#006BFF] text-white"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {days} jours
                  </button>
                ))}
              </div>
              <button
                onClick={handleBulkCreateDates}
                disabled={bulkCreating || creating}
                className="w-full bg-[#006BFF] text-white py-3 rounded-lg font-semibold hover:bg-[#0052CC] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {bulkCreating && <Loader2 className="w-4 h-4 animate-spin" />}
                Ajouter les créneaux pour {bulkDays} jours
              </button>
              {message && (
                <p className="text-green-400 text-sm mt-3">{message}</p>
              )}
              {error && (
                <p className="text-red-400 text-sm mt-3">{error}</p>
              )}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-10">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 lg:p-8 min-w-0">
                <h2 className="text-white font-medium mb-6">Choisir une date</h2>
                <div className="w-full overflow-x-auto">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(d) => d && setSelectedDate(d)}
                    locale={fr}
                    formatters={calendarFormatters}
                    className="w-full min-w-[320px] p-0 pointer-events-auto"
                    classNames={panelCalendarClassNames}
                  />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 lg:p-8 min-w-0 flex flex-col">
                <h2 className="text-white font-medium mb-4">
                  Ajouter des créneaux
                </h2>
                <p className="text-white/50 text-sm mb-4">
                  Date :{" "}
                  <span className="text-white capitalize">
                    {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
                  </span>
                </p>
                <div className="rounded-lg bg-white/5 border border-white/10 p-5 mb-5 space-y-2.5 flex-1">
                  <p className="text-white/70 text-xs font-medium uppercase tracking-wide">
                    Horaires automatiques
                  </p>
                  <p className="text-white/50 text-sm">
                    Semaine (lun–ven) : 20h → 0h30
                  </p>
                  <p className="text-white/50 text-sm">
                    Week-end (sam–dim) : 16h → 4h
                  </p>
                  <p className="text-blue-300 text-sm mt-2">
                    {getScheduleLabelForDate(format(selectedDate, "yyyy-MM-dd"))}
                  </p>
                </div>
                <p className="text-white/40 text-xs mb-4">
                  Créneaux de 30 min générés selon ces plages. Les joueurs ne
                  peuvent pas réserver le jour même.
                </p>
                <button
                  onClick={handleCreateSlots}
                  disabled={creating}
                  className="w-full mt-auto bg-[#006BFF] text-white py-3 rounded-lg font-medium hover:bg-[#0052CC] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {creating && <Loader2 className="w-4 h-4 animate-spin" />}
                  Générer les créneaux
                </button>
                {message && (
                  <p className="text-green-400 text-sm mt-4">{message}</p>
                )}
                {error && (
                  <p className="text-red-400 text-sm mt-4">{error}</p>
                )}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 lg:p-8">
              <h2 className="text-white font-medium mb-4">
                Créneaux du{" "}
                {format(selectedDate, "d MMMM yyyy", { locale: fr })}
              </h2>
              {slots.length === 0 ? (
                <p className="text-white/50 text-sm">Aucun créneau ce jour.</p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {slots.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between gap-3 bg-white/5 rounded-lg px-4 py-3 min-w-0"
                    >
                      <div className="min-w-0">
                        <span className="text-white text-sm block">
                          {format(parseISO(slot.starts_at), "HH:mm")} — 30 min
                        </span>
                        {slot.booking ? (
                          <span
                            className={`text-xs block truncate mt-0.5 ${
                              slot.booking.status === "pending"
                                ? "text-amber-400"
                                : "text-green-400"
                            }`}
                          >
                            {slot.booking.status === "pending"
                              ? "En attente"
                              : "Confirmé"}{" "}
                            · {slot.booking.username}
                          </span>
                        ) : (
                          <span className="text-white/40 text-xs block mt-0.5">
                            Libre
                          </span>
                        )}
                      </div>
                      {!slot.booking && (
                        <button
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "bookings" && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-white font-medium mb-4">
              Toutes les réservations
            </h2>
            {bookings.length === 0 ? (
              <p className="text-white/50 text-sm">Aucune réservation.</p>
            ) : (
              <div className="space-y-2">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3"
                  >
                    <div>
                      <p className="text-white text-sm font-medium">
                        {b.username}
                      </p>
                      <p className="text-white/50 text-xs">
                        {b.interview_slots?.starts_at
                          ? formatSlot(b.interview_slots.starts_at)
                          : "—"}
                        {b.status === "pending" ? " · En attente" : ""}
                      </p>
                      <p className="text-white/30 text-xs">ID: {b.user_id}</p>
                    </div>
                    <button
                      onClick={() => handleCancelBooking(b.id)}
                      className="text-red-400 hover:text-red-300 text-xs px-3 py-1 border border-red-400/30 rounded"
                    >
                      Annuler
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

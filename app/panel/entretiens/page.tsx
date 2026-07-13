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
  booking: { id: string; username: string; user_id: string } | null;
}

interface BookingRow {
  id: string;
  username: string;
  user_id: string;
  interview_slots?: { starts_at: string };
}

type Tab = "slots" | "bookings";

function formatSlot(iso: string) {
  return format(parseISO(iso), "EEE d MMM yyyy · HH:mm", { locale: fr });
}

const calendarFormatters = {
  formatWeekdayName: (date: Date) => {
    const name = format(date, "EEEE", { locale: fr });
    return name.charAt(0).toUpperCase() + name.slice(1);
  },
};

export default function PanelEntretiensPage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tab, setTab] = useState<Tab>("slots");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [slots, setSlots] = useState<SlotWithBooking[]>([]);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [creating, setCreating] = useState(false);
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
      setMessage(`${data.created} créneau(x) de 30 min ajouté(s).`);
      loadSlots(selectedDate);
    } finally {
      setCreating(false);
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
    const res = await fetch(
      `/api/interviews/admin/bookings?bookingId=${bookingId}`,
      { method: "DELETE" },
    );
    if (res.ok) loadBookings();
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
          <p className="text-white/60 text-sm">
            Vous devez posséder le rôle staff autorisé sur Discord pour accéder
            à ce panel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
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
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h2 className="text-white font-medium mb-4">Choisir une date</h2>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(d) => d && setSelectedDate(d)}
                  locale={fr}
                  formatters={calendarFormatters}
                  classNames={{
                    day_selected:
                      "bg-[#006BFF] text-white hover:bg-[#006BFF]",
                    caption_label: "text-white",
                    head_cell: "text-white/50",
                    day: "text-white hover:bg-white/10",
                    nav_button: "text-white border-white/20",
                  }}
                />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-white font-medium mb-4">
                  Ajouter des créneaux
                </h2>
                <p className="text-white/50 text-sm mb-4">
                  Date :{" "}
                  <span className="text-white capitalize">
                    {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
                  </span>
                </p>
                <div className="rounded-lg bg-white/5 border border-white/10 p-4 mb-4 space-y-2">
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
                  className="w-full bg-[#006BFF] text-white py-2.5 rounded-lg font-medium hover:bg-[#0052CC] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {creating && <Loader2 className="w-4 h-4 animate-spin" />}
                  Générer les créneaux
                </button>
                {message && (
                  <p className="text-green-400 text-sm mt-3">{message}</p>
                )}
                {error && (
                  <p className="text-red-400 text-sm mt-3">{error}</p>
                )}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-white font-medium mb-4">
                Créneaux du{" "}
                {format(selectedDate, "d MMMM yyyy", { locale: fr })}
              </h2>
              {slots.length === 0 ? (
                <p className="text-white/50 text-sm">Aucun créneau ce jour.</p>
              ) : (
                <div className="space-y-2">
                  {slots.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3"
                    >
                      <div>
                        <span className="text-white text-sm">
                          {format(parseISO(slot.starts_at), "HH:mm")} — 30 min
                        </span>
                        {slot.booking ? (
                          <span className="text-green-400 text-xs ml-3">
                            Réservé par {slot.booking.username}
                          </span>
                        ) : (
                          <span className="text-white/40 text-xs ml-3">
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

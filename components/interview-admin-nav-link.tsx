"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCog } from "lucide-react";

interface InterviewAdminNavLinkProps {
  className?: string;
  onNavigate?: () => void;
}

export function InterviewAdminNavLink({
  className = "",
  onNavigate,
}: InterviewAdminNavLinkProps) {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/interviews/admin/check")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.isAdmin) {
          setIsAdmin(true);
        }
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (pathname?.startsWith("/panel/entretiens")) return null;
  if (!ready || !isAdmin) return null;

  return (
    <Link
      href="/panel/entretiens"
      onClick={onNavigate}
      className={`text-[#006BFF] hover:text-[#4D94FF] transition-colors duration-300 flex items-center gap-2 font-medium ${className}`}
    >
      <CalendarCog className="w-4 h-4 shrink-0" />
      <span>Panel Entretiens</span>
    </Link>
  );
}

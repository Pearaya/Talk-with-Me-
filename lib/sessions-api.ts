"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "./api";

export type SessionStatus = "PENDING" | "CONFIRMED" | "DONE" | "CANCELLED";

export type CoachingSession = {
  id: string;
  scheduledAt: string;
  durationMin: number;
  status: SessionStatus;
  notes: string | null;
  outcomes: string | null;
  meetingUrl: string | null;
  coach: {
    id: string;
    user: { id: string; name: string; avatarUrl: string | null };
  };
};

type ListResponse = { sessions: CoachingSession[] };
type ReportResponse = {
  stats: { done: number; upcoming: number; total: number };
};

export function useSessions() {
  const [sessions, setSessions] = useState<CoachingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    return api
      .get<ListResponse>("/sessions")
      .then((res) => {
        setSessions(res.sessions);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "โหลดไม่สำเร็จ");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { sessions, loading, error, reload };
}

export function useUpcomingSessions() {
  const [sessions, setSessions] = useState<CoachingSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .get<ListResponse>("/sessions/upcoming")
      .then((res) => {
        if (!cancelled) setSessions(res.sessions);
      })
      .catch(() => {
        if (!cancelled) setSessions([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { sessions, loading };
}

export function useSessionReport() {
  const [stats, setStats] = useState<{ done: number; upcoming: number; total: number } | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .get<ReportResponse>("/sessions/report")
      .then((res) => {
        if (!cancelled) setStats(res.stats);
      })
      .catch(() => {
        if (!cancelled) setStats(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading };
}

export async function cancelSession(id: string) {
  return api.del(`/sessions/${encodeURIComponent(id)}`);
}

export async function updateSession(
  id: string,
  patch: { notes?: string; outcomes?: string; status?: SessionStatus }
) {
  return api.put<{ session: CoachingSession }>(
    `/sessions/${encodeURIComponent(id)}`,
    patch
  );
}

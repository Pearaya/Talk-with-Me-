"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "./api";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: "USER" | "COACH" | "ADMIN";
  status: "PRE" | "MAMA" | "PR" | null;
  createdAt: string;
};

export type AdminCoach = {
  id: string;
  bio: string | null;
  experienceYears: number | null;
  hourlyRate: number | null;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  user: { id: string; name: string; email: string };
};

export type AdminStats = {
  users: number;
  coaches: number;
  sessions: number;
  jobs: number;
};

export function useAdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api
      .get<{ users: AdminUser[] }>("/admin/users")
      .then((res) => {
        if (!cancelled) setUsers(res.users);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "โหลดไม่สำเร็จ");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { users, loading, error };
}

export function useAdminCoaches() {
  const [coaches, setCoaches] = useState<AdminCoach[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    return api
      .get<{ coaches: AdminCoach[] }>("/admin/coaches")
      .then((res) => {
        setCoaches(res.coaches);
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

  return { coaches, loading, error, reload };
}

export function useAdminReports() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api
      .get<{ stats: AdminStats }>("/admin/reports")
      .then((res) => {
        if (!cancelled) setStats(res.stats);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "โหลดไม่สำเร็จ");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading, error };
}

export async function verifyCoach(id: string) {
  return api.put<{ coach: AdminCoach }>(
    `/admin/coaches/${encodeURIComponent(id)}/verify`
  );
}

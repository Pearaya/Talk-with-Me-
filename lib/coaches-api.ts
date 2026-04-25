"use client";

import { useEffect, useState } from "react";
import { api, ApiError } from "./api";

export type Coach = {
  id: string;
  user: { id: string; name: string; avatarUrl: string | null };
  bio: string | null;
  experienceYears: number | null;
  hourlyRate: number | null;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  specialties: string[];
  availability: { slots?: string[] } | null;
};

type ListResponse = { items: Coach[]; pagination: { total: number } };
type DetailResponse = { coach: Coach };

export function useCoaches(query?: { search?: string; skill?: string }) {
  const [items, setItems] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const search = query?.search ? `?search=${encodeURIComponent(query.search)}` : "";
    api
      .get<ListResponse>(`/coaches${search}`)
      .then((res) => {
        if (cancelled) return;
        setItems(res.items);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "โหลดไม่สำเร็จ");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query?.search, query?.skill]);

  return { items, loading, error };
}

export function useCoach(id: string) {
  const [coach, setCoach] = useState<Coach | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api
      .get<DetailResponse>(`/coaches/${encodeURIComponent(id)}`)
      .then((res) => {
        if (cancelled) return;
        setCoach(res.coach);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404) {
          setError("ไม่พบโค้ช");
        } else {
          setError(err instanceof Error ? err.message : "โหลดไม่สำเร็จ");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { coach, loading, error };
}

export async function bookSession(input: {
  coachId: string;
  scheduledAt: string;
  topic?: string;
}) {
  return api.post<{ session: { id: string } }>("/sessions", input);
}

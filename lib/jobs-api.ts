"use client";

import { useEffect, useState } from "react";
import { api, ApiError } from "./api";

export type Job = {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string | null;
  requiredSkills: string[];
  workType: "FULL_TIME" | "PART_TIME" | null;
  industry: string | null;
  location: string | null;
  isActive: boolean;
  postedAt: string;
};

export type MatchedJob = Job & { matchScore: number };

export function useJobs(opts: { matched?: boolean } = {}) {
  const [items, setItems] = useState<MatchedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const path = opts.matched ? "/jobs/matched" : "/jobs";
    api
      .get<{ items: MatchedJob[] }>(path)
      .then((res) => {
        if (cancelled) return;
        // Plain /jobs returns Jobs without matchScore — default to 0
        setItems(res.items.map((j) => ({ ...j, matchScore: j.matchScore ?? 0 })));
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 401 && opts.matched) {
          // Fall back to public list
          api
            .get<{ items: Job[] }>("/jobs")
            .then((res) => {
              if (cancelled) return;
              setItems(res.items.map((j) => ({ ...j, matchScore: 0 })));
            })
            .catch((e) => {
              if (cancelled) return;
              setError(e instanceof Error ? e.message : "โหลดไม่สำเร็จ");
            });
          return;
        }
        setError(err instanceof Error ? err.message : "โหลดไม่สำเร็จ");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [opts.matched]);

  return { items, loading, error };
}

export function useJob(id: string) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api
      .get<{ job: Job }>(`/jobs/${encodeURIComponent(id)}`)
      .then((res) => {
        if (!cancelled) setJob(res.job);
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
  }, [id]);

  return { job, loading, error };
}

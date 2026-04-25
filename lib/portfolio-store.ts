"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { api, ApiError } from "./api";
import {
  Portfolio,
  TemplateId,
  emptyPortfolio,
  samplePortfolio,
} from "./portfolio-types";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

type ApiPortfolio = {
  id: string;
  userId: string;
  templateId: TemplateId;
  content: Omit<Portfolio, "templateId" | "isPublic">;
  isPublic: boolean;
  shareToken: string;
  viewCount: number;
};

type ApiResponse = { portfolio: ApiPortfolio | null };

function toApi(p: Portfolio) {
  const { templateId, isPublic, ...content } = p;
  return { templateId, isPublic, content };
}

function fromApi(api: ApiPortfolio): Portfolio {
  return {
    templateId: api.templateId,
    isPublic: api.isPublic,
    ...api.content,
  };
}

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [shareToken, setShareToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [authRequired, setAuthRequired] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.get<ApiResponse>("/portfolio/me");
        if (cancelled) return;
        if (res.portfolio) {
          setPortfolio(fromApi(res.portfolio));
          setShareToken(res.portfolio.shareToken);
        }
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 401) {
          setAuthRequired(true);
        } else {
          setError(err instanceof Error ? err.message : "โหลดข้อมูลไม่สำเร็จ");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback(async (p: Portfolio) => {
    setSaveStatus("saving");
    setError(null);
    try {
      const res = await api.put<ApiResponse>("/portfolio/me", toApi(p));
      if (res.portfolio) setShareToken(res.portfolio.shareToken);
      setSaveStatus("saved");
      setTimeout(() => {
        setSaveStatus((s) => (s === "saved" ? "idle" : s));
      }, 2000);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setAuthRequired(true);
      }
      setSaveStatus("error");
      setError(err instanceof Error ? err.message : "บันทึกไม่สำเร็จ");
    }
  }, []);

  // Debounced auto-save when caller updates the portfolio object
  const save = useCallback(
    (next: Portfolio) => {
      setPortfolio(next);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        persist(next);
      }, 600);
    },
    [persist]
  );

  // Immediate save (no debounce) — used for create/seed/templateChange
  const saveNow = useCallback(
    async (next: Portfolio) => {
      setPortfolio(next);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      await persist(next);
    },
    [persist]
  );

  const seedSample = useCallback(async () => {
    await saveNow(samplePortfolio());
  }, [saveNow]);

  const createEmpty = useCallback(
    async (templateId: TemplateId = "minimal") => {
      await saveNow({ ...emptyPortfolio(), templateId });
    },
    [saveNow]
  );

  const reset = useCallback(async () => {
    try {
      await api.del("/portfolio/me");
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setAuthRequired(true);
      } else {
        setError(err instanceof Error ? err.message : "ลบไม่สำเร็จ");
        return;
      }
    }
    setPortfolio(null);
    setShareToken(null);
  }, []);

  return {
    portfolio,
    shareToken,
    loading,
    saveStatus,
    error,
    authRequired,
    save,
    seedSample,
    createEmpty,
    reset,
  };
}

export function usePublicPortfolio(token: string) {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ status: number; message: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.get<ApiResponse>(
          `/portfolio/share/${encodeURIComponent(token)}`
        );
        if (cancelled) return;
        if (res.portfolio) setPortfolio(fromApi(res.portfolio));
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError) {
          setError({ status: err.status, message: err.message });
        } else {
          setError({ status: 0, message: err instanceof Error ? err.message : "Unknown error" });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  return { portfolio, loading, error };
}

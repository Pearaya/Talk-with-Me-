"use client";

import { useEffect, useState, useCallback } from "react";
import { Portfolio, samplePortfolio, emptyPortfolio } from "./portfolio-types";

const STORAGE_KEY = "coaching-platform:portfolio:v1";

function readPortfolio(): Portfolio | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Portfolio;
  } catch {
    return null;
  }
}

function writePortfolio(p: Portfolio) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  window.dispatchEvent(new CustomEvent("portfolio:updated"));
}

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPortfolio(readPortfolio());
    setHydrated(true);

    const onUpdate = () => setPortfolio(readPortfolio());
    window.addEventListener("portfolio:updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("portfolio:updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  const save = useCallback((next: Portfolio) => {
    writePortfolio(next);
    setPortfolio(next);
  }, []);

  const reset = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent("portfolio:updated"));
    }
    setPortfolio(null);
  }, []);

  const seedSample = useCallback(() => {
    const p = samplePortfolio();
    writePortfolio(p);
    setPortfolio(p);
  }, []);

  const createEmpty = useCallback(
    (templateId: Portfolio["templateId"] = "minimal") => {
      const p = { ...emptyPortfolio(), templateId };
      writePortfolio(p);
      setPortfolio(p);
    },
    []
  );

  return { portfolio, hydrated, save, reset, seedSample, createEmpty };
}

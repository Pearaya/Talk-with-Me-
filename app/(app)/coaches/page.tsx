"use client";

import Link from "next/link";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useCoaches } from "@/lib/coaches-api";

export default function CoachesPage() {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const { items, loading, error } = useCoaches({ search: debounced });

  const onSearchChange = (v: string) => {
    setSearch(v);
    // simple debounce
    if (typeof window !== "undefined") {
      window.clearTimeout((onSearchChange as unknown as { _t?: number })._t);
      (onSearchChange as unknown as { _t?: number })._t = window.setTimeout(
        () => setDebounced(v),
        300
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <PageHeader
        tag="Find Your Coach"
        title="เลือกโค้ชที่ใช่สำหรับคุณ"
        description="ค้นหาโค้ชจากความเชี่ยวชาญ รีวิว และตารางเวลาที่ตรงกับคุณ"
      />

      <div className="card p-4 mb-6 flex flex-wrap gap-3">
        <input
          className="input flex-1 min-w-[200px]"
          placeholder="🔍 ค้นหาโค้ชจากชื่อ..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {error && (
        <div className="card p-6 text-center text-red-600 mb-4">⚠ {error}</div>
      )}

      {loading ? (
        <div className="text-center text-ink-muted py-12">กำลังโหลด...</div>
      ) : items.length === 0 ? (
        <div className="card p-10 text-center text-ink-muted">
          ไม่พบโค้ชที่ตรงกับเงื่อนไข
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((c) => {
            const initial = c.user.name?.[0]?.toUpperCase() ?? "?";
            return (
              <Link
                key={c.id}
                href={`/coaches/${c.id}`}
                className="card p-5 hover:border-brand transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-full bg-brand text-white font-bold text-xl grid place-items-center">
                    {initial}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold truncate">{c.user.name}</h3>
                    <p className="text-xs text-ink-muted truncate">
                      {c.experienceYears
                        ? `${c.experienceYears} ปี ประสบการณ์`
                        : "Coach"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {c.specialties.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-0.5 bg-brand-light text-brand rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-line">
                  <span className="text-sm">
                    <span className="text-amber-500">★</span>{" "}
                    <span className="font-bold">{c.rating.toFixed(1)}</span>{" "}
                    <span className="text-ink-muted">({c.reviewCount})</span>
                  </span>
                  {c.hourlyRate != null && (
                    <span className="font-bold text-brand">
                      ฿{c.hourlyRate.toLocaleString()}/ชม.
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCoach, bookSession } from "@/lib/coaches-api";
import { useAuth } from "@/lib/auth-store";
import { ApiError } from "@/lib/api";

export default function CoachDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { user } = useAuth();
  const { coach, loading, error } = useCoach(params.id);
  const [booking, setBooking] = useState(false);
  const [bookError, setBookError] = useState<string | null>(null);

  if (loading) {
    return <div className="text-center py-12 text-ink-muted">กำลังโหลด...</div>;
  }
  if (error || !coach) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <div className="text-5xl mb-4">😶</div>
        <h1 className="text-2xl font-bold mb-2">{error ?? "ไม่พบโค้ช"}</h1>
        <Link href="/coaches" className="text-brand font-semibold">
          ← กลับไปหน้ารายชื่อโค้ช
        </Link>
      </div>
    );
  }

  const handleBook = async (slot: string) => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    setBookError(null);
    setBooking(true);
    try {
      // Demo: schedule "tomorrow at noon" since slots are just labels in seed data.
      const scheduledAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      await bookSession({
        coachId: coach.id,
        scheduledAt,
        topic: slot,
      });
      alert("จองสำเร็จ! ไปดูที่หน้า Sessions ได้เลย");
      router.push("/coaching/sessions");
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "จองไม่สำเร็จ ลองใหม่อีกครั้ง";
      setBookError(message);
    } finally {
      setBooking(false);
    }
  };

  const initial = coach.user.name?.[0]?.toUpperCase() ?? "?";
  const slots = coach.availability?.slots ?? [];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <Link
        href="/coaches"
        className="text-sm text-ink-muted hover:text-brand mb-6 inline-block"
      >
        ← กลับไปหน้ารายชื่อโค้ช
      </Link>

      <div className="card p-8 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-brand text-white font-bold text-4xl grid place-items-center flex-shrink-0">
            {initial}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{coach.user.name}</h1>
            {coach.experienceYears != null && (
              <p className="text-ink-muted">{coach.experienceYears} ปี ประสบการณ์</p>
            )}
            <div className="flex items-center gap-4 mt-3 text-sm flex-wrap">
              <span>
                <span className="text-amber-500">★</span>{" "}
                <span className="font-bold">{coach.rating.toFixed(1)}</span>{" "}
                <span className="text-ink-muted">({coach.reviewCount} รีวิว)</span>
              </span>
              {coach.hourlyRate != null && (
                <>
                  <span className="text-ink-muted">·</span>
                  <span className="font-bold text-brand">
                    ฿{coach.hourlyRate.toLocaleString()}/ชม.
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 card p-6">
          <h2 className="font-bold text-lg mb-3">เกี่ยวกับโค้ช</h2>
          <p className="text-ink-muted whitespace-pre-line">
            {coach.bio ?? "ยังไม่มีข้อมูล bio"}
          </p>

          {coach.specialties.length > 0 && (
            <>
              <h3 className="font-bold mt-6 mb-2">ความเชี่ยวชาญ</h3>
              <div className="flex flex-wrap gap-2">
                {coach.specialties.map((s) => (
                  <span
                    key={s}
                    className="text-sm px-3 py-1 bg-brand-light text-brand rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="card p-6">
          <h2 className="font-bold text-lg mb-3">ตารางเวลาว่าง</h2>
          {bookError && (
            <div className="mb-3 p-2 rounded bg-red-50 border border-red-200 text-xs text-red-700">
              {bookError}
            </div>
          )}
          {slots.length === 0 ? (
            <p className="text-sm text-ink-muted">โค้ชยังไม่ได้ระบุตารางเวลา</p>
          ) : (
            <div className="space-y-2">
              {slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => handleBook(slot)}
                  disabled={booking}
                  className="w-full text-left px-4 py-3 rounded-lg border border-line hover:border-brand hover:bg-brand-light text-sm font-semibold disabled:opacity-50"
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

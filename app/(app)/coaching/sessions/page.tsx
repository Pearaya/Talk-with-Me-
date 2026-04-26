"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { useAuth } from "@/lib/auth-store";
import { cancelSession, useSessions } from "@/lib/sessions-api";

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-green-100 text-green-700",
  DONE: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const STATUS_LABEL: Record<string, string> = {
  PENDING: "รออนุมัติ",
  CONFIRMED: "ยืนยันแล้ว",
  DONE: "เสร็จแล้ว",
  CANCELLED: "ยกเลิก",
};

export default function SessionsPage() {
  const { user } = useAuth();
  const { sessions, loading, error, reload } = useSessions();

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold mb-2">กรุณาเข้าสู่ระบบ</h1>
        <Link href="/auth/login" className="btn-primary">
          เข้าสู่ระบบ
        </Link>
      </div>
    );
  }

  const handleCancel = async (id: string) => {
    if (!confirm("ยกเลิก Session นี้?")) return;
    await cancelSession(id);
    await reload();
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
        <PageHeader
          tag="Coaching · Sessions"
          title="ตารางนัดหมาย Session"
          description="ดู Sessions ที่กำลังจะมาถึง + ประวัติที่ผ่านมา"
        />
        <Link href="/coaches" className="btn-primary">
          จองใหม่ →
        </Link>
      </div>

      {loading && <div className="text-center py-12 text-ink-muted">กำลังโหลด...</div>}
      {error && <div className="card p-6 text-center text-red-600">⚠ {error}</div>}

      {!loading && sessions.length === 0 && (
        <div className="card p-10 text-center">
          <div className="text-4xl mb-3">📅</div>
          <p className="font-semibold mb-1">ยังไม่มี Session</p>
          <p className="text-sm text-ink-muted mb-4">
            เริ่มต้นด้วยการเลือกโค้ชและจอง Session แรกของคุณ
          </p>
          <Link href="/coaches" className="btn-primary">
            เลือกโค้ช
          </Link>
        </div>
      )}

      <div className="space-y-3">
        {sessions.map((s) => {
          const date = new Date(s.scheduledAt);
          const dateStr = date.toLocaleDateString("th-TH", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          const timeStr = date.toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const initial = s.coach.user.name?.[0]?.toUpperCase() ?? "?";
          const canCancel = s.status === "PENDING" || s.status === "CONFIRMED";
          return (
            <div key={s.id} className="card p-5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-brand-light text-brand font-bold grid place-items-center flex-shrink-0">
                {initial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{s.coach.user.name}</h3>
                  <span
                    className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                      STATUS_STYLES[s.status] ?? "bg-surface-alt text-ink-muted"
                    }`}
                  >
                    {STATUS_LABEL[s.status] ?? s.status}
                  </span>
                </div>
                <div className="text-sm text-ink-muted mt-1">
                  {dateStr} · {timeStr} · {s.durationMin} นาที
                </div>
                {s.notes && (
                  <div className="text-sm text-ink-muted mt-1 truncate">
                    หัวข้อ: {s.notes}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {canCancel && (
                  <button
                    onClick={() => handleCancel(s.id)}
                    className="text-xs text-red-600 font-semibold hover:underline px-2"
                  >
                    ยกเลิก
                  </button>
                )}
                {s.meetingUrl && (
                  <a
                    href={s.meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary text-sm"
                  >
                    เข้าห้อง ↗
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

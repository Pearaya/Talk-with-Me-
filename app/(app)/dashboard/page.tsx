"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-store";
import {
  useSessionReport,
  useUpcomingSessions,
} from "@/lib/sessions-api";
import { useGoals } from "@/lib/goals-api";

const recommendations = [
  {
    type: "slide" as const,
    icon: "📊",
    title: "People Management Essentials",
    meta: "32 slides · 15 นาที",
    tag: "Leadership",
  },
  {
    type: "video" as const,
    icon: "🎥",
    title: "Difficult Conversations at Work",
    meta: "18 นาที · โดย Coach Paul",
    tag: "Communication",
  },
  {
    type: "podcast" as const,
    icon: "🎙️",
    title: "How to Give Feedback That Works",
    meta: "42 นาที · EP.14",
    tag: "Feedback",
  },
];

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { sessions: upcoming, loading: upcomingLoading } = useUpcomingSessions();
  const { stats } = useSessionReport();
  const { goals } = useGoals();

  if (authLoading) {
    return <div className="p-10 text-center text-ink-muted">กำลังโหลด...</div>;
  }

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

  const firstName = user.name.split(" ")[0];
  const overallProgress =
    goals.length > 0
      ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
      : 0;

  const statCards = [
    {
      label: "Sessions เสร็จแล้ว",
      value: String(stats?.done ?? 0),
      sub: stats ? `จากทั้งหมด ${stats.total}` : "—",
      icon: "✓",
    },
    {
      label: "Goals ทั้งหมด",
      value: String(goals.length),
      sub: `${goals.filter((g) => g.status === "DONE").length} สำเร็จ`,
      icon: "🎯",
    },
    {
      label: "Sessions ใกล้ถึง",
      value: String(stats?.upcoming ?? 0),
      sub: upcoming[0]
        ? new Date(upcoming[0].scheduledAt).toLocaleDateString("th-TH", {
            day: "2-digit",
            month: "short",
          })
        : "ไม่มี",
      icon: "📅",
    },
    {
      label: "Overall Progress",
      value: `${overallProgress}%`,
      sub: goals.length > 0 ? `จาก ${goals.length} goals` : "ยังไม่มี goal",
      icon: "↑",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <div className="tag mb-1">Dashboard</div>
          <h1 className="text-3xl font-bold">สวัสดี, {firstName} 👋</h1>
          <p className="text-ink-muted mt-1">
            ติดตาม Progress และเป้าหมายต่อไปของคุณได้เลย
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/coaches" className="btn-secondary text-sm">
            จอง Session
          </Link>
          <Link href="/jobs" className="btn-primary text-sm">
            ดู Job Match
          </Link>
        </div>
      </div>

      <div className="card p-5 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-sm">Overall Progress</span>
          <span className="font-mono text-sm text-brand">{overallProgress}%</span>
        </div>
        <div className="h-2 rounded-full bg-surface-alt overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-mid to-brand rounded-full"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-start justify-between">
              <span className="text-xs text-ink-muted font-semibold uppercase tracking-wider">
                {s.label}
              </span>
              <span className="w-8 h-8 rounded-lg bg-brand-light text-brand grid place-items-center">
                {s.icon}
              </span>
            </div>
            <div className="text-3xl font-bold mt-2">{s.value}</div>
            <div className="text-xs text-ink-muted mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">Sessions ที่กำลังจะมาถึง</h2>
            <Link
              href="/coaching/sessions"
              className="text-sm text-brand font-semibold hover:underline"
            >
              ดูทั้งหมด →
            </Link>
          </div>
          {upcomingLoading ? (
            <div className="text-center py-6 text-ink-muted text-sm">กำลังโหลด...</div>
          ) : upcoming.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-sm text-ink-muted mb-3">ยังไม่มี Session นัดไว้</p>
              <Link href="/coaches" className="btn-primary text-sm">
                เลือกโค้ช
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-line">
              {upcoming.map((s) => {
                const date = new Date(s.scheduledAt);
                const day = date.toLocaleDateString("th-TH", { day: "2-digit" });
                const time = date.toLocaleTimeString("th-TH", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <div key={s.id} className="py-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-brand-light text-brand font-bold grid place-items-center flex-shrink-0">
                      {day}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">
                        {s.coach.user.name}
                      </div>
                      <div className="text-sm text-ink-muted">
                        {time} · {s.durationMin} นาที
                      </div>
                    </div>
                    <span
                      className={`text-xs font-mono font-semibold px-2 py-1 rounded ${
                        s.status === "CONFIRMED"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {s.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="card p-6">
          <h2 className="font-bold text-lg mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { href: "/coaches", label: "ค้นหาโค้ชใหม่", icon: "🧑‍🏫" },
              { href: "/portfolio/edit", label: "อัปเดต Portfolio", icon: "📁" },
              { href: "/coaching/my-plan", label: "ตั้งเป้าหมายใหม่", icon: "🎯" },
              { href: "/coaching/report", label: "Report สรุป", icon: "📄" },
            ].map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-alt transition-colors"
              >
                <span className="text-xl">{a.icon}</span>
                <span className="font-semibold text-sm">{a.label}</span>
                <span className="ml-auto text-ink-muted">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="tag mb-1">Recommended for You</div>
            <h2 className="font-bold text-xl">เนื้อหาที่แนะนำ</h2>
          </div>
          <Link
            href="/learning/videos"
            className="text-sm text-brand font-semibold hover:underline"
          >
            ดูทั้งหมด →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {recommendations.map((r) => (
            <div
              key={r.title}
              className="card p-5 hover:border-brand transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{r.icon}</span>
                <span className="tag">{r.type}</span>
              </div>
              <h3 className="font-bold mb-1">{r.title}</h3>
              <p className="text-sm text-ink-muted mb-3">{r.meta}</p>
              <span className="inline-block text-xs font-semibold px-2 py-1 rounded bg-brand-light text-brand">
                {r.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

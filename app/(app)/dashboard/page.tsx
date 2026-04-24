import Link from "next/link";
import {
  currentUser,
  stats,
  recommendations,
  upcomingSessions,
} from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <div className="tag mb-1">Dashboard</div>
          <h1 className="text-3xl font-bold">
            สวัสดี, {currentUser.name} 👋
          </h1>
          <p className="text-ink-muted mt-1">
            คุณอยู่ในเส้นทาง Coaching ที่ดี — เหลืออีก 8 sessions เพื่อบรรลุเป้าหมาย
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/coaching/sessions" className="btn-secondary text-sm">
            นัดหมาย Session
          </Link>
          <Link href="/jobs" className="btn-primary text-sm">
            ดู Job Match
          </Link>
        </div>
      </div>

      {/* Progress bar */}
      <div className="card p-5 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-sm">Overall Progress</span>
          <span className="font-mono text-sm text-brand">68%</span>
        </div>
        <div className="h-2 rounded-full bg-surface-alt overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-mid to-brand rounded-full"
            style={{ width: "68%" }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
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

      {/* Two-column */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">Sessions ที่กำลังจะมาถึง</h2>
            <Link href="/coaching/sessions" className="text-sm text-brand font-semibold hover:underline">
              ดูทั้งหมด →
            </Link>
          </div>
          <div className="divide-y divide-line">
            {upcomingSessions.map((s) => (
              <div key={s.id} className="py-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-brand-light text-brand font-bold grid place-items-center flex-shrink-0">
                  {s.date.split(" ")[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{s.topic}</div>
                  <div className="text-sm text-ink-muted">
                    {s.coachName} · {s.time}
                  </div>
                </div>
                <span
                  className={`text-xs font-mono font-semibold px-2 py-1 rounded ${
                    s.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h2 className="font-bold text-lg mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { href: "/coaches", label: "ค้นหาโค้ชใหม่", icon: "🧑‍🏫" },
              { href: "/portfolio/edit", label: "อัปเดต Portfolio", icon: "📁" },
              { href: "/coaching/progress", label: "ดู Progress", icon: "📈" },
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

      {/* Recommendations */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="tag mb-1">Recommended for You</div>
            <h2 className="font-bold text-xl">เนื้อหาที่แนะนำ</h2>
          </div>
          <Link href="/learning/videos" className="text-sm text-brand font-semibold hover:underline">
            ดูทั้งหมด →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {recommendations.map((r) => (
            <div key={r.title} className="card p-5 hover:border-brand transition-colors cursor-pointer">
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

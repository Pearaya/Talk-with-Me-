"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { useAuth } from "@/lib/auth-store";
import { useSessionReport } from "@/lib/sessions-api";
import { useGoals } from "@/lib/goals-api";

export default function ReportPage() {
  const { user } = useAuth();
  const { stats, loading: statsLoading } = useSessionReport();
  const { goals, loading: goalsLoading } = useGoals();

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

  const loading = statsLoading || goalsLoading;
  const doneGoals = goals.filter((g) => g.status === "DONE").length;
  const avgProgress =
    goals.length > 0
      ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
      : 0;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
        <PageHeader
          tag="Coaching · Report"
          title="Report Summary"
          description="สรุปผล Coaching · Export PDF · แชร์ให้ HR"
        />
        <button onClick={() => window.print()} className="btn-secondary">
          📄 Print / PDF
        </button>
      </div>

      {loading && <div className="text-center py-12 text-ink-muted">กำลังโหลด...</div>}

      {!loading && (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Stat label="Sessions เสร็จแล้ว" value={stats?.done ?? 0} icon="✓" />
            <Stat
              label="Sessions ที่กำลังจะมาถึง"
              value={stats?.upcoming ?? 0}
              icon="📅"
            />
            <Stat
              label="Goals สำเร็จ"
              value={`${doneGoals}/${goals.length}`}
              icon="🎯"
            />
            <Stat label="Avg Progress" value={`${avgProgress}%`} icon="↑" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h2 className="font-bold text-lg mb-4">Goals ทั้งหมด</h2>
              {goals.length === 0 ? (
                <p className="text-sm text-ink-muted">ยังไม่มี Goal</p>
              ) : (
                <div className="space-y-3">
                  {goals.map((g) => (
                    <div key={g.id}>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold truncate">{g.title}</span>
                        <span className="font-mono text-ink-muted text-xs">
                          {g.progress}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-surface-alt overflow-hidden mt-1">
                        <div
                          className="h-full bg-brand"
                          style={{ width: `${g.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card p-6">
              <h2 className="font-bold text-lg mb-4">สรุปภาพรวม</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Sessions ทั้งหมด</span>
                  <span className="font-bold">{stats?.total ?? 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">เสร็จแล้ว</span>
                  <span className="font-bold">{stats?.done ?? 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">กำลังจะมาถึง</span>
                  <span className="font-bold">{stats?.upcoming ?? 0}</span>
                </div>
                <div className="border-t border-line pt-3 mt-3">
                  <p className="text-ink-muted">
                    Report นี้สามารถแชร์ให้ HR หรือบริษัท เพื่อแสดงพัฒนาการของคุณ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <span className="text-xs text-ink-muted font-semibold uppercase tracking-wider">
          {label}
        </span>
        <span className="w-8 h-8 rounded-lg bg-brand-light text-brand grid place-items-center">
          {icon}
        </span>
      </div>
      <div className="text-3xl font-bold mt-2">{value}</div>
    </div>
  );
}

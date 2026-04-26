"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { useAuth } from "@/lib/auth-store";
import { useJobs } from "@/lib/jobs-api";

const WORK_TYPE_LABEL: Record<string, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
};

export default function JobsPage() {
  const { user } = useAuth();
  const { items, loading, error } = useJobs({ matched: !!user });

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <PageHeader
        tag="Job Match"
        title="งานที่ Match กับคุณ"
        description="ระบบคัดกรองงานตาม Skills, เป้าหมาย และ Outcome จากการ Coaching"
      />

      {loading && <div className="text-center py-12 text-ink-muted">กำลังโหลด...</div>}
      {error && <div className="card p-6 text-center text-red-600">⚠ {error}</div>}

      {!loading && items.length === 0 && (
        <div className="card p-10 text-center text-ink-muted">
          ยังไม่มีงานในระบบ
        </div>
      )}

      <div className="space-y-4">
        {items.map((j) => (
          <Link
            key={j.id}
            href={`/jobs/${j.id}`}
            className="card p-5 flex flex-col md:flex-row md:items-center gap-4 hover:border-brand transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h3 className="font-bold text-lg">{j.title}</h3>
                {user && j.matchScore > 0 && (
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-green-100 text-green-700">
                    {j.matchScore}% match
                  </span>
                )}
              </div>
              <p className="text-sm text-ink-muted">
                {j.company}
                {j.location && ` · ${j.location}`}
                {j.workType && ` · ${WORK_TYPE_LABEL[j.workType] ?? j.workType}`}
              </p>
              {j.requiredSkills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {j.requiredSkills.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-0.5 bg-surface-alt text-ink rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <span className="btn-primary text-sm">ดูรายละเอียด</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

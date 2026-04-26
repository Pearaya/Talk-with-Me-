"use client";

import Link from "next/link";
import { useJob } from "@/lib/jobs-api";

const WORK_TYPE_LABEL: Record<string, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
};

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const { job, loading, error } = useJob(params.id);

  if (loading) {
    return <div className="text-center py-12 text-ink-muted">กำลังโหลด...</div>;
  }
  if (error || !job) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <div className="text-5xl mb-4">😶</div>
        <h1 className="text-2xl font-bold mb-2">{error ?? "ไม่พบงาน"}</h1>
        <Link href="/jobs" className="text-brand font-semibold">
          ← กลับไปหน้ารายการงาน
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Link
        href="/jobs"
        className="text-sm text-ink-muted hover:text-brand mb-6 inline-block"
      >
        ← กลับไปหน้ารายการงาน
      </Link>

      <div className="card p-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-ink-muted mt-1">
            {job.company}
            {job.location && ` · ${job.location}`}
            {job.workType && ` · ${WORK_TYPE_LABEL[job.workType] ?? job.workType}`}
          </p>
        </div>

        {job.requiredSkills.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-6">
            {job.requiredSkills.map((s) => (
              <span key={s} className="text-xs px-2 py-1 bg-brand-light text-brand rounded">
                {s}
              </span>
            ))}
          </div>
        )}

        <h2 className="font-bold mt-6 mb-2">รายละเอียดงาน</h2>
        <p className="text-ink-muted whitespace-pre-line">{job.description}</p>

        {job.requirements && (
          <>
            <h2 className="font-bold mt-6 mb-2">คุณสมบัติ</h2>
            <p className="text-ink-muted whitespace-pre-line">{job.requirements}</p>
          </>
        )}

        <div className="flex gap-3 mt-8">
          <button className="btn-primary">Apply</button>
          <Link href="/coaches" className="btn-secondary">
            ขอรับคำแนะนำจากโค้ช
          </Link>
        </div>
      </div>
    </div>
  );
}

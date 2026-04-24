import Link from "next/link";
import { notFound } from "next/navigation";
import { jobs } from "@/lib/mock-data";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = jobs.find((j) => j.id === params.id);
  if (!job) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Link href="/jobs" className="text-sm text-ink-muted hover:text-brand mb-6 inline-block">
        ← กลับไปหน้ารายการงาน
      </Link>

      <div className="card p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <p className="text-ink-muted mt-1">
              {job.company} · {job.location}
            </p>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
            {job.matchScore}% match
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-6">
          {job.skills.map((s) => (
            <span key={s} className="text-xs px-2 py-1 bg-brand-light text-brand rounded">
              {s}
            </span>
          ))}
        </div>

        <h2 className="font-bold mt-6 mb-2">รายละเอียดงาน</h2>
        <p className="text-ink-muted">
          รายละเอียดงานเต็มจะแสดงที่นี่ (จะเชื่อมต่อกับ backend ใน Phase ถัดไป)
        </p>

        <div className="flex gap-3 mt-8">
          <button className="btn-primary">Apply</button>
          <button className="btn-secondary">ขอรับคำแนะนำจากโค้ช</button>
        </div>
      </div>
    </div>
  );
}

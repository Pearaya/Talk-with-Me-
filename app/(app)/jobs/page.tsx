import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { jobs } from "@/lib/mock-data";

export default function JobsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <PageHeader
        tag="Job Match"
        title="งานที่ Match กับคุณ"
        description="ระบบคัดกรองงานตาม Skills, เป้าหมาย และ Outcome จากการ Coaching"
      />

      <div className="space-y-4">
        {jobs.map((j) => (
          <Link
            key={j.id}
            href={`/jobs/${j.id}`}
            className="card p-5 flex flex-col md:flex-row md:items-center gap-4 hover:border-brand transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-bold text-lg">{j.title}</h3>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-green-100 text-green-700">
                  {j.matchScore}% match
                </span>
              </div>
              <p className="text-sm text-ink-muted">
                {j.company} · {j.location} · {j.postedAt}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {j.skills.map((s) => (
                  <span key={s} className="text-xs px-2 py-0.5 bg-surface-alt text-ink rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn-ghost text-sm">🔖</button>
              <span className="btn-primary text-sm">ดูรายละเอียด</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { coaches } from "@/lib/mock-data";

export default function CoachesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <PageHeader
        tag="Find Your Coach"
        title="เลือกโค้ชที่ใช่สำหรับคุณ"
        description="ค้นหาโค้ชจากความเชี่ยวชาญ รีวิว และตารางเวลาที่ตรงกับคุณ"
      />

      {/* Filters */}
      <div className="card p-4 mb-6 flex flex-wrap gap-3">
        <input className="input flex-1 min-w-[200px]" placeholder="🔍 ค้นหาโค้ช หรือทักษะ..." />
        <select className="input max-w-[180px]"><option>ทักษะทั้งหมด</option></select>
        <select className="input max-w-[150px]"><option>ราคา</option></select>
        <select className="input max-w-[150px]"><option>Rating</option></select>
      </div>

      {/* Coach cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {coaches.map((c) => (
          <Link
            key={c.id}
            href={`/coaches/${c.id}`}
            className="card p-5 hover:border-brand transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-full bg-brand text-white font-bold text-xl grid place-items-center">
                {c.initial}
              </div>
              <div>
                <h3 className="font-bold">{c.name}</h3>
                <p className="text-xs text-ink-muted">{c.title}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {c.specialties.map((s) => (
                <span key={s} className="text-xs px-2 py-0.5 bg-brand-light text-brand rounded">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-line">
              <span className="text-sm">
                <span className="text-amber-500">★</span>{" "}
                <span className="font-bold">{c.rating}</span>{" "}
                <span className="text-ink-muted">({c.reviewCount})</span>
              </span>
              <span className="font-bold text-brand">฿{c.hourlyRate.toLocaleString()}/ชม.</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

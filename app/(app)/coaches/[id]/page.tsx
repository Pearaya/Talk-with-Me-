import Link from "next/link";
import { notFound } from "next/navigation";
import { coaches } from "@/lib/mock-data";

export default function CoachDetailPage({ params }: { params: { id: string } }) {
  const coach = coaches.find((c) => c.id === params.id);
  if (!coach) return notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <Link href="/coaches" className="text-sm text-ink-muted hover:text-brand mb-6 inline-block">
        ← กลับไปหน้ารายชื่อโค้ช
      </Link>

      <div className="card p-8 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-brand text-white font-bold text-4xl grid place-items-center flex-shrink-0">
            {coach.initial}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{coach.name}</h1>
            <p className="text-ink-muted">{coach.title}</p>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <span>
                <span className="text-amber-500">★</span>{" "}
                <span className="font-bold">{coach.rating}</span>{" "}
                <span className="text-ink-muted">({coach.reviewCount} รีวิว)</span>
              </span>
              <span className="text-ink-muted">·</span>
              <span className="font-bold text-brand">฿{coach.hourlyRate.toLocaleString()}/ชม.</span>
            </div>
          </div>
          <button className="btn-primary">จอง Session</button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 card p-6">
          <h2 className="font-bold text-lg mb-3">เกี่ยวกับโค้ช</h2>
          <p className="text-ink-muted">
            ข้อมูลรายละเอียดเกี่ยวกับโค้ช ประสบการณ์ ความเชี่ยวชาญ และแนวทางการโค้ช
            จะแสดงในส่วนนี้ (จะเชื่อมต่อกับ backend ใน Phase ถัดไป)
          </p>

          <h3 className="font-bold mt-6 mb-2">ความเชี่ยวชาญ</h3>
          <div className="flex flex-wrap gap-2">
            {coach.specialties.map((s) => (
              <span key={s} className="text-sm px-3 py-1 bg-brand-light text-brand rounded-full">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-bold text-lg mb-3">ตารางเวลาว่าง</h2>
          <p className="text-sm text-ink-muted mb-4">เลือกเวลาที่สะดวก</p>
          <div className="space-y-2">
            {["จันทร์ 28 เม.ย. · 14:00", "อังคาร 29 เม.ย. · 10:00", "พฤหัส 1 พ.ค. · 16:00"].map((t) => (
              <button key={t} className="w-full text-left px-4 py-3 rounded-lg border border-line hover:border-brand hover:bg-brand-light text-sm font-semibold">
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

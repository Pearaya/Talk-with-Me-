import Link from "next/link";
import { PublicHeader } from "@/components/PublicHeader";

const features = [
  {
    icon: "🎯",
    title: "1-on-1 Coaching",
    desc: "จับคู่กับโค้ชที่เข้าใจเป้าหมายของคุณ ออกแบบแผนพัฒนาเฉพาะตัว",
  },
  {
    icon: "📊",
    title: "ติดตาม Progress",
    desc: "วัดผลทักษะที่พัฒนา พร้อม Report สรุปผลส่งให้ HR ได้",
  },
  {
    icon: "💼",
    title: "Job Match",
    desc: "ระบบ match งานตาม Skills และเป้าหมาย พร้อมคำแนะนำจากโค้ช",
  },
  {
    icon: "📁",
    title: "Portfolio ที่พร้อมใช้",
    desc: "สร้าง Portfolio จากผลงานและ Outcome จากการ Coaching",
  },
];

const steps = [
  { n: "01", title: "สมัครและทำ Onboarding", desc: "กรอก Profile, Skills, เป้าหมายที่ต้องการพัฒนา" },
  { n: "02", title: "เลือกโค้ชที่ใช่", desc: "ดูโปรไฟล์, ความเชี่ยวชาญ, รีวิว แล้วจอง Session" },
  { n: "03", title: "เรียนรู้และติดตามผล", desc: "ทำ Session + ดูเนื้อหาแนะนำ + อัปเดต Progress" },
  { n: "04", title: "ได้ Portfolio + โอกาสงาน", desc: "สร้าง Portfolio จากผลงาน รับ Job Match ที่ตรงใจ" },
];

export default function LandingPage() {
  return (
    <>
      <PublicHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-light/60 to-surface" />
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
          <div className="tag mb-4">Management Coaching Platform</div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-[1.1]">
            พัฒนาทักษะ <span className="text-brand">Management</span>
            <br />
            กับโค้ชตัวจริง
          </h1>
          <p className="text-lg text-ink-muted mt-6 max-w-xl mx-auto">
            แพลตฟอร์ม Coaching สำหรับคน Pre / Mama / PR
            ที่อยากก้าวหน้าในสายงาน Management ด้วยแผนเฉพาะตัวและโค้ชที่เข้าใจคุณ
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/auth/register" className="btn-primary text-base px-6 py-3">
              เริ่มต้นใช้งานฟรี
            </Link>
            <Link href="/coaches" className="btn-secondary text-base px-6 py-3">
              ดูโค้ชทั้งหมด
            </Link>
          </div>
          <div className="mt-14 flex items-center justify-center gap-12 text-sm text-ink-muted">
            <div>
              <div className="text-2xl font-bold text-ink">120+</div>
              <div>โค้ชพร้อมให้คำปรึกษา</div>
            </div>
            <div className="w-px h-10 bg-line" />
            <div>
              <div className="text-2xl font-bold text-ink">3,500+</div>
              <div>Session สำเร็จ</div>
            </div>
            <div className="w-px h-10 bg-line hidden sm:block" />
            <div className="hidden sm:block">
              <div className="text-2xl font-bold text-ink">92%</div>
              <div>ได้งานใหม่ภายใน 6 เดือน</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="tag mb-2">Features</div>
          <h2 className="text-3xl font-bold">ทุกอย่างที่คุณต้องการในที่เดียว</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div key={f.title} className="card p-6">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-ink-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-ink text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="tag mb-2">How It Works</div>
            <h2 className="text-3xl font-bold">เริ่มต้นใน 4 ขั้นตอน</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="relative">
                <div className="font-mono text-brand-mid text-sm mb-3">{s.n}</div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-white/60">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-3">พร้อมเริ่มก้าวต่อไปหรือยัง?</h2>
        <p className="text-ink-muted mb-8">สมัครฟรี ไม่มีค่าใช้จ่ายแอบแฝง</p>
        <Link href="/auth/register" className="btn-primary text-base px-6 py-3">
          สมัครสมาชิกเลย
        </Link>
      </section>

      <footer className="bg-ink text-ink-muted py-8 text-center font-mono text-xs">
        Coaching Platform · v0.1 · Phase 1 Scaffold
      </footer>
    </>
  );
}

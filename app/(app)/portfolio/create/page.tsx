"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { usePortfolio } from "@/lib/portfolio-store";
import { useAuth } from "@/lib/auth-store";
import { TemplateId } from "@/lib/portfolio-types";

const templates: { id: TemplateId; name: string; desc: string; accent: string }[] = [
  {
    id: "minimal",
    name: "Minimal",
    desc: "เรียบง่าย เน้นเนื้อหา เหมาะกับงาน academic, research, consulting",
    accent: "bg-surface-alt text-ink",
  },
  {
    id: "bold",
    name: "Bold",
    desc: "สะดุดตา มีสีสัน เหมาะกับสายงาน design, marketing, leadership",
    accent: "bg-gradient-to-br from-brand to-brand-mid text-white",
  },
  {
    id: "modern",
    name: "Modern",
    desc: "มีโครงสร้างชัดเจน มี Sidebar เหมาะกับ PM, Engineer, Manager",
    accent: "bg-ink text-white",
  },
];

export default function CreatePortfolioPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { portfolio, loading, authRequired, createEmpty, seedSample } = usePortfolio();
  const [busy, setBusy] = useState(false);

  if (authLoading || loading) {
    return <div className="p-10 text-center text-ink-muted">กำลังโหลด...</div>;
  }

  if (!user || authRequired) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold mb-2">กรุณาเข้าสู่ระบบ</h1>
        <p className="text-ink-muted mb-6">
          คุณต้องเข้าสู่ระบบก่อน จึงจะสร้าง Portfolio ได้
        </p>
        <Link href="/auth/login" className="btn-primary">เข้าสู่ระบบ</Link>
      </div>
    );
  }

  const handlePick = async (id: TemplateId) => {
    setBusy(true);
    await createEmpty(id);
    router.push("/portfolio/edit");
  };

  const handleSample = async () => {
    setBusy(true);
    await seedSample();
    router.push("/portfolio/edit");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <PageHeader
        tag="Portfolio · Create"
        title="เลือก Template"
        description="เลือกรูปแบบที่ใช่สำหรับคุณ เปลี่ยนได้ทีหลัง"
      />

      {portfolio && (
        <div className="card p-4 mb-6 flex items-center justify-between">
          <div>
            <div className="font-semibold">คุณมี Portfolio อยู่แล้ว</div>
            <div className="text-sm text-ink-muted">
              Template ปัจจุบัน: {portfolio.templateId}
            </div>
          </div>
          <button
            onClick={() => router.push("/portfolio/edit")}
            className="btn-primary text-sm"
          >
            แก้ไขต่อ →
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-5 mb-8">
        {templates.map((t) => (
          <button
            key={t.id}
            type="button"
            disabled={busy}
            onClick={() => handlePick(t.id)}
            className="card overflow-hidden text-left hover:border-brand hover:shadow-lg transition-all group disabled:opacity-50"
          >
            <div className={`h-40 ${t.accent} grid place-items-center relative`}>
              <div className="font-mono text-xs tracking-widest opacity-70 absolute top-3 left-3">
                {t.id.toUpperCase()}
              </div>
              <div className="text-3xl font-bold">{t.name}</div>
            </div>
            <div className="p-5">
              <p className="text-sm text-ink-muted mb-3">{t.desc}</p>
              <span className="text-sm font-semibold text-brand group-hover:underline">
                {busy ? "กำลังสร้าง..." : "เริ่มใช้ Template นี้ →"}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="card p-6 bg-brand-light/50 border-brand/20">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="font-bold">อยากดูตัวอย่างก่อน?</div>
            <div className="text-sm text-ink-muted">
              โหลดข้อมูลตัวอย่าง เพื่อดูว่า Portfolio ที่สมบูรณ์หน้าตาเป็นยังไง
            </div>
          </div>
          <button onClick={handleSample} disabled={busy} className="btn-secondary disabled:opacity-50">
            {busy ? "กำลังโหลด..." : "โหลดตัวอย่าง"}
          </button>
        </div>
      </div>
    </div>
  );
}

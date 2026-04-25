"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { usePortfolio } from "@/lib/portfolio-store";
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
  const { portfolio, createEmpty, seedSample } = usePortfolio();

  const handlePick = (id: TemplateId) => {
    createEmpty(id);
    router.push("/portfolio/edit");
  };

  const handleSample = () => {
    seedSample();
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
            onClick={() => handlePick(t.id)}
            className="card overflow-hidden text-left hover:border-brand hover:shadow-lg transition-all group"
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
                เริ่มใช้ Template นี้ →
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
          <button onClick={handleSample} className="btn-secondary">
            โหลดตัวอย่าง
          </button>
        </div>
      </div>
    </div>
  );
}

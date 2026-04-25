"use client";

import { useState } from "react";
import Link from "next/link";
import { usePortfolio, SaveStatus } from "@/lib/portfolio-store";
import { useAuth } from "@/lib/auth-store";
import { PortfolioRender } from "@/components/portfolio/PortfolioRender";
import {
  HeaderSection,
  AboutSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
  OutcomesSection,
  ContactSection,
  SettingsSection,
} from "@/components/portfolio/EditorSections";

const tabs = [
  { id: "header", label: "Header" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "outcomes", label: "Outcomes" },
  { id: "contact", label: "Contact" },
  { id: "settings", label: "Settings" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function EditPortfolioPage() {
  const { user, loading: authLoading } = useAuth();
  const {
    portfolio,
    shareToken,
    loading,
    saveStatus,
    error,
    authRequired,
    save,
    reset,
  } = usePortfolio();
  const [tab, setTab] = useState<TabId>("header");
  const [previewMode, setPreviewMode] = useState(false);

  if (authLoading || loading) {
    return <div className="p-10 text-center text-ink-muted">กำลังโหลด...</div>;
  }

  if (!user || authRequired) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold mb-2">กรุณาเข้าสู่ระบบ</h1>
        <Link href="/auth/login" className="btn-primary">เข้าสู่ระบบ</Link>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="text-5xl mb-4">📁</div>
        <h1 className="text-2xl font-bold mb-2">ยังไม่มี Portfolio</h1>
        <p className="text-ink-muted mb-6">เริ่มสร้าง Portfolio แรกของคุณได้เลย</p>
        <Link href="/portfolio/create" className="btn-primary">
          สร้าง Portfolio
        </Link>
      </div>
    );
  }

  const renderTab = () => {
    switch (tab) {
      case "header":
        return <HeaderSection p={portfolio} set={save} />;
      case "about":
        return <AboutSection p={portfolio} set={save} />;
      case "experience":
        return <ExperienceSection p={portfolio} set={save} />;
      case "projects":
        return <ProjectsSection p={portfolio} set={save} />;
      case "skills":
        return <SkillsSection p={portfolio} set={save} />;
      case "outcomes":
        return <OutcomesSection p={portfolio} set={save} />;
      case "contact":
        return <ContactSection p={portfolio} set={save} />;
      case "settings":
        return <SettingsSection p={portfolio} set={save} />;
    }
  };

  const publicHref = shareToken ? `/portfolio/view/${shareToken}` : null;

  if (previewMode) {
    return (
      <div>
        <div className="bg-ink text-white py-3 px-6 flex items-center justify-between gap-4 sticky top-14 z-30">
          <div className="text-sm font-semibold">👁 โหมด Preview</div>
          <div className="flex gap-2">
            {publicHref && (
              <Link
                href={publicHref}
                target="_blank"
                className="text-sm px-3 py-1.5 rounded bg-white/10 hover:bg-white/20"
              >
                เปิดหน้าเต็ม ↗
              </Link>
            )}
            <button
              onClick={() => setPreviewMode(false)}
              className="text-sm px-3 py-1.5 rounded bg-brand hover:bg-brand/90"
            >
              กลับไปแก้ไข
            </button>
          </div>
        </div>
        <PortfolioRender portfolio={portfolio} />
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[minmax(0,520px)_1fr] min-h-[calc(100vh-3.5rem)]">
      {/* Editor */}
      <section className="border-r border-line bg-white flex flex-col">
        <div className="px-6 py-4 border-b border-line flex items-center justify-between">
          <div>
            <div className="tag">Portfolio Editor</div>
            <h1 className="text-xl font-bold">แก้ไข Portfolio</h1>
          </div>
          <button
            onClick={() => setPreviewMode(true)}
            className="btn-primary text-sm lg:hidden"
          >
            Preview
          </button>
        </div>

        <nav className="px-6 pt-4 flex gap-1 overflow-x-auto border-b border-line">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-2 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                tab === t.id
                  ? "border-brand text-brand"
                  : "border-transparent text-ink-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="p-6 flex-1 overflow-y-auto">{renderTab()}</div>

        <div className="px-6 py-4 border-t border-line flex items-center justify-between bg-surface-alt/50">
          <SaveIndicator status={saveStatus} error={error} />
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (confirm("ลบ Portfolio ทั้งหมด?")) reset();
              }}
              className="text-xs text-red-600 font-semibold hover:underline"
            >
              ลบทิ้ง
            </button>
            {publicHref && (
              <Link href={publicHref} target="_blank" className="btn-secondary text-sm">
                เปิด Public View ↗
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Preview */}
      <section className="bg-surface-alt hidden lg:block overflow-y-auto">
        <div className="sticky top-14 z-10 bg-surface-alt/95 backdrop-blur border-b border-line px-6 py-3 flex items-center justify-between">
          <span className="text-xs font-mono tracking-widest uppercase text-ink-muted">
            Live Preview · {portfolio.templateId}
          </span>
          <span className="text-xs text-ink-muted">
            {portfolio.isPublic ? "🌐 Public" : "🔒 Private"}
          </span>
        </div>
        <div className="p-6">
          <div className="rounded-xl overflow-hidden shadow-card border border-line bg-white">
            <PortfolioRender portfolio={portfolio} />
          </div>
        </div>
      </section>
    </div>
  );
}

function SaveIndicator({ status, error }: { status: SaveStatus; error: string | null }) {
  if (status === "saving") return <span className="text-xs text-ink-muted">⏳ กำลังบันทึก...</span>;
  if (status === "saved") return <span className="text-xs text-green-600 font-semibold">✓ บันทึกแล้ว</span>;
  if (status === "error") return <span className="text-xs text-red-600 font-semibold">⚠ {error ?? "บันทึกไม่สำเร็จ"}</span>;
  return <span className="text-xs text-ink-muted">บันทึกอัตโนมัติเมื่อแก้ไข</span>;
}

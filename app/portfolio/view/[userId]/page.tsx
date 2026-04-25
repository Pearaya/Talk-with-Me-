"use client";

import Link from "next/link";
import { usePortfolio } from "@/lib/portfolio-store";
import { PortfolioRender } from "@/components/portfolio/PortfolioRender";

export default function PublicPortfolioPage({
  params,
}: {
  params: { userId: string };
}) {
  const { portfolio, hydrated } = usePortfolio();

  if (!hydrated) {
    return (
      <div className="min-h-screen grid place-items-center text-ink-muted">
        กำลังโหลด...
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-center max-w-md px-6">
          <div className="text-5xl mb-4">😶</div>
          <h1 className="text-2xl font-bold mb-2">ไม่พบ Portfolio</h1>
          <p className="text-ink-muted mb-6">
            ยังไม่มีข้อมูล Portfolio สำหรับ <code>{params.userId}</code>
          </p>
          <Link href="/portfolio/create" className="btn-primary">
            สร้าง Portfolio
          </Link>
        </div>
      </div>
    );
  }

  if (!portfolio.isPublic && params.userId !== "me") {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-center max-w-md px-6">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold mb-2">Portfolio นี้เป็นส่วนตัว</h1>
          <p className="text-ink-muted">
            เจ้าของยังไม่ได้เปิดให้คนอื่นดู
          </p>
        </div>
      </div>
    );
  }

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-surface-alt">
      {/* Floating action bar */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-line">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
            <div className="w-6 h-6 rounded bg-brand grid place-items-center text-white font-mono text-xs font-bold">
              C
            </div>
            Coaching Platform
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (shareUrl) {
                  navigator.clipboard.writeText(shareUrl);
                  alert("คัดลอกลิงก์แล้ว!");
                }
              }}
              className="text-xs font-semibold px-3 py-1.5 rounded hover:bg-surface-alt"
            >
              🔗 คัดลอกลิงก์
            </button>
            <button
              onClick={() => window.print()}
              className="text-xs font-semibold px-3 py-1.5 rounded hover:bg-surface-alt"
            >
              📄 Print / PDF
            </button>
          </div>
        </div>
      </div>

      <PortfolioRender portfolio={portfolio} />

      <footer className="py-6 text-center text-xs font-mono text-ink-muted">
        Made with Coaching Platform
      </footer>
    </div>
  );
}

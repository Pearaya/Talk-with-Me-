"use client";

import Link from "next/link";
import { usePublicPortfolio } from "@/lib/portfolio-store";
import { PortfolioRender } from "@/components/portfolio/PortfolioRender";

export default function PublicPortfolioPage({
  params,
}: {
  params: { userId: string };
}) {
  const { portfolio, loading, error } = usePublicPortfolio(params.userId);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-ink-muted">
        กำลังโหลด...
      </div>
    );
  }

  if (error) {
    const isPrivate = error.status === 403;
    const isMissing = error.status === 404;
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-center max-w-md px-6">
          <div className="text-5xl mb-4">{isPrivate ? "🔒" : isMissing ? "😶" : "⚠️"}</div>
          <h1 className="text-2xl font-bold mb-2">
            {isPrivate
              ? "Portfolio นี้เป็นส่วนตัว"
              : isMissing
              ? "ไม่พบ Portfolio"
              : "เกิดข้อผิดพลาด"}
          </h1>
          <p className="text-ink-muted">
            {isPrivate
              ? "เจ้าของยังไม่ได้เปิดให้คนอื่นดู"
              : error.message}
          </p>
        </div>
      </div>
    );
  }

  if (!portfolio) return null;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-surface-alt">
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

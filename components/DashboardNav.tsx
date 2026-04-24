"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const items = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/coaches", label: "โค้ช" },
  { href: "/jobs", label: "งาน" },
  { href: "/coaching/my-plan", label: "Coaching" },
  { href: "/learning/videos", label: "เรียนรู้" },
  { href: "/portfolio/edit", label: "Portfolio" },
];

export function DashboardNav() {
  const pathname = usePathname();
  return (
    <header className="border-b border-line bg-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-8">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-brand grid place-items-center text-white font-mono text-xs font-bold">
            C
          </div>
          <span className="font-bold">Coaching</span>
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto">
          {items.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "px-3 py-1.5 rounded-md text-sm font-semibold whitespace-nowrap transition-colors",
                  active
                    ? "bg-brand-light text-brand"
                    : "text-ink-muted hover:text-ink hover:bg-surface-alt"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <button className="w-9 h-9 rounded-full bg-surface-alt grid place-items-center hover:bg-brand-light transition-colors" aria-label="notifications">
            <span className="text-sm">🔔</span>
          </button>
          <button className="w-9 h-9 rounded-full bg-brand text-white font-semibold text-sm" aria-label="profile">
            ก
          </button>
        </div>
      </div>
    </header>
  );
}

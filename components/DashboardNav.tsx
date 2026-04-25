"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { useAuth } from "@/lib/auth-store";

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
  const router = useRouter();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    router.push("/");
  };

  const initial = user?.name?.[0]?.toUpperCase() ?? "?";

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
          <button
            className="w-9 h-9 rounded-full bg-surface-alt grid place-items-center hover:bg-brand-light transition-colors"
            aria-label="notifications"
          >
            <span className="text-sm">🔔</span>
          </button>
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="w-9 h-9 rounded-full bg-brand text-white font-semibold text-sm hover:opacity-90"
              aria-label="profile menu"
            >
              {initial}
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 card overflow-hidden text-sm">
                {user ? (
                  <>
                    <div className="px-4 py-3 border-b border-line">
                      <div className="font-semibold truncate">{user.name}</div>
                      <div className="text-xs text-ink-muted truncate">{user.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 hover:bg-surface-alt text-red-600 font-semibold"
                    >
                      ออกจากระบบ
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 hover:bg-surface-alt text-brand font-semibold"
                  >
                    เข้าสู่ระบบ
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid md:grid-cols-[240px_1fr]">
      <aside className="bg-ink text-white p-6 space-y-1">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-brand grid place-items-center text-white font-mono text-sm font-bold">
            C
          </div>
          <div>
            <div className="font-bold text-sm">Coaching</div>
            <div className="text-xs text-white/50 font-mono">ADMIN</div>
          </div>
        </Link>
        {[
          { href: "/admin", label: "Overview" },
          { href: "/admin/users", label: "Users" },
          { href: "/admin/coaches", label: "Coaches" },
          { href: "/admin/reports", label: "Reports" },
        ].map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10"
          >
            {i.label}
          </Link>
        ))}
      </aside>
      <main>{children}</main>
    </div>
  );
}

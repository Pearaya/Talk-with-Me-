"use client";

import Link from "next/link";
import { AdminGuard } from "@/components/AdminGuard";
import { useAdminReports } from "@/lib/admin-api";

export default function AdminHome() {
  return (
    <AdminGuard>
      <Inner />
    </AdminGuard>
  );
}

function Inner() {
  const { stats, loading, error } = useAdminReports();

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="tag mb-1">Admin</div>
        <h1 className="text-3xl font-bold">Overview</h1>
      </div>

      {loading && <div className="text-center py-12 text-ink-muted">กำลังโหลด...</div>}
      {error && <div className="card p-6 text-center text-red-600">⚠ {error}</div>}

      {stats && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card label="Users" value={stats.users} icon="👥" href="/admin/users" />
          <Card label="Coaches" value={stats.coaches} icon="🧑‍🏫" href="/admin/coaches" />
          <Card label="Sessions" value={stats.sessions} icon="📅" href="/admin/reports" />
          <Card label="Jobs" value={stats.jobs} icon="💼" href="/admin/reports" />
        </div>
      )}
    </div>
  );
}

function Card({
  label,
  value,
  icon,
  href,
}: {
  label: string;
  value: number;
  icon: string;
  href: string;
}) {
  return (
    <Link href={href} className="card p-5 hover:border-brand transition-colors">
      <div className="flex items-start justify-between">
        <span className="text-xs text-ink-muted font-semibold uppercase tracking-wider">
          {label}
        </span>
        <span className="w-8 h-8 rounded-lg bg-brand-light text-brand grid place-items-center">
          {icon}
        </span>
      </div>
      <div className="text-3xl font-bold mt-2">{value}</div>
    </Link>
  );
}

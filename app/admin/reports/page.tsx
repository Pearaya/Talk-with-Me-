"use client";

import { AdminGuard } from "@/components/AdminGuard";
import { useAdminReports } from "@/lib/admin-api";

export default function AdminReports() {
  return (
    <AdminGuard>
      <Inner />
    </AdminGuard>
  );
}

function Inner() {
  const { stats, loading, error } = useAdminReports();

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="tag mb-1">Admin · Reports</div>
        <h1 className="text-3xl font-bold">System Reports</h1>
      </div>

      {loading && <div className="text-center py-12 text-ink-muted">กำลังโหลด...</div>}
      {error && <div className="card p-6 text-center text-red-600">⚠ {error}</div>}

      {stats && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat label="Total Users" value={stats.users} />
          <Stat label="Total Coaches" value={stats.coaches} />
          <Stat label="Total Sessions" value={stats.sessions} />
          <Stat label="Active Jobs" value={stats.jobs} />
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card p-5">
      <div className="text-xs text-ink-muted font-semibold uppercase tracking-wider">
        {label}
      </div>
      <div className="text-3xl font-bold mt-2">{value.toLocaleString()}</div>
    </div>
  );
}

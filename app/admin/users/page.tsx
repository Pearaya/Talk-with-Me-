"use client";

import { AdminGuard } from "@/components/AdminGuard";
import { useAdminUsers } from "@/lib/admin-api";

const ROLE_STYLE: Record<string, string> = {
  USER: "bg-blue-100 text-blue-700",
  COACH: "bg-purple-100 text-purple-700",
  ADMIN: "bg-red-100 text-red-700",
};

export default function AdminUsers() {
  return (
    <AdminGuard>
      <Inner />
    </AdminGuard>
  );
}

function Inner() {
  const { users, loading, error } = useAdminUsers();

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="tag mb-1">Admin · Users</div>
        <h1 className="text-3xl font-bold">Users</h1>
      </div>

      {loading && <div className="text-center py-12 text-ink-muted">กำลังโหลด...</div>}
      {error && <div className="card p-6 text-center text-red-600">⚠ {error}</div>}

      {!loading && (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-alt text-left">
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-line">
                  <td className="px-4 py-3 font-semibold">{u.name}</td>
                  <td className="px-4 py-3 text-ink-muted">{u.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                        ROLE_STYLE[u.role] ?? "bg-surface-alt"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{u.status ?? "—"}</td>
                  <td className="px-4 py-3 text-ink-muted">
                    {new Date(u.createdAt).toLocaleDateString("th-TH")}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-ink-muted">
                    ยังไม่มี users
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

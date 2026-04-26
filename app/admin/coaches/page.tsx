"use client";

import { AdminGuard } from "@/components/AdminGuard";
import { useAdminCoaches, verifyCoach } from "@/lib/admin-api";

export default function AdminCoaches() {
  return (
    <AdminGuard>
      <Inner />
    </AdminGuard>
  );
}

function Inner() {
  const { coaches, loading, error, reload } = useAdminCoaches();

  const handleVerify = async (id: string) => {
    await verifyCoach(id);
    await reload();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="tag mb-1">Admin · Coaches</div>
        <h1 className="text-3xl font-bold">Coaches</h1>
        <p className="text-ink-muted mt-1">จัดการโค้ช + Verify</p>
      </div>

      {loading && <div className="text-center py-12 text-ink-muted">กำลังโหลด...</div>}
      {error && <div className="card p-6 text-center text-red-600">⚠ {error}</div>}

      {!loading && (
        <div className="space-y-3">
          {coaches.map((c) => (
            <div key={c.id} className="card p-5 flex items-center gap-4 flex-wrap">
              <div className="w-12 h-12 rounded-full bg-brand text-white font-bold grid place-items-center flex-shrink-0">
                {c.user.name?.[0]?.toUpperCase() ?? "?"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold">{c.user.name}</h3>
                  {c.isVerified ? (
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-green-100 text-green-700">
                      VERIFIED ✓
                    </span>
                  ) : (
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-700">
                      PENDING
                    </span>
                  )}
                </div>
                <p className="text-sm text-ink-muted">{c.user.email}</p>
                <p className="text-sm text-ink-muted mt-1">
                  ★ {c.rating.toFixed(1)} ({c.reviewCount}) ·{" "}
                  {c.experienceYears != null
                    ? `${c.experienceYears} ปี`
                    : "—"}{" "}
                  · {c.hourlyRate != null ? `฿${c.hourlyRate}/ชม.` : "—"}
                </p>
              </div>
              {!c.isVerified && (
                <button
                  onClick={() => handleVerify(c.id)}
                  className="btn-primary text-sm"
                >
                  Verify
                </button>
              )}
            </div>
          ))}
          {coaches.length === 0 && (
            <div className="card p-10 text-center text-ink-muted">
              ยังไม่มีโค้ช
            </div>
          )}
        </div>
      )}
    </div>
  );
}

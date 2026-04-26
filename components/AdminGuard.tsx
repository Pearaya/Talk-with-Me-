"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-store";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-10 text-center text-ink-muted">กำลังโหลด...</div>;
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold mb-2">กรุณาเข้าสู่ระบบ</h1>
        <Link href="/auth/login" className="btn-primary">
          เข้าสู่ระบบ
        </Link>
      </div>
    );
  }

  if (user.role !== "ADMIN") {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <div className="text-5xl mb-4">⛔</div>
        <h1 className="text-2xl font-bold mb-2">ไม่มีสิทธิ์เข้าถึง</h1>
        <p className="text-ink-muted mb-6">
          หน้านี้สำหรับผู้ดูแลระบบเท่านั้น
        </p>
        <Link href="/dashboard" className="btn-primary">
          กลับ Dashboard
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}

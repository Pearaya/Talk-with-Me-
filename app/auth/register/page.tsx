"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-store";
import { ApiError } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!accepted) {
      setError("กรุณายอมรับเงื่อนไขการใช้งาน");
      return;
    }
    setSubmitting(true);
    try {
      await register(email, password, `${firstName} ${lastName}`.trim());
      router.push("/onboarding/step-1-profile");
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "สมัครสมาชิกไม่สำเร็จ ลองใหม่อีกครั้ง";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="tag mb-2">Create Account</div>
        <h1 className="text-3xl font-bold">สมัครสมาชิก</h1>
        <p className="text-ink-muted text-sm mt-1">
          มีบัญชีอยู่แล้ว?{" "}
          <Link href="/auth/login" className="text-brand font-semibold hover:underline">
            เข้าสู่ระบบ
          </Link>
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="label">ชื่อ</label>
            <input
              id="firstName"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="label">นามสกุล</label>
            <input
              id="lastName"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="label">อีเมล</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="input"
          />
        </div>
        <div>
          <label htmlFor="password" className="label">รหัสผ่าน</label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="อย่างน้อย 8 ตัวอักษร"
            className="input"
          />
          <p className="text-xs text-ink-muted mt-1">
            ต้องมีตัวพิมพ์เล็ก พิมพ์ใหญ่ และตัวเลข
          </p>
        </div>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1 rounded border-line text-brand focus:ring-brand"
          />
          <span className="text-ink-muted">
            ฉันยอมรับ <a href="#" className="text-brand underline">เงื่อนไขการใช้งาน</a> และ{" "}
            <a href="#" className="text-brand underline">นโยบายความเป็นส่วนตัว</a>
          </span>
        </label>
        <button type="submit" disabled={submitting} className="btn-primary w-full py-3">
          {submitting ? "กำลังสมัคร..." : "สมัครและไปยัง Onboarding"}
        </button>
      </form>
    </div>
  );
}

import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="tag mb-2">Reset Password</div>
        <h1 className="text-3xl font-bold">ลืมรหัสผ่าน?</h1>
        <p className="text-ink-muted text-sm mt-1">
          กรอกอีเมล เราจะส่งลิงก์รีเซ็ตรหัสผ่านให้
        </p>
      </div>

      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="label">อีเมล</label>
          <input id="email" type="email" required placeholder="you@example.com" className="input" />
        </div>
        <button type="submit" className="btn-primary w-full py-3">
          ส่งลิงก์รีเซ็ต
        </button>
      </form>

      <Link
        href="/auth/login"
        className="mt-6 block text-center text-sm text-ink-muted hover:text-brand"
      >
        ← กลับไปหน้า เข้าสู่ระบบ
      </Link>
    </div>
  );
}

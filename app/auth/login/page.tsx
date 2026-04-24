import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="tag mb-2">Sign In</div>
        <h1 className="text-3xl font-bold">เข้าสู่ระบบ</h1>
        <p className="text-ink-muted text-sm mt-1">
          ยังไม่มีบัญชี?{" "}
          <Link href="/auth/register" className="text-brand font-semibold hover:underline">
            สมัครสมาชิก
          </Link>
        </p>
      </div>

      <form className="space-y-4" action="/dashboard">
        <div>
          <label htmlFor="email" className="label">อีเมล</label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            className="input"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="label mb-0">รหัสผ่าน</label>
            <Link href="/auth/forgot-password" className="text-xs text-brand font-semibold hover:underline">
              ลืมรหัสผ่าน?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            className="input"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="rounded border-line text-brand focus:ring-brand" />
          <span>จดจำฉันไว้</span>
        </label>
        <button type="submit" className="btn-primary w-full py-3">
          เข้าสู่ระบบ
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-line" />
        <span className="text-xs text-ink-muted">หรือ</span>
        <div className="flex-1 h-px bg-line" />
      </div>

      <button className="btn-ghost w-full py-3 border border-line">
        <span>เข้าสู่ระบบด้วย Google</span>
      </button>
    </div>
  );
}

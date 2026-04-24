import Link from "next/link";

export default function RegisterPage() {
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

      <form className="space-y-4" action="/onboarding/step-1-profile">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="label">ชื่อ</label>
            <input id="firstName" type="text" required className="input" />
          </div>
          <div>
            <label htmlFor="lastName" className="label">นามสกุล</label>
            <input id="lastName" type="text" required className="input" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="label">อีเมล</label>
          <input id="email" type="email" required placeholder="you@example.com" className="input" />
        </div>
        <div>
          <label htmlFor="password" className="label">รหัสผ่าน</label>
          <input id="password" type="password" required placeholder="อย่างน้อย 8 ตัวอักษร" className="input" />
          <p className="text-xs text-ink-muted mt-1">
            ต้องประกอบด้วยตัวพิมพ์เล็ก พิมพ์ใหญ่ และตัวเลข
          </p>
        </div>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" required className="mt-1 rounded border-line text-brand focus:ring-brand" />
          <span className="text-ink-muted">
            ฉันยอมรับ <a href="#" className="text-brand underline">เงื่อนไขการใช้งาน</a> และ{" "}
            <a href="#" className="text-brand underline">นโยบายความเป็นส่วนตัว</a>
          </span>
        </label>
        <button type="submit" className="btn-primary w-full py-3">
          สมัครและไปยัง Onboarding
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-line" />
        <span className="text-xs text-ink-muted">หรือ</span>
        <div className="flex-1 h-px bg-line" />
      </div>

      <button className="btn-ghost w-full py-3 border border-line">
        <span>สมัครด้วย Google</span>
      </button>
    </div>
  );
}

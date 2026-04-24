import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: brand panel */}
      <div className="hidden lg:flex flex-col justify-between bg-ink text-white p-12 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute -left-10 bottom-10 w-80 h-80 rounded-full bg-brand-mid/10 blur-3xl" />

        <Link href="/" className="relative flex items-center gap-2 w-fit">
          <div className="w-9 h-9 rounded-lg bg-brand grid place-items-center font-mono font-bold">
            C
          </div>
          <span className="font-bold text-lg">Coaching</span>
        </Link>

        <div className="relative">
          <div className="tag mb-3">Management Coaching Platform</div>
          <h2 className="text-3xl font-bold leading-tight mb-4">
            พัฒนาตัวเอง<br />ไปสู่เป้าหมายถัดไป
          </h2>
          <p className="text-white/60 max-w-sm">
            โค้ชระดับมืออาชีพ + แผนเฉพาะตัว + Portfolio ที่พร้อมใช้
            เริ่มต้นได้เลยวันนี้
          </p>
        </div>

        <div className="relative text-xs font-mono text-white/40">
          © 2026 Coaching Platform
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

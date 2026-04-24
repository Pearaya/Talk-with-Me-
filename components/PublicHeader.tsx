import Link from "next/link";

export function PublicHeader() {
  return (
    <header className="border-b border-line bg-white/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand grid place-items-center text-white font-mono text-sm font-bold">
            C
          </div>
          <span className="font-bold text-lg">Coaching</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <Link href="/coaches" className="hover:text-brand">โค้ช</Link>
          <Link href="/jobs" className="hover:text-brand">งาน</Link>
          <Link href="/learning/videos" className="hover:text-brand">เรียนรู้</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="text-sm font-semibold hover:text-brand">
            เข้าสู่ระบบ
          </Link>
          <Link href="/auth/register" className="btn-primary text-sm">
            สมัครสมาชิก
          </Link>
        </div>
      </div>
    </header>
  );
}

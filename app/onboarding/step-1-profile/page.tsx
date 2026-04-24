import Link from "next/link";

export default function Step1() {
  return (
    <div>
      <div className="tag mb-2">Step 1 of 4</div>
      <h1 className="text-2xl font-bold mb-1">ข้อมูลส่วนตัว</h1>
      <p className="text-ink-muted text-sm mb-6">เริ่มต้นด้วยข้อมูลพื้นฐานของคุณ</p>

      <form className="space-y-4" action="/onboarding/step-2-status">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">ชื่อ</label>
            <input type="text" required className="input" />
          </div>
          <div>
            <label className="label">นามสกุล</label>
            <input type="text" required className="input" />
          </div>
        </div>
        <div>
          <label className="label">เบอร์โทรศัพท์</label>
          <input type="tel" className="input" placeholder="08X-XXX-XXXX" />
        </div>
        <div>
          <label className="label">ตำแหน่งงานปัจจุบัน</label>
          <input type="text" className="input" placeholder="เช่น Product Manager" />
        </div>
        <div>
          <label className="label">บริษัท / องค์กร</label>
          <input type="text" className="input" />
        </div>
        <div className="flex justify-between items-center pt-4">
          <Link href="/" className="btn-ghost text-sm">ข้าม</Link>
          <button type="submit" className="btn-primary">ถัดไป →</button>
        </div>
      </form>
    </div>
  );
}

import Link from "next/link";

export default function Step4() {
  return (
    <div>
      <div className="tag mb-2">Step 4 of 4</div>
      <h1 className="text-2xl font-bold mb-1">Portfolio ที่มีอยู่</h1>
      <p className="text-ink-muted text-sm mb-6">ถ้ามี Portfolio อยู่แล้ว แปะลิงก์ได้เลย (ไม่บังคับ)</p>

      <form className="space-y-4" action="/dashboard">
        <div>
          <label className="label">LinkedIn URL</label>
          <input type="url" className="input" placeholder="https://linkedin.com/in/..." />
        </div>
        <div>
          <label className="label">Portfolio Website</label>
          <input type="url" className="input" placeholder="https://..." />
        </div>
        <div>
          <label className="label">Resume (PDF)</label>
          <div className="border-2 border-dashed border-line rounded-lg p-6 text-center hover:border-brand cursor-pointer">
            <div className="text-3xl mb-2">📄</div>
            <div className="font-semibold text-sm">คลิกเพื่ออัปโหลด</div>
            <div className="text-xs text-ink-muted mt-1">PDF ขนาดไม่เกิน 5MB</div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Link href="/onboarding/step-3-skills" className="btn-ghost">← ย้อนกลับ</Link>
          <button type="submit" className="btn-primary">เริ่มต้นใช้งาน →</button>
        </div>
      </form>
    </div>
  );
}

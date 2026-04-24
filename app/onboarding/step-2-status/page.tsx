import Link from "next/link";

const statuses = [
  { value: "pre", label: "Pre", desc: "กำลังเตรียมตัวเข้าสู่สายงาน Management" },
  { value: "mama", label: "Mama", desc: "กำลังบริหารทีมหรือเป็น Middle Management" },
  { value: "pr", label: "PR", desc: "มีประสบการณ์บริหารระดับสูง / Executive" },
];

const workTypes = ["Full-time", "Part-time"];

export default function Step2() {
  return (
    <div>
      <div className="tag mb-2">Step 2 of 4</div>
      <h1 className="text-2xl font-bold mb-1">สถานะ & รูปแบบงาน</h1>
      <p className="text-ink-muted text-sm mb-6">ช่วยเราเข้าใจสถานการณ์ของคุณ</p>

      <form className="space-y-6" action="/onboarding/step-3-skills">
        <div>
          <label className="label mb-3">สถานะของคุณ</label>
          <div className="grid sm:grid-cols-3 gap-3">
            {statuses.map((s) => (
              <label
                key={s.value}
                className="card p-4 cursor-pointer hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-brand-light"
              >
                <input type="radio" name="status" value={s.value} className="sr-only" />
                <div className="font-bold text-brand">{s.label}</div>
                <div className="text-xs text-ink-muted mt-1">{s.desc}</div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="label mb-3">รูปแบบการทำงาน</label>
          <div className="grid grid-cols-2 gap-3">
            {workTypes.map((w) => (
              <label
                key={w}
                className="card p-4 cursor-pointer text-center hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-brand-light"
              >
                <input type="radio" name="workType" value={w} className="sr-only" />
                <span className="font-semibold">{w}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="label">ระดับประสบการณ์</label>
          <select className="input">
            <option>0-2 ปี</option>
            <option>3-5 ปี</option>
            <option>6-10 ปี</option>
            <option>10+ ปี</option>
          </select>
        </div>

        <div className="flex justify-between pt-4">
          <Link href="/onboarding/step-1-profile" className="btn-ghost">← ย้อนกลับ</Link>
          <button type="submit" className="btn-primary">ถัดไป →</button>
        </div>
      </form>
    </div>
  );
}

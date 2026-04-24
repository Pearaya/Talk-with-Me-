import Link from "next/link";

const skillList = [
  "Leadership", "Team Building", "OKRs", "People Management",
  "Communication", "Feedback", "Coaching", "Delegation",
  "Stakeholder Mgmt", "Strategic Thinking", "Decision Making", "Conflict Resolution",
];

export default function Step3() {
  return (
    <div>
      <div className="tag mb-2">Step 3 of 4</div>
      <h1 className="text-2xl font-bold mb-1">Skills & Goals</h1>
      <p className="text-ink-muted text-sm mb-6">เลือกทักษะที่มีและที่อยากพัฒนา</p>

      <form className="space-y-6" action="/onboarding/step-4-portfolio">
        <div>
          <label className="label mb-3">ทักษะที่อยากพัฒนา (เลือกได้หลายอย่าง)</label>
          <div className="flex flex-wrap gap-2">
            {skillList.map((s) => (
              <label
                key={s}
                className="px-3 py-1.5 rounded-full border border-line text-sm cursor-pointer hover:border-brand has-[:checked]:bg-brand has-[:checked]:text-white has-[:checked]:border-brand"
              >
                <input type="checkbox" value={s} className="sr-only" />
                {s}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="label">เป้าหมายของคุณ (Mou / Goals)</label>
          <textarea
            rows={4}
            className="input"
            placeholder="เช่น อยากเป็น Engineering Manager ภายใน 1 ปี / สร้างทีมใหม่ 5 คน"
          />
        </div>

        <div>
          <label className="label">ระยะเวลาที่ต้องการ</label>
          <select className="input">
            <option>3 เดือน</option>
            <option>6 เดือน</option>
            <option>1 ปี</option>
            <option>ยืดหยุ่น</option>
          </select>
        </div>

        <div className="flex justify-between pt-4">
          <Link href="/onboarding/step-2-status" className="btn-ghost">← ย้อนกลับ</Link>
          <button type="submit" className="btn-primary">ถัดไป →</button>
        </div>
      </form>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useAuth } from "@/lib/auth-store";
import {
  createGoal,
  deleteGoal,
  updateGoal,
  useGoals,
} from "@/lib/goals-api";

export default function MyPlanPage() {
  const { user } = useAuth();
  const { goals, loading, error, reload } = useGoals();
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold mb-2">กรุณาเข้าสู่ระบบ</h1>
        <Link href="/auth/login" className="btn-primary">
          เข้าสู่ระบบ
        </Link>
      </div>
    );
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      await createGoal({ title, description: description || undefined });
      setTitle("");
      setDescription("");
      setAdding(false);
      await reload();
    } finally {
      setSubmitting(false);
    }
  };

  const handleProgress = async (id: string, progress: number) => {
    await updateGoal(id, { progress });
    await reload();
  };

  const handleStatus = async (id: string, status: "ACTIVE" | "DONE") => {
    await updateGoal(id, { status });
    await reload();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("ลบ Goal นี้?")) return;
    await deleteGoal(id);
    await reload();
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
        <PageHeader
          tag="Coaching · My Plan"
          title="แผน Coaching ของฉัน"
          description="เป้าหมาย Mou และ Milestones ที่ตั้งไว้"
        />
        <button
          onClick={() => setAdding((v) => !v)}
          className="btn-primary"
        >
          {adding ? "ปิด" : "+ เพิ่ม Goal"}
        </button>
      </div>

      {adding && (
        <form onSubmit={handleAdd} className="card p-5 mb-6 space-y-3">
          <div>
            <label className="label">ชื่อเป้าหมาย</label>
            <input
              className="input"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="เช่น เป็น Engineering Manager ภายใน 1 ปี"
            />
          </div>
          <div>
            <label className="label">รายละเอียด</label>
            <textarea
              rows={3}
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setAdding(false)} className="btn-ghost">
              ยกเลิก
            </button>
            <button type="submit" disabled={submitting} className="btn-primary">
              {submitting ? "กำลังบันทึก..." : "บันทึก"}
            </button>
          </div>
        </form>
      )}

      {loading && <div className="text-center py-12 text-ink-muted">กำลังโหลด...</div>}
      {error && <div className="card p-6 text-center text-red-600">⚠ {error}</div>}

      {!loading && goals.length === 0 && !adding && (
        <div className="card p-10 text-center">
          <div className="text-4xl mb-3">🎯</div>
          <p className="font-semibold mb-1">ยังไม่มี Goal</p>
          <p className="text-sm text-ink-muted">เริ่มต้นด้วยการตั้งเป้าหมายแรกของคุณ</p>
        </div>
      )}

      <div className="space-y-4">
        {goals.map((g) => (
          <div key={g.id} className="card p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold">{g.title}</h3>
                {g.description && (
                  <p className="text-sm text-ink-muted mt-1">{g.description}</p>
                )}
                <div className="flex flex-wrap gap-1 mt-2">
                  {g.targetSkills.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-0.5 bg-brand-light text-brand rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                {g.status === "DONE" ? (
                  <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-green-100 text-green-700">
                    DONE ✓
                  </span>
                ) : (
                  <button
                    onClick={() => handleStatus(g.id, "DONE")}
                    className="text-xs font-semibold text-brand hover:underline"
                  >
                    Mark done
                  </button>
                )}
                <button
                  onClick={() => handleDelete(g.id)}
                  className="text-xs text-red-600 hover:underline"
                >
                  ลบ
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1 text-xs">
                <span className="font-semibold text-ink-muted">Progress</span>
                <span className="font-mono">{g.progress}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={g.progress}
                onChange={(e) => handleProgress(g.id, Number(e.target.value))}
                className="w-full accent-brand"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

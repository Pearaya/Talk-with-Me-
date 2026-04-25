"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api, ApiError } from "@/lib/api";

export default function Step4() {
  const router = useRouter();
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api.post("/users/onboarding", {
        linkedinUrl: linkedin || "",
        portfolioUrl: website || "",
      });
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        router.push("/auth/login");
        return;
      }
      setError(
        err instanceof Error ? err.message : "บันทึกข้อมูลไม่สำเร็จ"
      );
      setSubmitting(false);
    }
  };

  const onSkip = () => {
    router.push("/dashboard");
  };

  return (
    <div>
      <div className="tag mb-2">Step 4 of 4</div>
      <h1 className="text-2xl font-bold mb-1">Portfolio ที่มีอยู่</h1>
      <p className="text-ink-muted text-sm mb-6">
        ถ้ามี Portfolio อยู่แล้ว แปะลิงก์ได้เลย (ไม่บังคับ)
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="label">LinkedIn URL</label>
          <input
            type="url"
            className="input"
            placeholder="https://linkedin.com/in/..."
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Portfolio Website</label>
          <input
            type="url"
            className="input"
            placeholder="https://..."
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Resume (PDF)</label>
          <div className="border-2 border-dashed border-line rounded-lg p-6 text-center text-ink-muted">
            <div className="text-3xl mb-2">📄</div>
            <div className="text-sm">
              สามารถอัปโหลดได้ภายหลังในหน้า Profile
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button type="button" onClick={onSkip} className="btn-ghost">
            ข้าม
          </button>
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? "กำลังบันทึก..." : "เริ่มต้นใช้งาน →"}
          </button>
        </div>
      </form>

      <Link
        href="/onboarding/step-3-skills"
        className="block text-center mt-4 text-sm text-ink-muted hover:text-brand"
      >
        ← ย้อนกลับ
      </Link>
    </div>
  );
}

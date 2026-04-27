"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { AvatarUpload } from "@/components/AvatarUpload";
import { useAuth } from "@/lib/auth-store";
import { updateProfile, useUserProfile } from "@/lib/users-api";
import { ApiError } from "@/lib/api";

const ROLE_LABEL: Record<string, string> = {
  USER: "User",
  COACH: "Coach",
  ADMIN: "Admin",
};

export default function ProfilePage() {
  const { user, loading: authLoading, refresh } = useAuth();
  const { profile, loading, error, reload } = useUserProfile();

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;
    setName(profile.name);
    setPosition(profile.currentPosition ?? "");
    setCompany(profile.company ?? "");
    setLinkedin(profile.linkedinUrl ?? "");
    setWebsite(profile.portfolioUrl ?? "");
  }, [profile]);

  if (authLoading || loading) {
    return <div className="p-10 text-center text-ink-muted">กำลังโหลด...</div>;
  }

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

  if (error || !profile) {
    return (
      <div className="card p-6 m-6 text-center text-red-600">⚠ {error}</div>
    );
  }

  const onAvatarUpload = async (url: string) => {
    await updateProfile({ avatarUrl: url });
    await reload();
    await refresh();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);
    try {
      await updateProfile({
        name,
        currentPosition: position,
        company,
        linkedinUrl: linkedin,
        portfolioUrl: website,
      });
      await reload();
      await refresh();
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (err) {
      setSaveStatus("error");
      setSaveError(err instanceof ApiError ? err.message : "บันทึกไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  };

  const initial = profile.name?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <PageHeader
        tag="Profile"
        title="โปรไฟล์ของคุณ"
        description="แก้ไขข้อมูลส่วนตัว รูปโปรไฟล์ และลิงก์ที่เกี่ยวข้อง"
      />

      <div className="card p-6 mb-6">
        <h2 className="font-bold mb-4">รูปโปรไฟล์</h2>
        <AvatarUpload
          currentUrl={profile.avatarUrl}
          initial={initial}
          onUploaded={onAvatarUpload}
        />
      </div>

      <form onSubmit={onSubmit} className="card p-6 space-y-4">
        <h2 className="font-bold">ข้อมูลส่วนตัว</h2>

        <div>
          <label className="label">ชื่อ-นามสกุล</label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label">อีเมล</label>
          <input className="input bg-surface-alt" value={profile.email} disabled />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="label">ตำแหน่งปัจจุบัน</label>
            <input
              className="input"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="เช่น Product Manager"
            />
          </div>
          <div>
            <label className="label">บริษัท / องค์กร</label>
            <input
              className="input"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="label">LinkedIn URL</label>
          <input
            type="url"
            className="input"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/..."
          />
        </div>

        <div>
          <label className="label">Portfolio Website</label>
          <input
            type="url"
            className="input"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap pt-2 border-t border-line">
          <div className="text-xs text-ink-muted flex items-center gap-3">
            <span>
              Role:{" "}
              <span className="font-mono font-semibold text-ink">
                {ROLE_LABEL[profile.role] ?? profile.role}
              </span>
            </span>
            {saveStatus === "saved" && (
              <span className="text-green-600 font-semibold">✓ บันทึกแล้ว</span>
            )}
            {saveStatus === "error" && saveError && (
              <span className="text-red-600">⚠ {saveError}</span>
            )}
          </div>
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "กำลังบันทึก..." : "บันทึก"}
          </button>
        </div>
      </form>

      {profile.skills.length > 0 && (
        <div className="card p-6 mt-6">
          <h2 className="font-bold mb-3">Skills ที่ตั้งไว้</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((s) => (
              <span
                key={s.name}
                className="text-sm px-3 py-1 bg-brand-light text-brand rounded-full"
              >
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

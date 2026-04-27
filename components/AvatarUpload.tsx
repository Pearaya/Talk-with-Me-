"use client";

import { useRef, useState } from "react";
import { uploadFile, fileUrl } from "@/lib/upload";
import { ApiError } from "@/lib/api";

export function AvatarUpload({
  currentUrl,
  initial,
  onUploaded,
}: {
  currentUrl: string | null;
  initial: string;
  onUploaded: (url: string) => Promise<void> | void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(fileUrl(currentUrl));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setBusy(true);

    // Optimistic preview
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    try {
      const result = await uploadFile(file);
      await onUploaded(result.url);
      setPreview(fileUrl(result.url));
    } catch (err) {
      setPreview(fileUrl(currentUrl));
      setError(err instanceof ApiError ? err.message : "อัปโหลดไม่สำเร็จ");
    } finally {
      setBusy(false);
      URL.revokeObjectURL(localPreview);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 rounded-2xl bg-brand text-white grid place-items-center font-bold text-3xl overflow-hidden flex-shrink-0">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="avatar" className="w-full h-full object-cover" />
        ) : (
          initial
        )}
      </div>
      <div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="btn-secondary text-sm"
        >
          {busy ? "กำลังอัปโหลด..." : "เปลี่ยนรูป"}
        </button>
        <p className="text-xs text-ink-muted mt-2">
          PNG / JPEG / WEBP ขนาดไม่เกิน 5MB
        </p>
        {error && <p className="text-xs text-red-600 mt-1">⚠ {error}</p>}
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={onPick}
          className="hidden"
        />
      </div>
    </div>
  );
}

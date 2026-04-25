import { API_URL, ApiError } from "./api";

export type UploadedFile = {
  filename: string;
  url: string;
  mimetype: string;
  size: number;
};

export async function uploadFile(file: File): Promise<UploadedFile> {
  const form = new FormData();
  form.append("file", file);

  let res: Response;
  try {
    res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      credentials: "include",
      body: form,
    });
  } catch {
    throw new ApiError(0, "ไม่สามารถเชื่อมต่อ Backend ได้");
  }

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    throw new ApiError(res.status, data?.error ?? "Upload failed");
  }
  return data.file as UploadedFile;
}

/** Convert a server-relative URL like "/uploads/abc.png" to absolute. */
export function fileUrl(relUrl: string | null | undefined): string | null {
  if (!relUrl) return null;
  if (relUrl.startsWith("http")) return relUrl;
  // API_URL is like "http://host/api/v1" — drop the /api/v1 part
  const origin = API_URL.replace(/\/api\/v\d+$/, "");
  return `${origin}${relUrl}`;
}

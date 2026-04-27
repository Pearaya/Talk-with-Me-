"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "./api";

export type UserSkill = { name: string; level: number };

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: "USER" | "COACH" | "ADMIN";
  status: "PRE" | "MAMA" | "PR" | null;
  workType: "FULL_TIME" | "PART_TIME" | null;
  currentPosition: string | null;
  company: string | null;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  skills: UserSkill[];
};

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    return api
      .get<{ user: UserProfile }>("/users/me")
      .then((res) => {
        setProfile(res.user);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "โหลดไม่สำเร็จ");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { profile, loading, error, reload };
}

export type UpdateProfileInput = {
  name?: string;
  avatarUrl?: string;
  currentPosition?: string;
  company?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
};

export async function updateProfile(input: UpdateProfileInput) {
  return api.put<{ user: UserProfile }>("/users/me", input);
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "./api";

export type Goal = {
  id: string;
  title: string;
  description: string | null;
  targetSkills: string[];
  deadline: string | null;
  progress: number;
  status: "ACTIVE" | "DONE" | "ARCHIVED";
  createdAt: string;
};

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    return api
      .get<{ goals: Goal[] }>("/goals")
      .then((res) => {
        setGoals(res.goals);
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

  return { goals, loading, error, reload };
}

export async function createGoal(input: {
  title: string;
  description?: string;
  targetSkills?: string[];
}) {
  return api.post<{ goal: Goal }>("/goals", input);
}

export async function updateGoal(id: string, patch: Partial<Goal>) {
  return api.put<{ goal: Goal }>(`/goals/${encodeURIComponent(id)}`, patch);
}

export async function deleteGoal(id: string) {
  return api.del(`/goals/${encodeURIComponent(id)}`);
}

import { z } from "zod";

export const createGoalSchema = z.object({
  title: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  targetSkills: z.array(z.string()).default([]),
  deadline: z.string().datetime().optional(),
});

export const updateGoalSchema = z.object({
  title: z.string().min(1).max(300).optional(),
  description: z.string().max(2000).optional(),
  targetSkills: z.array(z.string()).optional(),
  deadline: z.string().datetime().nullish(),
  progress: z.number().int().min(0).max(100).optional(),
  status: z.enum(["ACTIVE", "DONE", "ARCHIVED"]).optional(),
});

export type CreateGoalDto = z.infer<typeof createGoalSchema>;
export type UpdateGoalDto = z.infer<typeof updateGoalSchema>;

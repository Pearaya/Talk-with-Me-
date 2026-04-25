import { z } from "zod";

export const jobQuerySchema = z.object({
  search: z.string().optional(),
  industry: z.string().optional(),
  workType: z.enum(["FULL_TIME", "PART_TIME"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(20),
});

export const createJobSchema = z.object({
  title: z.string().min(1).max(200),
  company: z.string().min(1).max(200),
  description: z.string().min(1),
  requirements: z.string().optional(),
  requiredSkills: z.array(z.string()).default([]),
  workType: z.enum(["FULL_TIME", "PART_TIME"]).optional(),
  industry: z.string().optional(),
  location: z.string().optional(),
});

export type CreateJobDto = z.infer<typeof createJobSchema>;

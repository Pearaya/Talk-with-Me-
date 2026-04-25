import { z } from "zod";

export const onboardingSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  status: z.enum(["PRE", "MAMA", "PR"]).optional(),
  workType: z.enum(["FULL_TIME", "PART_TIME"]).optional(),
  currentPosition: z.string().max(200).optional(),
  company: z.string().max(200).optional(),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  avatarUrl: z.string().optional(),
  skills: z.array(z.string()).optional(),
  goal: z
    .object({
      title: z.string().min(1).max(300),
      description: z.string().max(2000).optional(),
      targetSkills: z.array(z.string()).optional(),
      deadline: z.string().datetime().optional(),
    })
    .optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  avatarUrl: z.string().optional(),
  currentPosition: z.string().max(200).optional(),
  company: z.string().max(200).optional(),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
});

export type OnboardingDto = z.infer<typeof onboardingSchema>;

import { z } from "zod";

export const becomeCoachSchema = z.object({
  bio: z.string().max(2000).optional(),
  experienceYears: z.number().int().min(0).max(60).optional(),
  hourlyRate: z.number().int().min(0).max(100000).optional(),
  specialties: z.array(z.string()).optional(),
  availability: z.unknown().optional(),
});

export const updateCoachSchema = becomeCoachSchema;

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(2000).optional(),
});

export const coachQuerySchema = z.object({
  search: z.string().optional(),
  skill: z.string().optional(),
  minRating: z.coerce.number().optional(),
  maxRate: z.coerce.number().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(20),
});

export type BecomeCoachDto = z.infer<typeof becomeCoachSchema>;
export type ReviewDto = z.infer<typeof reviewSchema>;

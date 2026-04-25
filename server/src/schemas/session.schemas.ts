import { z } from "zod";

export const bookSessionSchema = z.object({
  coachId: z.string().min(1),
  scheduledAt: z.string().datetime(),
  durationMin: z.number().int().min(15).max(240).default(60),
  topic: z.string().max(500).optional(),
});

export const updateSessionSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "DONE", "CANCELLED"]).optional(),
  notes: z.string().max(10000).optional(),
  outcomes: z.string().max(10000).optional(),
  meetingUrl: z.string().url().optional(),
});

export type BookSessionDto = z.infer<typeof bookSessionSchema>;
export type UpdateSessionDto = z.infer<typeof updateSessionSchema>;

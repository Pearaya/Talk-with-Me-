import { z } from "zod";

const experienceSchema = z.object({
  id: z.string(),
  role: z.string(),
  company: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
});

const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  link: z.string(),
  impact: z.string(),
});

const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: z.number().int().min(1).max(5),
});

const outcomeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  source: z.enum(["coaching", "self"]),
});

export const portfolioContentSchema = z.object({
  header: z.object({
    name: z.string(),
    title: z.string(),
    tagline: z.string(),
    location: z.string(),
    avatarInitial: z.string(),
  }),
  about: z.string(),
  experience: z.array(experienceSchema),
  projects: z.array(projectSchema),
  skills: z.array(skillSchema),
  outcomes: z.array(outcomeSchema),
  contact: z.object({
    email: z.string(),
    linkedin: z.string(),
    website: z.string(),
  }),
});

export const upsertPortfolioSchema = z.object({
  templateId: z.enum(["minimal", "bold", "modern"]),
  content: portfolioContentSchema,
  isPublic: z.boolean(),
});

export type UpsertPortfolioDto = z.infer<typeof upsertPortfolioSchema>;

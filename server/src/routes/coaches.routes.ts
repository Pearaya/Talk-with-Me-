import { Router } from "express";
import { Prisma } from "@prisma/client";
import { requireAuth } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { asyncHandler } from "../lib/asyncHandler";
import { prisma } from "../lib/db";
import { BadRequest, NotFound } from "../lib/errors";
import {
  becomeCoachSchema,
  coachQuerySchema,
  reviewSchema,
  updateCoachSchema,
} from "../schemas/coach.schemas";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { search, skill, minRating, maxRate, page, pageSize } =
      coachQuerySchema.parse(req.query);

    const where: Prisma.CoachWhereInput = {
      isVerified: true,
      ...(minRating ? { rating: { gte: minRating } } : {}),
      ...(maxRate ? { hourlyRate: { lte: maxRate } } : {}),
      ...(search
        ? {
            user: {
              name: { contains: search, mode: "insensitive" },
            },
          }
        : {}),
      ...(skill
        ? {
            coachSkills: {
              some: { skill: { name: { equals: skill, mode: "insensitive" } } },
            },
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.coach.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, avatarUrl: true } },
          coachSkills: { include: { skill: true } },
        },
        orderBy: { rating: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.coach.count({ where }),
    ]);

    res.json({
      items: items.map(serializeCoach),
      pagination: { page, pageSize, total },
    });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const coach = await prisma.coach.findUnique({
      where: { id: req.params.id },
      include: {
        user: { select: { id: true, name: true, avatarUrl: true } },
        coachSkills: { include: { skill: true } },
      },
    });
    if (!coach) throw NotFound("Coach not found");
    res.json({ coach: serializeCoach(coach) });
  })
);

router.get(
  "/:id/availability",
  asyncHandler(async (req, res) => {
    const coach = await prisma.coach.findUnique({
      where: { id: req.params.id },
      select: { availability: true },
    });
    if (!coach) throw NotFound("Coach not found");
    res.json({ availability: coach.availability ?? null });
  })
);

router.post(
  "/me",
  requireAuth,
  validateBody(becomeCoachSchema),
  asyncHandler(async (req, res) => {
    const userId = req.user!.id;
    const dto = req.body as ReturnType<typeof becomeCoachSchema.parse>;

    const existing = await prisma.coach.findUnique({ where: { userId } });
    if (existing) throw BadRequest("You are already a coach");

    const { specialties, ...rest } = dto;
    const coach = await prisma.coach.create({
      data: {
        userId,
        bio: rest.bio,
        experienceYears: rest.experienceYears,
        hourlyRate: rest.hourlyRate,
        availability: (rest.availability ?? Prisma.JsonNull) as Prisma.InputJsonValue,
      },
    });

    if (specialties && specialties.length > 0) {
      await attachCoachSkills(coach.id, specialties);
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: "COACH" },
    });

    res.status(201).json({ coach });
  })
);

router.put(
  "/me",
  requireAuth,
  validateBody(updateCoachSchema),
  asyncHandler(async (req, res) => {
    const dto = req.body as ReturnType<typeof updateCoachSchema.parse>;
    const coach = await prisma.coach.findUnique({
      where: { userId: req.user!.id },
    });
    if (!coach) throw NotFound("You are not a coach");

    const { specialties, ...rest } = dto;
    const updated = await prisma.coach.update({
      where: { id: coach.id },
      data: {
        bio: rest.bio,
        experienceYears: rest.experienceYears,
        hourlyRate: rest.hourlyRate,
        ...(rest.availability !== undefined
          ? { availability: rest.availability as Prisma.InputJsonValue }
          : {}),
      },
    });

    if (specialties) {
      await prisma.coachSkill.deleteMany({ where: { coachId: coach.id } });
      await attachCoachSkills(coach.id, specialties);
    }

    res.json({ coach: updated });
  })
);

router.post(
  "/:id/review",
  requireAuth,
  validateBody(reviewSchema),
  asyncHandler(async (req, res) => {
    const coachId = req.params.id;
    const coach = await prisma.coach.findUnique({ where: { id: coachId } });
    if (!coach) throw NotFound("Coach not found");

    const review = await prisma.coachReview.create({
      data: {
        coachId,
        authorId: req.user!.id,
        rating: req.body.rating,
        comment: req.body.comment,
      },
    });

    // Recompute aggregate
    const agg = await prisma.coachReview.aggregate({
      where: { coachId },
      _avg: { rating: true },
      _count: true,
    });
    await prisma.coach.update({
      where: { id: coachId },
      data: {
        rating: agg._avg.rating ?? 0,
        reviewCount: agg._count,
      },
    });

    res.status(201).json({ review });
  })
);

async function attachCoachSkills(coachId: string, specialties: string[]) {
  for (const name of specialties) {
    const skill = await prisma.skill.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    await prisma.coachSkill.create({
      data: { coachId, skillId: skill.id },
    });
  }
}

function serializeCoach(coach: {
  id: string;
  bio: string | null;
  experienceYears: number | null;
  hourlyRate: number | null;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  availability: Prisma.JsonValue;
  user: { id: string; name: string; avatarUrl: string | null };
  coachSkills: { skill: { id: string; name: string } }[];
}) {
  return {
    id: coach.id,
    user: coach.user,
    bio: coach.bio,
    experienceYears: coach.experienceYears,
    hourlyRate: coach.hourlyRate,
    rating: coach.rating,
    reviewCount: coach.reviewCount,
    isVerified: coach.isVerified,
    specialties: coach.coachSkills.map((cs) => cs.skill.name),
    availability: coach.availability ?? null,
  };
}

export default router;

import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { asyncHandler } from "../lib/asyncHandler";
import { prisma } from "../lib/db";
import { NotFound } from "../lib/errors";
import { createJobSchema } from "../schemas/job.schemas";

const router = Router();

router.use(requireAuth, requireRole("ADMIN"));

router.get(
  "/users",
  asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    res.json({ users });
  })
);

router.get(
  "/coaches",
  asyncHandler(async (req, res) => {
    const coaches = await prisma.coach.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json({ coaches });
  })
);

router.put(
  "/coaches/:id/verify",
  asyncHandler(async (req, res) => {
    const coach = await prisma.coach.findUnique({ where: { id: req.params.id } });
    if (!coach) throw NotFound("Coach not found");
    const updated = await prisma.coach.update({
      where: { id: coach.id },
      data: { isVerified: true },
    });
    res.json({ coach: updated });
  })
);

router.post(
  "/jobs",
  validateBody(createJobSchema),
  asyncHandler(async (req, res) => {
    const dto = req.body as ReturnType<typeof createJobSchema.parse>;
    const job = await prisma.job.create({
      data: {
        title: dto.title,
        company: dto.company,
        description: dto.description,
        requirements: dto.requirements,
        requiredSkills: dto.requiredSkills,
        workType: dto.workType,
        industry: dto.industry,
        location: dto.location,
      },
    });
    res.status(201).json({ job });
  })
);

router.get(
  "/reports",
  asyncHandler(async (_req, res) => {
    const [users, coaches, sessions, jobs] = await Promise.all([
      prisma.user.count(),
      prisma.coach.count(),
      prisma.session.count(),
      prisma.job.count(),
    ]);
    res.json({ stats: { users, coaches, sessions, jobs } });
  })
);

export default router;

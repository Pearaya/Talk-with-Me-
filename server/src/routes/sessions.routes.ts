import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { asyncHandler } from "../lib/asyncHandler";
import { prisma } from "../lib/db";
import { Forbidden, NotFound } from "../lib/errors";
import {
  bookSessionSchema,
  updateSessionSchema,
} from "../schemas/session.schemas";

const router = Router();

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const sessions = await prisma.session.findMany({
      where: { userId: req.user!.id },
      include: {
        coach: {
          include: {
            user: { select: { id: true, name: true, avatarUrl: true } },
          },
        },
      },
      orderBy: { scheduledAt: "asc" },
    });
    res.json({ sessions });
  })
);

router.get(
  "/upcoming",
  requireAuth,
  asyncHandler(async (req, res) => {
    const sessions = await prisma.session.findMany({
      where: {
        userId: req.user!.id,
        scheduledAt: { gte: new Date() },
        status: { in: ["PENDING", "CONFIRMED"] },
      },
      include: {
        coach: {
          include: {
            user: { select: { id: true, name: true, avatarUrl: true } },
          },
        },
      },
      orderBy: { scheduledAt: "asc" },
      take: 5,
    });
    res.json({ sessions });
  })
);

router.get(
  "/report",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user!.id;
    const [done, upcoming, total] = await Promise.all([
      prisma.session.count({ where: { userId, status: "DONE" } }),
      prisma.session.count({
        where: {
          userId,
          scheduledAt: { gte: new Date() },
          status: { in: ["PENDING", "CONFIRMED"] },
        },
      }),
      prisma.session.count({ where: { userId } }),
    ]);
    res.json({ stats: { done, upcoming, total } });
  })
);

router.post(
  "/",
  requireAuth,
  validateBody(bookSessionSchema),
  asyncHandler(async (req, res) => {
    const dto = req.body as ReturnType<typeof bookSessionSchema.parse>;
    const coach = await prisma.coach.findUnique({ where: { id: dto.coachId } });
    if (!coach) throw NotFound("Coach not found");

    const session = await prisma.session.create({
      data: {
        userId: req.user!.id,
        coachId: dto.coachId,
        scheduledAt: new Date(dto.scheduledAt),
        durationMin: dto.durationMin,
        notes: dto.topic ?? null,
        status: "PENDING",
      },
    });
    res.status(201).json({ session });
  })
);

router.get(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const session = await prisma.session.findUnique({
      where: { id: req.params.id },
      include: {
        coach: {
          include: {
            user: { select: { id: true, name: true, avatarUrl: true } },
          },
        },
      },
    });
    if (!session) throw NotFound("Session not found");

    const isUser = session.userId === req.user!.id;
    const isCoach = session.coach.userId === req.user!.id;
    if (!isUser && !isCoach && req.user!.role !== "ADMIN")
      throw Forbidden();

    res.json({ session });
  })
);

router.put(
  "/:id",
  requireAuth,
  validateBody(updateSessionSchema),
  asyncHandler(async (req, res) => {
    const session = await prisma.session.findUnique({
      where: { id: req.params.id },
      include: { coach: true },
    });
    if (!session) throw NotFound("Session not found");
    const isUser = session.userId === req.user!.id;
    const isCoach = session.coach.userId === req.user!.id;
    if (!isUser && !isCoach) throw Forbidden();

    const dto = req.body as ReturnType<typeof updateSessionSchema.parse>;
    const updated = await prisma.session.update({
      where: { id: session.id },
      data: dto,
    });
    res.json({ session: updated });
  })
);

router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const session = await prisma.session.findUnique({
      where: { id: req.params.id },
    });
    if (!session) throw NotFound("Session not found");
    if (session.userId !== req.user!.id) throw Forbidden();

    await prisma.session.update({
      where: { id: session.id },
      data: { status: "CANCELLED" },
    });
    res.status(204).end();
  })
);

export default router;

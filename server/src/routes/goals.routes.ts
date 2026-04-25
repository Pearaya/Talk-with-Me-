import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { asyncHandler } from "../lib/asyncHandler";
import { prisma } from "../lib/db";
import { Forbidden, NotFound } from "../lib/errors";
import { createGoalSchema, updateGoalSchema } from "../schemas/goal.schemas";

const router = Router();

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const goals = await prisma.goal.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: "desc" },
    });
    res.json({ goals });
  })
);

router.post(
  "/",
  requireAuth,
  validateBody(createGoalSchema),
  asyncHandler(async (req, res) => {
    const dto = req.body as ReturnType<typeof createGoalSchema.parse>;
    const goal = await prisma.goal.create({
      data: {
        userId: req.user!.id,
        title: dto.title,
        description: dto.description,
        targetSkills: dto.targetSkills,
        deadline: dto.deadline ? new Date(dto.deadline) : undefined,
      },
    });
    res.status(201).json({ goal });
  })
);

router.put(
  "/:id",
  requireAuth,
  validateBody(updateGoalSchema),
  asyncHandler(async (req, res) => {
    const goal = await prisma.goal.findUnique({ where: { id: req.params.id } });
    if (!goal) throw NotFound("Goal not found");
    if (goal.userId !== req.user!.id) throw Forbidden();

    const dto = req.body as ReturnType<typeof updateGoalSchema.parse>;
    const updated = await prisma.goal.update({
      where: { id: goal.id },
      data: {
        title: dto.title,
        description: dto.description,
        targetSkills: dto.targetSkills,
        deadline:
          dto.deadline === null
            ? null
            : dto.deadline
            ? new Date(dto.deadline)
            : undefined,
        progress: dto.progress,
        status: dto.status,
      },
    });
    res.json({ goal: updated });
  })
);

router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const goal = await prisma.goal.findUnique({ where: { id: req.params.id } });
    if (!goal) throw NotFound("Goal not found");
    if (goal.userId !== req.user!.id) throw Forbidden();
    await prisma.goal.delete({ where: { id: goal.id } });
    res.status(204).end();
  })
);

export default router;

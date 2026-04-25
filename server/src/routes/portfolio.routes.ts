import { Router } from "express";
import { Prisma } from "@prisma/client";
import { requireAuth } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { asyncHandler } from "../lib/asyncHandler";
import { prisma } from "../lib/db";
import { Forbidden, NotFound } from "../lib/errors";
import { upsertPortfolioSchema } from "../schemas/portfolio.schemas";

const router = Router();

router.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: req.user!.id },
    });
    res.json({ portfolio });
  })
);

router.put(
  "/me",
  requireAuth,
  validateBody(upsertPortfolioSchema),
  asyncHandler(async (req, res) => {
    const userId = req.user!.id;
    const dto = req.body as ReturnType<typeof upsertPortfolioSchema.parse>;

    const portfolio = await prisma.portfolio.upsert({
      where: { userId },
      create: {
        userId,
        templateId: dto.templateId,
        content: dto.content as Prisma.InputJsonValue,
        isPublic: dto.isPublic,
      },
      update: {
        templateId: dto.templateId,
        content: dto.content as Prisma.InputJsonValue,
        isPublic: dto.isPublic,
      },
    });
    res.json({ portfolio });
  })
);

router.delete(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    await prisma.portfolio.deleteMany({ where: { userId: req.user!.id } });
    res.status(204).end();
  })
);

// Public view by share token
router.get(
  "/share/:token",
  asyncHandler(async (req, res) => {
    const portfolio = await prisma.portfolio.findUnique({
      where: { shareToken: req.params.token },
      include: {
        user: { select: { id: true, name: true, avatarUrl: true } },
      },
    });
    if (!portfolio) throw NotFound("Portfolio not found");
    if (!portfolio.isPublic) throw Forbidden("Portfolio is private");

    await prisma.portfolio
      .update({
        where: { id: portfolio.id },
        data: { viewCount: { increment: 1 } },
      })
      .catch(() => {});

    res.json({ portfolio });
  })
);

export default router;

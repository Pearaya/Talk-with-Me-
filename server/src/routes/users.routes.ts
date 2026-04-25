import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { asyncHandler } from "../lib/asyncHandler";
import { prisma } from "../lib/db";
import {
  onboardingSchema,
  updateUserSchema,
} from "../schemas/onboarding.schemas";

const router = Router();

router.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        role: true,
        status: true,
        workType: true,
        currentPosition: true,
        company: true,
        linkedinUrl: true,
        portfolioUrl: true,
      },
    });
    const skills = await prisma.userSkill.findMany({
      where: { userId: user.id },
      include: { skill: true },
    });
    res.json({
      user: { ...user, skills: skills.map((s) => ({ name: s.skill.name, level: s.level })) },
    });
  })
);

router.put(
  "/me",
  requireAuth,
  validateBody(updateUserSchema),
  asyncHandler(async (req, res) => {
    const dto = req.body as ReturnType<typeof updateUserSchema.parse>;
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        name: dto.name,
        avatarUrl: dto.avatarUrl,
        currentPosition: dto.currentPosition,
        company: dto.company,
        linkedinUrl: dto.linkedinUrl || null,
        portfolioUrl: dto.portfolioUrl || null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        role: true,
      },
    });
    res.json({ user });
  })
);

router.post(
  "/onboarding",
  requireAuth,
  validateBody(onboardingSchema),
  asyncHandler(async (req, res) => {
    const userId = req.user!.id;
    const dto = req.body as ReturnType<typeof onboardingSchema.parse>;

    await prisma.user.update({
      where: { id: userId },
      data: {
        ...(dto.name ? { name: dto.name } : {}),
        ...(dto.status ? { status: dto.status } : {}),
        ...(dto.workType ? { workType: dto.workType } : {}),
        ...(dto.currentPosition !== undefined
          ? { currentPosition: dto.currentPosition }
          : {}),
        ...(dto.company !== undefined ? { company: dto.company } : {}),
        ...(dto.linkedinUrl !== undefined
          ? { linkedinUrl: dto.linkedinUrl || null }
          : {}),
        ...(dto.portfolioUrl !== undefined
          ? { portfolioUrl: dto.portfolioUrl || null }
          : {}),
        ...(dto.avatarUrl !== undefined ? { avatarUrl: dto.avatarUrl } : {}),
      },
    });

    if (dto.skills && dto.skills.length > 0) {
      // Replace user skills
      await prisma.userSkill.deleteMany({ where: { userId } });
      for (const name of dto.skills) {
        const skill = await prisma.skill.upsert({
          where: { name },
          update: {},
          create: { name },
        });
        await prisma.userSkill.create({
          data: { userId, skillId: skill.id, level: 3 },
        });
      }
    }

    if (dto.goal) {
      await prisma.goal.create({
        data: {
          userId,
          title: dto.goal.title,
          description: dto.goal.description,
          targetSkills: dto.goal.targetSkills ?? [],
          deadline: dto.goal.deadline ? new Date(dto.goal.deadline) : null,
        },
      });
    }

    res.json({ ok: true });
  })
);

export default router;

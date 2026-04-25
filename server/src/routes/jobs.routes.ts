import { Router } from "express";
import { Prisma } from "@prisma/client";
import { requireAuth } from "../middleware/auth";
import { asyncHandler } from "../lib/asyncHandler";
import { prisma } from "../lib/db";
import { NotFound } from "../lib/errors";
import { jobQuerySchema } from "../schemas/job.schemas";
import { getUserSkillNames, scoreMatch } from "../services/match.service";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { search, industry, workType, page, pageSize } = jobQuerySchema.parse(req.query);

    const where: Prisma.JobWhereInput = {
      isActive: true,
      ...(industry ? { industry } : {}),
      ...(workType ? { workType } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { company: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.job.findMany({
        where,
        orderBy: { postedAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.job.count({ where }),
    ]);

    res.json({ items, pagination: { page, pageSize, total } });
  })
);

router.get(
  "/matched",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userSkills = await getUserSkillNames(req.user!.id);
    const jobs = await prisma.job.findMany({
      where: { isActive: true },
      orderBy: { postedAt: "desc" },
      take: 50,
    });
    const items = jobs
      .map((job) => ({
        ...job,
        matchScore: scoreMatch(job.requiredSkills, userSkills),
      }))
      .sort((a, b) => b.matchScore - a.matchScore);
    res.json({ items });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const job = await prisma.job.findUnique({ where: { id: req.params.id } });
    if (!job) throw NotFound("Job not found");
    res.json({ job });
  })
);

export default router;

import { prisma } from "../lib/db";

/**
 * Compute a 0-100 match score for a job vs the caller's skills.
 * Score = (overlap of required skills with user skills) / (required skills) * 100.
 * If a job has no required skills, returns 70 (default mid score).
 */
export function scoreMatch(
  requiredSkills: string[],
  userSkills: string[]
): number {
  if (requiredSkills.length === 0) return 70;
  const userSet = new Set(userSkills.map((s) => s.toLowerCase()));
  const overlap = requiredSkills.filter((s) =>
    userSet.has(s.toLowerCase())
  ).length;
  return Math.round((overlap / requiredSkills.length) * 100);
}

export async function getUserSkillNames(userId: string): Promise<string[]> {
  const rows = await prisma.userSkill.findMany({
    where: { userId },
    include: { skill: true },
  });
  return rows.map((r) => r.skill.name);
}

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const SKILLS = [
  "Leadership",
  "Team Building",
  "OKRs",
  "People Management",
  "Communication",
  "Feedback",
  "Coaching",
  "Delegation",
  "Stakeholder Management",
  "Strategic Thinking",
  "Decision Making",
  "Conflict Resolution",
  "Product Strategy",
  "Roadmapping",
  "Agile",
  "Hiring",
];

const COACHES = [
  {
    email: "nan@coach.example",
    name: "Nan Suwannee",
    bio: "Executive coach (ICF-PCC). 12 ปี ในสายงาน Leadership และ Team Building",
    experienceYears: 12,
    hourlyRate: 1500,
    rating: 4.9,
    reviewCount: 128,
    specialties: ["Leadership", "Team Building", "OKRs"],
    availability: { slots: ["Mon 14:00", "Tue 10:00", "Thu 16:00"] },
  },
  {
    email: "paul@coach.example",
    name: "Paul Chen",
    bio: "Career coach with 12y exp helping professionals navigate transitions",
    experienceYears: 12,
    hourlyRate: 1200,
    rating: 4.8,
    reviewCount: 96,
    specialties: ["Communication", "Feedback", "Hiring"],
    availability: { slots: ["Mon 09:00", "Wed 15:00", "Fri 11:00"] },
  },
  {
    email: "bee@coach.example",
    name: "Bee Ratanaporn",
    bio: "Product coach, ex-Google. ช่วย PM พัฒนา product strategy + stakeholder management",
    experienceYears: 10,
    hourlyRate: 2000,
    rating: 5.0,
    reviewCount: 64,
    specialties: ["Product Strategy", "Roadmapping", "Stakeholder Management"],
    availability: { slots: ["Tue 13:00", "Thu 09:00"] },
  },
];

const JOBS = [
  {
    title: "Engineering Manager",
    company: "Scaleup Tech",
    description: "นำทีมวิศวกร 8-12 คน ทำงานกับ product team สร้าง infrastructure ที่ scale ได้",
    requiredSkills: ["Leadership", "People Management", "Agile"],
    workType: "FULL_TIME" as const,
    industry: "Technology",
    location: "Bangkok · Hybrid",
  },
  {
    title: "Head of Product",
    company: "Fintech Co.",
    description: "ดูแล product organization 20+ คน ออกแบบ roadmap และ stakeholder relationships",
    requiredSkills: ["Product Strategy", "Stakeholder Management", "OKRs"],
    workType: "FULL_TIME" as const,
    industry: "Fintech",
    location: "Bangkok · On-site",
  },
  {
    title: "Senior Program Manager",
    company: "Global SaaS",
    description: "ขับเคลื่อนโปรแกรม cross-functional 5+ ทีม ในการเปิดตัวฟีเจอร์ใหม่",
    requiredSkills: ["Roadmapping", "Communication", "Stakeholder Management"],
    workType: "FULL_TIME" as const,
    industry: "SaaS",
    location: "Remote",
  },
];

async function main() {
  console.log("[seed] start");

  // Skills
  for (const name of SKILLS) {
    await prisma.skill.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log(`[seed] ${SKILLS.length} skills`);

  // Coaches
  for (const c of COACHES) {
    const passwordHash = await bcrypt.hash("Coach123!", 12);
    const user = await prisma.user.upsert({
      where: { email: c.email },
      update: {},
      create: {
        email: c.email,
        passwordHash,
        name: c.name,
        role: "COACH",
      },
    });

    const coach = await prisma.coach.upsert({
      where: { userId: user.id },
      update: {
        bio: c.bio,
        experienceYears: c.experienceYears,
        hourlyRate: c.hourlyRate,
        rating: c.rating,
        reviewCount: c.reviewCount,
        availability: c.availability,
        isVerified: true,
      },
      create: {
        userId: user.id,
        bio: c.bio,
        experienceYears: c.experienceYears,
        hourlyRate: c.hourlyRate,
        rating: c.rating,
        reviewCount: c.reviewCount,
        availability: c.availability,
        isVerified: true,
      },
    });

    // Skills
    await prisma.coachSkill.deleteMany({ where: { coachId: coach.id } });
    for (const skillName of c.specialties) {
      const skill = await prisma.skill.upsert({
        where: { name: skillName },
        update: {},
        create: { name: skillName },
      });
      await prisma.coachSkill.create({
        data: { coachId: coach.id, skillId: skill.id },
      });
    }
  }
  console.log(`[seed] ${COACHES.length} coaches`);

  // Jobs
  for (const j of JOBS) {
    await prisma.job.upsert({
      where: { id: `seed-${j.title.toLowerCase().replace(/\s+/g, "-")}` },
      update: {},
      create: {
        id: `seed-${j.title.toLowerCase().replace(/\s+/g, "-")}`,
        title: j.title,
        company: j.company,
        description: j.description,
        requiredSkills: j.requiredSkills,
        workType: j.workType,
        industry: j.industry,
        location: j.location,
      },
    });
  }
  console.log(`[seed] ${JOBS.length} jobs`);

  // Demo admin
  const adminEmail = "admin@coach.example";
  const adminHash = await bcrypt.hash("Admin1234!", 12);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN" },
    create: {
      email: adminEmail,
      passwordHash: adminHash,
      name: "Admin",
      role: "ADMIN",
    },
  });
  console.log(`[seed] admin: ${adminEmail} / Admin1234!`);

  console.log("[seed] done");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

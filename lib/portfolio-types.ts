export type TemplateId = "minimal" | "bold" | "modern";

export type Portfolio = {
  templateId: TemplateId;
  header: {
    name: string;
    title: string;
    tagline: string;
    location: string;
    avatarInitial: string;
  };
  about: string;
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  outcomes: Outcome[];
  contact: {
    email: string;
    linkedin: string;
    website: string;
  };
  isPublic: boolean;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  impact: string;
};

export type Skill = {
  id: string;
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
};

export type Outcome = {
  id: string;
  title: string;
  description: string;
  source: "coaching" | "self";
};

export const emptyPortfolio = (): Portfolio => ({
  templateId: "minimal",
  header: {
    name: "",
    title: "",
    tagline: "",
    location: "",
    avatarInitial: "",
  },
  about: "",
  experience: [],
  projects: [],
  skills: [],
  outcomes: [],
  contact: { email: "", linkedin: "", website: "" },
  isPublic: false,
});

export const samplePortfolio = (): Portfolio => ({
  templateId: "modern",
  header: {
    name: "กรกฎ วงศ์ประเสริฐ",
    title: "Senior Product Manager",
    tagline: "สร้างผลิตภัณฑ์ที่คนใช้จริง และทีมที่เติบโตไปพร้อมกัน",
    location: "Bangkok, Thailand",
    avatarInitial: "ก",
  },
  about:
    "Product Manager ที่มีประสบการณ์ 8 ปี ในสาย Fintech และ SaaS ชอบงานที่ได้ทำงานกับทีม cross-functional และสร้าง product ที่แก้ปัญหาจริง",
  experience: [
    {
      id: "e1",
      role: "Senior Product Manager",
      company: "Acme Co., Ltd.",
      startDate: "2023",
      endDate: "Present",
      description: "นำทีม PM 4 คน ดูแล flagship product มียอดใช้งาน 500k MAU",
    },
    {
      id: "e2",
      role: "Product Manager",
      company: "Fintech Startup",
      startDate: "2020",
      endDate: "2023",
      description: "เปิดตัว payment product ใหม่ สร้างรายได้ 30M THB ในปีแรก",
    },
  ],
  projects: [
    {
      id: "p1",
      title: "Onboarding Revamp",
      description: "ปรับ onboarding flow ใหม่ เพิ่ม activation rate 42%",
      tags: ["Product", "UX", "A/B Testing"],
      link: "",
      impact: "+42% activation, -28% drop-off",
    },
    {
      id: "p2",
      title: "Team OKRs Framework",
      description: "ออกแบบระบบ OKRs ให้ทีม 20 คน ใช้ได้จริง วัดผลได้",
      tags: ["Leadership", "OKRs", "Framework"],
      link: "",
      impact: "เป้าหมายทีมสำเร็จ 85% ใน Q1",
    },
  ],
  skills: [
    { id: "s1", name: "Product Strategy", level: 5 },
    { id: "s2", name: "Leadership", level: 4 },
    { id: "s3", name: "OKRs", level: 5 },
    { id: "s4", name: "Stakeholder Mgmt", level: 4 },
    { id: "s5", name: "Data Analysis", level: 3 },
  ],
  outcomes: [
    {
      id: "o1",
      title: "พัฒนาทักษะ People Management",
      description: "หลัง Coaching 6 เดือน ทีมรายงาน engagement score สูงขึ้น 35%",
      source: "coaching",
    },
    {
      id: "o2",
      title: "สร้าง Framework ให้ทีม Product",
      description: "เริ่มใช้ OKRs ทั้งองค์กร หลังจากทดลองกับทีมของตัวเอง",
      source: "self",
    },
  ],
  contact: {
    email: "korakot@example.com",
    linkedin: "linkedin.com/in/korakot",
    website: "korakot.dev",
  },
  isPublic: true,
});

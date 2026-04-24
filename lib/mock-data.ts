export const currentUser = {
  name: "กรกฎ",
  fullName: "กรกฎ วงศ์ประเสริฐ",
  avatar: "ก",
  status: "PR" as const,
  workType: "Full-time" as const,
  position: "Senior Product Manager",
  company: "Acme Co., Ltd.",
};

export const stats = [
  { label: "Sessions เสร็จแล้ว", value: "12", sub: "จากทั้งหมด 20", icon: "✓" },
  { label: "Skills พัฒนาแล้ว", value: "5", sub: "จาก 8 ที่ตั้งไว้", icon: "★" },
  { label: "Session ถัดไป", value: "อ.", sub: "28 เม.ย. 14:00", icon: "📅" },
  { label: "Overall Progress", value: "68%", sub: "+12% เดือนนี้", icon: "↑" },
];

export const recommendations = [
  {
    type: "slide" as const,
    icon: "📊",
    title: "People Management Essentials",
    meta: "32 slides · 15 นาที",
    tag: "Leadership",
  },
  {
    type: "video" as const,
    icon: "🎥",
    title: "Difficult Conversations at Work",
    meta: "18 นาที · โดย Coach Paul",
    tag: "Communication",
  },
  {
    type: "podcast" as const,
    icon: "🎙️",
    title: "How to Give Feedback That Works",
    meta: "42 นาที · EP.14",
    tag: "Feedback",
  },
];

export const upcomingSessions = [
  {
    id: "s-101",
    coachName: "Coach Nan",
    topic: "Goal Setting & OKRs Review",
    date: "28 เม.ย. 2026",
    time: "14:00 - 15:00",
    status: "confirmed",
  },
  {
    id: "s-102",
    coachName: "Coach Bee",
    topic: "Portfolio Review Session",
    date: "2 พ.ค. 2026",
    time: "10:00 - 11:00",
    status: "pending",
  },
];

export const coaches = [
  {
    id: "c-1",
    name: "Nan Suwannee",
    title: "Executive Coach · ICF-PCC",
    specialties: ["Leadership", "Team Building", "OKRs"],
    rating: 4.9,
    reviewCount: 128,
    hourlyRate: 1500,
    initial: "N",
  },
  {
    id: "c-2",
    name: "Paul Chen",
    title: "Career Coach · 12y exp",
    specialties: ["Career Transition", "Interviewing", "Personal Branding"],
    rating: 4.8,
    reviewCount: 96,
    hourlyRate: 1200,
    initial: "P",
  },
  {
    id: "c-3",
    name: "Bee Ratanaporn",
    title: "Product Coach · ex-Google",
    specialties: ["Product Strategy", "Roadmapping", "Stakeholder Mgmt"],
    rating: 5.0,
    reviewCount: 64,
    hourlyRate: 2000,
    initial: "B",
  },
];

export const jobs = [
  {
    id: "j-1",
    title: "Engineering Manager",
    company: "Scaleup Tech",
    location: "Bangkok · Hybrid",
    matchScore: 92,
    skills: ["Leadership", "Agile", "People Mgmt"],
    postedAt: "2 วันก่อน",
  },
  {
    id: "j-2",
    title: "Head of Product",
    company: "Fintech Co.",
    location: "Bangkok · On-site",
    matchScore: 84,
    skills: ["Product Strategy", "Stakeholder Mgmt", "OKRs"],
    postedAt: "5 วันก่อน",
  },
  {
    id: "j-3",
    title: "Senior Program Manager",
    company: "Global SaaS",
    location: "Remote",
    matchScore: 76,
    skills: ["Program Mgmt", "Cross-functional", "Roadmapping"],
    postedAt: "1 สัปดาห์ก่อน",
  },
];

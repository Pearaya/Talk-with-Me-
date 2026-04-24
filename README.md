# Coaching Platform

Management Coaching Platform — Next.js 14 + TypeScript + Tailwind CSS

## Phase 1 — Frontend Scaffold (current)

- Next.js 14 App Router + TypeScript + Tailwind
- Design tokens from spec (brand `#E8581A`, Sarabun + IBM Plex Mono)
- Routing structure ครบทุกหน้าตาม Sitemap
- หน้าที่พัฒนาเสร็จ: **Landing**, **Login / Register / Forgot Password**, **Onboarding 4 steps**, **Dashboard**, **Coaches (list + detail)**, **Jobs (list + detail)**
- หน้าที่เหลือเป็น placeholder รอ Phase ถัดไป

## Getting Started

```bash
npm install
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — lint
- `npm run typecheck` — TypeScript check

## Project Structure

```
app/
├── page.tsx                 # Landing
├── layout.tsx               # Root layout + fonts
├── globals.css              # Design tokens
├── auth/
│   ├── layout.tsx           # Split-screen auth layout
│   ├── login/
│   ├── register/
│   └── forgot-password/
├── onboarding/
│   ├── layout.tsx           # Stepper
│   └── step-1..step-4/
├── (app)/                   # Authenticated area (shares DashboardNav)
│   ├── layout.tsx
│   ├── dashboard/
│   ├── coaches/ (+ [id])
│   ├── jobs/ (+ [id])
│   ├── learning/{slides,videos,podcasts}/
│   ├── coaching/{my-plan,sessions,progress,report}/
│   └── portfolio/{create,edit}/
├── portfolio/view/[userId]/ # Public portfolio view
└── admin/                   # Admin panel (separate layout)

components/                   # Shared UI
lib/mock-data.ts              # Mock data for Phase 1
```

## Next Phases

- **Phase 2** — Onboarding validation, Coaches filters, Coaching session booking flow
- **Phase 3** — Portfolio builder, Learning content, Job application flow
- **Phase 4** — Backend API (Node.js + PostgreSQL), Auth (JWT), file uploads
- **Phase 5** — Admin panel, notifications, analytics

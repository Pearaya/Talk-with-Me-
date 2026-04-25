# Coaching Platform

Management Coaching Platform — Next.js frontend + Express/Prisma/Postgres backend.

## Repo layout

```
.                # Next.js 14 frontend (root)
└── server/      # Express + TypeScript + Prisma backend (Phase 3)
```

## Phases done

- **Phase 1** — Frontend scaffold: Next.js 14 + Tailwind, design tokens, all routes, Landing/Auth/Onboarding/Dashboard
- **Phase 2** — Portfolio builder: 3 templates, tabbed editor, live preview, public view (localStorage-backed)
- **Phase 3** — Backend service: Express + Prisma + PostgreSQL + JWT (access + rotating refresh tokens), auth + portfolio endpoints

## Frontend

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Backend

See [`server/README.md`](server/README.md). TL;DR:

```bash
cd server
cp .env.example .env
docker compose up -d        # postgres
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run dev                  # http://localhost:4000
```

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

- **Phase 4** — Wire frontend portfolio store to backend (replace localStorage with `/api/v1/portfolio` calls + login flow)
- **Phase 5** — Coaches, Sessions, Jobs endpoints + admin endpoints + file uploads
- **Phase 6** — Notifications, analytics, Redis cache

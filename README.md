# Coaching Platform

Management Coaching Platform — Next.js frontend + Express/Prisma/Postgres backend.

## Repo layout

```
.                # Next.js 14 frontend (root)
└── server/      # Express + TypeScript + Prisma backend (Phase 3)
```

## Phases done

- **Phase 1** — Frontend scaffold: Next.js 14 + Tailwind, design tokens, all routes, Landing/Auth/Onboarding/Dashboard
- **Phase 2** — Portfolio builder: 3 templates, tabbed editor, live preview, public view
- **Phase 3** — Backend service: Express + Prisma + PostgreSQL + JWT (access + rotating refresh tokens), auth + portfolio endpoints
- **Phase 4** — Wire frontend to backend: real login/register, API-backed portfolio store with debounced auto-save, logout in nav

## Run end-to-end (recommended)

You need **both** the backend (with Postgres) and the frontend running.

```bash
# 1) Backend
cd server
cp .env.example .env
docker compose up -d
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run dev                  # http://localhost:4000

# 2) Frontend (in another terminal, from repo root)
cp .env.example .env.local   # NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
npm install
npm run dev                  # http://localhost:3000
```

Then: register at `/auth/register` → fill onboarding → go to `/portfolio/create` → load sample → edit (auto-saves to API) → click "เปิด Public View" to share.

## Frontend only (no backend)

```bash
npm install
npm run dev
```

You can still browse Landing/Auth/Onboarding/Dashboard/Coaches/Jobs UI, but Portfolio and Login will fail without the backend.

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

- **Phase 5** — Coaches, Sessions, Jobs endpoints + admin endpoints + file uploads
- **Phase 6** — Notifications, analytics, Redis cache + rate limiting

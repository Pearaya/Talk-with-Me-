# Coaching Platform — Backend

Express + TypeScript + Prisma + PostgreSQL + JWT.

## Quick start

```bash
cd server
cp .env.example .env

# 1) Start Postgres (Docker)
docker compose up -d

# 2) Install deps + generate Prisma client
npm install
npm run prisma:generate

# 3) Run first migration (creates tables)
npm run prisma:migrate -- --name init

# 4) Start dev server (auto-reload on changes)
npm run dev
```

Server runs on http://localhost:4000

## Endpoints (Phase 3)

Base URL: `/api/v1`

### Auth (`/auth`)
| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | `/register` | — | Body: `{ email, password, name }` |
| POST | `/login` | — | Body: `{ email, password }` |
| POST | `/refresh` | refresh cookie | Rotates refresh token |
| POST | `/logout` | refresh cookie | Revokes refresh token |
| GET  | `/me` | access | Returns current user |

### Portfolio (`/portfolio`)
| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/me` | access | Get caller's portfolio |
| PUT | `/me` | access | Upsert caller's portfolio |
| DELETE | `/me` | access | Delete caller's portfolio |
| GET | `/share/:token` | — | Public read by share token (404 if private) |

### Health
- `GET /health` → `{ status: "ok" }`

## Auth design

- JWT access token (15m, signed with `JWT_ACCESS_SECRET`) — sent as HttpOnly cookie `access_token` and accepted via `Authorization: Bearer ...` header.
- JWT refresh token (7d, signed with `JWT_REFRESH_SECRET`) — HttpOnly cookie `refresh_token`. SHA-256 hash stored in `RefreshToken` table for revocation.
- Refresh rotates the token (revokes previous, issues new) on every `/auth/refresh` call.
- `bcryptjs` (cost factor 12) for password hashing.

## Scripts

| Script | What |
|---|---|
| `npm run dev` | tsx watch (hot reload) |
| `npm run build` | tsc → `dist/` |
| `npm run start` | node dist/index.js |
| `npm run typecheck` | tsc --noEmit |
| `npm run prisma:generate` | regenerate Prisma client |
| `npm run prisma:migrate` | run pending migrations (dev) |
| `npm run prisma:studio` | open Prisma Studio |

## Schema

See `prisma/schema.prisma`. Models: `User`, `Coach`, `RefreshToken`, `Session`, `Goal`, `Skill` (+ `UserSkill`, `CoachSkill`), `CoachReview`, `Portfolio`, `Job`, `Content`.

## Next phases

- **3b** — wire frontend to backend (replace localStorage portfolio store with API; add login form posting to `/auth/login`)
- **3c** — Coaches, Sessions, Jobs endpoints + admin endpoints
- **3d** — Add Redis for refresh-token blacklist + rate limiting

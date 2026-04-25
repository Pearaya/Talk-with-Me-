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

# 4) Seed sample data (skills, 3 coaches, 3 jobs, 1 admin)
npm run prisma:seed

# 5) Start dev server (auto-reload on changes)
npm run dev
```

Server runs on http://localhost:4000

## Endpoints

Base URL: `/api/v1`

### Auth (`/auth`)
| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | `/register` | — | Body: `{ email, password, name }` |
| POST | `/login` | — | Body: `{ email, password }` |
| POST | `/refresh` | refresh cookie | Rotates refresh token |
| POST | `/logout` | refresh cookie | Revokes refresh token |
| GET  | `/me` | access | Returns current user |

### Users (`/users`)
| Method | Path | Auth | Notes |
|---|---|---|---|
| GET  | `/me` | access | Profile + skills |
| PUT  | `/me` | access | Update profile |
| POST | `/onboarding` | access | Save onboarding answers (status/workType/skills/goal) |

### Portfolio (`/portfolio`)
| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/me` | access | Get caller's portfolio |
| PUT | `/me` | access | Upsert caller's portfolio |
| DELETE | `/me` | access | Delete caller's portfolio |
| GET | `/share/:token` | — | Public read by share token (404 if private) |

### Coaches (`/coaches`)
| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/` | — | List + filters: `search`, `skill`, `minRating`, `maxRate`, `page`, `pageSize` |
| GET | `/:id` | — | Coach profile |
| GET | `/:id/availability` | — | Availability slots |
| POST | `/me` | access | Become a coach (also bumps role to COACH) |
| PUT | `/me` | access (coach) | Update own coach profile |
| POST | `/:id/review` | access | Write review (1–5) |

### Sessions (`/sessions`)
| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/` | access | All sessions for current user |
| GET | `/upcoming` | access | Next 5 upcoming |
| GET | `/report` | access | Stats `{ done, upcoming, total }` |
| POST | `/` | access | Book a session |
| GET | `/:id` | access (user/coach/admin) | Detail |
| PUT | `/:id` | access (user/coach) | Update notes/outcomes/status |
| DELETE | `/:id` | access (user) | Cancel |

### Jobs (`/jobs`)
| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/` | — | List + filters |
| GET | `/matched` | access | Sorted by skill-overlap match score |
| GET | `/:id` | — | Detail |

### Goals (`/goals`)
| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/` | access | List own goals |
| POST | `/` | access | Create goal |
| PUT | `/:id` | access | Update progress/status |
| DELETE | `/:id` | access | Delete |

### Skills (`/skills`)
| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/` | — | Skill list (?search= for autocomplete) |

### Admin (`/admin`) — `ADMIN` role required
| Method | Path | Notes |
|---|---|---|
| GET  | `/users` | List recent users |
| GET  | `/coaches` | All coaches (incl. unverified) |
| PUT  | `/coaches/:id/verify` | Mark coach verified |
| POST | `/jobs` | Create job posting |
| GET  | `/reports` | Aggregate stats |

### Upload (`/upload`)
| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | `/` | access | `multipart/form-data` with `file` field. Max 5MB. PNG/JPEG/WEBP/GIF/PDF. Returns `{ file: { url } }`. |

Uploaded files are served from `/uploads/<filename>`.

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

## Seeded admin

After `npm run prisma:seed`:

- email: `admin@coach.example`
- password: `Admin1234!`

## Next phases

- Add Redis for refresh-token blacklist + rate limiting
- Add S3/Cloudinary uploads (currently local fs in `uploads/`)

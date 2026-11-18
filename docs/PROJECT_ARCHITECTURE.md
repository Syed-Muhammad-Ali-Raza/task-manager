# TaskFlow project architecture

This document explains how the repository is put together and where to make changes. Keep it updated when the runtime structure changes.

## Stack

| Layer | Technology | Location |
| --- | --- | --- |
| Web UI | Next.js 16 App Router, React 19, Tailwind CSS | `apps/web` |
| API | Express 4, Zod, JWT, Prisma | `apps/api` |
| Shared contracts | Zod schemas + TypeScript types | `packages/shared` |
| Local data | In-process memory store (default) | `apps/api/src/store/memory.ts` |
| Hosted data | Neon Postgres (Free) via Prisma | `apps/api/prisma/schema.prisma` |
| Dev orchestration | npm workspaces + concurrently | root `package.json` |

## Directory map

```text
task-manager/
├── apps/
│   ├── api/
│   │   ├── api/index.ts            # Vercel serverless handler
│   │   ├── prisma/                 # schema + seed for Postgres mode
│   │   └── src/
│   │       ├── config/             # env + Prisma client
│   │       ├── middleware/         # auth, errors, rate limiting
│   │       ├── routes/             # auth, workspaces, tasks, invitations
│   │       ├── store/memory.ts     # seeded demo data for USE_IN_MEMORY=true
│   │       ├── app.ts              # Express app factory + /health
│   │       └── index.ts            # local server entrypoint
│   └── web/
│       ├── public/                 # icon.svg, llms.txt
│       └── src/
│           ├── proxy.ts             # Next 16 route guard (replaces middleware.ts)
│           ├── app/
│           │   ├── api/            # Next.js BFF: /session/*, /proxy/*
│           │   ├── dashboard/      # authenticated app (RSC + client islands)
│           │   ├── invite/         # public invitation join flow
│           │   ├── login/          # public sign-in page
│           │   ├── layout.tsx      # global metadata, system font stack
│           │   ├── page.tsx        # marketing homepage + JSON-LD
│           │   ├── robots.ts       # crawler rules
│           │   └── sitemap.ts      # public URLs
│           ├── components/
│           │   ├── dashboard/      # sidebar
│           │   ├── kanban/         # board, columns, cards, task detail
│           │   └── marketing/      # landing page
│           └── lib/
│               ├── api.ts          # client-side calls to /api/proxy/*
│               └── server-api.ts   # RSC calls to Express with Bearer token
├── docs/
│   ├── ARCHITECTURE_DECISIONS.md   # rate limits, caching, queues
│   ├── CI_CD.md                    # CI checks + Vercel CD
│   ├── DEPLOY_FREE.md              # Vercel + Neon deployment guide
│   ├── DEVELOPERS.md               # auth cookies, SSR, drag-and-drop notes
│   ├── PROJECT_ARCHITECTURE.md     # this file
│   └── agent-skills/               # focused guides for coding agents
└── packages/shared/                # shared Zod schemas and types
```

## Runtime topology

```text
                    ┌──────────────────────────┐
   Browser ────────▶│ Next.js (apps/web)       │
                    │  - RSC pages             │
                    │  - /api/session/*        │
                    │  - /api/proxy/*          │
                    └────────────┬─────────────┘
                                 │ Bearer JWT (server-side only)
                                 ▼
                    ┌──────────────────────────┐
                    │ Express (apps/api)       │
                    │  - security headers      │
                     │  - rate limits           │
                     │  - Zod validation        │
                    │  - auth + membership     │
                    │  - /api/* routes         │
                    └────────────┬─────────────┘
                                 ▼
                    ┌──────────────────────────┐
                    │ memory store  |  Postgres│
                    └──────────────────────────┘
```

The JWT is set as an httpOnly `tf_access` cookie by `apps/web/src/app/api/session/login/route.ts`. It never reaches browser JavaScript.

## Authentication and data flow

### Sign-in

1. Browser posts credentials to `/api/session/login`.
2. The Next.js handler calls Express `POST /api/auth/login`.
3. Express verifies the password and returns a JWT.
4. Next.js sets `tf_access` as httpOnly, `SameSite=Lax` (Secure in production).
5. The Next 16 `proxy.ts` checks for the cookie before rendering `/dashboard`.

### Server-rendered reads

`apps/web/src/lib/server-api.ts` reads the cookie and calls Express with `Authorization: Bearer ...`. Dashboard pages use `force-dynamic` so session and board data are not cached.

### Client mutations

`apiCall()` in `apps/web/src/lib/api.ts` always targets `/api/proxy/*`. The proxy forwards the request to Express with the cookie converted to a Bearer token. On 401 the client is redirected to `/login`.

### Drag-and-drop example

- `BoardView` owns a local copy of tasks for optimistic movement.
- `onMove` calls `moveTask()` in `board-workspace.tsx`, which PATCHes `/api/tasks/:id`.
- The response task is merged into the parent `board` state so filtering/searching cannot show a stale column. Do not remove that state sync.

## Data model (Postgres mode)

Core entities in `apps/api/prisma/schema.prisma`:

- `User` — email, name, password hash, image.
- `Workspace` + `WorkspaceMember` — workspace names are unique per user; roles are `owner`/`member`.
- `Board` — belongs to a workspace.
- `List` — ordered columns on a board.
- `Task` — board/list, title, description, key, priority, status, assignee, labels, due date, attachments.
- `Comment`, `Attachment`, `Invitation` — task discussion, uploads, and workspace joins.

The in-memory store mirrors these shapes with seeded demo data. It is intentionally simple and resets on restart. The hosted Neon database has the same schema plus a seeded demo user and board.

## Configuration

Root env template: `.env.example`.

- `apps/api/.env`: `DATABASE_URL`, `DIRECT_URL`, `PORT`, `JWT_SECRET`, `CORS_ORIGIN`, `FRONTEND_URL`, `USE_IN_MEMORY`, optional rate-limit overrides.
- `apps/web/.env.local`: `API_URL`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_APP_URL` (used for canonical URLs, sitemap, and robots).

`NEXT_PUBLIC_APP_URL` should be the public origin of the web app, e.g. `https://taskflow.example.com` in production or `http://localhost:3002` for local testing on that port.

## Search, AI, and accessibility surfaces

- Global metadata: `apps/web/src/app/layout.tsx`.
- Homepage structured data: `apps/web/src/app/page.tsx` (`WebSite`, `Organization`, `SoftwareApplication`).
- Crawler rules: `apps/web/src/app/robots.ts` disallows `/dashboard`, `/api/`, `/invite/`.
- Sitemap: `apps/web/src/app/sitemap.ts` includes only public, indexable pages.
- AI-friendly summary: `apps/web/public/llms.txt`.
- Favicon: `apps/web/public/icon.svg`.

Guidance for agents lives in `docs/agent-skills/`.

## Deployment and operations

- [DEPLOY_FREE.md](DEPLOY_FREE.md) — Vercel + Neon no-card deployment.
- [CI_CD.md](CI_CD.md) — CI checks and Vercel git-based CD.
- [ARCHITECTURE_DECISIONS.md](ARCHITECTURE_DECISIONS.md) — rate limiting, caching, and why there is no queue yet.
- [SECURITY.md](../SECURITY.md) — vulnerability reporting and security controls.

## Where to make common changes

| Change | Start here |
| --- | --- |
| New API endpoint | `packages/shared` schema → `apps/api/src/routes/*` → web caller |
| New dashboard page | `apps/web/src/app/dashboard/*`, use `serverApi()` for reads |
| New board interaction | `apps/web/src/components/kanban/BoardView.tsx` + `board-workspace.tsx` |
| SEO metadata for a page | That page's `metadata` export or a segment `layout.tsx` |
| Crawler or sitemap rules | `apps/web/src/app/robots.ts`, `sitemap.ts` |
| Styling tokens | `apps/web/tailwind.config.js`, `apps/web/src/app/globals.css` |

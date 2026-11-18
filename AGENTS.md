# AGENTS.md

Instructions for AI coding agents working in this repository.

## What this project is

TaskFlow is a collaborative task-management SaaS. It is a small monorepo with three workspaces:

- `apps/web` — Next.js 15 App Router UI (marketing site + dashboard)
- `apps/api` — Express 4 + Prisma API
- `packages/shared` — shared Zod schemas and TypeScript types

The app runs in two main surfaces: a public marketing site at `/` and an authenticated dashboard under `/dashboard`.

## Local setup

```bash
npm install
npm run dev
```

- Web: http://localhost:3000
- API health: http://localhost:3001/health

If port 3000 is already used by another app, run the web app on another port:

```bash
cd apps/web && npx next dev --port 3002
```

Docker/Postgres is optional. `apps/api/.env` sets `USE_IN_MEMORY=true`, which seeds demo data into the API process. With in-memory mode, data resets when the API restarts.

Useful scripts: `npm run dev:web`, `npm run dev:api`, `npm run db:up`, `npm run db:migrate`, `npm run db:seed`, `npm run lint`, `npm run typecheck`, `npm test`.

Before typechecking the API, generate the Prisma Client with `npm run prisma:generate -w @taskflow/api`. CI does this automatically. API integration tests live in `apps/api/tests` and spawn their own in-memory API on port 3101.

## Architecture in one minute

Browser → Next.js (`apps/web`) → Express (`apps/api`) → in-memory store or Postgres.

1. The browser signs in through `POST /api/session/login`, a Next.js route handler.
2. That handler calls Express `POST /api/auth/login` and stores the JWT in an httpOnly `tf_access` cookie.
3. Server Components read the cookie and call Express with `Authorization: Bearer ...` via `apps/web/src/lib/server-api.ts`.
4. Client mutations call `/api/proxy/*`; the proxy attaches the cookie as a Bearer token.
5. Express routes validate with Zod, check workspace membership, then read/write the store.

See [docs/PROJECT_ARCHITECTURE.md](docs/PROJECT_ARCHITECTURE.md) for the full layout and request flows.

## Rules to follow

- Never put JWTs, user records, or board state in `localStorage`.
- Put shared request/response shapes in `packages/shared`, not duplicated in both apps.
- Keep auth and membership checks in the Express routes; the proxy is not a security boundary by itself.
- Use Next.js `metadata` exports for titles, descriptions, canonical URLs, Open Graph, and robots rules. Do not hand-write `<head>` tags.
- Public pages should be indexable. Keep `/dashboard/*`, `/api/*`, and `/invite/*` out of search indexes and the sitemap.
- Prefer server-rendered content for anything that matters to search engines or AI crawlers. Avoid putting primary copy behind client-only JavaScript.
- Use semantic HTML, one `<h1>` per page, labelled form controls, descriptive link text, and visible focus states.
- Keep edits small and consistent with the surrounding code. Run `npx tsc --noEmit -p apps/web/tsconfig.json` after web changes.

## Agent skill docs

These are short, task-focused guides for agents working in this repo:

- [SEO skill](docs/agent-skills/seo/SKILL.md) — indexable pages, metadata, sitemap, robots, structured data.
- [GEO/AEO skill](docs/agent-skills/geo-aeo/SKILL.md) — generative-engine and answer-engine optimization.
- [Accessibility & performance skill](docs/agent-skills/accessibility-performance/SKILL.md) — inclusive UI and Core Web Vitals.

Also see [docs/DEVELOPERS.md](docs/DEVELOPERS.md) for auth cookies, SSR, and drag-and-drop notes.

## Known constraints

- In-memory mode is for demo/local use; it does not survive an API restart.
- Next.js fetches Google fonts at build/dev time; offline environments may see font retry warnings while compiling.
- npm 12 needs the `allowScripts` entry in `package.json` so esbuild's postinstall can run.

# TaskFlow

Collaborative task management SaaS (portfolio). Next.js frontend, Express API, PostgreSQL.

## Run locally

Docker is optional; the API defaults to an in-memory demo store.

1. Install, migrate, seed, and start (migrate/seed are only needed for Postgres mode):

```bash
npm install
cd apps/api
npx prisma migrate dev --name init
npx prisma db seed
cd ../..
npm run dev
```

2. Open http://localhost:3000

Demo login: `syed.ali@taskflow.dev` / `demo1234` (owner: Syed Ali)

- Web: http://localhost:3000
- API health: http://localhost:3001/health

Developer notes (auth cookies, SSR, drag-and-drop): [docs/DEVELOPERS.md](docs/DEVELOPERS.md)

Deploy for free with Vercel and Neon: [docs/DEPLOY_FREE.md](docs/DEPLOY_FREE.md). CI/CD details: [docs/CI_CD.md](docs/CI_CD.md).

## Layout

- `apps/web` — Next.js App Router UI
- `apps/api` — Express + Prisma
- `packages/shared` — Zod schemas and TypeScript types

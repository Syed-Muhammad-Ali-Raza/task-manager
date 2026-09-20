# TaskFlow

Collaborative task management SaaS (portfolio). Next.js frontend, Express API, PostgreSQL.

## Run locally

1. Start Postgres (Docker Desktop required):

```bash
docker compose up -d
```

2. Install, migrate, seed, start:

```bash
npm install
cd apps/api
npx prisma migrate dev --name init
npx prisma db seed
cd ../..
npm run dev
```

3. Open http://localhost:3000

Demo login: `syed.ali@taskflow.dev` / `demo1234` (owner: Syed Ali)

- Web: http://localhost:3000
- API health: http://localhost:3001/health

Developer notes (auth cookies, SSR, drag-and-drop): [docs/DEVELOPERS.md](docs/DEVELOPERS.md)

## Layout

- `apps/web` — Next.js App Router UI
- `apps/api` — Express + Prisma
- `packages/shared` — Zod schemas and TypeScript types

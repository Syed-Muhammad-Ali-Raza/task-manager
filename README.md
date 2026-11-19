# TaskFlow

[![CI](https://github.com/Syed-Muhammad-Ali-Raza/task-manager/actions/workflows/ci.yml/badge.svg)](https://github.com/Syed-Muhammad-Ali-Raza/task-manager/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Collaborative task management SaaS built as a portfolio project: a Next.js 16
App Router frontend, an Express 4 + Prisma API, shared Zod schemas, and
PostgreSQL via Neon (or an in-memory demo store locally).

## Live demo

- Web: https://taskflow-web-syed-ali.vercel.app
- API health: https://taskflow-api-syed-ali.vercel.app/health
- Demo login: `syed.ali@taskflow.dev` / `demo1234`

Use the hosted demo for evaluation only. Do not enter sensitive or
confidential information.

## First-time guide

New here? Follow the [10-minute guided tutorial](docs/FIRST_TIME_GUIDE.md), or
open `/guide` on the hosted site. It walks through signing in, opening a
workspace, creating and moving a task, inviting a teammate, and signing out.

## Run locally

Docker and Postgres are optional. The API defaults to an in-memory demo store
that resets when the API process restarts.

```bash
npm install
npm run dev
```

Open http://localhost:3000. The API health check is at
http://localhost:3001/health.

To use Postgres instead, start Docker, migrate, and seed:

```bash
npm run db:up
npm run db:migrate
npm run db:seed
npm run dev
```

Set the API environment variables in `apps/api/.env.local` first; never commit
`.env`, connection strings, or JWT secrets.

## What is inside

| Path | Purpose |
| --- | --- |
| `apps/web` | Next.js App Router UI: marketing site and authenticated dashboard |
| `apps/api` | Express API with Prisma, Zod validation, auth, and rate limits |
| `packages/shared` | Shared Zod schemas and TypeScript types |
| `docs` | Architecture, developer notes, deployment, CI/CD, and tutorials |
| `.github` | CI workflow, Dependabot config, issue templates, and funding config |

## Verify the project

```bash
npm run lint
npm run typecheck
npm test
npm run build -w @taskflow/web
npm audit --omit=dev
```

Before typechecking the API, generate Prisma Client with
`npm run prisma:generate -w @taskflow/api`. CI does this automatically. API
integration tests spawn their own in-memory API on port 3101.

## Documentation

- [First-time guide](docs/FIRST_TIME_GUIDE.md) — beginner walkthrough
- [Project architecture](docs/PROJECT_ARCHITECTURE.md) — layout and request flows
- [Developer notes](docs/DEVELOPERS.md) — auth cookies, SSR, drag-and-drop
- [Deploy for free](docs/DEPLOY_FREE.md) — Vercel Hobby + Neon free tier
- [CI/CD](docs/CI_CD.md) — CI checks and current delivery status
- [Architecture decisions](docs/ARCHITECTURE_DECISIONS.md) — rate limits,
  caching, and queue decision
- [Security policy](SECURITY.md) — vulnerability reporting
- [Privacy policy](PRIVACY.md) — what the demo stores
- [Terms of service](TERMS.md) — rules for using the hosted demo
- [Sponsors and support](SPONSORS.md) — ways to support the project

Public web pages mirror the legal and support docs at `/privacy`, `/terms`,
`/license`, and `/sponsors`. Private routes (`/dashboard/*`, `/api/*`, and
`/invite/*`) are excluded from robots and the sitemap.

## Design and security notes

- Sessions live in httpOnly cookies; JWTs are never stored in `localStorage`.
- Authentication, workspace membership, and roles are checked in Express.
- Shared Zod schemas validate API input.
- API and proxy responses containing account data use `Cache-Control: no-store`.
- Helmet, rate limits, and secure cookie settings protect the API.
- Production fails fast when `JWT_SECRET` is missing.
- CI runs lint, typecheck, tests, dependency audit, and a web build on every
  pull request and push to `main`.

## Deployment status

The live sites are currently deployed with the Vercel CLI. GitHub Actions CI
runs on pushes, but the Vercel projects are not yet connected to GitHub, so a
push does not automatically deploy. See [docs/CI_CD.md](docs/CI_CD.md) for the
steps to enable push-to-deploy.

## Support

TaskFlow is free and open source. The easiest ways to help are to star the
repository, share it, improve the docs, report a reproducible bug, or open a
pull request. See [SPONSORS.md](SPONSORS.md) for sponsorship details.

## License

Released under the [MIT License](LICENSE). Copyright (c) 2026 Syed Ali. The
license covers the source code; the hosted demo is also subject to the
[Terms](TERMS.md) and [Privacy policy](PRIVACY.md).

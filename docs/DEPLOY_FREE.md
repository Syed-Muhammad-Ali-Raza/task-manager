# Deploy TaskFlow for free (no credit card)

TaskFlow runs on free tiers only:

| Part | Platform | Plan | URL shape |
| --- | --- | --- | --- |
| Next.js web app | Vercel Hobby | $0 | `https://<web-project>.vercel.app` |
| Express API | Vercel serverless | $0 | `https://<api-project>.vercel.app` |
| Postgres | Neon Free | $0 | Managed PostgreSQL |

Both Vercel projects deploy automatically from the same GitHub repository. Pushing to `main` deploys production; pushing another branch creates a preview.

> Render is not used: its free web-service signup currently asks for card verification, which conflicts with the no-card requirement.

## Free-tier limits

- Neon free projects pause after inactivity and wake on the next connection; the first request can be slower.
- Vercel Hobby has fair-use limits and is not for commercial traffic.
- Uploaded attachments are not durable in serverless mode. The local in-memory demo supports attachments; the Postgres deployment returns `501` for that endpoint until object storage is added.
- Rate limits are per serverless instance. They stop bursts and basic brute force, not a distributed fleet-wide attack. See [architecture decisions](ARCHITECTURE_DECISIONS.md).

## 1. Prepare the Neon database

1. Sign in at <https://console.neon.tech/> and create a project.
2. Keep the default `neondb` database and region close to your users.
3. In **Connection details**, copy both:
   - the pooled connection string (used as `DATABASE_URL`)
   - the direct connection string (used as `DIRECT_URL`)
4. Apply `apps/api/prisma/schema.prisma` to the database. From the repository root:

   ```bash
   cd apps/api
   npx prisma db push
   npx prisma db seed
   ```

   `DIRECT_URL` is required by Prisma schema commands. The app uses the pooled `DATABASE_URL` at runtime.

Never commit either connection string. Only placeholders belong in `.env.example`.

## 2. Deploy the API to Vercel

1. Open <https://vercel.com/new> and import `Syed-Muhammad-Ali-Raza/task-manager`.
2. Leave **Root Directory** at the repository root so npm workspaces can resolve `@taskflow/shared`.
3. Use Framework Preset **Other** and Node.js 22. Leave the build, output, and install commands at their defaults; the root `vercel.json` and `vercel-build` script handle the API.
4. Add these Environment Variables for **Production**, **Preview**, and **Development**:

   | Name | Value |
   | --- | --- |
   | `DATABASE_URL` | Pooled Neon connection string |
   | `DIRECT_URL` | Direct Neon connection string |
   | `JWT_SECRET` | Long random string (different from development) |
   | `USE_IN_MEMORY` | `false` |
   | `CORS_ORIGIN` | Web project URL from step 3 |
   | `FRONTEND_URL` | Web project URL from step 3 |

   Leave `CORS_ORIGIN` and `FRONTEND_URL` as `http://localhost:3000` for the first deploy, then update them after the web project exists.

5. Deploy. The root `vercel.json` rewrites all requests to the Express handler in `apps/api/api/index.ts`.

Verify:

```text
GET https://<api-project>.vercel.app/health
```

Expected: `{"status":"ok","db":"up"}`.

## 3. Deploy the web app to Vercel

1. Open <https://vercel.com/new> again and import the same repository.
2. Set **Root Directory** to `apps/web`.
3. Use the detected Next.js preset and Node.js 22.
4. Add these Environment Variables:

   | Name | Value |
   | --- | --- |
   | `API_URL` | `https://<api-project>.vercel.app` |
   | `NEXT_PUBLIC_API_URL` | Same API URL |
   | `NEXT_PUBLIC_APP_URL` | `https://<web-project>.vercel.app` |

5. Deploy, then copy the web URL into the API project's `CORS_ORIGIN` and `FRONTEND_URL`, and redeploy the API.

## 4. Verify the live app

- `/` — public marketing page, indexable.
- `/login` — public sign-in page.
- `/robots.txt` — blocks `/dashboard`, `/api/`, and `/invite/`.
- `/sitemap.xml` — only public pages.
- `/llms.txt` — AI-friendly product summary.
- Sign in with `syed.ali@taskflow.dev` / `demo1234`.
- `/dashboard` — server-rendered workspace and board data.

## 5. Continuous delivery

Vercel handles CD from GitHub. The repository workflow in `.github/workflows/ci.yml` checks lint, types, tests, the production dependency audit, and the web build on every push and pull request.

Useful checks locally:

```bash
npm run lint
npm run typecheck
npm test
npm run build -w @taskflow/web
npm audit --omit=dev
```

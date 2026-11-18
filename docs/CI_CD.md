# CI/CD

## Continuous integration

`.github/workflows/ci.yml` runs on every pull request and push to `main`:

1. Install dependencies from `package-lock.json`.
2. Build the shared Zod/type package and generate the Prisma Client.
3. Lint both workspaces.
4. Typecheck both workspaces.
5. Run API integration tests.
6. Audit production dependencies (`npm audit --omit=dev`).
7. Build the Next.js app.

Duplicate runs for the same ref are cancelled automatically. Dependabot opens weekly update PRs for npm packages and GitHub Actions.

## Continuous delivery

CD is handled by Vercel's GitHub integration, so no repository secret is needed:

- Push to `main` → production deployment for both Vercel projects.
- Push to any other branch or open a PR → preview deployment.
- Each project uses the `apps/api` or `apps/web` root directory.
- Environment variables are managed in the Vercel dashboard, never in Git.

The Neon database is shared by production and previews. Do not run destructive schema changes from a preview deployment; use a separate Neon branch for migration testing when that workflow is introduced.

See [DEPLOY_FREE.md](DEPLOY_FREE.md) for the exact Vercel and Neon setup.

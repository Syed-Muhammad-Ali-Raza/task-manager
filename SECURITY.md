# Security policy

## Supported versions

This repository is a portfolio/demo application. Security fixes are applied to the `main` branch.

## Reporting a vulnerability

Please do not open a public issue for a security problem. Email `syed.ali@taskflow.dev` with:

- affected route or component
- steps to reproduce
- impact and suggested fix, if known

You should receive an acknowledgement within a few days. Please allow time for a fix before public disclosure.

## Security controls in this repository

- Authentication is handled by Express; the Next.js proxy is not treated as a security boundary.
- JWTs are stored only in httpOnly, `SameSite=Lax`, Secure-in-production cookies.
- Workspace membership and role checks live in the API routes.
- Express uses Helmet, disables `x-powered-by`, validates input with shared Zod schemas, and applies IP-based rate limits.
- API and proxy responses use `Cache-Control: no-store`; authenticated data is not cached in shared caches.
- Production deployments fail fast when `JWT_SECRET` is missing.
- CI runs lint, typecheck, tests, a production dependency audit, and a production web build on every pull request.
- Dependabot checks for dependency updates weekly.

## Secrets

Never commit `.env`, `.env.local`, Neon connection strings, JWT secrets, or provider API keys. Use platform environment variables in Vercel and keep local secrets in gitignored files.

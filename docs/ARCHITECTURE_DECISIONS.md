# Architecture decisions

Short notes on operational choices that are easy to second-guess.

## Backend-for-frontend

The browser talks only to the Next.js app. `/api/session/*` manages the httpOnly cookie and `/api/proxy/*` forwards authenticated calls to Express. Server Components call Express directly with the Bearer token. This keeps JWTs out of JavaScript storage and lets the web app own session boundaries.

## Rate limiting

`apps/api/src/middleware/rateLimit.ts` implements a fixed-window limiter:

- auth routes: 10 requests / 15 minutes per IP
- all other API routes: 300 requests / 5 minutes per IP
- configurable with `AUTH_RATE_LIMIT_MAX`, `AUTH_RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX`, and `RATE_LIMIT_WINDOW_MS`

This is intentionally dependency-free and per instance. On Vercel, each serverless instance has its own counters, so the effective limit is higher than the configured number. Upgrade to a shared store such as Upstash Redis when a cluster-wide hard limit is required. The free no-card stack does not include Redis.

## Caching

- Authenticated API responses and the Next.js proxy set `Cache-Control: no-store`.
- Dashboard pages are dynamic and read cookies, so they are never statically cached.
- Public marketing pages remain statically prerendered and safe for CDN caching.
- No application-level cache is used. The data set is small and Neon adds enough latency that premature caching would create invalidation bugs.

## Queues

No queue is used. Current writes are short, synchronous Postgres transactions (task updates, comments, invitations), and there is no background work that outlives a request. Adding a queue would introduce another free service, operational state, and retry semantics without solving a current problem.

Revisit this when adding email delivery, large imports, webhooks, or notifications. Those are natural queue consumers because they can be retried independently of the request.

## Serverless uploads

Local/in-memory mode writes uploaded files under `apps/api/uploads`. Vercel's filesystem is read-only, so serverless mode uses multer memory storage and the Postgres attachment endpoint returns `501` rather than failing with a filesystem error. Add Neon Object Storage or another S3-compatible bucket before enabling durable attachments in production.

## Security headers and secrets

- Express uses Helmet; Next.js adds HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and `Permissions-Policy`.
- Production refuses to start without `JWT_SECRET`.
- The proxy preserves upstream `no-store` headers.
- CI audits production dependencies on every change.

# TaskFlow developer guide

Collaborative task SaaS: Next.js App Router (`apps/web`), Express API (`apps/api`), shared Zod types (`packages/shared`).

## Run

```bash
npm install
npm run dev
```

- Web: http://localhost:3000
- API: http://localhost:3001/health
- Owner: `syed.ali@taskflow.dev` / `demo1234`

Docker is optional. With `USE_IN_MEMORY=true` (default) the API keeps data in process memory. For Postgres:

```bash
docker compose up -d
# apps/api/.env → USE_IN_MEMORY=false
cd apps/api
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

## Auth (httpOnly cookies, no localStorage)

The JWT never lives in the browser. Next.js is the BFF:

1. Browser `POST /api/session/login` with email/password.
2. Next.js calls Express `/api/auth/login`, then sets `tf_access` as **httpOnly**, `SameSite=Lax`, `Secure` in production.
3. Dashboard React Server Components read the cookie and call Express with `Authorization: Bearer`.
4. Browser mutations go to `/api/proxy/...`. The proxy attaches the cookie as a Bearer token. The client never sees the JWT.

Logout: `POST /api/session/logout` clears the cookie.

Express also accepts a Bearer token or a `tf_access` cookie, so the API stays usable from Postman or a future mobile client.

## Server-rendered surfaces

| Route | Data source |
| --- | --- |
| `/dashboard` | RSC `serverApi('/api/workspaces')` |
| `/dashboard/boards/[id]` | RSC `serverApi('/api/boards/:id')` then client DnD |
| `/dashboard` layout | RSC `GET /api/auth/me` for the sidebar |

Middleware blocks `/dashboard/*` when `tf_access` is missing.

## Kanban drag and drop

`BoardView` uses `@dnd-kit`. Dropping a card onto a column `PATCH`es `/api/tasks/:id` with `{ status }`. The API also moves `listId` to the matching list (`todo` → position 0, `in_progress` → 1, `done` → 2).

## Folders

```
apps/web/src/app/api/session   # cookie login / join / logout
apps/web/src/app/api/proxy     # authenticated BFF proxy
apps/web/src/lib/server-api.ts # RSC fetch helper
apps/api/src/routes            # Express handlers
apps/api/prisma/schema.prisma  # production data model
```

## Adding an endpoint

1. Zod schema in `packages/shared`.
2. Express route with `authMiddleware` and membership checks.
3. Call it from an RSC via `serverApi` or from the client via `apiCall('/api/...')`.

Do not put tokens, user records, or board state in `localStorage`.

## Env

See `.env.example`. Web needs `NEXT_PUBLIC_API_URL` / `API_URL` for the server-side fetch to Express (`http://localhost:3001`).

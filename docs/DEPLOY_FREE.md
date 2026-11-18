# Deploy TaskFlow for free

This deploys TaskFlow on two free tiers. No credit card, no paid database.

| Part | Platform | Plan | URL shape |
| --- | --- | --- | --- |
| Next.js web app | Vercel | Hobby ($0) | `https://<project>.vercel.app` |
| Express API | Render | Free web service ($0) | `https://<service>.onrender.com` |

Both platforms deploy from your GitHub repo, so pushing a commit redeploys automatically.

> **Free-tier limits:** Render free services spin down after about 15 minutes of inactivity, so the first request after a pause can take up to a minute. With `USE_IN_MEMORY=true`, demo data resets whenever the API sleeps or redeploys. That is expected for a free demo — do not store real data here.

## Before you start

- Make sure the commit that adds `render.yaml` is pushed to your default branch on GitHub.
- Have your GitHub repository URL ready (for example `https://github.com/<you>/task-manager`).
- Demo login: `syed.ali@taskflow.dev` / `demo1234`.

## 1. Deploy the API on Render

1. Open <https://dashboard.render.com/> and sign in.
2. Click **New** → **Blueprint**.
3. Select your GitHub repository. If GitHub is not connected yet, connect it and allow access to that repository.
4. Render detects `render.yaml` at the repo root. Review the single `taskflow-api` service, confirm the plan is **Free**, then click **Apply**.
5. Wait for the first build to finish. The service page shows a URL like `https://taskflow-api-xxxx.onrender.com`.
6. Verify the API: open `<your Render URL>/health`. You should see:

   ```json
   {"status":"ok","db":"memory"}
   ```

7. Copy the Render URL **without a trailing slash**. You need it in the next step.

The blueprint sets `NODE_VERSION=22`, `USE_IN_MEMORY=true`, and generates a random `JWT_SECRET`. It does not create a database.

## 2. Deploy the web app on Vercel

1. Open <https://vercel.com/new> and sign in.
2. Click **Import** next to the same GitHub repository.
3. On the import screen:
   - **Project Name:** pick a name, for example `taskflow`. The production domain shown on this screen (for example `https://taskflow.vercel.app`) is your `NEXT_PUBLIC_APP_URL` — copy it.
   - **Framework Preset:** Next.js (detected automatically).
   - Click **Edit** next to **Root Directory** and enter `apps/web`.
   - Leave **Build Command** and **Output Directory** at their defaults (`npm run build` and `.next`).
4. Expand **Environment Variables** and add:

   | Name | Value |
   | --- | --- |
   | `API_URL` | the Render URL from step 1 |
   | `NEXT_PUBLIC_API_URL` | the same Render URL |
   | `NEXT_PUBLIC_APP_URL` | your Vercel URL |

   Use `https://`, no trailing slash, no quotes.

5. Click **Deploy** and wait for the build.
6. Open your Vercel URL — the marketing page should load.

`API_URL` is used by the login route, the proxy, and server components. `NEXT_PUBLIC_API_URL` is a fallback for the same value. `NEXT_PUBLIC_APP_URL` is used for canonical URLs, `robots.txt`, `sitemap.xml`, and structured data.

## 3. Point the API back at Vercel

1. On Render, open `taskflow-api` → **Environment** in the left sidebar.
2. Add these two variables and choose **Save and deploy**:

   | Name | Value |
   | --- | --- |
   | `CORS_ORIGIN` | your Vercel URL |
   | `FRONTEND_URL` | your Vercel URL |

   `FRONTEND_URL` builds invitation links. `CORS_ORIGIN` allows direct browser calls to the API if you ever need them.

3. Wait for the redeploy to finish.

## 4. Verify

- [ ] `<Render URL>/health` returns `{"status":"ok","db":"memory"}`
- [ ] `<Vercel URL>/` shows the marketing page
- [ ] `<Vercel URL>/login` works with `syed.ali@taskflow.dev` / `demo1234`
- [ ] `<Vercel URL>/dashboard` shows the workspace after sign-in
- [ ] A new task survives a page reload (until the API restarts)
- [ ] `<Vercel URL>/robots.txt`, `/sitemap.xml`, and `/llms.txt` load, and the sitemap uses the Vercel URL
- [ ] View source on the home page and confirm JSON-LD URLs use the Vercel URL

## Troubleshooting

- **"Could not sign in":** the Render service may be asleep. Open `/health` first to wake it, wait for the JSON response, then try again.
- **Vercel build fails on a missing package:** confirm **Root Directory** is `apps/web`. This repo is an npm workspace monorepo.
- **API returns 502 or times out:** check the Render service is awake and its logs end with `TaskFlow API on http://...`.
- **Canonical or sitemap URLs say localhost:** `NEXT_PUBLIC_APP_URL` is missing or has a trailing slash. Fix it in Vercel and redeploy.
- **Login works but redirects/broken links:** set `FRONTEND_URL` on Render and redeploy.

## Keeping it free

- Stay on Vercel **Hobby** and Render **Free**. Do not add a paid database, Redis, or other paid add-ons.
- Render includes 750 free instance-hours/month and 5 GB outbound bandwidth; Vercel Hobby is $0.
- Both free tiers are intended for personal projects and prototypes. Check the current provider terms if you plan to use this commercially.

## Local development is unchanged

```bash
npm install
npm run dev   # web http://localhost:3000, API http://localhost:3001
```

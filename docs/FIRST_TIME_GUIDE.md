# First-time guide

This is a 10-minute tour of TaskFlow. It works on the hosted demo and on a
local install. No credit card, database setup, or team signup is required.

## Before you start

- Hosted app: https://taskflow-web-syed-ali.vercel.app
- Demo login: `syed.ali@taskflow.dev` / `demo1234`
- Local app: http://localhost:3000 after `npm install && npm run dev`

The hosted demo and local in-memory mode are for evaluation. Do not put
sensitive data in a task, comment, or invite.

## Step 1 — Sign in

1. Open the app and choose **Sign in**.
2. Enter the demo email and password.
3. You land on `/dashboard`.

TaskFlow keeps the session in an httpOnly cookie. The JWT is never written to
`localStorage`.

## Step 2 — Meet your workspace

1. On **Workspaces**, open the seeded **TaskFlow Demo** card.
2. Notice the workspace is the security boundary: every board, member, and
   invite belongs to one workspace.
3. Optional: create a second workspace with a unique name. Duplicate names
   are rejected, and existing cards can be renamed inline.

## Step 3 — Open a board

1. Use the sidebar to open the seeded board.
2. The board has three lists: **Ready**, **In motion**, and **Shipped**.
3. Use **Search board** to filter cards by title.

## Step 4 — Create a task

1. Choose **+ Create** in the board header.
2. Type a short title, for example `Publish the launch checklist`.
3. Press **Create**, then open the card to add a description, priority,
   assignee, labels, or comments.

The board and the task detail panel save through the Express API, not from
browser-only state.

## Step 5 — Move work forward

1. Drag the card from **Ready** to **In motion**.
2. Open it again and leave a comment explaining the next action.
3. Move it to **Shipped** when the demo work is done.

Drag and drop is keyboard-friendly, and the board preview on the home page
lets you try the interaction before signing in.

## Step 6 — Invite a teammate

1. Open **People** in the dashboard sidebar.
2. Choose the workspace, enter an email, and pick a role:
   `member`, `admin`, or `viewer`.
3. Choose **Send invitation**, then copy the generated invite link.
4. Open the link to see the join flow.

Roles and membership checks are enforced by the API. The Next.js proxy does
not decide who is allowed to see a workspace.

## Step 7 — Check settings and sign out

1. Open **Billing/Settings** to see the demo settings surface.
2. Sign out from the sidebar.
3. Sign back in with the same demo account to confirm the session flow.

## If something looks wrong

- **Demo password does not work:** use exactly `demo1234`; the hosted demo and
  local in-memory mode use the same seeded account.
- **Local data disappeared:** in-memory mode resets when the API restarts.
  This is expected.
- **A request returns 429:** API rate limits are active. Wait a moment and
  try again.
- **Workspace name rejected:** names must be unique; rename the existing
  workspace instead.
- **Private pages are not in search:** `/dashboard/*`, `/api/*`, and
  `/invite/*` are intentionally excluded from indexing.

## What to read next

- [Project architecture](PROJECT_ARCHITECTURE.md) — request flows and layout.
- [Developer notes](DEVELOPERS.md) — cookies, SSR, and drag-and-drop.
- [Architecture decisions](ARCHITECTURE_DECISIONS.md) — rate limits, caching,
  and why queues are not needed yet.
- [Deployment](DEPLOY_FREE.md) — free Vercel and Neon setup.
- [CI/CD](CI_CD.md) — checks and deployment status.
- [Privacy policy](../PRIVACY.md) and [Terms](../TERMS.md).

The same guide is available in the app at `/guide`.

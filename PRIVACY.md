# Privacy policy

**Effective date:** November 19, 2026

TaskFlow is a portfolio demo operated by Syed Ali. This policy explains what
the app stores and why. It applies to the hosted demo and to the source-code
project when you run it yourself.

## What we store

| Category | Examples | Why |
| --- | --- | --- |
| Account details | Name, email address, password hash, workspace role | Sign you in and decide what you can access. |
| Workspace content | Workspaces, boards, lists, tasks, comments, invitations | Provide the core task-management features. |
| Session data | An httpOnly `tf_access` cookie containing a signed JWT | Keep you signed in without exposing the token to JavaScript. |
| Technical data | IP address and request metadata | Apply rate limits, protect the API, and diagnose failures. |

Passwords are hashed before storage. TaskFlow does not store raw JWTs in
`localStorage`, and it does not set advertising or third-party analytics
cookies.

## Where data lives

- **Local demo mode:** the API uses an in-memory store. Data disappears when
  the API process restarts.
- **Hosted demo:** application data is stored in Neon Postgres. The Next.js
  app and API run on Vercel. Those providers may process infrastructure logs
  under their own privacy policies.

## How we use data

We use the information above only to operate the app, keep it secure, and
respond to support requests. We do not sell personal data and we do not use
workspace content for advertising.

## Sharing and retention

TaskFlow does not intentionally share workspace content with third parties.
Hosting providers process data on our behalf to run the service. In local
in-memory mode, data is temporary. On the hosted demo, data remains until you
delete it or we remove an inactive demo workspace. Email
`syed.ali@taskflow.dev` to request deletion of a hosted demo account.

## Security

Access checks happen in the Express API, including workspace membership and
role checks. API and proxy responses that contain account data use
`Cache-Control: no-store`. Input is validated with shared Zod schemas. The
API uses Helmet, secure cookie settings, and IP-based rate limits. See
[SECURITY.md](SECURITY.md) for vulnerability reporting.

## Children

TaskFlow is not directed at children under 13. Do not submit personal
information about children to the demo.

## Your choices

You can sign out, delete content you created, or ask for account deletion.
Because this is a demo, do not use it for sensitive, confidential, or
production-critical data.

## Changes

We may update this policy when the app changes. The effective date at the top
of this file identifies the current version. Material changes will be noted
in the repository history.

## Contact

Questions about privacy: `syed.ali@taskflow.dev`.

The public version of this policy is also available at `/privacy` on the
hosted web app. Source code is licensed under the [MIT License](LICENSE);
this policy governs use of the hosted demo.

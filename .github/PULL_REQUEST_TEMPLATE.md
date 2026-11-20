## What changed

<!-- Give a short summary of the change. -->

## Why

<!-- Explain the problem this fixes or the value this adds. -->

## Related issue

<!-- Example: Closes #123. Remove this line if there is no issue. -->

Closes #

## Type of change

- [ ] Bug fix
- [ ] New feature
- [ ] Docs or tooling
- [ ] Refactor or maintenance
- [ ] Breaking change

## How to test

1. 
2. 
3. 

## Screenshots or recordings

<!-- Add these for visible UI changes. Remove this section if not needed. -->

## Checklist

- [ ] The change does what this PR describes, with no unrelated changes.
- [ ] The `verify` CI check is green on the latest commit.
- [ ] No secrets, tokens, passwords, or connection strings are included.
- [ ] Auth, workspace membership, and role checks remain in Express routes.
- [ ] Shared API request/response shapes live in `packages/shared`.
- [ ] No JWTs, user records, or board state are stored in `localStorage`.
- [ ] All 7 language dictionaries were updated if UI text changed.
- [ ] English LTR and Arabic RTL layouts were checked for UI changes.
- [ ] Labels, focus states, metadata, and canonical URLs were checked for public-page changes.
- [ ] Tests were added or updated where behavior changed.
- [ ] Destructive database changes use a separate Neon branch or have a documented plan.
- [ ] Production deployment is planned after merge because Vercel auto-deploy is not enabled.

## Before merging

- [ ] At least one reviewer has approved this PR.
- [ ] The required `verify` check passed on the latest commit.

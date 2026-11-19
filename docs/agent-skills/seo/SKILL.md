---
name: seo
description: Apply search-engine-friendly metadata, indexing, structured data, and content structure to the TaskFlow Next.js app.
---

# SEO skill

Use this when adding or changing public pages, metadata, links, or content in `apps/web`.

## Scope

Only public routes should be indexable: `/`, `/guide`, `/sponsors`, `/privacy`, `/terms`, `/license`, and any future marketing/content pages. Never add `/dashboard/*`, `/api/*`, or `/invite/*` to the sitemap.

## What is already implemented

- `src/app/layout.tsx`: metadata base, title template, description, keywords, Open Graph, Twitter card, icons, robots policy.
- `src/app/page.tsx`: JSON-LD for `WebSite`, `Organization`, and `SoftwareApplication`.
- `src/app/sitemap.ts`: public URLs only.
- `src/app/robots.ts`: disallows private routes, points to the sitemap.
- `src/app/login/layout.tsx`: login page is `noindex`.
- `src/app/dashboard/layout.tsx`: dashboard is `noindex, nofollow`.
- `public/icon.svg`: favicon.
- `public/llms.txt`: concise site summary for AI crawlers, including the public guide and policy pages.
- `_new public pages`: `/guide`, `/sponsors`, `/privacy`, `/terms`, and `/license` use `PublicPageShell` and are listed in `sitemap.ts`.

## Checklist for a new public page

1. Export a `metadata` object from the page or a segment `layout.tsx`:
   - unique `title` (the root template appends `| TaskFlow`);
   - distinct `description` (about 150–160 characters);
   - `alternates.canonical` matching the real public path;
   - `openGraph` and `twitter` values when the page is shareable.
2. Use exactly one `<h1>`. Use `<h2>`/`<h3>` in a logical order; do not skip levels for visual reasons.
3. Keep primary copy in server-rendered HTML. Avoid rendering important text only after client hydration.
4. Use descriptive link text ("Open the board", not "click here") and real `<a href>` links.
5. Add `alt` text to informative images; use empty `alt=""` for decorative ones.
6. Add the page to `src/app/sitemap.ts` if it should be indexed.
7. Update `robots.ts` only if a new private route family needs to be excluded.

## Structured data rules

- Use `application/ld+json` scripts rendered on the server.
- Describe things that actually exist on the page. Do not mark up hidden or fake content.
- Prefer `@graph` when combining `WebSite`, `Organization`, and product/app entities.
- Keep `@id` values stable, using the public origin plus a fragment.

## Validate locally

With the web app running:

```bash
curl http://localhost:3002/robots.txt
curl http://localhost:3002/sitemap.xml
curl http://localhost:3002/llms.txt
```

Then run Lighthouse or the browser console checks for:

- one title and one meta description;
- canonical URL present and self-referencing;
- no `noindex` on pages that should be indexed;
- structured data parses without errors;
- no render-blocking or redirecting canonical chains.

## Avoid

- Duplicate titles/descriptions across pages.
- Canonical URLs pointing at `localhost` in production (set `NEXT_PUBLIC_APP_URL`).
- Putting private or demo-only data in structured data or the sitemap.
- Keyword stuffing; write for humans first, then make entities explicit.

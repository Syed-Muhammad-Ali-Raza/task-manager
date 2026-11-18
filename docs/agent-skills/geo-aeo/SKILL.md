---
name: geo-aeo
description: Optimize TaskFlow's public content so generative engines and answer engines can understand, cite, and summarize it accurately.
---

# GEO / AEO skill

GEO (Generative Engine Optimization) helps AI systems such as AI Overviews and chat assistants understand and cite a site. AEO (Answer Engine Optimization) focuses on direct answers to questions, including voice and featured snippets. Both build on good SEO; they do not replace it.

## Core principles

1. **Answer first.** Put a short, direct answer in the first paragraph or list under a heading.
2. **Name entities clearly.** Use "TaskFlow", "Next.js App Router", "Express", "httpOnly cookies" explicitly rather than vague pronouns.
3. **Use question-shaped headings where natural.** For example: "How does TaskFlow handle sessions?"
4. **Keep facts in HTML text.** Do not hide important answers inside images, canvas, or client-only state.
5. **Be consistent.** Product name, description, and claims should match across metadata, JSON-LD, `llms.txt`, and visible copy.
6. **Make content easy to quote.** Short paragraphs, bullet lists, and tables are more likely to be summarized accurately.

## Already in this repo

- `apps/web/src/app/page.tsx` emits JSON-LD with `WebSite`, `Organization`, and `SoftwareApplication` entities.
- `apps/web/src/app/layout.tsx` provides consistent title, description, and Open Graph text.
- `apps/web/public/llms.txt` gives AI crawlers a compact, human-readable site map and key facts.
- `docs/PROJECT_ARCHITECTURE.md` and `docs/DEVELOPERS.md` provide authoritative technical detail that can inform answers.

## How to add GEO/AEO-friendly content

When adding a public page or FAQ:

- Start sections with a 1–2 sentence answer, then add detail.
- Prefer a definition + example structure: "TaskFlow is ... It uses ... so that ...".
- Add `FAQPage` JSON-LD only if the questions and answers are visible on the page. Never mark up invisible FAQs.
- Link related pages with descriptive anchor text so crawlers can follow the entity graph.
- Include dates or version labels for time-sensitive claims.
- Keep `llms.txt` updated when public pages or product facts change.

## Crawler access

`apps/web/src/app/robots.ts` currently allows all user agents on public paths and blocks private ones. If product policy changes for AI crawlers, update that file deliberately and document the decision here. Do not silently block or allow specific bots.

## Validation

- Fetch `/llms.txt` and confirm it matches current public pages and product facts.
- Check that JSON-LD parses and that its `@id` values use the production origin.
- Ask an answer engine about "What is TaskFlow?" and compare its wording to your metadata/JSON-LD. Divergence usually means inconsistent facts.
- Review rendered HTML (not just the browser UI) to confirm answers are present without JavaScript.

## Avoid

- Claims in structured data that are not visible on the page.
- Thin pages that only repeat the same sentence with different keywords.
- Blocking AI crawlers in `robots.txt` while expecting to be cited.
- Letting demo-only or private data leak into public copy.

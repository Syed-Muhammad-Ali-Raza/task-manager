---
name: accessibility-performance
description: Keep TaskFlow's UI inclusive and fast, with practical checks for accessibility and Core Web Vitals.
---

# Accessibility & performance skill

Use this when building UI in `apps/web`, reviewing a pull request, or touching global layout and styling.

## Accessibility basics

- Use semantic landmarks: `<main>`, `<nav>`, `<header>`, `<aside>`, `<footer>`. Avoid nested `<main>` elements.
- Use exactly one `<h1>` per page and keep heading levels in order.
- Label every form control. In this repo, wrapping `<input>` in `<label>` is common and acceptable.
- Buttons need accessible names. Icon-only buttons need `aria-label` (the drag handles already do this).
- Link text should make sense out of context. Avoid "click here" and repeated bare labels.
- Decorative images use `alt=""`; informative images get a short description.
- Keep visible focus styles. Do not remove outlines without providing an equal replacement.
- Support keyboard use for custom interactions. The board uses `KeyboardSensor` in addition to `PointerSensor`.
- Respect `prefers-reduced-motion` for decorative animation.
- Check color contrast for text, badges, and priority colors against their backgrounds.

Quick manual check:

```text
Tab through the page → every interactive element is reachable and visibly focused.
Press Enter/Space on buttons → the expected action runs.
Zoom to 200% → content reflows without horizontal scrolling where avoidable.
```

## Performance basics

- Keep primary content server-rendered. Use `"use client"` only for islands that need interactivity.
- `apps/web/src/app/layout.tsx` already uses `next/font/google`; do not add competing font `<link>` tags.
- Prefer Next.js `<Image>` for raster assets so sizing and lazy loading are handled.
- Avoid large client-side state trees. The board keeps a local task copy deliberately; keep it small and sync it with the server response.
- Be careful with effects that run on every render. `BoardView` resets local tasks from props; changing that effect can reintroduce stale-state bugs.
- Do not import heavy libraries into the client bundle from a Server Component path.
- Keep layout shifts low by reserving space for async content and media.

## Core Web Vitals targets

| Metric | Good |
| --- | --- |
| LCP (Largest Contentful Paint) | ≤ 2.5 s |
| INP (Interaction to Next Paint) | ≤ 200 ms |
| CLS (Cumulative Layout Shift) | ≤ 0.1 |

## Validation

- Run `npx tsc --noEmit -p apps/web/tsconfig.json` after changes.
- Use Lighthouse in the browser for accessibility and best-practice checks.
- Inspect the Network panel for oversized JS chunks and unoptimized images.
- Test the board with keyboard drag (space to pick up, arrow keys to move, space to drop).

## Avoid

- `div` soup for buttons, links, and form controls.
- `onClick` on non-interactive elements without keyboard support.
- Hiding focus rings with `outline: none`.
- Client-only rendering of headlines, descriptions, or navigation links.

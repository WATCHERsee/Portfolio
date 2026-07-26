# Project Record — Raja Adnan Ahmed Portfolio

_Last updated: 2026-07-26_

## TL;DR

**The site is functionally complete.** All 34 tasks in `specs/001-portfolio-site/tasks.md`
are checked off. `npx tsc --noEmit`, `npm run lint`, and `npm run build` all pass clean.
Every section from the brief (`CLAUDE(1).md`) is built and wired into `app/page.tsx`.

What's left is **not code** — it's a short list of real-world assets/decisions only
Raja can provide (see "Open placeholders" below), plus one optional live browser QA pass.

---

## Workflow used

This project was built with the **speckit** slash-command workflow (spec-driven dev),
not ad hoc prompting:

- `specs/001-portfolio-site/spec.md` — feature spec (user stories, FRs, success criteria)
- `specs/001-portfolio-site/plan.md` — technical plan
- `specs/001-portfolio-site/research.md`, `data-model.md`, `contracts/content-shapes.ts`, `quickstart.md`
- `specs/001-portfolio-site/checklists/requirements.md` — spec quality checklist, **all passed**
- `specs/001-portfolio-site/tasks.md` — 34 tasks across 6 phases, **all marked `[X]`**

**To resume next time: start a session and say "continue the portfolio, check record.md
and tasks.md" or just invoke `/speckit-implement` again** — it re-reads tasks.md,
sees everything is `[X]`, and will report there's nothing left to build. If Raja wants
to add a new feature (e.g. a real n8n case-study project), that's a new spec pass:
`/speckit-specify` → `/speckit-plan` → `/speckit-tasks` → `/speckit-implement`, or just
ask directly and skip speckit for something this small.

---

## Stack actually used (differs slightly from the original plan.md)

Plan.md/CLAUDE(1).md assumed Next.js 14 / React 18 / Tailwind 3. What's actually
installed and working:

- **Next.js 16.2.11** (App Router, Turbopack), **React 19.2.4**, **Tailwind CSS v4**
  (via `@tailwindcss/postcss`, no `tailwind.config.ts` — v4 uses CSS-based config in
  `app/globals.css`)
- Fonts: **Space Grotesk** (display) + **Geist** (body) via `next/font/google`
- **Framer Motion** for scroll-reveal (`components/motion/reveal.tsx`), respects
  `useReducedMotion()`
- **React Three Fiber + drei** for the hero WebGL agent/node-graph background
  (`components/three/hero-scene.tsx`), with:
  - `use-webgl-support.ts` — feature-detects WebGL2/WebGL + `prefers-reduced-motion`
  - `webgl-fallback.tsx` — static gradient/grid fallback, no animation
  - `error-boundary.tsx` — class component catching any R3F render error → falls back
  - Loaded via `next/dynamic(..., { ssr: false })`, `pointer-events-none` so it never
    blocks CTA clicks
- lucide-react icons, dark-mode-only design (`className="... dark"` on `<html>`)
- No CMS/backend/DB — content lives in typed `data/profile.ts`, `data/projects.ts`,
  `data/skills.ts`

## File map

```
app/
  layout.tsx      — fonts, metadata/OG tags, dark shell
  page.tsx         — composes Navbar → Hero → Projects → Skills → About → Contact → Footer
  globals.css      — Tailwind v4 layers + color tokens (bg #0A0A0F, accent #4C8DFF)
components/
  navbar.tsx, hero.tsx, projects.tsx, project-card.tsx, skills.tsx, about.tsx,
  contact.tsx, footer.tsx, icons.tsx
  motion/reveal.tsx
  three/hero-scene.tsx, webgl-fallback.tsx, error-boundary.tsx, use-webgl-support.ts
data/
  profile.ts, projects.ts, skills.ts   — single source of truth for all copy
```

`PORTFOLIO CHAT/` at the repo root is a **separate, pre-existing project** — never
touch it as part of this portfolio work (this constraint is hard-coded into tasks.md).

---

## Verified this session (2026-07-26)

- `npx tsc --noEmit` → clean, no errors
- `npm run lint` → clean, no warnings
- `npm run build` → clean production build, all routes static (`○ /`, `○ /_not-found`)
- Dev server boots and serves `200` on `http://localhost:3000`
- Code-reviewed accessibility: semantic `<nav>`/`<main>`/`<section>`/`<footer>`,
  `aria-label`s on icon-only buttons (GitHub/LinkedIn/menu toggle), `aria-expanded` on
  mobile menu, `aria-hidden` on decorative icons
- Code-reviewed reduced-motion + WebGL-failure handling: `useReducedMotion()` in
  `Reveal`, `useWebglSupport()` disables the 3D layer when `prefers-reduced-motion` is
  set or WebGL is unsupported, `ErrorBoundary` catches render errors → `WebglFallback`
- Confirmed responsive Tailwind utility classes (`sm:`, mobile-first spacing) are used
  throughout every section
- **Not done this session**: a live pixel-by-pixel visual pass at exactly 375px/768px/
  1280px in a real browser — the Claude-in-Chrome browser tool was declined for this
  session. Code review strongly suggests this is fine (responsive classes are
  consistent throughout), but a real visual click-through is still worth 5 minutes if
  you want full confidence. Run `npm run dev` and resize, or re-enable `/chrome` and
  ask me to check it live.
- `tasks.md` in `specs/001-portfolio-site/` updated to mark all 34 tasks `[X]` to match
  actual repo state (they were previously all unchecked despite the code existing).

---

## Open placeholders — things only Raja can supply

These are intentionally left as placeholders per `CLAUDE(1).md` §6 ("leave clearly
labeled placeholders rather than fabricating data"):

1. **Contact email** — `data/profile.ts` has `links.email: null`. `components/contact.tsx`
   renders "Email coming soon" until a real address is provided. Once you have one,
   set it in `data/profile.ts` and the Contact section will render a `mailto:` link.
2. **Profile photo** — none exists anywhere in the site; not required by the brief but
   worth considering for the About section.
3. **5th project slot (n8n/automation case study)** — `data/projects.ts` has a 5th
   entry with `placeholder: true`, `repoUrl: null`, rendered by `project-card.tsx` in a
   visually distinct "coming soon" (dashed border) state. Replace with a real case
   study once Raja has a public repo/write-up for n8n workflow automation work.
4. **Live demo links** — none of the 4 real projects have live/deployed URLs wired up,
   only GitHub repo links. Add if/when live demos exist.
5. **OG/social preview image** — `layout.tsx` sets OpenGraph/Twitter metadata (title,
   description, siteUrl) but there's no dedicated `opengraph-image` asset; Next.js will
   fall back to no image. Optional polish.

Nothing else was left unfinished — no other TODOs/fabricated content exist in the repo
(grepped `data/`, `components/`, `app/` for "TODO"/"placeholder"/"coming soon").

---

## Deployment

Not yet deployed. Target is Vercel per the brief. To ship: `vercel` CLI or connect the
repo (once it's actually a git repo — **this directory is currently NOT a git repo**,
`git status` fails with "not a git repository"). Initializing git and pushing to
GitHub/Vercel is a reasonable next step whenever Raja wants to go live.

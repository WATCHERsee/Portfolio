# Implementation Plan: Portfolio Site

**Branch**: `001-portfolio-site` | **Date**: 2026-07-25 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-portfolio-site/spec.md`

## Summary

Single-page, dark-mode, Next.js 14 App Router site positioning Raja Adnan Ahmed as an
Automation & AI Agent Builder. Content is typed data (`data/profile.ts`,
`data/projects.ts`, `data/skills.ts`) rendered by presentational sections (Navbar, Hero,
Projects, Skills, About, Contact, Footer) with Framer Motion scroll/hover motion and a
lazy-loaded React Three Fiber WebGL hero layer (animated agent/node-graph particle
network) that gracefully degrades when WebGL is unavailable or `prefers-reduced-motion`
is set.

## Technical Context

**Language/Version**: TypeScript 5.x on Node.js 20+ (Next.js 14 App Router)

**Primary Dependencies**: next@14, react@18, tailwindcss@3, framer-motion, lucide-react,
three, @react-three/fiber, @react-three/drei

**Storage**: N/A — static typed content in `data/*.ts`, no database

**Testing**: `next lint` + `tsc --noEmit` for static checks; manual browser verification
(dev server) against the spec's acceptance scenarios and responsive breakpoints, per
constitution's Development Workflow. No automated test framework introduced — matches
"no CMS/backend, minimal footprint" scope.

**Target Platform**: Modern evergreen browsers (desktop + mobile), deployed to Vercel

**Project Type**: Single Next.js web application (no separate frontend/backend split)

**Performance Goals**: First Contentful Paint unaffected by the 3D layer (WebGL
dynamically imported, `ssr:false`, code-split); steady 60fps target for the hero
particle network on mid-range hardware, with automatic degradation (reduced particle
count or static fallback) rather than dropped frames on low-end devices.

**Constraints**: Zero layout shift from the 3D canvas or web fonts; WebGL layer must
never block interaction with hero text/CTAs (pointer-events scoped correctly); must
respect `prefers-reduced-motion` at both Framer Motion and R3F layers; Lighthouse
accessibility and best-practices scores should not be degraded by the 3D layer.

**Scale/Scope**: Single page, 7 sections, ~4-5 project entries, 5 skill groups — small,
fixed content volume; no pagination, search, or dynamic data needed.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|---|---|---|
| I. Content Fidelity | All copy sourced from `CLAUDE(1).md` §0; missing photo/email become labeled placeholders | PASS |
| II. Approved Stack Only | Next.js 14 App Router + TS, Tailwind, next/font, lucide-react, Framer Motion, R3F/drei/three, Vercel target — no extra libs | PASS |
| III. Creative-But-Restrained 3D | Hero WebGL layer is `dynamic(..., {ssr:false})`, feature-detected, `prefers-reduced-motion`-aware, static fallback on failure | PASS |
| IV. High-End Visual Bar | high-end-visual-design skill applied during component build (Phase: implement); single accent color decided below | PASS (design decision recorded in research.md) |
| V. Typed Content, Not Hardcoded Markup | `data/profile.ts`, `data/projects.ts`, `data/skills.ts` typed modules feed all sections | PASS |
| VI. Accessible & Performant by Default | Semantic landmarks, alt text, keyboard nav, contrast, 375/768/1280 breakpoints verified during implement | PASS |
| VII. Scope Discipline & Isolation | Single-page scope only; `PORTFOLIO CHAT/` excluded from all tooling and file operations | PASS |

No violations — Complexity Tracking table is not needed.

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-site/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md         # Phase 1 output
├── contracts/            # Phase 1 output (content-shape contracts, no network API)
└── tasks.md              # Phase 2 output (/speckit-tasks — not created here)
```

### Source Code (repository root)

```text
app/
├── layout.tsx            # Root layout, fonts, metadata/OpenGraph
├── page.tsx               # Composes all sections in order
└── globals.css            # Tailwind base + design tokens (accent color, dark theme)

components/
├── navbar.tsx
├── hero.tsx                # Hero copy/CTAs; mounts <HeroScene> via dynamic import
├── projects.tsx
├── project-card.tsx
├── skills.tsx
├── about.tsx
├── contact.tsx
├── footer.tsx
├── motion/
│   └── reveal.tsx          # Shared Framer Motion scroll-reveal wrapper
└── three/
    ├── hero-scene.tsx      # R3F Canvas + agent-node particle network
    ├── webgl-fallback.tsx  # Static/CSS background shown on WebGL failure
    └── use-webgl-support.ts # Feature-detect + prefers-reduced-motion hook

data/
├── profile.ts             # Name, title, location, bio, core strengths, links
├── projects.ts             # 4 real projects + 1 placeholder entry
└── skills.ts                # 5 skill groups

public/
└── (favicon, any static assets)

# No backend/, no tests/ directory — matches Technical Context (manual + static-check verification only)
```

**Structure Decision**: Single Next.js App Router project at repo root (no
frontend/backend split — this is a static content site with no server logic).
`components/three/` isolates the WebGL layer so it can be dynamically imported and
tree-shaken from the initial bundle. `data/` holds all typed content per Constitution
Principle V. The existing `PORTFOLIO CHAT/` directory is untouched and outside this
project's file tree entirely.

## Complexity Tracking

*No violations — table omitted.*

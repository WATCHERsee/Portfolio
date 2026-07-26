<!--
Sync Impact Report
Version change: (none) → 1.0.0
Modified principles: n/a (initial ratification)
Added sections: Core Principles (I–VII), Design & Tech Standards, Development Workflow, Governance
Removed sections: none
Templates requiring updates:
  ✅ .specify/templates/plan-template.md — no conflicting constraints, generic Constitution Check gate applies
  ✅ .specify/templates/spec-template.md — no conflicting constraints
  ✅ .specify/templates/tasks-template.md — no conflicting constraints
  ✅ .claude/skills/speckit-*/SKILL.md — generic references only, no agent-specific renames needed
Follow-up TODOs: none
-->

# Raja Adnan Ahmed Portfolio Constitution

## Core Principles

### I. Content Fidelity (NON-NEGOTIABLE)
All facts, links, project descriptions, skills, and biography content MUST derive from
`CLAUDE(1).md` (Section 0: Source Data) only. Employers, metrics, testimonials, client
logos, and pricing information MUST NOT be invented. When required content is missing
(profile photo, contact email, live demo URLs), the build MUST leave a clearly labeled
placeholder (e.g. `TODO: email`) rather than fabricate a value. Positioning hierarchy is
fixed: (1) Automation & AI Agent Builder, (2) Frontend Developer (React/Next.js),
(3) Founder, Evo Tech Studio / self-directed learner.
**Rationale**: This is a real person's professional identity; fabricated claims damage
credibility and trust the moment a visitor cross-checks them.

### II. Approved Stack Only
The site MUST be built with Next.js 14+ (App Router, TypeScript), Tailwind CSS,
`next/font`, `lucide-react` icons, Framer Motion for scroll-reveal and hover
micro-interactions, and React Three Fiber + drei for a creative WebGL accent layer
(e.g. hero background, node/circuit motif). No CMS, no backend/database, no additional
UI framework. Deployment target is Vercel.
**Rationale**: A constrained, modern stack keeps the single-page portfolio fast,
maintainable, and consistent with the brief's "no backend required" scope.

### III. Creative-But-Restrained 3D
Three.js/R3F elements MUST enhance the "AI/automation builder" narrative (nodes, graphs,
circuits, particle/agent motifs) without becoming a gimmick. Every 3D or heavy-motion
element MUST: respect `prefers-reduced-motion`, be lazy-loaded/code-split so it never
blocks first paint, degrade to a static/CSS fallback on low-end devices or WebGL failure,
and introduce zero cumulative layout shift.
**Rationale**: 3D is the differentiator that makes this feel like an AI-agent builder's
site rather than a template, but it must never cost the site its performance or
accessibility budget.

### IV. High-End Visual Bar
Apply the `high-end-visual-design` standard: an intentional type scale (one display face
for headings, one sans for body), deliberate spacing rhythm, a single confident accent
color on a dark-mode-first palette, purposeful shadow/elevation, and motion that always
has a reason (state change, hierarchy, delight) — never decoration for its own sake.
Generic template patterns (default shadcn look, stock gradient hero, boxed card grids
with no personality) are disallowed.
**Rationale**: The brief explicitly rejects generic portfolio language and look; the
visual execution must match that ambition.

### V. Typed Content, Not Hardcoded Markup
All project, skill, and profile content MUST live in typed files under `data/`
(`data/projects.ts`, `data/skills.ts`, etc.), imported by presentational components.
Components MUST NOT contain hardcoded copy for this content.
**Rationale**: Keeps future content updates (new project, new skill) a data edit, not a
layout change, per the brief's explicit build instruction.

### VI. Accessible & Performant by Default
Semantic HTML, sufficient color contrast, visible focus states, alt text on all imagery,
full keyboard navigability, and mobile-first responsiveness verified at 375px, 768px,
and 1280px+ are REQUIRED for every section. Fonts and non-critical assets MUST be
optimized/lazy-loaded to stay Lighthouse-friendly and avoid layout shift.
**Rationale**: An automation/AI builder's portfolio is itself a demonstration of craft;
inaccessible or janky execution undercuts the pitch.

### VII. Scope Discipline & Isolation
The site is a single-page scroll experience only: no blog/CMS, no pricing/services page,
no fabricated case studies. The `PORTFOLIO CHAT/` directory is a separate, pre-existing
project and MUST NOT be read into context, modified, referenced, or treated as part of
this codebase under any circumstance.
**Rationale**: Matches the brief's explicit "Out of Scope" section and the user's direct
instruction to leave `PORTFOLIO CHAT/` untouched.

## Design & Tech Standards

- Dark-mode-first (or dark-only) aesthetic; single accent color (electric blue, violet,
  or emerald) proposed with hex values during planning, used sparingly for CTAs, links,
  and agent/3D highlight elements.
- Icons via `lucide-react` only; no icon font/SVG-sprite mixing.
- Animation budget: Framer Motion handles 2D fade/slide/stagger; React Three Fiber
  handles the 3D accent layer. No other animation library.
- Content source of truth: `CLAUDE(1).md` Section 0. Cross-reference before writing any
  new copy.

## Development Workflow

This project follows the Spec Kit flow: `/speckit-constitution` (this document) →
`/speckit-specify` → `/speckit-plan` → `/speckit-tasks` → `/speckit-implement`. Each
stage's output MUST be checked against these principles before moving to the next stage.
Implementation MUST end with a browser check of the running dev server (golden path +
responsive breakpoints) and a summary of any placeholders left for Raja to fill in.

## Governance

This constitution supersedes ad-hoc conventions for this repository. Amendments require
a documented Sync Impact Report (as prepended to this file) and a version bump following
semantic versioning: MAJOR for incompatible principle removal/redefinition, MINOR for a
new or materially expanded principle/section, PATCH for wording/clarity fixes. All
subsequent Spec Kit stages (`specify`, `plan`, `tasks`, `implement`) MUST verify
compliance with these principles before producing output; unresolved conflicts must be
raised to the user rather than silently resolved.

**Version**: 1.0.0 | **Ratified**: 2026-07-25 | **Last Amended**: 2026-07-25

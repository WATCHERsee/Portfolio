# Tasks: Portfolio Site

**Input**: Design documents from `/specs/001-portfolio-site/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Not requested — no automated test framework in scope (see plan.md Technical
Context). Validation is via `tsc --noEmit`, `next lint`, and manual quickstart.md checks.

**Organization**: Tasks are grouped by user story from spec.md to enable independent
implementation and testing. MVP = User Story 1 only (Hero + Navbar + Footer + shell).

## Path Conventions

Single Next.js app at repo root: `app/`, `components/`, `data/`, `public/`.
**Absolute repo root**: `/home/raja-adnan-ahmed/Desktop/portfolio`
**Hard constraint on every task**: never read, write, move, or delete anything under
`PORTFOLIO CHAT/` — that directory is a separate, pre-existing project.

---

## Phase 1: Setup (project initialization)

- [X] T001 Scaffold Next.js 14 app in repo root via `create-next-app` (TypeScript, App Router, Tailwind, ESLint, `src/` disabled, import alias `@/*`), run from `/home/raja-adnan-ahmed/Desktop/portfolio`, explicitly targeting `.` so it merges into the existing directory without touching `PORTFOLIO CHAT/` or `CLAUDE(1).md`
- [X] T002 Install runtime dependencies: `framer-motion`, `lucide-react`, `three`, `@react-three/fiber`, `@react-three/drei` in `package.json`
- [X] T003 [P] Configure `tailwind.config.ts` with dark-mode-first theme tokens: near-black background `#0A0A0F`, off-white text `#F5F5F7`, accent `#4C8DFF` (per research.md), font family tokens for display/body
- [X] T004 [P] Set up `next/font` for Space Grotesk (display) and Geist (body) in `app/layout.tsx`
- [X] T005 [P] Add `.gitignore` entries / confirm `node_modules`, `.next` excluded (do not modify anything under `PORTFOLIO CHAT/`)

**Checkpoint**: `npm run dev` boots a default Next.js page with Tailwind + fonts working.

---

## Phase 2: Foundational (blocking prerequisites for all user stories)

- [X] T006 [P] Create `data/profile.ts` implementing the `Profile` shape from `specs/001-portfolio-site/contracts/content-shapes.ts`, populated only from `CLAUDE(1).md` §0/§3 (name, title, location, bio, 3 core strengths, current role, education, links.github, links.linkedin, links.email = null)
- [X] T007 [P] Create `data/projects.ts` implementing `Project[]` — 4 real entries (research-ai-dashboard, portfolio-chat, quickforge, jack-watches) in that order from `CLAUDE(1).md` §4.3, plus 1 trailing entry with `placeholder: true`, `repoUrl: null`, generic "automation case study coming soon" label (no fabricated content)
- [X] T008 [P] Create `data/skills.ts` implementing `SkillGroup[]` — 5 groups in order (ai-agents-automation, frontend-development, languages, design, tools) from `CLAUDE(1).md` §4.4
- [X] T009 [P] Create `components/motion/reveal.tsx`: shared Framer Motion wrapper (fade + translate-y, `whileInView`, `staggerChildren` support) that calls `useReducedMotion()` and disables animation when true
- [X] T010 [P] Create `components/three/use-webgl-support.ts`: hook that feature-detects a WebGL2/WebGL context and reads `prefers-reduced-motion`, returning `{ supported: boolean }`
- [X] T011 Create `app/layout.tsx` root layout: mount fonts (T004), global dark background/text color, `metadata` object (title/description/OpenGraph using positioning language from `CLAUDE(1).md` §2), wrap children in `<body>` with base Tailwind classes
- [X] T012 [P] Create `app/globals.css` with Tailwind base/components/utilities layers plus any CSS custom properties for the accent/background tokens from T003

**Checkpoint**: Typed content compiles (`tsc --noEmit` passes), shared motion/WebGL hooks exist, root layout renders an empty shell with correct fonts/colors. All subsequent story phases build on this.

---

## Phase 3: User Story 1 - Recruiter/client assesses positioning in under 10 seconds (Priority: P1) 🎯 MVP

**Goal**: A first-time visitor sees the hero (hook + positioning + CTAs) and a sticky nav, on both desktop and 375px mobile, without layout break.

**Independent Test**: Load the site with no other sections built; the hero alone communicates positioning and offers both CTAs, per quickstart.md scenario 1.

- [X] T013 [P] [US1] Create `components/three/webgl-fallback.tsx`: static gradient + faint CSS grid/node-motif background (no animation), matching the accent color from T003
- [X] T014 [US1] Create `components/three/hero-scene.tsx`: R3F `<Canvas>` rendering an instanced-point agent/node graph with autonomous drift + subtle pointer-parallax, wrapped in a class-based `ErrorBoundary` that renders `<WebglFallback>` on any render error
- [X] T015 [US1] Create `components/hero.tsx`: eyebrow "Automation & AI Agent Builder", headline, subhead (agent/automation + frontend + Evo Tech Studio founder role, from `CLAUDE(1).md` §2/§4.2), "View Projects" and "Get in Touch" CTA buttons (smooth-scroll to `#work` / `#contact`); dynamically imports `HeroScene` via `next/dynamic(..., { ssr: false })` gated by `useWebglSupport()` from T010, falling back to `WebglFallback` when unsupported or reduced-motion; ensure the canvas has `pointer-events-none` outside interactive hit areas so it never blocks CTA clicks
- [X] T016 [US1] Create `components/navbar.tsx`: sticky nav with logo/initials mark, anchor links to Work/Skills/About/Contact, GitHub + LinkedIn icon links (lucide-react `Github`/`Linkedin`, from `data/profile.ts` links) opening in new tabs, and a "Let's Talk" CTA that smooth-scrolls to `#contact`; mobile layout collapses to a hamburger/menu pattern usable at 375px
- [X] T017 [US1] Create `components/footer.tsx`: name, current year (computed at render), repeated nav links, social icons — reusing `Profile.links`
- [X] T018 [US1] Wire `app/page.tsx` to render `<Navbar>`, `<Hero>`, `<Footer>` (other sections added in later phases) with correct `id` anchors (`#work`, `#skills`, `#about`, `#contact`) as empty/placeholder `<section>` stubs so nav links have valid targets
- [X] T019 [US1] Manually verify quickstart.md scenario 1 at 375px/768px/1280px: no horizontal scroll, hero text/CTAs never obscured by the WebGL canvas, keyboard tab order reaches nav links and both hero CTAs with visible focus rings

**Checkpoint**: User Story 1 is independently complete — sticky nav, hero with working 3D/fallback layer, footer, all responsive and keyboard-navigable.

---

## Phase 4: User Story 2 - Visitor evaluates project depth and technical range (Priority: P2)

**Goal**: Featured Work section shows the 4 real projects in order plus a marked placeholder, each with working repo links.

**Independent Test**: Scroll to `#work`; per quickstart.md scenario 2, confirm project order, content, and that repo links open the correct GitHub URLs.

- [X] T020 [P] [US2] Create `components/project-card.tsx`: accepts a single `Project` (contracts/content-shapes.ts), renders name/description/stack tags/repo link; when `placeholder === true`, renders a visually distinct "coming soon" treatment (dashed border/muted state) with no repo link
- [X] T021 [US2] Create `components/projects.tsx`: `<section id="work">` mapping `data/projects.ts` (T007) through `ProjectCard` (T020) in array order, wrapped in `Reveal` (T009) with staggered children
- [X] T022 [US2] Replace the `#work` stub in `app/page.tsx` (T018) with `<Projects>`
- [X] T023 [US2] Manually verify quickstart.md scenario 2: card order matches spec FR-005, placeholder card is visually distinguishable per FR-006, all 4 repo links open exact URLs from `data/projects.ts` in a new tab

**Checkpoint**: User Stories 1 AND 2 both independently functional.

---

## Phase 5: User Story 3 - Visitor scans skills and initiates contact (Priority: P3)

**Goal**: Skills section (grouped, AI/automation first), About section (bio + 3 strength cards), and Contact section (CTA + LinkedIn/GitHub buttons + email placeholder) are complete and linked from nav.

**Independent Test**: Per quickstart.md scenario 3 — skills groups render in order, About bio/strengths match source data, Contact buttons open exact URLs, all nav links smooth-scroll correctly.

- [X] T024 [P] [US3] Create `components/skills.tsx`: `<section id="skills">` mapping `data/skills.ts` (T008) into grouped pill/tag clusters (not a progress-bar list), AI Agents & Automation group first, wrapped in `Reveal`
- [X] T025 [P] [US3] Create `components/about.tsx`: `<section id="about">` with first-person bio (`Profile.bio`) and 3 core-strength cards (`Profile.coreStrengths`), wrapped in `Reveal`
- [X] T026 [P] [US3] Create `components/contact.tsx`: `<section id="contact">` with closing CTA copy ("Have an idea for an AI agent or automation? Let's build it."), LinkedIn button → `Profile.links.linkedin`, GitHub button → `Profile.links.github`, and an email area that renders a labeled "Email coming soon" placeholder (no broken `mailto:`) when `Profile.links.email` is `null`
- [X] T027 [US3] Replace the `#skills`, `#about`, `#contact` stubs in `app/page.tsx` with `<Skills>`, `<About>`, `<Contact>` in that order
- [X] T028 [US3] Manually verify quickstart.md scenario 3: skill group order (FR-007), About content matches source data (FR-008), Contact button URLs exactly match `data/profile.ts` (FR-009), every Navbar link smooth-scrolls without a full reload

**Checkpoint**: All three user stories independently functional; full page composed top-to-bottom.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T029 [P] Run `npx tsc --noEmit` and `npm run lint`; fix all errors/warnings
- [X] T030 [P] Accessibility pass across all sections: verify semantic landmarks (`nav`, `main`, `section`, `footer`), alt text on any imagery, WCAG AA contrast for text/background pairs, full keyboard operability (per FR-014)
- [X] T031 [P] Reduced-motion + WebGL-failure pass: toggle OS reduce-motion and confirm Hero/Framer Motion effects minimize (FR-013); simulate WebGL absence and confirm `WebglFallback` renders cleanly with no console errors (FR-015)
- [X] T032 [P] Responsive pass at exactly 375px, 768px, 1280px+ across the full composed page (FR-012) — no horizontal scroll, no overlap, no illegible text
- [X] T033 Run `npm run build` to confirm a clean production build with no layout-shift warnings
- [X] T034 Write a short summary of remaining placeholders (profile photo, contact email, live demo links, automation/n8n case study) for Raja to fill in later, per `CLAUDE(1).md` §6 build instructions

---

## Dependencies & Execution Order

- **Phase 1 (Setup)** → **Phase 2 (Foundational)**: strictly sequential; Phase 2 tasks marked `[P]` can run concurrently with each other but all of Phase 2 must finish before any user-story phase starts.
- **Phase 3 (US1)** has no dependency on Phase 4/5 and delivers the MVP alone.
- **Phase 4 (US2)** depends only on Phase 2 (data/motion primitives) and reuses `app/page.tsx` from Phase 3 (T018's stub) — can start once Phase 2 is done, in parallel with Phase 3 if desired, but T022 must land after T018 exists.
- **Phase 5 (US3)** depends only on Phase 2, same relationship to `app/page.tsx` (T027 lands after T018).
- **Phase 6 (Polish)** runs after all user-story phases are complete.

## Parallel Execution Examples

- Phase 1: T003, T004, T005 in parallel after T001/T002 finish.
- Phase 2: T006, T007, T008, T009, T010, T012 are all independent files — run in parallel; T011 depends on T004.
- Phase 3: T013 and T016/T017 can run in parallel with T014 (different files); T015 depends on T013+T014.
- Phase 4: T020 in parallel with any Phase 3 task; T021 depends on T020.
- Phase 5: T024, T025, T026 fully parallel; T027 depends on all three.

## Implementation Strategy

**MVP first**: Complete Phase 1 → Phase 2 → Phase 3 (US1) and stop to validate — this alone
proves the core positioning pitch (hero + nav + footer, responsive, accessible, 3D
layer with fallback). Then layer Phase 4 (US2 — proof of work) and Phase 5 (US3 —
skills/about/contact) incrementally, validating each against its quickstart.md scenario
before moving on. Finish with Phase 6 polish and the placeholder summary (T034).

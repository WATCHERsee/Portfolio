# Quickstart: Portfolio Site

## Prerequisites

- Node.js 20+, npm
- Repo root: `/home/raja-adnan-ahmed/Desktop/portfolio`

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
# open http://localhost:3000
```

## Validation scenarios (map to spec.md Acceptance Scenarios)

1. **Positioning (User Story 1)** — Load `/` on desktop. Confirm the hero shows the
   eyebrow "Automation & AI Agent Builder", a headline, a subhead mentioning
   agent/automation + frontend + Evo Tech Studio, and two CTAs ("View Projects",
   "Get in Touch"). Resize to 375px width; confirm no horizontal scroll and the WebGL
   layer doesn't obscure text.

2. **Project depth (User Story 2)** — Scroll to Featured Work. Confirm 4 real project
   cards appear in order (Research AI Dashboard, Portfolio Chat, QuickForge, Jack
   Watches) plus one visually distinct placeholder card. Click each repo link; confirm
   it opens the matching GitHub URL from `data/projects.ts` in a new tab.

3. **Skills + contact (User Story 3)** — Scroll to Skills; confirm 5 groups render with
   "AI Agents & Automation" first. Scroll to Contact; click LinkedIn and GitHub buttons
   and confirm they open the exact URLs from `data/profile.ts`. Click each Navbar link
   and confirm smooth in-page scroll (no full reload).

## Accessibility / motion checks

- Toggle OS "reduce motion" setting → reload → confirm hero falls back to the static
  background and Framer Motion reveals are minimized/instant.
- Tab through the page with keyboard only → confirm every interactive element (nav
  links, CTAs, project repo links, social buttons) is reachable and shows a visible
  focus state.
- Disable WebGL (e.g. `chrome://flags` or a browser without WebGL) → confirm the hero
  shows the static fallback with no console errors and no layout break.

## Static checks

```bash
npx tsc --noEmit
npm run lint
```

## Build

```bash
npm run build
```

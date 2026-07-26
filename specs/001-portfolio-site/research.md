# Phase 0 Research: Portfolio Site

## Accent Color

**Decision**: Electric blue, `#3B82F6`-family — specifically `#4C8DFF` as the primary
accent, with a deeper `#1E3A8A`-adjacent tone reserved for pressed/hover states, on a
near-black base (`#0A0A0F`) with off-white text (`#F5F5F7`).

**Alternatives considered**:
- **Violet** (`#8B5CF6`): strong "AI/creative" association but heavily saturated in the
  current AI-product landscape (Anthropic, many LLM tools) — risks reading as derivative
  rather than distinct.
- **Emerald**: reads more "fintech/growth" than "systems/automation."

**Rationale**: Electric blue reads as "signal, circuitry, systems" — pairs naturally with
a node/agent-graph 3D motif and stays legible at low opacity for line/node accents
without turning muddy. It's a single confident, non-gradient accent used sparingly per
Constitution Design & Tech Standards.

## Hero WebGL Layer

**Decision**: `@react-three/fiber` Canvas rendering an instanced-point agent/node graph
(nodes = small spheres/points, edges = thin lines connecting nearby nodes), gentle
autonomous drift plus a subtle pointer-parallax offset, mounted via
`next/dynamic(() => import('./hero-scene'), { ssr: false })`.

**Rationale**: R3F is the standard idiomatic way to use Three.js in a React/Next.js app
(declarative scene graph, automatic dispose/cleanup, plays well with Suspense);
`ssr:false` avoids WebGL/DOM APIs breaking server rendering; dynamic import keeps the
~150kb+ three.js payload out of the initial JS bundle so FCP is unaffected.

**Alternatives considered**:
- **Raw `three.js` imperative setup**: more manual lifecycle/cleanup code, higher risk of
  memory leaks on route/section unmount; rejected for maintainability.
- **CSS-only animated background** (no WebGL): simpler and zero-risk, but doesn't meet the
  "creative, Three.js" requirement the user explicitly asked for. Kept as the fallback
  path (`webgl-fallback.tsx`), not the primary implementation.

**Fallback strategy**: `use-webgl-support.ts` feature-detects a WebGL context
(`canvas.getContext('webgl2' || 'webgl')`) and reads `prefers-reduced-motion`. If either
check fails/opts out, `hero.tsx` renders `<WebglFallback>` (a static gradient + faint
CSS grid, matching the same node/circuit motif at zero animation cost) instead of
`<HeroScene>`. An `ErrorBoundary` around `<HeroScene>` catches any runtime R3F error and
swaps to the same fallback so a crash never blanks the hero.

## Fonts

**Decision**: `Space Grotesk` (via `next/font/google`) for display/headings — geometric,
technical character fits "systems/agent builder"; `Geist` (Vercel's own typeface, also
available via `next/font/google`) for body text — clean, modern, and deliberately not a
generic system default.

**Rationale**: Matches brief's "one modern sans for body, one distinct display font for
headings"; both are variable Google Fonts with good Latin coverage and `next/font`
support (automatic self-hosting, no layout shift via `font-display: swap` + size-adjust).
Per the high-end-visual-design standard applied in this build, generic defaults (Inter,
Roboto, Arial, Open Sans, Helvetica) are avoided in favor of a pairing with more
typographic character.

## Animation Approach

**Decision**: Framer Motion `whileInView` + `staggerChildren` for section/card reveals
(fade + 8–16px translate-y), `whileHover`/`whileTap` for interactive elements; a single
shared `<Reveal>` wrapper component to keep the pattern consistent and avoid duplicated
variants across sections.

**Rationale**: Declarative, scroll-triggered, easy to gate behind
`useReducedMotion()` (Framer Motion's built-in hook) — satisfies Constitution Principle
III/VI without custom IntersectionObserver code.

## Visual Archetype

**Decision**: "Ethereal Glass" vibe (deep OLED black `#050505` base, radial mesh glow in
the accent blue behind the hero, glass/blurred cards with hairline borders) combined
with an "Asymmetrical Bento" layout for Featured Work and Skills (varying card spans,
not a uniform 3-column grid), and nested "Double-Bezel" card architecture for project
cards, skill groups, and core-strength cards.

**Rationale**: Matches the AI/automation-builder positioning (Section 2 of the brief)
and the high-end-visual-design standard applied to this build — avoids a generic
templated look while staying within the approved stack (Tailwind + Framer Motion, no
extra UI library).

## Content Verification

**Decision**: All hero/about/project/skills copy is drafted directly from
`CLAUDE(1).md` §0 (CV, links, project descriptions) during implementation — no external
research needed since the source-of-truth document is already complete and unambiguous.

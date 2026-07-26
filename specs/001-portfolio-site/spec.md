# Feature Specification: Portfolio Site

**Feature Branch**: `001-portfolio-site`

**Created**: 2026-07-25

**Status**: Draft

**Input**: User description: "Build a single-page personal portfolio website for Raja Adnan Ahmed, positioned as an Automation & AI Agent Builder (secondary: Frontend Developer React/Next.js; supporting: Founder of Evo Tech Studio). Source all content strictly from CLAUDE(1).md Section 0 — do not invent anything beyond it. Site structure: Navbar → Hero (creative Three.js/WebGL background) → Featured Work (4 projects + placeholder) → Skills → About → Contact → Footer. Design: dark-mode-first, single confident accent color, high-end/creative visual bar with a Three.js hero/background layer, subtle scroll animations. Fully responsive and accessible. Do not touch the existing PORTFOLIO CHAT/ directory."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Recruiter/client assesses Raja's positioning in under 10 seconds (Priority: P1)

A hiring manager, recruiter, or potential client lands on the site and within the first
screen understands that Raja builds AI agents and automations (not just frontend), sees
a confident visual identity, and can act (view work or get in touch) without scrolling
past confusing content.

**Why this priority**: This is the entire point of the site — if the hero fails to
communicate the positioning, nothing else matters.

**Independent Test**: Load the site with no prior context; within 10 seconds a reader can
state Raja's primary identity (AI agent/automation builder) and see a clear next action
(View Projects / Get in Touch).

**Acceptance Scenarios**:

1. **Given** a first-time visitor on desktop, **When** the page loads, **Then** the hero
   displays an eyebrow label ("Automation & AI Agent Builder"), a headline, a subhead
   combining agent/automation + frontend + founder work, and two CTA buttons.
2. **Given** a first-time visitor on mobile (375px), **When** the page loads, **Then**
   the hero content and CTAs remain fully readable and tappable without horizontal
   scroll or overlapping the WebGL background layer.

---

### User Story 2 - Visitor evaluates project depth and technical range (Priority: P2)

A visitor scrolls to Featured Work to judge whether Raja can actually build what he
claims. They read project cards ordered by relevance to the AI/automation story first,
each with a clear description, tech stack, and a working link to the public repo.

**Why this priority**: Concrete proof-of-work is the second most decisive factor after
positioning; without it the hero's claims are unsubstantiated.

**Independent Test**: From the Featured Work section alone, a visitor can name at least
one AI/agent-related project and follow its repo link to GitHub.

**Acceptance Scenarios**:

1. **Given** the Featured Work section, **When** it renders, **Then** it shows exactly
   the 4 CV projects (Research AI Dashboard, Portfolio Chat, QuickForge, Jack Watches) in
   that order, each with name, one-line description, tech tags, and a repo link that opens
   the correct GitHub URL.
2. **Given** the Featured Work section, **When** it renders, **Then** a 5th slot is present
   and visually marked as a placeholder for a future automation/n8n case study, containing
   no fabricated content.

---

### User Story 3 - Visitor scans skills and initiates contact (Priority: P3)

A visitor who is already convinced skims the Skills section to confirm specific stack
familiarity, optionally reads the About bio for background, then uses the Contact section
or footer to reach out via LinkedIn, GitHub, or email.

**Why this priority**: This closes the loop (conversion) but only matters once the
visitor is already persuaded by Stories 1–2.

**Independent Test**: From a cold load, a visitor can reach the Contact section via nav
link or scroll and successfully activate the LinkedIn and GitHub buttons (correct URLs,
open in a new tab).

**Acceptance Scenarios**:

1. **Given** the Skills section, **When** it renders, **Then** skills are grouped into the
   5 categories from the CV (AI Agents & Automation, Frontend Development, Languages,
   Design, Tools) as scannable pill/card groups, agent/automation group listed first.
2. **Given** the Contact section, **When** a visitor clicks the LinkedIn or GitHub button,
   **Then** it opens the exact URL from the source data in a new tab.
3. **Given** any section, **When** a visitor clicks a Navbar link, **Then** the page
   smooth-scrolls to the corresponding section without a full page reload.

---

### Edge Cases

- What happens when a visitor's browser/device cannot render WebGL? The hero and any
  Three.js accents MUST fall back to a static or CSS-only background with no console
  errors and no broken layout.
- What happens when a visitor has `prefers-reduced-motion` enabled? All Three.js motion
  and Framer Motion scroll/hover animations MUST be reduced or disabled while content
  remains fully accessible.
- What happens when the contact email is not yet supplied by Raja? The Contact section
  MUST show a clearly labeled placeholder rather than a fabricated address, and MUST NOT
  render a broken `mailto:` link.
- How does the layout handle a very narrow viewport (375px) or a very wide one (1280px+)?
  Content must reflow without horizontal scrolling, overlapping elements, or illegible
  text at either extreme.
- What happens if a project repo link is unavailable/404s? The link still points to the
  exact URL given in source data — verifying repo reachability is outside this feature's
  scope.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST present all content in a single scrollable page with anchor
  navigation to Work, Skills, About, and Contact sections.
- **FR-002**: The Navbar MUST remain visible while scrolling (sticky), include GitHub and
  LinkedIn icon links, and include a "Let's Talk" CTA that scrolls to Contact.
- **FR-003**: The Hero MUST display the eyebrow label "Automation & AI Agent Builder", a
  headline, a subhead that references automation/agent work, frontend execution, and the
  Evo Tech Studio founder role, plus "View Projects" and "Get in Touch" CTAs.
- **FR-004**: The Hero MUST include a creative WebGL/Three.js background element evoking
  an agent/node/circuit motif, positioned so it never obscures readable text or CTAs.
- **FR-005**: The Featured Work section MUST render exactly the 4 projects from source
  data, in the specified order, each with name, description, tech tags, and a repo link.
- **FR-006**: The Featured Work section MUST include one additional slot, visually marked
  as a placeholder, reserved for a future automation/n8n case study, with no fabricated
  description or metrics.
- **FR-007**: The Skills section MUST group skills into exactly the 5 categories from
  source data, with the AI Agents & Automation group presented first.
- **FR-008**: The About section MUST present a first-person bio (3–5 sentences) and 3 core
  strength items, both drawn only from source data.
- **FR-009**: The Contact section MUST include a closing call-to-action, a LinkedIn button
  linking to the exact source URL, a GitHub button linking to the exact source URL, and an
  email placeholder if no real email is supplied.
- **FR-010**: The Footer MUST include the name, current year, a repeated nav, and social
  icon links matching the Navbar's.
- **FR-011**: All content (project details, skills, bio, links) MUST be sourced only from
  CLAUDE(1).md Section 0; no employer, metric, testimonial, or project beyond that source
  may be displayed.
- **FR-012**: The site MUST remain fully usable and legible at 375px, 768px, and 1280px+
  viewport widths.
- **FR-013**: The site MUST respect `prefers-reduced-motion` by reducing or disabling all
  Three.js and scroll/hover animation effects.
- **FR-014**: The site MUST remain navigable via keyboard alone (tab order, visible focus
  states) and expose semantic landmarks and alt text for any imagery.
- **FR-015**: If the WebGL/Three.js layer fails to initialize (unsupported browser/device),
  the Hero MUST fall back to a static/CSS background without breaking layout or throwing
  visible errors.

### Key Entities

- **Project**: A featured work item — name, one-line description, tech stack tags, repo
  URL, and a flag distinguishing real entries from the reserved placeholder slot.
- **Skill Group**: A named category (e.g. "AI Agents & Automation") containing a list of
  individual skill labels.
- **Profile**: Raja's identity data — name, title, location, bio, core strengths, current
  role, education, and social links (GitHub, LinkedIn, email placeholder).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify Raja's primary positioning (AI agent /
  automation builder) from the hero content alone, without scrolling.
- **SC-002**: All 4 real projects and the 1 placeholder slot are visible and distinguishable
  from each other within the Featured Work section on any supported viewport.
- **SC-003**: Every outbound link (GitHub, LinkedIn, 4 repo links) resolves to the exact
  URL specified in source data, verified by inspection.
- **SC-004**: The site achieves smooth, layout-shift-free scrolling and animation on a
  typical modern laptop/desktop browser, with the WebGL hero degrading gracefully on
  devices/browsers without WebGL support.
- **SC-005**: The site is fully operable by keyboard alone and passes a manual contrast
  check against WCAG AA for all text/background combinations.
- **SC-006**: The site renders without horizontal scrolling or overlapping content at
  375px, 768px, and 1280px+ widths.

## Assumptions

- No profile photo, contact email, or live project demo URLs were supplied — these are
  represented as clearly labeled placeholders for Raja to fill in later, per source data
  Section 6 build instructions.
- "High-end/creative visual bar" is interpreted as a bespoke, non-templated dark UI with
  one accent color and a Three.js accent layer, rather than a full 3D scene per section.
- The automation/n8n placeholder project slot has no dedicated repo or case study yet, as
  noted in source data Section 4.3 — it is represented as a marked placeholder card, not a
  real project.
- Deployment (Vercel) and repository/version-control setup are follow-up concerns outside
  this specification; this spec covers the site itself.
- The existing `PORTFOLIO CHAT/` directory is an unrelated, pre-existing project and is
  entirely out of scope — no content, code, or structure from it may be read, reused, or
  modified.

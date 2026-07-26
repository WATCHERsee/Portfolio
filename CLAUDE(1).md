# CLAUDE.md — Raja Adnan Ahmed Portfolio Build

This file is the project brief for Claude Code CLI. Read it fully before writing any code. Build a personal portfolio website that positions Raja Adnan Ahmed as an **Automation & AI Agent Creator** (not a generic frontend developer). Frontend skills support that story; they aren't the headline.

---

## 0. Source Data (ground truth — do not invent beyond this)

This section is the raw reference material. Every piece of content used elsewhere in this brief is derived from here. If the CLI needs to double-check a fact, cross-reference this section rather than assuming.

### Links
- **LinkedIn:** https://www.linkedin.com/in/raja-adnan-ahmed-71a9162a0/
- **GitHub:** https://github.com/WATCHERsee
- **GitHub — Research AI Dashboard repo:** https://github.com/WATCHERsee/research-ai-dashboard
- **GitHub — Portfolio Chat repo:** https://github.com/WATCHERsee/portfolio-chat
- **GitHub — QuickForge repo:** https://github.com/WATCHERsee/QuickForge
- **GitHub — Jack Watches repo:** https://github.com/WATCHERsee/jack-watches
- **GitHub — Raja-Adnan repo (early work):** https://github.com/WATCHERsee/Raja-Adnan
- **GitHub — evo repo (Evo Tech Studio):** https://github.com/WATCHERsee/evo

### Full CV / Resume (as provided)

**Name:** Raja Adnan Ahmed
**Title:** Frontend Developer | AI Agent Builder | Automation Specialist
**Location:** Karachi, Pakistan

**Profile:**
MITI graduate with a passion for design, technology, and digital innovation. Combines hands-on frontend development with AI-driven product building, creating practical web apps, AI agents, and dashboards. Currently studying AI Agent Engineering and Agentic Architecture at PIAIC (Quarter 4), and skilled in n8n workflow automation.

**Core Strengths:**
- Translating design ideas into clean, functional frontend code with React and Next.js.
- Building practical AI agents and automations that solve real workflow problems, end to end.
- Self-directed learner — actively deepening AI agent architecture skills through PIAIC.

**Skills:**
- *Frontend Development:* TypeScript, JavaScript, Next.js, React, HTML/CSS
- *Programming Languages:* Python, TypeScript, JavaScript
- *AI Product Building:* AI agents, agentic architecture, LLM integration (Gemini, Vercel AI SDK), AI dashboards & chat tools
- *Automation:* n8n workflow automation, custom automation pipelines
- *Design:* UI/UX design systems, brand & product design
- *Tools:* Git/GitHub, CLI tooling, design systems

**Education:**
MITI Graduate — AI Agent Engineering & Agentic Architecture, PIAIC — Quarter 4 (in progress)

**Projects (as listed on CV):**

1. **Jack Watches** | TypeScript, Next.js, CSS
   - E-commerce style web app for a watch brand featuring product showcases, structured data, and a modern responsive storefront UI.
   - Built with a component-driven architecture in Next.js for fast page loads and easy catalog updates.

2. **QuickForge** | HTML, Next.js / CLI Tooling
   - Production-ready web app scaffolding CLI built on the custom "Ethereal Forge" design system, helping developers spin up new projects with consistent, polished UI out of the box.
   - Cuts project setup time by bundling sensible defaults, reusable components, and styling conventions into a single command.

3. **Research AI Dashboard** | TypeScript, Next.js
   - Expert AI research dashboard featuring real-time streaming chat, 6 specialist AI agents, and a searchable knowledge library.
   - Designed for fast, focused research workflows, routing queries to the right specialist agent and surfacing relevant sources instantly.

4. **Portfolio Chat** | TypeScript, Next.js, Vercel AI SDK, Gemini 2.5 Flash
   - AI-powered chat widget embedded in a personal portfolio that answers visitor questions about skills, projects, and work experience in real time, using Gemini 2.5 Flash via the Vercel AI SDK for fast, context-aware responses.

### Additional context (not on CV, from prior work with Raja)
- Founder, Creative Director & Sales Lead — **Evo Tech Studio** (pre-revenue web dev + AI-integration studio)
- ~3 years of exposure to OpenAI Agent SDK and agent architecture through the PIAIC (Panaverse) community

---

## 1. Tech Stack

- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Fonts:** next/font (Google Fonts — pick one modern sans for body, one distinct display font for headings)
- **Icons:** lucide-react
- **Animation:** Framer Motion (subtle — fade/slide on scroll, hover micro-interactions only, nothing gimmicky)
- **Deployment target:** Vercel
- **No CMS, no backend/database required.** Content is hardcoded in a typed `data/` folder (e.g. `data/projects.ts`, `data/skills.ts`) so it's easy to update later without touching layout code.

---

## 2. Positioning & Narrative

Raja is **not** "just another Next.js developer." His differentiator is that he builds **AI agents, automation pipelines, and agentic products** on top of solid frontend craft. The entire site should reinforce this hierarchy:

1. **Primary identity:** Automation & AI Agent Builder
2. **Secondary identity:** Frontend Developer (React/Next.js) — the execution skill that ships the agent work
3. **Supporting identity:** Founder of Evo Tech Studio, self-directed learner (PIAIC)

Avoid generic portfolio language ("passionate developer," "I love coding"). Use concrete, outcome-oriented language: what the agent/automation *does*, what problem it solves, what it's built with.

---

## 3. Contact & Profile Info

- **Name:** Raja Adnan Ahmed
- **Title:** Automation & AI Agent Builder | Frontend Developer
- **Location:** Karachi, Pakistan
- **GitHub:** https://github.com/WATCHERsee
- **LinkedIn:** https://www.linkedin.com/in/raja-adnan-ahmed-71a9162a0/
- **Current role:** Founder, Creative Director & Sales Lead — Evo Tech Studio
- **Education:** MITI Graduate; currently in PIAIC Quarter 4 — AI Agent Engineering & Agentic Architecture

---

## 4. Site Structure (Single-page scroll with anchor nav, unless CLI suggests otherwise)

### 4.1 Navbar
Sticky, minimal. Logo/initials mark + links: Work, Skills, About, Contact. Include GitHub + LinkedIn icon links on the right. CTA button: "Let's Talk" → scrolls to contact.

### 4.2 Hero Section
- Eyebrow label: "Automation & AI Agent Builder"
- Headline: something like "I build AI agents and automations that actually ship." (CLI: generate 2-3 headline options, pick the strongest)
- Subhead: 1-2 sentences combining agent/automation work + frontend execution + founder of Evo Tech Studio
- CTA buttons: "View Projects" (scroll) + "Get in Touch" (scroll/mailto or LinkedIn)
- Optional: small stat row (e.g. "5 shipped projects," "3+ yrs agentic architecture exposure," "n8n automation")

### 4.3 Featured Work / Projects
Grid or alternating layout, most agent/automation-relevant projects first. Each project card includes: name, one-line description, tech stack tags, and a short "what it does" blurb. Use the projects below verbatim as the content source — do not invent metrics or claims not present here.

**Project order (most relevant to "automation & agents" positioning first):**

1. **Research AI Dashboard**
   - Stack: TypeScript, Next.js
   - Description: Expert AI research dashboard featuring real-time streaming chat, 6 specialist AI agents, and a searchable knowledge library. Routes queries to the right specialist agent and surfaces relevant sources instantly — built for fast, focused research workflows.
   - Repo: https://github.com/WATCHERsee/research-ai-dashboard

2. **Portfolio Chat**
   - Stack: TypeScript, Next.js, Vercel AI SDK, Gemini 2.5 Flash
   - Description: AI-powered chat widget embedded in a personal portfolio that answers visitor questions about skills, projects, and work experience in real time, using Gemini 2.5 Flash via the Vercel AI SDK for fast, context-aware responses.
   - Repo: https://github.com/WATCHERsee/portfolio-chat

3. **QuickForge**
   - Stack: HTML, Next.js, CLI Tooling
   - Description: Production-ready web app scaffolding CLI built on the custom "Ethereal Forge" design system — spins up new projects with consistent, polished UI out of the box. Cuts project setup time by bundling sensible defaults, reusable components, and styling conventions into a single command.
   - Repo: https://github.com/WATCHERsee/QuickForge

4. **Jack Watches**
   - Stack: TypeScript, Next.js, CSS
   - Description: E-commerce style web app for a watch brand featuring product showcases, structured data, and a modern responsive storefront UI. Built with component-driven architecture in Next.js for fast page loads and easy catalog updates.
   - Repo: https://github.com/WATCHERsee/jack-watches

> Note for CLI: Raja also runs n8n workflow automation and builds custom automation pipelines as part of Evo Tech Studio's service work. If no dedicated public repo/case study exists yet, represent this as a **skill/capability callout** (see Skills section) rather than fabricating a project card. Leave a clearly marked placeholder project slot in the data file (e.g. `{ placeholder: true }`) so Raja can drop in a real n8n/automation case study later.

### 4.4 Skills Section
Group into categories, agent/automation-first:

- **AI Agents & Automation:** AI agents, agentic architecture, LLM integration (Gemini, Vercel AI SDK), n8n workflow automation, custom automation pipelines, AI dashboards & chat tools
- **Frontend Development:** TypeScript, JavaScript, Next.js, React, HTML/CSS
- **Languages:** Python, TypeScript, JavaScript
- **Design:** UI/UX design systems, brand & product design
- **Tools:** Git/GitHub, CLI tooling, design systems

Render as clean tag/pill groups or icon+label grid — not a boring progress-bar list.

### 4.5 About Section
Short bio combining: MITI graduate → passion for design/tech/digital innovation → hands-on frontend + AI-driven product building → currently deepening AI Agent Engineering & Agentic Architecture via PIAIC (Quarter 4) → founder of Evo Tech Studio. Keep it human, 3-5 sentences, first person.

Include 3 "Core Strengths" as short bullet/cards:
- Translating design ideas into clean, functional frontend code with React and Next.js
- Building practical AI agents and automations that solve real workflow problems, end to end
- Self-directed learner — actively deepening AI agent architecture skills through PIAIC

### 4.6 Contact / CTA Section
Clear closing CTA: "Have an idea for an AI agent or automation? Let's build it." Include:
- Email (placeholder if none provided — flag for Raja to fill in)
- LinkedIn button → https://www.linkedin.com/in/raja-adnan-ahmed-71a9162a0/
- GitHub button → https://github.com/WATCHERsee

### 4.7 Footer
Minimal: name, year, small nav repeat, social icons.

---

## 5. Design Direction

- Dark-mode-first (or true dark mode only) aesthetic — fits an "AI/automation builder" identity better than a light corporate look.
- Accent color: a single confident accent (electric blue, violet, or emerald — CLI to propose 2 options with hex values) used sparingly for CTAs, links, highlight text, and agent-related icons.
- Typography-led design: large confident headline type, generous whitespace, no clutter.
- Subtle grid/circuit/node motif in background elements (very subtle, low-opacity) to visually nod to "agents/automation/systems" without being cheesy — optional, skip if it risks looking dated.
- Fully responsive: mobile-first, test at 375px, 768px, 1280px+.
- Accessible: proper contrast ratios, semantic HTML, alt text, keyboard-navigable nav.

Refer to `/mnt/skills/public/frontend-design/SKILL.md` conventions if available in this environment for spacing/typography tokens.

---

## 6. Build Instructions for Claude CLI

1. Scaffold Next.js 14 app (TypeScript, App Router, Tailwind) via `create-next-app`.
2. Set up `data/projects.ts` and `data/skills.ts` typed content files using the content in Section 4.3 and 4.4 — do not hardcode content directly into components.
3. Build components in this order: Navbar → Hero → Projects → Skills → About → Contact → Footer.
4. Wire up smooth-scroll anchor navigation.
5. Add Framer Motion scroll-reveal to each section (fade + slight translate-y, staggered for grid items).
6. Ensure Lighthouse-friendly performance: optimize fonts, lazy-load non-critical assets, no layout shift.
7. Add `metadata` (title, description, OpenGraph tags) in `layout.tsx` using the positioning language from Section 2.
8. Do not invent employers, metrics, testimonials, or projects beyond what's listed here. If content is missing (e.g. profile photo, email address, live demo links), leave clearly labeled placeholders/TODOs rather than fabricating data.
9. When finished, output a short summary of any placeholders left for Raja to fill in.

---

## 7. Explicitly Out of Scope

- No blog/CMS
- No fake client logos or testimonials
- No pricing/services page (this is a personal portfolio, not the Evo Tech Studio business site)
- No fabricated project metrics ("increased conversion by 40%" etc.) — only claims present in this brief

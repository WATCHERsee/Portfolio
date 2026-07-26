# Phase 1 Data Model: Portfolio Site

All entities are static, typed TypeScript literals in `data/*.ts` — no runtime
persistence, no database, no mutation.

## Profile

`data/profile.ts` — single default-exported object.

| Field | Type | Notes |
|---|---|---|
| `name` | `string` | "Raja Adnan Ahmed" |
| `title` | `string` | "Automation & AI Agent Builder \| Frontend Developer" |
| `location` | `string` | "Karachi, Pakistan" |
| `bio` | `string` | 3–5 sentence first-person bio (source: CLAUDE(1).md §0/§4.5) |
| `coreStrengths` | `string[]` (length 3) | Verbatim from source §0/§4.5 |
| `currentRole` | `string` | "Founder, Creative Director & Sales Lead — Evo Tech Studio" |
| `education` | `string` | "MITI Graduate; PIAIC Quarter 4 — AI Agent Engineering & Agentic Architecture" |
| `links.github` | `string (URL)` | https://github.com/WATCHERsee |
| `links.linkedin` | `string (URL)` | https://www.linkedin.com/in/raja-adnan-ahmed-71a9162a0/ |
| `links.email` | `string \| null` | `null` → UI renders a labeled placeholder, not a broken mailto |

**Validation rules**: `coreStrengths` MUST have exactly 3 entries (FR-008). `links.github`
and `links.linkedin` MUST be non-empty absolute URLs (FR-009).

## Project

`data/projects.ts` — exported array, rendered in array order (FR-005).

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | slug, e.g. `research-ai-dashboard` |
| `name` | `string` | Display name |
| `description` | `string` | One-line + short blurb, verbatim/derived from source §4.3 |
| `stack` | `string[]` | Tech tags, e.g. `["TypeScript", "Next.js"]` |
| `repoUrl` | `string (URL) \| null` | Required for real entries; `null` only allowed when `placeholder: true` |
| `placeholder` | `boolean` | `true` for the single reserved n8n/automation case-study slot |

**Ordering (FR-005)**: `research-ai-dashboard`, `portfolio-chat`, `quickforge`,
`jack-watches`, then the placeholder entry last.

**Validation rules**: Exactly 4 entries with `placeholder: false` (or field omitted +
defaulted false) and exactly 1 with `placeholder: true` (FR-006). A non-placeholder entry
MUST have a non-null `repoUrl` matching source data exactly (SC-003).

## SkillGroup

`data/skills.ts` — exported array of 5 groups, AI/Automation group first (FR-007).

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | slug, e.g. `ai-agents-automation` |
| `label` | `string` | Display heading, e.g. "AI Agents & Automation" |
| `skills` | `string[]` | Individual skill/tag labels from source §0/§4.4 |

**Ordering (FR-007)**: `ai-agents-automation`, `frontend-development`, `languages`,
`design`, `tools`.

## Relationships

- `Profile.links` feeds Navbar, Hero, Contact, and Footer social icons/CTAs (single
  source of truth — no duplicated URLs across components).
- `Project[]` feeds the Featured Work grid; `ProjectCard` renders one entry, switching to
  a placeholder visual treatment when `placeholder === true`.
- `SkillGroup[]` feeds the Skills section's grouped pill/card layout.

No entity has a state machine or transitions — this is read-only display content.

// Contract: TypeScript shapes that `data/*.ts` MUST satisfy and that section
// components MUST accept as props. This is the interface boundary in a project
// with no network API — the "contract" is between typed content and UI.

export interface ProfileLinks {
  github: string;
  linkedin: string;
  email: string | null;
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  bio: string;
  /** MUST have exactly 3 entries — FR-008 */
  coreStrengths: [string, string, string];
  currentRole: string;
  education: string;
  links: ProfileLinks;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
  /** Required unless placeholder is true */
  repoUrl: string | null;
  /** Optional deployed/live demo URL (e.g. a Vercel deployment) */
  liveUrl: string | null;
  placeholder: boolean;
}

export interface SkillGroup {
  id: string;
  label: string;
  skills: string[];
}

// Component contracts (props each section accepts):
export interface NavbarProps {
  links: Pick<ProfileLinks, "github" | "linkedin">;
}

export interface HeroProps {
  eyebrow: string;
  headline: string;
  subhead: string;
}

export interface ProjectsProps {
  projects: Project[]; // rendered in array order — FR-005
}

export interface SkillsProps {
  groups: SkillGroup[]; // rendered in array order — FR-007
}

export interface AboutProps {
  bio: string;
  coreStrengths: [string, string, string];
}

export interface ContactProps {
  links: ProfileLinks;
}

export interface FooterProps {
  name: string;
  links: Pick<ProfileLinks, "github" | "linkedin">;
}

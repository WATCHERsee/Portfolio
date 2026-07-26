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
  coreStrengths: [string, string, string];
  currentRole: string;
  education: string;
  links: ProfileLinks;
}

export const profile: Profile = {
  name: "Raja Adnan Ahmed",
  title: "Automation & AI Agent Builder | Frontend Developer",
  location: "Karachi, Pakistan",
  bio: "I'm a MITI graduate with a passion for design, technology, and digital innovation. I combine hands-on frontend development with AI-driven product building — creating practical web apps, AI agents, and dashboards. I'm currently studying AI Agent Engineering and Agentic Architecture at PIAIC (Quarter 4), and I run n8n workflow automation as part of my studio's service work. As Founder, Creative Director & Sales Lead at Evo Tech Studio, I turn agent and automation ideas into shipped products, not just prototypes.",
  coreStrengths: [
    "Translating design ideas into clean, functional frontend code with React and Next.js.",
    "Building practical AI agents and automations that solve real workflow problems, end to end.",
    "Self-directed learner — actively deepening AI agent architecture skills through PIAIC.",
  ],
  currentRole: "Founder, Creative Director & Sales Lead — Evo Tech Studio",
  education:
    "MITI Graduate — AI Agent Engineering & Agentic Architecture, PIAIC (Quarter 4, in progress)",
  links: {
    github: "https://github.com/WATCHERsee",
    linkedin: "https://www.linkedin.com/in/raja-adnan-ahmed-71a9162a0/",
    email: null,
  },
};

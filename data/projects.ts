export interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
  repoUrl: string | null;
  placeholder: boolean;
}

export const projects: Project[] = [
  {
    id: "research-ai-dashboard",
    name: "Research AI Dashboard",
    description:
      "Expert AI research dashboard featuring real-time streaming chat, 6 specialist AI agents, and a searchable knowledge library. Routes queries to the right specialist agent and surfaces relevant sources instantly — built for fast, focused research workflows.",
    stack: ["TypeScript", "Next.js"],
    repoUrl: "https://github.com/WATCHERsee/research-ai-dashboard",
    placeholder: false,
  },
  {
    id: "portfolio-chat",
    name: "Portfolio Chat",
    description:
      "AI-powered chat widget embedded in a personal portfolio that answers visitor questions about skills, projects, and work experience in real time, using Gemini 2.5 Flash via the Vercel AI SDK for fast, context-aware responses.",
    stack: ["TypeScript", "Next.js", "Vercel AI SDK", "Gemini 2.5 Flash"],
    repoUrl: "https://github.com/WATCHERsee/portfolio-chat",
    placeholder: false,
  },
  {
    id: "quickforge",
    name: "QuickForge",
    description:
      'Production-ready web app scaffolding CLI built on the custom "Ethereal Forge" design system — spins up new projects with consistent, polished UI out of the box. Cuts project setup time by bundling sensible defaults, reusable components, and styling conventions into a single command.',
    stack: ["HTML", "Next.js", "CLI Tooling"],
    repoUrl: "https://github.com/WATCHERsee/QuickForge",
    placeholder: false,
  },
  {
    id: "jack-watches",
    name: "Jack Watches",
    description:
      "E-commerce style web app for a watch brand featuring product showcases, structured data, and a modern responsive storefront UI. Built with component-driven architecture in Next.js for fast page loads and easy catalog updates.",
    stack: ["TypeScript", "Next.js", "CSS"],
    repoUrl: "https://github.com/WATCHERsee/jack-watches",
    placeholder: false,
  },
  {
    id: "automation-case-study",
    name: "Automation Case Study",
    description:
      "A dedicated n8n workflow automation case study is in progress — reserved slot, coming soon.",
    stack: ["n8n", "Automation"],
    repoUrl: null,
    placeholder: true,
  },
];

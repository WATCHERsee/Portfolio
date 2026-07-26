export interface SkillGroup {
  id: string;
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "ai-agents-automation",
    label: "AI Agents & Automation",
    skills: [
      "AI Agents",
      "Agentic Architecture",
      "LLM Integration (Gemini)",
      "Vercel AI SDK",
      "n8n Workflow Automation",
      "Custom Automation Pipelines",
      "AI Dashboards & Chat Tools",
    ],
  },
  {
    id: "frontend-development",
    label: "Frontend Development",
    skills: ["TypeScript", "JavaScript", "Next.js", "React", "HTML/CSS"],
  },
  {
    id: "languages",
    label: "Languages",
    skills: ["Python", "TypeScript", "JavaScript"],
  },
  {
    id: "design",
    label: "Design",
    skills: ["UI/UX Design Systems", "Brand & Product Design"],
  },
  {
    id: "tools",
    label: "Tools",
    skills: ["Git/GitHub", "CLI Tooling", "Design Systems"],
  },
];

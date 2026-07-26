import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { RevealItem } from "@/components/motion/reveal";
import { GithubIcon } from "@/components/icons";

export function ProjectCard({ project }: { project: Project }) {
  if (project.placeholder) {
    return (
      <RevealItem className="rounded-[2rem] border border-dashed border-hairline bg-transparent p-1.5">
        <div className="flex h-full flex-col justify-between rounded-[calc(2rem-0.375rem)] p-6 sm:p-8">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground-muted/85">
              Coming Soon
            </p>
            <h3 className="font-display mt-3 text-xl font-semibold text-foreground-muted">
              {project.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted/85">
              {project.description}
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-hairline px-3 py-1 text-xs text-foreground-muted/85"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </RevealItem>
    );
  }

  return (
    <RevealItem className="rounded-[2rem] bg-glass p-1.5 ring-1 ring-hairline">
      <div className="flex h-full flex-col justify-between rounded-[calc(2rem-0.375rem)] bg-background-elevated p-6 shadow-[inset_0_1px_1px_rgba(245,245,247,0.06)] sm:p-8">
        <div>
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-xl font-semibold text-foreground">
              {project.name}
            </h3>
            <div className="flex shrink-0 items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.name} live demo`}
                  className="group flex h-9 w-9 items-center justify-center rounded-full bg-glass ring-1 ring-hairline transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-accent-strong/50"
                >
                  <ExternalLink
                    className="h-4 w-4 text-foreground-muted transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-strong"
                    strokeWidth={1.5}
                  />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.name} repository`}
                  className="group flex h-9 w-9 items-center justify-center rounded-full bg-glass ring-1 ring-hairline transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-accent-strong/50"
                >
                  <GithubIcon className="h-4 w-4 text-foreground-muted transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-accent-strong" />
                </a>
              )}
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
            {project.description}
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-hairline px-3 py-1 text-xs text-accent-strong"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </RevealItem>
  );
}

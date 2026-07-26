import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/motion/reveal";

const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7", "md:col-span-12"];

export function Projects() {
  return (
    <section id="work" className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-hairline bg-glass px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-accent-strong">
            Featured Work
          </span>
          <h2 className="font-display mt-4 max-w-lg text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Products shipped, not just prototyped.
          </h2>
        </Reveal>

        <Reveal
          as="ul"
          stagger
          className="mt-12 grid list-none grid-cols-1 gap-6 md:grid-cols-12"
        >
          {projects.map((project, i) => (
            <li key={project.id} className={SPANS[i] ?? "md:col-span-6"}>
              <ProjectCard project={project} />
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

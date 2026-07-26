import { skillGroups } from "@/data/skills";
import { Reveal, RevealItem } from "@/components/motion/reveal";

export function Skills() {
  return (
    <section id="skills" className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-hairline bg-glass px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-accent-strong">
            Skills
          </span>
          <h2 className="font-display mt-4 max-w-lg text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Systems thinking, shipped with frontend craft.
          </h2>
        </Reveal>

        <Reveal
          as="ul"
          stagger
          className="mt-12 grid list-none grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {skillGroups.map((group) => (
            <li key={group.id}>
              <RevealItem className="rounded-[2rem] bg-glass p-1.5 ring-1 ring-hairline">
                <div className="h-full rounded-[calc(2rem-0.375rem)] bg-background-elevated p-6 shadow-[inset_0_1px_1px_rgba(245,245,247,0.06)] sm:p-7">
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {group.label}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-hairline px-3 py-1 text-xs text-foreground-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealItem>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

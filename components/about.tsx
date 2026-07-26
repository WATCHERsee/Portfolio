import { profile } from "@/data/profile";
import { Reveal, RevealItem } from "@/components/motion/reveal";

export function About() {
  return (
    <section id="about" className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid w-full max-w-5xl gap-12 md:grid-cols-2 md:items-start">
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-hairline bg-glass px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-accent-strong">
            About
          </span>
          <h2 className="font-display mt-4 text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
            {profile.name}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-foreground-muted">
            {profile.bio}
          </p>
          <p className="mt-4 text-sm text-foreground-muted/85">
            {profile.education}
          </p>
        </Reveal>

        <Reveal as="ul" stagger className="grid list-none gap-4">
          {profile.coreStrengths.map((strength, i) => (
            <li key={i}>
              <RevealItem className="rounded-[2rem] bg-glass p-1.5 ring-1 ring-hairline">
                <div className="rounded-[calc(2rem-0.375rem)] bg-background-elevated p-6 shadow-[inset_0_1px_1px_rgba(245,245,247,0.06)]">
                  <p className="text-sm leading-relaxed text-foreground">
                    {strength}
                  </p>
                </div>
              </RevealItem>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

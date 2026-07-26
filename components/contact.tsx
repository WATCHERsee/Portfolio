import { Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/motion/reveal";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export function Contact() {
  return (
    <section id="contact" className="px-6 py-24 sm:px-10 sm:py-32">
      <Reveal className="mx-auto flex w-full max-w-3xl flex-col items-center rounded-[2.5rem] bg-glass p-1.5 ring-1 ring-hairline">
        <div className="w-full rounded-[calc(2.5rem-0.375rem)] bg-background-elevated px-6 py-16 text-center shadow-[inset_0_1px_1px_rgba(245,245,247,0.06)] sm:px-16">
          <span className="inline-flex items-center rounded-full border border-hairline bg-glass px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-accent-strong">
            Contact
          </span>
          <h2 className="font-display mt-6 text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
            Have an idea for an AI agent or automation? Let&rsquo;s build&nbsp;it.
          </h2>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 text-sm font-medium text-[#050505] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-hairline px-6 py-3 text-sm font-medium text-foreground transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent-strong/50 hover:text-accent-strong"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 text-sm text-foreground-muted/85">
            <Mail className="h-4 w-4" strokeWidth={1.5} />
            {profile.links.email ?? "Email coming soon"}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

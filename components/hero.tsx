"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { AgentConstellation } from "@/components/hero/agent-constellation";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center overflow-hidden px-6 pt-28 pb-24 sm:px-10"
    >
      <AgentConstellation />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="inline-flex items-center rounded-full border border-hairline bg-glass px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-accent-strong backdrop-blur-md"
        >
          Automation &amp; AI Agent Builder
        </motion.div>

        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.32, 0.72, 0, 1] }}
          className="font-display mt-6 max-w-3xl text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.05] tracking-tight text-foreground"
        >
          I build AI agents and automations that actually&nbsp;ship.
        </motion.h1>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.32, 0.72, 0, 1] }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted"
        >
          From agentic dashboards to n8n automation pipelines, I take AI
          products from idea to shipped React/Next.js interface — and run the
          build end to end as founder of Evo Tech Studio.
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease: [0.32, 0.72, 0, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            onClick={() => scrollTo("work")}
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 text-sm font-medium text-[#050505] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
          >
            View Projects
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#050505]/15 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </span>
          </button>

          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="rounded-full border border-hairline px-6 py-3 text-sm font-medium text-foreground transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent-strong/50 hover:text-accent-strong"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNav = (href: string) => {
    setOpen(false);
    scrollTo(href.slice(1));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 sm:pt-6">
      <nav className="flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border border-hairline bg-glass px-4 py-2.5 backdrop-blur-xl sm:px-6">
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          className="font-display flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent-strong"
          aria-label="Scroll to top"
        >
          RA
        </button>

        <ul className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNav(link.href)}
                className="rounded-full px-3 py-2 text-sm text-foreground-muted transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 sm:flex">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-foreground-muted transition-colors hover:text-foreground"
          >
            <GithubIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-foreground-muted transition-colors hover:text-foreground"
          >
            <LinkedinIcon className="h-[18px] w-[18px]" />
          </a>
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-[#050505] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
          >
            Let&apos;s Talk
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-foreground sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <X className="h-5 w-5" strokeWidth={1.5} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          )}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-background/95 backdrop-blur-2xl sm:hidden">
          <ul className="flex flex-col items-center gap-6">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.href}
                style={{ transitionDelay: `${i * 60}ms` }}
                className="opacity-0 animate-[fadeUp_0.6s_ease-out_forwards]"
              >
                <button
                  type="button"
                  onClick={() => handleNav(link.href)}
                  className="font-display text-2xl text-foreground"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-foreground-muted"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-foreground-muted"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

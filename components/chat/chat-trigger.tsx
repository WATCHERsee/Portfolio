"use client";

import { useChatWidget } from "@/components/chat/chat-context";

interface ChatTriggerProps {
  /** "pill" matches the navbar's "Let's Talk" button; "menu" matches the mobile menu's nav links. */
  variant?: "pill" | "menu";
  onNavigate?: () => void;
}

export function ChatTrigger({ variant = "pill", onNavigate }: ChatTriggerProps) {
  const { open, toggle } = useChatWidget();

  const handleClick = () => {
    onNavigate?.();
    toggle();
  };

  const label = open ? "Close Agent" : "Talk to my Agent";

  if (variant === "menu") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="font-display text-2xl text-foreground"
        aria-expanded={open}
      >
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-[#050505] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
      aria-expanded={open}
    >
      {label}
    </button>
  );
}

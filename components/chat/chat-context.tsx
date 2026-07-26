"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface ChatContextValue {
  open: boolean;
  toggle: () => void;
  close: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const value = useMemo<ChatContextValue>(
    () => ({
      open,
      toggle: () => setOpen((o) => !o),
      close: () => setOpen(false),
    }),
    [open]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatWidget() {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error("useChatWidget must be used within a ChatProvider");
  }
  return ctx;
}

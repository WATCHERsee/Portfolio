"use client";

import { startTransition, useEffect, useState } from "react";

function detectWebgl(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export function useWebglSupport(): { supported: boolean; ready: boolean } {
  const [state, setState] = useState({ supported: false, ready: false });

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    startTransition(() => {
      setState({ supported: !reducedMotion && detectWebgl(), ready: true });
    });
  }, []);

  return state;
}

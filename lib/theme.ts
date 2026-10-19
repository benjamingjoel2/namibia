"use client";

import { useSyncExternalStore } from "react";

export type Theme = "day" | "night";

const listeners = new Set<() => void>();

function read(): Theme {
  return document.documentElement.dataset.theme === "night" ? "night" : "day";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("nl-theme", theme);
  } catch {
    // Private mode: the choice lasts for this page view only.
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** Current theme. Renders "day" on the server; ThemeScript has already set the real value before paint. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, read, () => "day");
}

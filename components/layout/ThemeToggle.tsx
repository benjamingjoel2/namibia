"use client";

import { setTheme, useTheme } from "@/lib/theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useTheme();
  const night = theme === "night";

  return (
    <button
      type="button"
      onClick={() => setTheme(night ? "day" : "night")}
      aria-pressed={night}
      aria-label="Night mode"
      title={night ? "Switch to day" : "Switch to night"}
      className={`group relative inline-flex h-8 w-[3.75rem] shrink-0 items-center rounded-full border border-current/50 px-1 transition-colors hover:border-current ${className}`}
    >
      <span
        aria-hidden
        className={`absolute top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full transition-all duration-500 ${
          night ? "left-[calc(100%-1.75rem)] bg-[#f1e8da] text-navy" : "left-1 bg-apricot text-camelthorn"
        }`}
      >
        {night ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="8" cy="8" r="3" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <line key={a} x1="8" y1="1.2" x2="8" y2="2.8" transform={`rotate(${a} 8 8)`} strokeLinecap="round" />
      ))}
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor">
      <path d="M10.8 11.6A5.2 5.2 0 0 1 6.2 2.4a5.6 5.6 0 1 0 7.4 7.4 5.2 5.2 0 0 1-2.8 1.8Z" />
    </svg>
  );
}

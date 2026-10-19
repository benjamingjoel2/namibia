"use client";

import { useRef } from "react";

const short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Twelve month tabs with arrow-key navigation (WAI-ARIA tabs pattern). */
export function MonthTabs({
  value,
  onChange,
  label,
  idPrefix,
  highlight = [],
  highlightLabel,
  tone,
}: {
  value: number;
  onChange: (m: number) => void;
  label: string;
  idPrefix: string;
  highlight?: number[];
  highlightLabel?: string;
  /** Optional per-month colour class for the underline marker. */
  tone?: (m: number) => string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const move = (to: number) => {
    const m = ((to - 1 + 12) % 12) + 1;
    onChange(m);
    refs.current[m - 1]?.focus();
  };
  return (
    <div>
      <div role="tablist" aria-label={label} className="grid grid-cols-6 gap-1 sm:grid-cols-12">
        {short.map((s, i) => {
          const m = i + 1;
          const selected = m === value;
          return (
            <button
              key={s}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`${idPrefix}-tab-${m}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${idPrefix}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(m)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") move(m + 1);
                else if (e.key === "ArrowLeft") move(m - 1);
                else if (e.key === "Home") move(1);
                else if (e.key === "End") move(12);
                else return;
                e.preventDefault();
              }}
              className={`relative py-3 text-[0.95rem] transition-colors ${selected ? "bg-fg text-bg" : "hover:bg-fg/10"}`}
            >
              {s}
              <span
                aria-hidden
                className={`absolute inset-x-2 bottom-1 h-[3px] rounded-full ${tone ? tone(m) : highlight.includes(m) ? "bg-accent" : "bg-transparent"}`}
              />
            </button>
          );
        })}
      </div>
      {highlightLabel && (
        <p className="mt-3 flex items-center gap-2 text-sm text-muted">
          <span className="inline-block h-[3px] w-5 rounded-full bg-accent" aria-hidden /> {highlightLabel}
        </p>
      )}
    </div>
  );
}

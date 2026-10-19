import type { Month } from "@/types/content";

const letters = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** Twelve small cells; the best months are filled. */
export function MonthsStrip({ months, className = "" }: { months: Month[]; className?: string }) {
  const best = new Set(months);
  const label = `Best months: ${names.filter((_, i) => best.has((i + 1) as Month)).join(", ")}`;
  return (
    <div className={className}>
      <p className="sr-only">{label}</p>
      <ol className="grid max-w-[22rem] grid-cols-12 gap-[3px]" aria-hidden>
        {letters.map((l, i) => {
          const on = best.has((i + 1) as Month);
          return (
            <li key={i} className={`flex h-7 items-center justify-center text-[0.72rem] ${on ? "bg-accent text-accent-contrast" : "border border-dashed border-line text-muted"}`}>
              {l}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export const monthName = (m: number) => names[m - 1];

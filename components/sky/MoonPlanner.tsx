"use client";

import { intlLocale } from "@/lib/locale";
import { useEffect, useMemo, useState } from "react";
import { moonInfo } from "@/lib/moonPhase";
import { MoonGlyph } from "./MoonGlyph";

const fmt = (d: Date) => d.toLocaleDateString(intlLocale, { day: "numeric", month: "long", year: "numeric" });
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const ratingText = { excellent: "Excellent dark sky", good: "Good, with some moonlight", moonlit: "Bright moon" } as const;

/** Pick any date: phase, light and a month calendar of the darkest nights. */
export function MoonPlanner() {
  const [value, setValue] = useState<string>("");
  // Default to today on the client (the build date would go stale).
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setValue(iso(new Date())), []);

  const date = useMemo(() => (value ? new Date(`${value}T21:00:00`) : null), [value]);
  const info = date ? moonInfo(date) : null;

  const calendar = useMemo(() => {
    if (!date) return [];
    const y = date.getFullYear();
    const m = date.getMonth();
    const first = new Date(y, m, 1);
    const daysIn = new Date(y, m + 1, 0).getDate();
    const lead = (first.getDay() + 6) % 7; // Monday first
    const cells: ({ day: number; fraction: number; illum: number; rating: string } | null)[] = Array(lead).fill(null);
    for (let d = 1; d <= daysIn; d++) {
      const mi = moonInfo(new Date(y, m, d, 21));
      cells.push({ day: d, fraction: mi.fraction, illum: mi.illumination, rating: mi.darkSky });
    }
    return cells;
  }, [date]);

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
      <div>
        <label className="block">
          <span className="label">Choose a date</span>
          <input
            type="date"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-3 block w-full max-w-xs border-b border-fg bg-transparent py-2 text-[1.2rem] [color-scheme:inherit]"
          />
        </label>

        <div className="mt-10 flex items-center gap-6" aria-live="polite">
          <MoonGlyph fraction={info?.fraction ?? 0} size={112} />
          <div>
            <p className="statement text-[1.9rem]">{info ? info.phase : "—"}</p>
            <p className="mt-1 text-muted">{info ? `${Math.round(info.illumination * 100)}% lit · ${Math.round(info.age)} days old` : ""}</p>
          </div>
        </div>

        {info && (
          <dl className="mt-8 space-y-4">
            <Row label="For stargazing">
              <span className={info.darkSky === "excellent" ? "font-semibold text-accent" : ""}>{ratingText[info.darkSky]}.</span> {info.darkHours}
            </Row>
            <Row label="Next new moon">{fmt(info.nextNew)}</Row>
            <Row label="Next full moon">{fmt(info.nextFull)}</Row>
          </dl>
        )}
        <p className="mt-8 text-sm text-muted">
          Calculated from the average lunar cycle: accurate to about a day, and moonrise times are rough. Good for choosing dates, not for astronomy.
        </p>
      </div>

      <div>
        <p className="label">{date ? date.toLocaleDateString(intlLocale, { month: "long", year: "numeric" }) : "This month"}</p>
        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-muted" aria-hidden>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <ol className="mt-2 grid grid-cols-7 gap-1" aria-label="Moon phase for each night of the month">
          {calendar.map((c, i) =>
            c ? (
              <li
                key={i}
                className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-sm border text-xs ${
                  c.rating === "excellent" ? "border-accent bg-accent/10" : "border-line/50"
                } ${date && c.day === date.getDate() ? "outline outline-2 outline-fg" : ""}`}
              >
                <span className="tabular-nums">{c.day}</span>
                <MoonGlyph fraction={c.fraction} size={22} />
                <span className="sr-only">
                  {Math.round(c.illum * 100)}% lit{c.rating === "excellent" ? ", excellent dark sky" : ""}
                </span>
              </li>
            ) : (
              <li key={i} aria-hidden />
            ),
          )}
        </ol>
        <p className="mt-4 flex items-center gap-2 text-sm text-muted">
          <span className="inline-block size-3 rounded-sm border border-accent bg-accent/10" aria-hidden /> Darkest nights: the moon is less than a quarter lit.
        </p>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-dashed border-line pt-3">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-0.5 text-[1.05rem]">{children}</dd>
    </div>
  );
}

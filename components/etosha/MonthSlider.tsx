"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { etoshaMonths, seasonLabel } from "@/data/etosha";
import type { EtoshaSeason } from "@/types/content";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const seasonPhoto: Record<EtoshaSeason, { src: string; alt: string }> = {
  dry: { src: "/photos/dest-etosha-2.jpg", alt: "An elephant drinking at an Etosha waterhole in the dry season" },
  transition: { src: "/photos/band-etosha.jpg", alt: "A lone tree on the edge of the Etosha pan" },
  green: { src: "/photos/journal-etosha.jpg", alt: "Giraffe and zebra drinking at a waterhole" },
};

const seasonColour: Record<EtoshaSeason, string> = {
  dry: "bg-apricot",
  transition: "bg-[#c9a77a]",
  green: "bg-[#7f9a5e]",
};

/** Etosha by month: drag the slider and the season panel updates. */
export function MonthSlider({ initial = 7 }: { initial?: number }) {
  const [m, setM] = useState(initial);
  const reduce = useReducedMotion();
  const e = etoshaMonths[m - 1];

  return (
    <div>
      <label htmlFor="etosha-month" className="flex items-baseline justify-between gap-4">
        <span className="label">Month</span>
        <span className="statement text-[1.6rem]" aria-hidden>
          {monthNames[m - 1]}
        </span>
      </label>
      <input
        id="etosha-month"
        type="range"
        min={1}
        max={12}
        step={1}
        value={m}
        onChange={(ev) => setM(Number(ev.target.value))}
        aria-valuetext={`${monthNames[m - 1]}: ${seasonLabel[e.season]}`}
        className="mt-4 w-full cursor-pointer accent-[var(--accent)]"
      />
      <div className="mt-2 grid grid-cols-12 gap-[2px]" aria-hidden>
        {etoshaMonths.map((x) => (
          <button
            key={x.month}
            type="button"
            tabIndex={-1}
            onClick={() => setM(x.month)}
            className="group flex flex-col items-center gap-1"
          >
            <span className={`h-2 w-full ${seasonColour[x.season]} ${x.month === m ? "outline outline-2 outline-offset-1 outline-fg" : "opacity-80"}`} />
            <span className={`text-[0.7rem] sm:text-xs ${x.month === m ? "font-semibold" : "text-muted"}`}>{monthNames[x.month - 1].slice(0, 3)}</span>
          </button>
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
        {(Object.keys(seasonLabel) as EtoshaSeason[]).map((s) => (
          <li key={s} className="inline-flex items-center gap-2">
            <span className={`inline-block h-2 w-5 ${seasonColour[s]}`} aria-hidden /> {seasonLabel[s]}
          </li>
        ))}
      </ul>

      <div aria-live="polite" className="mt-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={m}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="relative isolate grid gap-10 lg:grid-cols-[1fr_1.4fr]"
          >
            <div className="relative flex min-h-[26rem] flex-col justify-end overflow-hidden p-6 text-[#f5f0e8] md:p-8">
              <Image src={seasonPhoto[e.season].src} alt={seasonPhoto[e.season].alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="-z-10 object-cover" />
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(0_0_0/0.1)_0%,rgb(0_0_0/0.75)_100%)]" aria-hidden />
              <p className="text-sm uppercase tracking-[0.12em] text-[#f6c88f]">
                {monthNames[m - 1]} · {seasonLabel[e.season]}
              </p>
              <p className="statement mt-3 text-[1.9rem] md:text-[2.4rem]">{e.headline}</p>
              <p className="mt-4 text-[#f5f0e8]/90">{e.weather}</p>
            </div>
            <dl className="grid gap-6 sm:grid-cols-2">
              <Item label="Wildlife">{e.wildlife}</Item>
              <Item label="Waterholes">{e.waterholes}</Item>
              <Item label="Birds">{e.birds}</Item>
              <div className="border-t border-dashed border-line pt-3 [:root[data-theme=night]_&]:order-first [:root[data-theme=night]_&]:border-accent [:root[data-theme=night]_&]:sm:col-span-2">
                <dt className="label">
                  <span className="night-only text-accent">✦ </span>Floodlit waterholes at night
                </dt>
                <dd className="mt-1">{e.floodlit}</dd>
              </div>
            </dl>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-dashed border-line pt-3">
      <dt className="label">{label}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}

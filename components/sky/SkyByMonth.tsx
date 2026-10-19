"use client";

import { useState } from "react";
import { VerifyTag } from "@/components/ui/Section";
import { skyMonths } from "@/data/sky";
import { MonthTabs } from "@/components/ui/MonthTabs";

/** What's up in the southern sky, month by month. */
export function SkyByMonth({ initial = 7 }: { initial?: number }) {
  const [m, setM] = useState(initial);
  const s = skyMonths[m - 1];
  return (
    <div>
      <MonthTabs value={m} onChange={setM} label="Month" idPrefix="sky" highlight={[5, 6, 7, 8]} highlightLabel="Milky Way core overhead" />
      <div role="tabpanel" id={`sky-panel`} aria-labelledby={`sky-tab-${m}`} className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="statement text-[1.9rem] md:text-[2.3rem]">{s.headline}</p>
          {s.verify && (
            <p className="mt-4 text-sm text-muted">
              Seasonal sky notes for planning. <VerifyTag />
            </p>
          )}
        </div>
        <dl className="grid gap-6 sm:grid-cols-2">
          <Item label="Milky Way core">{s.milkyWayCore}</Item>
          <Item label="Magellanic Clouds">{s.magellanicClouds}</Item>
          <Item label="Southern Cross">{s.southernCross}</Item>
          <Item label="Also up">{s.alsoUp}</Item>
          <Item label="The nights" wide>
            {s.nights}
          </Item>
        </dl>
      </div>
    </div>
  );
}

function Item({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`border-t border-dashed border-line pt-3 ${wide ? "sm:col-span-2" : ""}`}>
      <dt className="label">{label}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}

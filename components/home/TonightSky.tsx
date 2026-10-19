"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { moonInfo, type MoonInfo } from "@/lib/moonPhase";
import { MoonGlyph } from "@/components/sky/MoonGlyph";

/** Night-mode only strip: tonight's moon and what it means for the stars. */
export function TonightSky() {
  const [info, setInfo] = useState<MoonInfo | null>(null);
  // Computed on the client so the date is the visitor's, not the build's.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setInfo(moonInfo(new Date())), []);

  return (
    <section aria-label="Tonight's sky" className="night-only relative bg-bg-alt text-fg">
      <div className="starfield" aria-hidden />
      <div className="gutter relative flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          <MoonGlyph fraction={info?.fraction ?? 0} size={52} />
          <div>
            <p className="label">Tonight&rsquo;s sky over Namibia</p>
            <p className="mt-1 text-[1.05rem]" aria-live="polite">
              {info
                ? `${info.phase}, ${Math.round(info.illumination * 100)}% lit. ${info.darkHours}`
                : "Working out tonight’s moon…"}
            </p>
          </div>
        </div>
        <Link href="/night-sky" className="text-[1.05rem] text-accent underline underline-offset-[5px]">
          Plan by the moon
        </Link>
      </div>
    </section>
  );
}

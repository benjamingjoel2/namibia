"use client";

import Link from "next/link";
import { useState } from "react";
import type { Journey } from "@/types/content";

/** Lets a visitor flip between journeys' route planners. Planners are rendered on the server and passed in. */
export function RoutePicker({ journeys, planners }: { journeys: Pick<Journey, "slug" | "title">[]; planners: React.ReactNode[] }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <label className="flex flex-wrap items-center gap-3">
        <span className="label">Show the route for</span>
        <select
          value={i}
          onChange={(e) => setI(Number(e.target.value))}
          className="cursor-pointer border-b border-fg bg-transparent py-1 pr-2 text-[1.05rem]"
        >
          {journeys.map((j, idx) => (
            <option key={j.slug} value={idx} className="text-camelthorn">
              {j.title}
            </option>
          ))}
        </select>
        <Link href={`/journeys/${journeys[i].slug}`} className="text-sm underline underline-offset-4">
          See the full journey
        </Link>
      </label>
      <div className="mt-8">{planners[i]}</div>
    </div>
  );
}

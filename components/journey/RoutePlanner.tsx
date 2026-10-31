import { intlLocale } from "@/lib/locale";
import Link from "next/link";
import { getStay } from "@/data/stays";
import { formatHours, gravelShare, routeTotals, tarmacKm, vehicleLabel, vehicleWhy } from "@/lib/route";
import type { RouteDay } from "@/types/content";

/**
 * Day-by-day route: distance, gravel vs tarmac, driving time, fuel and the
 * vehicle. Each day opens (native <details>) for light notes, stars and stays.
 */
export function RoutePlanner({ days, heading = "Route day planner" }: { days: RouteDay[]; heading?: string }) {
  const t = routeTotals(days);
  const flying = t.flightMinutes > 0;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h3 className="label">{heading}</h3>
        <p className="text-sm text-muted">All distances are estimates. Roads change with the weather; we confirm each route before you travel.</p>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-px border border-dashed border-line bg-line sm:grid-cols-4">
        <Stat label="Total driving" value={`${t.km.toLocaleString(intlLocale)} km`} />
        <Stat label="Gravel / tarmac" value={`${pct(t.gravelKm, t.km)}% / ${pct(t.tarmacKm, t.km)}%`} />
        <Stat label="Time at the wheel" value={formatHours(t.hours)} />
        {flying ? (
          <Stat label="Flying" value={formatHours(t.flightMinutes / 60)} />
        ) : (
          <Stat label="Longest day" value={t.longestDay ? `Day ${t.longestDay.day}, ${formatHours(t.longestDay.driveHours)}` : "—"} />
        )}
      </dl>

      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted" aria-hidden>
        <span className="inline-flex items-center gap-2"><Swatch kind="gravel" /> Gravel</span>
        <span className="inline-flex items-center gap-2"><Swatch kind="tarmac" /> Tarmac</span>
        <span className="inline-flex items-center gap-2"><span className="text-accent">✦</span> Stargazing night</span>
      </div>

      <ol className="mt-6">
        {days.map((d) => (
          <li key={d.day} className="border-t border-dashed border-line last:border-b">
            <DayRow d={d} max={Math.max(...days.map((x) => x.distanceKm), 1)} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function DayRow({ d, max }: { d: RouteDay; max: number }) {
  const stayInfo = d.stayId ? getStay(d.stayId) : undefined;
  const gravel = Math.round(gravelShare(d) * 100);
  const long = d.driveHours >= 5.5;
  return (
    <details className="group">
      <summary className="grid cursor-pointer list-none grid-cols-[3.25rem_1fr_auto] items-center gap-x-4 gap-y-2 py-4 marker:hidden md:grid-cols-[4rem_minmax(0,1.3fr)_minmax(0,1fr)_7rem_1.5rem] [&::-webkit-details-marker]:hidden">
        <span className="text-sm tabular-nums text-muted">Day {d.day}</span>
        <span className="min-w-0">
          <span className="block text-[1.1rem] leading-snug">
            {d.title}
            {d.stargazing && (
              <span className="ml-2 text-accent" title="Stargazing night">
                ✦<span className="sr-only"> Stargazing night</span>
              </span>
            )}
          </span>
          <span className="block truncate text-sm text-muted">
            {d.from === d.to ? `Based at ${d.from}` : `${d.from} → ${d.to}`}
          </span>
        </span>

        <span className="col-span-3 col-start-2 md:col-span-1 md:col-start-auto">
          {d.flightMinutes ? (
            <span className="text-sm">✈ About {formatHours(d.flightMinutes / 60)} flying</span>
          ) : d.distanceKm > 0 ? (
            <>
              <span
                className="flex h-2 overflow-hidden rounded-full bg-line/40"
                style={{ width: `${Math.max(12, (d.distanceKm / max) * 100)}%` }}
                role="img"
                aria-label={`${d.distanceKm} km: ${d.gravelKm} km gravel, ${tarmacKm(d)} km tarmac`}
              >
                <span className="bg-[repeating-linear-gradient(90deg,var(--accent)_0_6px,transparent_6px_9px)]" style={{ width: `${gravel}%` }} />
                <span className="bg-fg/70" style={{ width: `${100 - gravel}%` }} />
              </span>
              <span className="mt-1 block text-sm text-muted">
                {d.distanceKm} km · {d.gravelKm} gravel · {tarmacKm(d)} tarmac
              </span>
            </>
          ) : (
            <span className="text-sm text-muted">No long drive today</span>
          )}
        </span>

        <span className={`row-start-1 text-right text-sm tabular-nums md:row-auto ${long ? "font-semibold text-accent" : ""}`}>
          {d.flightMinutes ? "—" : formatHours(d.driveHours)}
          {long && <span className="sr-only"> (a long day)</span>}
        </span>
        <span aria-hidden className="hidden text-right text-lg transition-transform group-open:rotate-45 md:block">+</span>
      </summary>

      <div className="grid gap-6 pb-6 pl-[4.25rem] text-[0.98rem] md:grid-cols-3 md:pl-[5rem]">
        <div className="space-y-2">
          {d.sunrise && <Note label="Sunrise">{d.sunrise}</Note>}
          {d.sunset && <Note label="Sunset">{d.sunset}</Note>}
          {d.stargazing && <Note label="After dark">{d.skyNote ?? "A dark-sky night. Step away from the lights."}</Note>}
          {!d.sunrise && !d.sunset && !d.stargazing && <p className="text-muted">A travel day: easy light, early night.</p>}
        </div>
        <div className="space-y-2">
          {d.fuelStops.length > 0 && <Note label="Fuel">{d.fuelStops.join(" · ")}</Note>}
          <Note label="Vehicle">
            {vehicleLabel[d.vehicle]}. <span className="text-muted">{vehicleWhy[d.vehicle]}</span>
          </Note>
          {d.note && <Note label="Honest note">{d.note}</Note>}
        </div>
        <div className="space-y-2">
          {d.activities.length > 0 && (
            <Note label="Today">
              <ul className="list-disc pl-4">
                {d.activities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </Note>
          )}
          {stayInfo && (
            <Note label="Stay">
              <Link href={`/destinations/${stayInfo.destinationSlug}`} className="underline underline-offset-4">
                {stayInfo.name}
              </Link>
            </Note>
          )}
        </div>
      </div>
    </details>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg p-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="statement mt-1 text-[1.35rem]">{value}</dd>
    </div>
  );
}

function Note({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="label text-[0.8rem] uppercase tracking-[0.08em] text-muted">{label}</p>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}

function Swatch({ kind }: { kind: "gravel" | "tarmac" }) {
  return (
    <span
      className={`inline-block h-2 w-6 rounded-full ${
        kind === "gravel" ? "bg-[repeating-linear-gradient(90deg,var(--accent)_0_6px,transparent_6px_9px)]" : "bg-fg/70"
      }`}
    />
  );
}

const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);

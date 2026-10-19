/**
 * Moon phase from the mean synodic month. Good to about ±1 day: enough for
 * choosing trip dates, not for astronomy. Times are rough local estimates for
 * Namibia (sunrise about 06:00, sunset about 18:00).
 */

export const SYNODIC_DAYS = 29.530588853;
/** A known new moon: 2000-01-06 18:14 UTC. */
const REF_NEW_MOON_MS = Date.UTC(2000, 0, 6, 18, 14);
const DAY_MS = 86_400_000;

export type PhaseName =
  | "New moon"
  | "Waxing crescent"
  | "First quarter"
  | "Waxing gibbous"
  | "Full moon"
  | "Waning gibbous"
  | "Last quarter"
  | "Waning crescent";

export interface MoonInfo {
  /** Days since the last new moon, 0 to 29.53. */
  age: number;
  /** 0 = new, 0.5 = full. */
  fraction: number;
  /** Lit fraction of the disc, 0 to 1. */
  illumination: number;
  phase: PhaseName;
  waxing: boolean;
  nextNew: Date;
  nextFull: Date;
  /** Very rough local moonrise and moonset hours (0–24). */
  riseHour: number;
  setHour: number;
  darkSky: "excellent" | "good" | "moonlit";
  darkHours: string;
}

export function moonInfo(date: Date): MoonInfo {
  const days = (date.getTime() - REF_NEW_MOON_MS) / DAY_MS;
  const age = ((days % SYNODIC_DAYS) + SYNODIC_DAYS) % SYNODIC_DAYS;
  const fraction = age / SYNODIC_DAYS;
  const illumination = (1 - Math.cos(2 * Math.PI * fraction)) / 2;
  const waxing = fraction < 0.5;

  const toNew = SYNODIC_DAYS - age;
  const toFull = fraction < 0.5 ? SYNODIC_DAYS / 2 - age : SYNODIC_DAYS * 1.5 - age;
  const nextNew = new Date(date.getTime() + toNew * DAY_MS);
  const nextFull = new Date(date.getTime() + toFull * DAY_MS);

  // The moon rises with the sun at new moon and about 50 minutes later each day.
  const riseHour = (6 + 24 * fraction) % 24;
  const setHour = (18 + 24 * fraction) % 24;

  const darkSky = illumination < 0.25 ? "excellent" : illumination < 0.6 ? "good" : "moonlit";

  return {
    age,
    fraction,
    illumination,
    phase: phaseName(age),
    waxing,
    nextNew,
    nextFull,
    riseHour,
    setHour,
    darkSky,
    darkHours: darkHours(fraction, illumination, riseHour, setHour),
  };
}

export function phaseName(age: number): PhaseName {
  const q = SYNODIC_DAYS / 4;
  if (age < 1.5 || age > SYNODIC_DAYS - 1.5) return "New moon";
  if (Math.abs(age - q) < 1) return "First quarter";
  if (Math.abs(age - 2 * q) < 1) return "Full moon";
  if (Math.abs(age - 3 * q) < 1) return "Last quarter";
  if (age < q) return "Waxing crescent";
  if (age < 2 * q) return "Waxing gibbous";
  if (age < 3 * q) return "Waning gibbous";
  return "Waning crescent";
}

const hh = (h: number) => {
  const r = Math.round(h) % 24;
  if (r === 0) return "midnight";
  if (r === 12) return "midday";
  return r < 12 ? `${r}am` : `${r - 12}pm`;
};

function darkHours(fraction: number, illumination: number, rise: number, set: number): string {
  if (illumination < 0.08) return "Dark all night: the moon is close to the sun.";
  if (illumination > 0.92) return "Moon up all night: a night for landscapes by moonlight, not faint stars.";
  if (fraction < 0.5) {
    // Waxing: moon is up in the evening and sets later each night.
    return set >= 18 || set < 1
      ? `Moon sets around ${hh(set)}, then dark until dawn.`
      : `Moon sets around ${hh(set)}; dark from then until dawn.`;
  }
  // Waning: dark in the evening until the moon rises.
  return `Dark from dusk until moonrise, around ${hh(rise)}.`;
}

/** The new moons between two dates: handy for listing the best stargazing weeks. */
export function newMoonsBetween(start: Date, end: Date): Date[] {
  const out: Date[] = [];
  let d = moonInfo(start).nextNew;
  while (d <= end) {
    out.push(d);
    d = new Date(d.getTime() + SYNODIC_DAYS * DAY_MS);
  }
  return out;
}

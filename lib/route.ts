import type { RouteDay, Vehicle } from "@/types/content";

export interface RouteTotals {
  km: number;
  gravelKm: number;
  tarmacKm: number;
  hours: number;
  longestDay: RouteDay | null;
  flightMinutes: number;
  stargazingNights: number;
}

export function routeTotals(days: RouteDay[]): RouteTotals {
  let km = 0;
  let gravelKm = 0;
  let hours = 0;
  let flightMinutes = 0;
  let stargazingNights = 0;
  let longestDay: RouteDay | null = null;
  for (const d of days) {
    km += d.distanceKm;
    gravelKm += Math.min(d.gravelKm, d.distanceKm);
    hours += d.driveHours;
    flightMinutes += d.flightMinutes ?? 0;
    if (d.stargazing) stargazingNights++;
    if (!longestDay || d.driveHours > longestDay.driveHours) longestDay = d;
  }
  if (longestDay && longestDay.driveHours === 0) longestDay = null;
  return { km, gravelKm, tarmacKm: km - gravelKm, hours, longestDay, flightMinutes, stargazingNights };
}

export const tarmacKm = (d: RouteDay) => Math.max(0, d.distanceKm - d.gravelKm);

export const gravelShare = (d: RouteDay) => (d.distanceKm ? Math.min(1, d.gravelKm / d.distanceKm) : 0);

export function formatHours(h: number) {
  if (h <= 0) return "No driving";
  const whole = Math.floor(h);
  const mins = Math.round((h - whole) * 60);
  if (whole === 0) return `${mins} min`;
  return mins ? `${whole} h ${mins} min` : `${whole} h`;
}

export const vehicleLabel: Record<Vehicle, string> = {
  "4x4-lodges": "4x4, lodge nights",
  "4x4-rooftop": "4x4 with rooftop tent",
  "sedan-ok": "Sedan is fine",
  "guided-vehicle": "Guide's vehicle",
  "light-aircraft": "Light aircraft",
};

export const vehicleWhy: Record<Vehicle, string> = {
  "4x4-lodges": "High clearance and two spare tyres for gravel; you sleep in lodges, so no camping kit.",
  "4x4-rooftop": "The same 4x4 with a tent on the roof, a fridge and a camp kitchen. Cheaper, closer to the sky.",
  "sedan-ok": "Tarmac or good gravel only. Cheaper, but no deep sand.",
  "guided-vehicle": "Your guide drives; you look out of the window.",
  "light-aircraft": "Small planes between camp airstrips. Strict luggage limits: soft bags only.",
};

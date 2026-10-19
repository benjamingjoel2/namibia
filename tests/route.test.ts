import assert from "node:assert/strict";
import { test } from "node:test";
import { formatHours, gravelShare, routeTotals, tarmacKm } from "../lib/route.ts";
import type { RouteDay } from "../types/content.ts";

const day = (o: Partial<RouteDay>): RouteDay => ({
  day: 1,
  title: "t",
  from: "a",
  to: "b",
  distanceKm: 0,
  gravelKm: 0,
  driveHours: 0,
  fuelStops: [],
  vehicle: "4x4-lodges",
  activities: [],
  ...o,
});

test("totals add up and split gravel from tarmac", () => {
  const t = routeTotals([
    day({ day: 1, distanceKm: 330, gravelKm: 240, driveHours: 5, stargazing: true }),
    day({ day: 2, distanceKm: 130, gravelKm: 10, driveHours: 2.5 }),
    day({ day: 3, flightMinutes: 75, vehicle: "light-aircraft" }),
  ]);
  assert.equal(t.km, 460);
  assert.equal(t.gravelKm, 250);
  assert.equal(t.tarmacKm, 210);
  assert.equal(t.hours, 7.5);
  assert.equal(t.flightMinutes, 75);
  assert.equal(t.stargazingNights, 1);
  assert.equal(t.longestDay?.day, 1);
});

test("gravel can't exceed distance", () => {
  const d = day({ distanceKm: 100, gravelKm: 150 });
  assert.equal(gravelShare(d), 1);
  assert.equal(tarmacKm(d), 0);
  assert.equal(routeTotals([d]).gravelKm, 100);
});

test("no-driving days have no longest day", () => {
  assert.equal(routeTotals([day({})]).longestDay, null);
});

test("hours format for people", () => {
  assert.equal(formatHours(0), "No driving");
  assert.equal(formatHours(0.75), "45 min");
  assert.equal(formatHours(5), "5 h");
  assert.equal(formatHours(2.5), "2 h 30 min");
});

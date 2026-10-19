import assert from "node:assert/strict";
import { test } from "node:test";
import { moonInfo, newMoonsBetween, phaseName, SYNODIC_DAYS } from "../lib/moonPhase.ts";

const DAY = 86_400_000;

// Published new and full moons (UTC). The mean-cycle method should land within about a day.
const knownNew = ["2024-01-11T11:57Z", "2025-03-29T10:58Z", "2026-07-14T09:44Z"];
const knownFull = ["2024-08-19T18:26Z", "2025-10-07T03:48Z", "2026-03-03T11:38Z"];

test("known new moons read as new, nearly unlit", () => {
  for (const iso of knownNew) {
    const m = moonInfo(new Date(iso));
    assert.equal(m.phase, "New moon", iso);
    assert.ok(m.illumination < 0.03, `${iso}: ${m.illumination}`);
  }
});

test("known full moons read as full, nearly fully lit", () => {
  for (const iso of knownFull) {
    const m = moonInfo(new Date(iso));
    assert.equal(m.phase, "Full moon", iso);
    assert.ok(m.illumination > 0.97, `${iso}: ${m.illumination}`);
  }
});

test("next full moon is predicted within a day", () => {
  const m = moonInfo(new Date("2024-08-10T00:00Z"));
  const actual = new Date("2024-08-19T18:26Z").getTime();
  assert.ok(Math.abs(m.nextFull.getTime() - actual) < DAY, m.nextFull.toISOString());
});

test("phase names follow the cycle", () => {
  const q = SYNODIC_DAYS / 4;
  assert.equal(phaseName(0.2), "New moon");
  assert.equal(phaseName(q / 2), "Waxing crescent");
  assert.equal(phaseName(q), "First quarter");
  assert.equal(phaseName(1.5 * q), "Waxing gibbous");
  assert.equal(phaseName(2 * q), "Full moon");
  assert.equal(phaseName(2.5 * q), "Waning gibbous");
  assert.equal(phaseName(3 * q), "Last quarter");
  assert.equal(phaseName(3.5 * q), "Waning crescent");
});

test("dark-sky rating tracks illumination", () => {
  assert.equal(moonInfo(new Date(knownNew[0])).darkSky, "excellent");
  assert.equal(moonInfo(new Date(knownFull[0])).darkSky, "moonlit");
});

test("new moons in a year are about a month apart", () => {
  const list = newMoonsBetween(new Date("2026-01-01"), new Date("2026-12-31"));
  assert.ok(list.length === 12 || list.length === 13);
  for (let i = 1; i < list.length; i++) {
    const gap = (list[i].getTime() - list[i - 1].getTime()) / DAY;
    assert.ok(Math.abs(gap - SYNODIC_DAYS) < 0.01);
  }
});

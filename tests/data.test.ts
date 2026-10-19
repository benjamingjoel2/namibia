import assert from "node:assert/strict";
import { test } from "node:test";
import { destinations } from "../data/destinations.ts";
import { journeys } from "../data/journeys.ts";
import { stays } from "../data/stays.ts";

const stayIds = new Set(stays.map((s) => s.id));
const destSlugs = new Set(destinations.map((d) => d.slug));

test("every destination's stays exist", () => {
  for (const d of destinations) for (const id of d.stayIds) assert.ok(stayIds.has(id), `${d.slug} → ${id}`);
});

test("every stay belongs to a real destination", () => {
  for (const s of stays) assert.ok(destSlugs.has(s.destinationSlug), s.id);
});

test("journeys reference real destinations and stays, with sane route data", () => {
  for (const j of journeys) {
    for (const slug of j.destinationSlugs) assert.ok(destSlugs.has(slug), `${j.slug} → ${slug}`);
    j.days.forEach((d, i) => {
      assert.equal(d.day, i + 1, `${j.slug} day numbering`);
      assert.ok(d.gravelKm <= d.distanceKm, `${j.slug} day ${d.day}: gravel > distance`);
      if (d.stayId) assert.ok(stayIds.has(d.stayId), `${j.slug} day ${d.day} → ${d.stayId}`);
    });
    assert.ok(j.styles.length > 0, `${j.slug} has a style`);
  }
});

test("there are three featured destinations, numbered 1 to 3", () => {
  const f = destinations.filter((d) => d.featured).map((d) => d.featured).sort();
  assert.deepEqual(f, [1, 2, 3]);
});

import assert from "node:assert/strict";
import { test } from "node:test";
import { enquirySchema, fieldErrors } from "../lib/enquiry.ts";

const valid = {
  month: 6,
  days: 12,
  travelStyle: "self-drive",
  adults: 2,
  children: 1,
  childAges: [9],
  budget: "5000-8000",
  currency: "GBP",
  name: "Test Person",
  email: "test@example.com",
  contactMethod: "email",
};

test("a complete enquiry passes", () => {
  assert.equal(enquirySchema.safeParse(valid).success, true);
});

test("each child needs an age, with a friendly message", () => {
  const r = enquirySchema.safeParse({ ...valid, childAges: [] });
  assert.equal(r.success, false);
  if (!r.success) assert.equal(fieldErrors(r.error).childAges, "Please give an age for each child");
  const r2 = enquirySchema.safeParse({ ...valid, childAges: [NaN] });
  assert.equal(r2.success, false);
  if (!r2.success) assert.equal(fieldErrors(r2.error).childAges, "Please give an age for each child");
});

test("WhatsApp or phone contact needs a number", () => {
  const r = enquirySchema.safeParse({ ...valid, contactMethod: "whatsapp", phone: "" });
  assert.equal(r.success, false);
  if (!r.success) assert.ok(fieldErrors(r.error).phone);
});

test("a filled honeypot still parses, so the route can drop it quietly", () => {
  const r = enquirySchema.safeParse({ ...valid, website: "http://spam.example" });
  assert.equal(r.success, true);
});

test("missing fields get human messages", () => {
  const r = enquirySchema.safeParse({});
  assert.equal(r.success, false);
  if (!r.success) {
    const e = fieldErrors(r.error);
    assert.equal(e.name, "Please tell us your name");
    assert.equal(e.travelStyle, "Choose a travel style");
  }
});

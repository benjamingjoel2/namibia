import { z } from "zod";

/** Shared by the planning form (client) and /api/enquiry (server). */

export const travelStyles = ["self-drive", "guided", "fly-in", "not-sure"] as const;
export const interests = ["photography", "wildlife", "stars", "culture", "walking", "desert"] as const;
export const stayStyles = ["camping", "lodges", "luxury-camps"] as const;
export const contactMethods = ["email", "whatsapp", "phone"] as const;

/** Per-person budget bands, stored in USD; labels are converted for display. */
export const budgetBands = [
  { id: "under-3000", min: 0, max: 3000 },
  { id: "3000-5000", min: 3000, max: 5000 },
  { id: "5000-8000", min: 5000, max: 8000 },
  { id: "8000-12000", min: 8000, max: 12000 },
  { id: "over-12000", min: 12000, max: null },
  { id: "not-sure", min: null, max: null },
] as const;

export const enquirySchema = z
  .object({
    month: z.coerce.number().int().min(1, "Choose a month").max(12),
    year: z.coerce.number().int().min(2025).max(2035).optional(),
    days: z.coerce.number({ error: "How many days?" }).int().min(3, "At least 3 days").max(60, "Up to 60 days"),
    travelStyle: z.enum(travelStyles, { error: "Choose a travel style" }),
    mustSees: z.array(z.string().max(60)).max(20).default([]),
    interests: z.array(z.enum(interests)).max(interests.length).default([]),
    stayStyles: z.array(z.enum(stayStyles)).max(stayStyles.length).default([]),
    adults: z.coerce.number({ error: "How many adults?" }).int().min(1, "At least one adult").max(20),
    children: z.coerce.number({ error: "How many children?" }).int().min(0).max(12),
    childAges: z.array(z.coerce.number({ error: "Please give an age for each child" }).int("Please give an age for each child").min(0).max(17, "Ages up to 17; count 18+ as adults")).max(12).default([]),
    budget: z.enum(budgetBands.map((b) => b.id) as [string, ...string[]], { error: "Choose a budget" }),
    currency: z.string({ error: "Missing currency" }).length(3),
    name: z.string({ error: "Please tell us your name" }).trim().min(2, "Please tell us your name").max(120),
    email: z.email("Please enter a valid email"),
    phone: z.string().trim().max(40).optional().default(""),
    contactMethod: z.enum(contactMethods, { error: "Choose how we should contact you" }),
    notes: z.string().trim().max(4000).optional().default(""),
    journey: z.string().max(80).optional().default(""),
    /** Honeypot: real people leave this empty. */
    website: z.string().max(200).optional().default(""),
  })
  .superRefine((v, ctx) => {
    if (v.childAges.length !== v.children) {
      ctx.addIssue({ code: "custom", path: ["childAges"], message: "Please give an age for each child" });
    }
    if ((v.contactMethod === "whatsapp" || v.contactMethod === "phone") && v.phone.length < 6) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Add a number so we can reach you that way" });
    }
  });

export type Enquiry = z.infer<typeof enquirySchema>;

/** First error message per field, keyed by the top-level field name. */
export function fieldErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

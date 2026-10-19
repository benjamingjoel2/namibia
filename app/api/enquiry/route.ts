import { NextResponse } from "next/server";
import { enquirySchema, fieldErrors } from "@/lib/enquiry";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "Invalid request" } }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: fieldErrors(parsed.error) }, { status: 400 });
  }

  const { website, ...enquiry } = parsed.data;
  if (website) {
    // Honeypot filled: quietly accept so bots learn nothing.
    return NextResponse.json({ ok: true });
  }

  const record = { receivedAt: new Date().toISOString(), ...enquiry };
  console.log("[enquiry]", JSON.stringify(record));

  // TODO: CRM integration. Send `record` to the CRM (e.g. create a lead with
  // the trip details as custom fields) and notify the team by email. Keep the
  // console log until the CRM call is confirmed working in production.

  return NextResponse.json({ ok: true });
}

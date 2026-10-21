"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { destinations } from "@/data/destinations";
import { etoshaMonths, seasonLabel } from "@/data/etosha";
import { journeys } from "@/data/journeys";
import { skyMonths } from "@/data/sky";
import { formatPrice, useCurrency } from "@/lib/currency";
import { budgetBands, enquirySchema, fieldErrors, interests, stayStyles, travelStyles } from "@/lib/enquiry";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const styleLabels: Record<(typeof travelStyles)[number], string> = { "self-drive": "Self-drive", guided: "Guided", "fly-in": "Fly-in", "not-sure": "Not sure yet" };
const interestLabels: Record<(typeof interests)[number], string> = { photography: "Photography", wildlife: "Wildlife", stars: "Stars", culture: "Culture", walking: "Walking", desert: "Desert" };
const stayLabels: Record<(typeof stayStyles)[number], string> = { camping: "Camping", lodges: "Lodges", "luxury-camps": "Luxury camps" };

type State = {
  month: string;
  year: string;
  days: string;
  travelStyle: string;
  mustSees: string[];
  interests: string[];
  stayStyles: string[];
  adults: string;
  children: string;
  childAges: string[];
  budget: string;
  name: string;
  email: string;
  phone: string;
  contactMethod: string;
  notes: string;
  journey: string;
  website: string;
};

const initial: State = {
  month: "",
  year: "",
  days: "12",
  travelStyle: "",
  mustSees: [],
  interests: [],
  stayStyles: [],
  adults: "2",
  children: "0",
  childAges: [],
  budget: "",
  name: "",
  email: "",
  phone: "",
  contactMethod: "email",
  notes: "",
  journey: "",
  website: "",
};

export function PlanningForm() {
  const [s, setS] = useState<State>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const { code } = useCurrency();
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const thisYear = new Date().getFullYear();

  // Prefill from ?journey=slug (links from journey pages).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("journey");
    const j = slug ? journeys.find((x) => x.slug === slug) : undefined;
    if (j) {
      // Query string is only readable on the client.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setS((v) => ({ ...v, journey: j.slug, days: String(j.days.length), mustSees: j.destinationSlugs.filter((d) => d !== "windhoek") }));
    }
  }, []);

  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);

  const set = <K extends keyof State>(k: K, v: State[K]) => setS((prev) => ({ ...prev, [k]: v }));
  const toggle = (k: "mustSees" | "interests" | "stayStyles", v: string) =>
    setS((prev) => ({ ...prev, [k]: prev[k].includes(v) ? prev[k].filter((x) => x !== v) : [...prev[k], v] }));
  const setChildren = (n: string) => {
    const count = Math.max(0, Math.min(12, Number(n) || 0));
    setS((prev) => ({ ...prev, children: n, childAges: Array.from({ length: count }, (_, i) => prev.childAges[i] ?? "") }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...s,
      year: s.year || undefined,
      childAges: s.childAges.map((a) => (a === "" ? NaN : Number(a))),
      currency: code,
    };
    const parsed = enquirySchema.safeParse(payload);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      const first = Object.keys(errs)[0];
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus());
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      if (res.ok) setStatus("sent");
      else {
        const data = await res.json().catch(() => ({}));
        if (data?.errors) setErrors(data.errors);
        setStatus("failed");
      }
    } catch {
      setStatus("failed");
    }
  }

  const m = Number(s.month);
  const etosha = m ? etoshaMonths[m - 1] : null;
  const sky = m ? skyMonths[m - 1] : null;
  const err = (k: string) => (errors[k] ? `${uid}-${k}-err` : undefined);

  return (
    <>
      {status === "sent" ? (
        <div ref={doneRef} tabIndex={-1} className="fade-up py-10 text-center outline-none" role="status">
          <p className="display text-[2.2rem] md:text-[3rem]">Thank you</p>
          <p className="statement mx-auto mt-8 max-w-[30rem] text-[1.5rem] md:text-[1.9rem]">We&rsquo;ll be in touch before the next sunrise.</p>
          <p className="mt-8 text-muted">
            While you wait, see what the sky will be doing on your dates:{" "}
            <Link href="/night-sky#moon" className="underline underline-offset-4">
              moon planner
            </Link>
            .
          </p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={submit} noValidate className="space-y-10">
          {Object.keys(errors).length > 0 && (
            <div role="alert" className="border border-accent p-4 text-[0.98rem]">
              <p className="font-semibold">Please check {Object.keys(errors).length === 1 ? "one thing" : `${Object.keys(errors).length} things`} below.</p>
            </div>
          )}

          {/* When */}
          <Fieldset legend="When">
            <div className="grid gap-6 sm:grid-cols-3">
              <Field label="Month" required error={errors.month} errId={err("month")}>
                <select data-field="month" value={s.month} onChange={(e) => set("month", e.target.value)} aria-invalid={!!errors.month} aria-describedby={err("month")} className={inputCls} required>
                  <option value="">Choose…</option>
                  {monthNames.map((n, i) => (
                    <option key={n} value={i + 1}>
                      {n}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Year">
                <select value={s.year} onChange={(e) => set("year", e.target.value)} className={inputCls}>
                  <option value="">Flexible</option>
                  {[0, 1, 2].map((d) => (
                    <option key={d} value={thisYear + d}>
                      {thisYear + d}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Days" required error={errors.days} errId={err("days")}>
                <input data-field="days" type="number" inputMode="numeric" min={3} max={60} value={s.days} onChange={(e) => set("days", e.target.value)} aria-invalid={!!errors.days} aria-describedby={err("days")} className={inputCls} />
              </Field>
            </div>

            {etosha && sky && (
              <div className="mt-6 grid gap-4 bg-bg p-4 text-[0.95rem] sm:grid-cols-2" aria-live="polite">
                <div>
                  <p className="label">Etosha in {monthNames[m - 1]}</p>
                  <p className="mt-1">
                    <span className="text-muted">{seasonLabel[etosha.season]}:</span> {etosha.headline}. {etosha.floodlit}
                  </p>
                  <Link href="/waterhole-watch" className="mt-1 inline-block text-sm underline underline-offset-4">
                    Waterhole Watch
                  </Link>
                </div>
                <div>
                  <p className="label">The night sky</p>
                  <p className="mt-1">
                    {sky.headline}. <span className="text-muted">Milky Way core:</span> {sky.milkyWayCore}
                  </p>
                  <Link href="/night-sky" className="mt-1 inline-block text-sm underline underline-offset-4">
                    Night Sky
                  </Link>
                </div>
              </div>
            )}
          </Fieldset>

          {/* Style */}
          <Fieldset legend="Travel style" required error={errors.travelStyle} errId={err("travelStyle")}>
            <div className="flex flex-wrap gap-2">
              {travelStyles.map((t, i) => (
                <Chip key={t} type="radio" name="travelStyle" checked={s.travelStyle === t} onChange={() => set("travelStyle", t)} dataField={i === 0 ? "travelStyle" : undefined} invalid={!!errors.travelStyle}>
                  {styleLabels[t]}
                </Chip>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted">
              Unsure?{" "}
              <Link href="/how-to-travel#chooser" className="underline underline-offset-4">
                Five questions will help
              </Link>
              .
            </p>
          </Fieldset>

          {/* Must-sees */}
          <Fieldset legend="Must-sees">
            <div className="flex flex-wrap gap-2">
              {destinations
                .filter((d) => d.slug !== "windhoek")
                .map((d) => (
                  <Chip key={d.slug} type="checkbox" checked={s.mustSees.includes(d.slug)} onChange={() => toggle("mustSees", d.slug)}>
                    {d.name.split(",")[0]}
                  </Chip>
                ))}
            </div>
          </Fieldset>

          <div className="grid gap-10 sm:grid-cols-2">
            <Fieldset legend="Interests">
              <div className="flex flex-wrap gap-2">
                {interests.map((i) => (
                  <Chip key={i} type="checkbox" checked={s.interests.includes(i)} onChange={() => toggle("interests", i)}>
                    {interestLabels[i]}
                  </Chip>
                ))}
              </div>
            </Fieldset>
            <Fieldset legend="Where you like to stay">
              <div className="flex flex-wrap gap-2">
                {stayStyles.map((i) => (
                  <Chip key={i} type="checkbox" checked={s.stayStyles.includes(i)} onChange={() => toggle("stayStyles", i)}>
                    {stayLabels[i]}
                  </Chip>
                ))}
              </div>
            </Fieldset>
          </div>

          {/* Travellers */}
          <Fieldset legend="Travellers">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Adults" required error={errors.adults} errId={err("adults")}>
                <input data-field="adults" type="number" inputMode="numeric" min={1} max={20} value={s.adults} onChange={(e) => set("adults", e.target.value)} aria-invalid={!!errors.adults} aria-describedby={err("adults")} className={inputCls} />
              </Field>
              <Field label="Children (under 18)">
                <input type="number" inputMode="numeric" min={0} max={12} value={s.children} onChange={(e) => setChildren(e.target.value)} className={inputCls} />
              </Field>
            </div>
            {s.childAges.length > 0 && (
              <div className="mt-6">
                <p className="text-[0.95rem]">Children&rsquo;s ages</p>
                <div className="mt-2 flex flex-wrap gap-3">
                  {s.childAges.map((a, i) => (
                    <label key={i} className="flex items-center gap-2 text-sm">
                      <span className="sr-only">Age of child {i + 1}</span>
                      <span aria-hidden>Child {i + 1}</span>
                      <input
                        data-field={i === 0 ? "childAges" : undefined}
                        type="number"
                        inputMode="numeric"
                        min={0}
                        max={17}
                        value={a}
                        onChange={(e) => setS((prev) => ({ ...prev, childAges: prev.childAges.map((x, j) => (j === i ? e.target.value : x)) }))}
                        aria-invalid={!!errors.childAges && a === ""}
                        aria-describedby={err("childAges")}
                        className={`${inputCls} w-16`}
                      />
                    </label>
                  ))}
                </div>
                {errors.childAges && (
                  <p id={err("childAges")} className="mt-2 text-sm text-accent">
                    {errors.childAges}
                  </p>
                )}
              </div>
            )}
          </Fieldset>

          {/* Budget */}
          <Fieldset legend={`Budget per person (${code}, excluding international flights)`} required error={errors.budget} errId={err("budget")}>
            <div className="flex flex-wrap gap-2">
              {budgetBands.map((b, i) => (
                <Chip key={b.id} type="radio" name="budget" checked={s.budget === b.id} onChange={() => set("budget", b.id)} dataField={i === 0 ? "budget" : undefined} invalid={!!errors.budget}>
                  {b.id === "not-sure"
                    ? "Not sure yet"
                    : b.max === null
                      ? `Over ${formatPrice(b.min ?? 0, code)}`
                      : b.min === 0
                        ? `Under ${formatPrice(b.max, code)}`
                        : `${formatPrice(b.min ?? 0, code)}–${formatPrice(b.max, code)}`}
                </Chip>
              ))}
            </div>
          </Fieldset>

          {/* You */}
          <Fieldset legend="About you">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Name" required error={errors.name} errId={err("name")}>
                <input data-field="name" autoComplete="name" value={s.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={err("name")} className={inputCls} />
              </Field>
              <Field label="Email" required error={errors.email} errId={err("email")}>
                <input data-field="email" type="email" autoComplete="email" value={s.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={err("email")} className={inputCls} />
              </Field>
              <Field label="Phone" error={errors.phone} errId={err("phone")}>
                <input data-field="phone" type="tel" autoComplete="tel" value={s.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={err("phone")} className={inputCls} />
              </Field>
              <div>
                <p className="text-[0.95rem]" id={`${uid}-pref`}>
                  Preferred contact
                </p>
                <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-labelledby={`${uid}-pref`}>
                  {(["email", "whatsapp", "phone"] as const).map((c) => (
                    <Chip key={c} type="radio" name="contactMethod" checked={s.contactMethod === c} onChange={() => set("contactMethod", c)}>
                      {c === "whatsapp" ? "WhatsApp" : c[0].toUpperCase() + c.slice(1)}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          </Fieldset>

          <Field label="Anything else? Dreams, worries, dates, a dune you've always wanted to climb.">
            <textarea rows={4} value={s.notes} onChange={(e) => set("notes", e.target.value)} className={`${inputCls} resize-y`} />
          </Field>

          {/* Honeypot */}
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label>
              Website
              <input tabIndex={-1} autoComplete="off" value={s.website} onChange={(e) => set("website", e.target.value)} />
            </label>
          </div>

          {s.journey && (
            <p className="text-sm text-muted">
              Starting from: <strong className="text-fg">{journeys.find((j) => j.slug === s.journey)?.title}</strong>{" "}
              <button type="button" onClick={() => set("journey", "")} className="underline underline-offset-4">
                remove
              </button>
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full border border-fg py-3 text-[1.05rem] transition-colors hover:bg-fg hover:text-bg disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send to our planners"}
            </button>
            {status === "failed" && (
              <p role="alert" className="mt-3 text-sm text-accent">
                Something went wrong sending your request. Please try again, or email us directly.
              </p>
            )}
            <p className="mt-3 text-sm text-muted">
              We use your details only to plan your trip. See our{" "}
              <Link href="/privacy" className="underline underline-offset-4">
                privacy notice
              </Link>
              .
            </p>
          </div>
        </form>
      )}
    </>
  );
}

const inputCls = "mt-1 block w-full border-0 border-b border-fg/60 bg-transparent px-0 py-2 text-[1.05rem] focus:border-fg aria-[invalid=true]:border-accent";

function Field({ label, required, error, errId, children }: { label: string; required?: boolean; error?: string; errId?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block">
        <span className="text-[0.95rem]">
          {label}
          {required && <span aria-hidden> *</span>}
          {required && <span className="sr-only"> (required)</span>}
        </span>
        {children}
      </label>
      {error && (
        <p id={errId} className="mt-1 text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

function Fieldset({ legend, required, error, errId, children }: { legend: string; required?: boolean; error?: string; errId?: string; children: React.ReactNode }) {
  return (
    <fieldset aria-describedby={errId}>
      <legend className="label mb-4">
        {legend}
        {required && <span aria-hidden> *</span>}
        {required && <span className="sr-only"> (required)</span>}
      </legend>
      {children}
      {error && (
        <p id={errId} className="mt-2 text-sm text-accent">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function Chip({
  type,
  name,
  checked,
  onChange,
  children,
  dataField,
  invalid,
}: {
  type: "radio" | "checkbox";
  name?: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
  dataField?: string;
  invalid?: boolean;
}) {
  return (
    <label
      className={`cursor-pointer rounded-full border px-4 py-1.5 text-[0.95rem] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--focus)] ${
        checked ? "border-fg bg-fg text-bg" : invalid ? "border-accent" : "border-fg/40 hover:border-fg"
      }`}
    >
      <input type={type} name={name} checked={checked} onChange={onChange} className="sr-only" data-field={dataField} aria-invalid={invalid || undefined} />
      {children}
    </label>
  );
}

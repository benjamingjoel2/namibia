/** Small building blocks shared by every page, following the reference rhythm. */

type Tone = "bg" | "alt" | "band" | "deep";

const toneClass: Record<Tone, string> = {
  bg: "bg-bg text-fg",
  alt: "bg-bg-alt text-fg",
  band: "bg-band text-fg",
  deep: "bg-deep text-on-deep",
};

export function Section({
  tone = "bg",
  className = "",
  children,
  id,
  labelledBy,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative ${toneClass[tone]} ${className}`}>
      {children}
    </section>
  );
}

export function SectionLabel({ children, id, as: Tag = "h2" }: { children: React.ReactNode; id?: string; as?: "h2" | "h3" | "p" }) {
  return (
    <Tag id={id} className="label">
      {children}
    </Tag>
  );
}

/** Big grotesk paragraph: the reference's 40px statements. */
export function Statement({ children, className = "", as: Tag = "p" }: { children: React.ReactNode; className?: string; as?: "p" | "h2" | "h3" }) {
  return <Tag className={`statement text-[1.75rem] sm:text-[2.25rem] lg:text-[2.6rem] ${className}`}>{children}</Tag>;
}

/** "(01)" style marker. */
export function Num({ n, pad = false }: { n: number; pad?: boolean }) {
  return <span className="text-[0.95rem] tabular-nums text-muted">({pad ? String(n).padStart(2, "0") : n})</span>;
}

export function DashedRule({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t border-dashed border-line ${className}`} />;
}

export function VerifyTag({ children = "verify" }: { children?: React.ReactNode }) {
  return (
    <span className="verify-tag ml-1.5 inline-block rounded-full border border-accent px-2 py-px align-middle font-sans text-[0.7rem] font-medium uppercase tracking-[0.08em] text-accent">
      {children}
    </span>
  );
}

export function PlaceholderTag({ children = "placeholder" }: { children?: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-dashed border-current px-2 py-px align-middle font-sans text-[0.7rem] uppercase tracking-[0.08em] opacity-80">
      {children}
    </span>
  );
}

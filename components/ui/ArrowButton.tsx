import Link from "next/link";

type Props = {
  href?: string;
  children: React.ReactNode;
  /** "light" for use on photographs and dark bands. */
  tone?: "default" | "light";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

/** Text link with an underline and a small filled arrow disc at the right end. */
export function ArrowButton({ href, children, tone = "default", className = "", type = "button", onClick }: Props) {
  const cls = `group inline-flex w-full max-w-[20.5rem] items-center justify-between gap-6 border-b pb-3 text-[1.0625rem] transition-colors ${
    tone === "light" ? "border-[#f5f0e8] text-[#f5f0e8]" : "border-fg text-fg"
  } ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <ArrowDisc tone={tone} />
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function ArrowDisc({ tone = "default" }: { tone?: "default" | "light" }) {
  return (
    <span
      aria-hidden
      className={`grid size-[1.6rem] shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-1 ${
        tone === "light" ? "bg-[#f5f0e8] text-camelthorn" : "bg-fg text-bg"
      }`}
    >
      <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 8h9.5M8.5 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

import Link from "next/link";

/** Placeholder logo: a small sun over a dune crest, with the name in spaced capitals. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" className={className} aria-hidden fill="none">
      <path d="M9 12.5a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.6" />
      <path d="M1 17.5c6-5.2 11.5-6.2 16-3.4 3.4 2.1 8.8 2.6 14-1.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Namib Light, home">
      <LogoMark className="h-[1.1rem] w-auto" />
      <span className="font-sans text-[0.8rem] font-semibold tracking-[0.32em] [font-stretch:115%]">NAMIB LIGHT</span>
    </Link>
  );
}

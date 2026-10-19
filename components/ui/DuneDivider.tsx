/**
 * Our motif: a soft dune crest that sweeps into the next section.
 * Place it at the top of a section; it paints in that section's colour and
 * rises over the one above.
 */
const crests = [
  "M0 64 C 180 64 260 18 470 22 C 690 26 760 70 980 60 C 1180 51 1290 12 1440 30 L1440 80 L0 80 Z",
  "M0 40 C 220 6 420 8 610 38 C 800 68 1010 70 1200 44 C 1310 29 1390 26 1440 30 L1440 80 L0 80 Z",
  "M0 58 C 260 58 330 10 560 16 C 760 22 880 56 1090 52 C 1250 49 1360 40 1440 46 L1440 80 L0 80 Z",
];

const intoClass = { bg: "text-bg", alt: "text-bg-alt", band: "text-band", deep: "text-deep" } as const;

/** Place between two sections; `into` is the colour of the section below. */
export function DuneDivider({ variant = 0, into }: { variant?: 0 | 1 | 2; into: keyof typeof intoClass }) {
  return (
    <div aria-hidden className={`relative h-0 ${intoClass[into]}`}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 -top-[calc(2.5rem-1px)] block h-10 w-full fill-current md:-top-[calc(4.5rem-1px)] md:h-[4.5rem]"
      >
        <path d={crests[variant]} />
      </svg>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

const frames = [
  { src: "/photos/dest-skeleton-coast.jpg", alt: "The Zeila shipwreck in the surf", place: "Skeleton Coast", href: "/destinations/skeleton-coast" },
  { src: "/photos/dest-spitzkoppe-2.jpg", alt: "The Spitzkoppe rock arch under the stars", place: "Spitzkoppe", href: "/destinations/spitzkoppe" },
  { src: "/photos/dest-luderitz.jpg", alt: "Abandoned houses at Kolmanskop", place: "Kolmanskop", href: "/destinations/luderitz" },
  { src: "/photos/dest-swakopmund-2.jpg", alt: "Flamingos in Walvis Bay lagoon", place: "Walvis Bay", href: "/destinations/swakopmund" },
  { src: "/photos/dest-fish-river.jpg", alt: "The bends of Fish River Canyon", place: "Fish River Canyon", href: "/destinations/fish-river-canyon" },
  { src: "/photos/dest-twyfelfontein.jpg", alt: "Animal engravings at Twyfelfontein", place: "Twyfelfontein", href: "/destinations/twyfelfontein" },
  { src: "/photos/dest-zambezi.jpg", alt: "Elephants at the Chobe River", place: "Zambezi Region", href: "/destinations/zambezi" },
  { src: "/photos/dest-kaokoland-2.jpg", alt: "Epupa Falls on the Kunene", place: "Kunene", href: "/destinations/kaokoland" },
  { src: "/photos/dest-kalahari.jpg", alt: "Red Kalahari sand and a camelthorn", place: "Kalahari", href: "/destinations/kalahari" },
];

/** A swipeable strip of photographs, varied heights, each linking to its place. */
export function PhotoStrip() {
  return (
    <section aria-labelledby="strip-label" className="relative overflow-hidden bg-bg py-24 md:py-32">
      <div className="gutter flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="strip-label" className="label">
            And further
          </h2>
          <p className="statement mt-6 max-w-[40rem] text-[1.9rem] md:text-[2.8rem]">Fog, wrecks, ghost towns and rivers.</p>
        </div>
        <p className="text-sm text-muted">Swipe or scroll sideways →</p>
      </div>
      <ul className="mt-12 flex snap-x snap-mandatory items-end gap-4 overflow-x-auto px-5 pb-6 [scrollbar-width:thin] md:px-6" tabIndex={0} aria-label="Photographs of more places">
        {frames.map((f, i) => (
          <li key={f.src} className="shrink-0 snap-start">
            <Link href={f.href} className="group block">
              <div className={`relative overflow-hidden ${["h-[26rem] w-[19rem]", "h-[20rem] w-[28rem]", "h-[30rem] w-[22rem]"][i % 3]} max-w-[82vw]`}>
                <Image src={f.src} alt={f.alt} fill sizes="(min-width: 768px) 28rem, 82vw" className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]" />
              </div>
              <p className="mt-3 text-[1.02rem]">
                <span className="text-muted tabular-nums">({String(i + 1).padStart(2, "0")})</span> {f.place}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

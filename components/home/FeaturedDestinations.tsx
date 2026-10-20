import Image from "next/image";
import Link from "next/link";
import { ArrowButton, ArrowDisc } from "@/components/ui/ArrowButton";
import { Reveal } from "@/components/ui/Reveal";
import type { Destination } from "@/types/content";

/** Three numbered destinations as full-screen photo panels with the name set over the image. */
export function FeaturedDestinations({ items }: { items: Destination[] }) {
  return (
    <section aria-labelledby="dest-label" className="relative bg-deep text-[#f5f0e8]">
      <div className="gutter flex flex-wrap items-end justify-between gap-6 pb-10 pt-24 md:pt-32">
        <div>
          <h2 id="dest-label" className="label text-[#f5f0e8]/80">
            Where the light falls
          </h2>
          <p className="statement mt-6 max-w-[40rem] text-[1.9rem] md:text-[2.8rem]">Three places that change by the hour.</p>
        </div>
        <ArrowButton href="/destinations" tone="light">
          Discover All Destinations
        </ArrowButton>
      </div>

      {items.map((d, i) => (
        <Link
          key={d.slug}
          href={`/destinations/${d.slug}`}
          className="group relative block h-[88svh] min-h-[32rem] overflow-hidden"
          aria-label={`${d.name}: ${d.tagline}`}
        >
          <Image src={d.hero.src} alt="" fill sizes="100vw" className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.04]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.15)_0%,transparent_35%,rgb(0_0_0/0.72)_100%)]" />
          <Reveal className={`gutter absolute inset-x-0 bottom-0 pb-10 md:pb-14 ${i % 2 ? "md:text-right" : ""}`}>
            <p className="text-sm tabular-nums tracking-[0.2em] text-[#f6c88f]">({String(i + 1).padStart(2, "0")}) · {d.region.toUpperCase()}</p>
            <p className="display mt-4 text-[clamp(2.6rem,7.5vw,7.5rem)]">{d.name.split(",")[0].split(" & ")[0]}</p>
            <div className={`mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${i % 2 ? "md:flex-row-reverse" : ""}`}>
              <p className="max-w-[30rem] text-[1.1rem] leading-relaxed text-[#f5f0e8]/90">{d.tagline}</p>
              <span className="inline-flex items-center gap-3 text-[1.02rem]">
                Explore
                <ArrowDisc tone="light" />
              </span>
            </div>
          </Reveal>
        </Link>
      ))}
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Reveal } from "@/components/ui/Reveal";
import { DashedRule, Num, SectionLabel } from "@/components/ui/Section";
import type { Destination } from "@/types/content";

/**
 * Three numbered destinations in the reference's staggered rhythm:
 * (01) large image left, (02) text left and smaller image right, (03) small image left.
 */
export function FeaturedDestinations({ items }: { items: Destination[] }) {
  return (
    <section aria-labelledby="dest-label" className="section-y relative bg-bg-alt text-fg">
      <div className="gutter">
        <SectionLabel id="dest-label">Where the light falls</SectionLabel>
        <p className="mt-6 max-w-[28rem]">Three places that change by the hour, and where we'll make sure you are when they do.</p>

        <div className="mt-16 md:mt-24">
          {items.map((d, i) => (
            <Reveal key={d.slug}>
              <DashedRule />
              <Row d={d} index={i} />
            </Reveal>
          ))}
          <DashedRule />
          <ArrowButton href="/destinations" className="mt-8">
            Discover All Destinations
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}

function Row({ d, index }: { d: Destination; index: number }) {
  const text = (
    <div className="max-w-[24rem] py-5 md:py-6">
      <Num n={index + 1} pad />
      <h3 className="mt-4 text-[1.55rem] leading-tight md:mt-6">
        <Link href={`/destinations/${d.slug}`} className="underline-offset-4 hover:underline">
          {d.name}
        </Link>
      </h3>
      <p className="mt-4 text-[1rem] md:mt-6">{d.tagline}</p>
      <p className="mt-4 text-[0.95rem] text-muted">
        <span className="font-semibold text-fg">Best light: </span>
        {d.bestLight.sunrise.split(".")[0]}.
      </p>
    </div>
  );

  // Same image ratios as the reference: wide (01), smaller (02, 03).
  const layouts = [
    { wrap: "md:grid-cols-[1fr_1fr]", img: "aspect-[1.3] md:mt-6", imgFirst: true, sizes: "(min-width: 768px) 50vw, 100vw" },
    { wrap: "md:grid-cols-[1fr_minmax(0,28.5rem)]", img: "aspect-[1.27] md:mt-6", imgFirst: false, sizes: "(min-width: 768px) 32vw, 100vw" },
    { wrap: "md:grid-cols-[minmax(0,29.5rem)_1fr]", img: "aspect-[1.3] md:mt-6", imgFirst: true, sizes: "(min-width: 768px) 33vw, 100vw" },
  ][index % 3];

  const image = (
    <Link
      href={`/destinations/${d.slug}`}
      className={`relative block overflow-hidden ${layouts.img}`}
      tabIndex={-1}
      aria-hidden
    >
      <Image src={d.hero.src} alt="" fill sizes={layouts.sizes} className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.03]" />
    </Link>
  );

  return (
    <div className={`grid gap-x-6 pb-6 pt-4 md:pb-6 md:pt-0 ${layouts.wrap}`}>
      {layouts.imgFirst ? (
        <>
          <div className="order-2 md:order-1">{image}</div>
          <div className="order-1 md:order-2">{text}</div>
        </>
      ) : (
        <>
          {text}
          <div>{image}</div>
        </>
      )}
    </div>
  );
}

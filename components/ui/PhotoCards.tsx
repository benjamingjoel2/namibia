import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

export type PhotoCard = {
  img: { src: string; alt: string };
  title: string;
  kicker?: string;
  text?: string;
  href?: string;
};

/** Tall photo cards with the title and a line of text set over the image. */
export function PhotoCards({ items, columns, stagger = true }: { items: PhotoCard[]; columns?: 1 | 2 | 3 | 4; stagger?: boolean }) {
  columns ??= bestColumns(items.length);
  const cols = { 1: "", 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <ol className={`grid gap-4 md:gap-5 ${cols}`}>
      {items.map((c, i) => {
        const body = (
          <figure className={`group relative overflow-hidden text-[#f5f0e8] ${columns === 1 ? "aspect-[4/5] md:aspect-[21/9]" : "aspect-[3/4]"}`}>
            <Image src={c.img.src} alt={c.img.alt} fill sizes={`(min-width: 768px) ${Math.round(100 / columns)}vw, 100vw`} className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.25)_0%,transparent_35%,rgb(0_0_0/0.8)_100%)]" />
            <figcaption className="absolute inset-0 flex flex-col justify-between p-6 md:p-7">
              <span className="text-sm tabular-nums tracking-[0.2em] text-[#f6c88f]">{c.kicker ?? `(${i + 1})`}</span>
              <span>
                <span className={`block ${c.title.length <= 8 && columns <= 3 ? "display text-[clamp(2.2rem,3.4vw,3.2rem)]" : "statement text-[1.6rem] leading-tight md:text-[1.9rem]"}`}>{c.title}</span>
                {c.text && <span className="mt-4 block max-w-[24rem] text-[1.02rem] leading-relaxed text-[#f5f0e8]/90">{c.text}</span>}
                {c.href && <span className="mt-4 inline-block border-b border-[#f5f0e8]/70 pb-0.5 text-[0.98rem]">Explore →</span>}
              </span>
            </figcaption>
          </figure>
        );
        return (
          <Reveal as="li" key={c.title} delay={(i % 4) * 0.1} className={stagger && columns === 3 && i % 3 === 1 ? "md:mt-16" : ""}>
            {c.href ? (
              <Link href={c.href} className="block">
                {body}
              </Link>
            ) : (
              body
            )}
          </Reveal>
        );
      })}
    </ol>
  );
}

/** Columns that avoid a lonely last row for a given number of cards. */
export function bestColumns(n: number): 1 | 2 | 3 | 4 {
  if (n <= 1) return 1;
  if (n === 2 || n === 4) return n === 4 ? 4 : 2;
  if (n % 3 === 0 || n === 5) return 3;
  return 4;
}

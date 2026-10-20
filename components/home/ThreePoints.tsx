import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel, Statement } from "@/components/ui/Section";

const points = [
  {
    title: "Light",
    text: "We plan every day around sunrise, sunset and the stars: which dune at dawn, which waterhole at dusk, which nights are moonless.",
    img: { src: "/photos/point-light.jpg", alt: "A red dune crest in low light" },
  },
  {
    title: "Space",
    text: "Remote camps, private conservancies and quiet roads. Often, the only footprints on the dune will be yours.",
    img: { src: "/photos/point-space.jpg", alt: "Oryx on a wide desert plain" },
  },
  {
    title: "Honesty",
    text: "Real distances, real roads, real advice. If a day is long, or a road is rough, we'll say so before you book.",
    img: { src: "/photos/point-honesty.jpg", alt: "A 4x4 on sandy tracks near the dunes" },
  },
];

/** The three promises as tall photo cards, text set over the image. */
export function ThreePoints() {
  return (
    <section aria-labelledby="points-label" className="section-y relative bg-bg-alt text-fg">
      <div className="gutter">
        <SectionLabel id="points-label">The Namib Light way</SectionLabel>
        <Statement className="mt-8 max-w-[44rem]">Three things we never compromise on.</Statement>
        <ol className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
          {points.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.12} className={i === 1 ? "md:mt-16" : ""}>
              <figure className="group relative aspect-[3/4] overflow-hidden text-[#f5f0e8]">
                <Image src={p.img.src} alt={p.img.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.25)_0%,transparent_35%,rgb(0_0_0/0.78)_100%)]" />
                <figcaption className="absolute inset-0 flex flex-col justify-between p-6 md:p-7">
                  <span className="text-sm tabular-nums tracking-[0.2em]">({i + 1})</span>
                  <span>
                    <span className="display block text-[clamp(2.4rem,4.4vw,4rem)]">{p.title}</span>
                    <span className="mt-4 block max-w-[24rem] text-[1.02rem] leading-relaxed text-[#f5f0e8]/90">{p.text}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { DashedRule, Num, SectionLabel, Statement } from "@/components/ui/Section";

const points = [
  {
    title: "Light",
    text: "We plan every day around sunrise, sunset and the stars: which dune at dawn, which waterhole at dusk, which nights are moonless.",
    img: { src: "/images/point-light.jpg", alt: "Placeholder: dunes in low evening light" },
  },
  {
    title: "Space",
    text: "Remote camps, private conservancies and quiet roads. Often, the only footprints on the dune will be yours.",
    img: { src: "/images/point-space.jpg", alt: "Placeholder: a single lit tent under a wide sky" },
  },
  {
    title: "Honesty",
    text: "Real distances, real roads, real advice. If a day is long, or a road is rough, we'll say so before you book.",
    img: { src: "/images/point-honesty.jpg", alt: "Placeholder: a 4x4 on a long gravel road" },
  },
];

export function ThreePoints() {
  return (
    <section aria-labelledby="points-label" className="section-y relative bg-bg-alt text-fg">
      <div className="gutter">
        <SectionLabel id="points-label">The Namib Light way</SectionLabel>
        <Statement className="mt-10 max-w-[44rem] md:mt-12">Three things we never compromise on, from the first email to the last morning.</Statement>
        <DashedRule className="mt-16 md:mt-24" />
        <ol className="mt-6 grid gap-12 md:grid-cols-3 md:gap-6">
          {points.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.12}>
              <Num n={i + 1} />
              <h3 className="mt-4 text-[1.55rem] leading-tight md:mt-6">{p.title}</h3>
              <div className="relative mt-6 aspect-[1.27] overflow-hidden md:mt-10">
                <Image src={p.img.src} alt={p.img.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <p className="mt-5 max-w-[26rem]">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

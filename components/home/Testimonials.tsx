import { ParallaxImage } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderTag } from "@/components/ui/Section";
import type { Img, Testimonial } from "@/types/content";

/** Three quote cards, staggered vertically, floating over a full-bleed photograph. */
export function Testimonials({ items, label = "Words from the road", img }: { items: Testimonial[]; label?: string; img: Img }) {
  const offsets = ["md:mt-28", "md:mt-0", "md:mt-56"];
  return (
    <section aria-labelledby="quotes-label" className="relative bg-deep text-[#f5f0e8]">
      <ParallaxImage img={img} className="py-24 md:py-36">
        <div className="absolute inset-0 bg-black/45" aria-hidden />
        <div className="gutter relative">
          <div className="flex flex-wrap items-center gap-3">
            <h2 id="quotes-label" className="label text-[#f6c88f]">
              {label}
            </h2>
            <PlaceholderTag>placeholder quotes</PlaceholderTag>
          </div>
          <ul className="mt-14 grid gap-5 md:mt-16 md:grid-cols-3 md:items-start">
            {items.map((t, i) => (
              <Reveal as="li" key={i} delay={i * 0.1} className={offsets[i % 3]}>
                <figure className="flex min-h-[19rem] flex-col justify-between border border-[#f5f0e8]/30 bg-[#0b0f17]/45 p-6 backdrop-blur-md md:min-h-[22.5rem] md:p-8">
                  <blockquote className="text-[1.35rem] leading-[1.35] md:text-[1.5rem]">
                    <p>“{t.quote}”</p>
                  </blockquote>
                  <figcaption className="mt-10 text-[0.95rem] text-[#f5f0e8]/80">— {t.attribution}</figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </ParallaxImage>
    </section>
  );
}

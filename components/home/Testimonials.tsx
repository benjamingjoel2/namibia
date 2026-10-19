import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderTag, SectionLabel } from "@/components/ui/Section";
import type { Testimonial } from "@/types/content";

/** Three dashed quote cards, staggered vertically as in the reference. */
export function Testimonials({ items, label = "Words from the road" }: { items: Testimonial[]; label?: string }) {
  const offsets = ["md:mt-28", "md:mt-0", "md:mt-60"];
  return (
    <section aria-labelledby="quotes-label" className="section-y relative bg-band text-fg">
      <div className="gutter">
        <div className="flex flex-wrap items-center gap-3">
          <SectionLabel id="quotes-label">{label}</SectionLabel>
          <PlaceholderTag>placeholder quotes</PlaceholderTag>
        </div>
        <ul className="mt-14 grid gap-6 md:mt-16 md:grid-cols-3 md:items-start">
          {items.map((t, i) => (
            <Reveal as="li" key={i} delay={i * 0.1} className={offsets[i % 3]}>
              <figure className="flex min-h-[19rem] flex-col justify-between border border-dashed border-fg/45 p-6 md:min-h-[22.5rem] md:p-8">
                <blockquote className="text-[1.3rem] leading-[1.35] md:text-[1.45rem]">
                  <p>“{t.quote}”</p>
                </blockquote>
                <figcaption className="mt-10 text-[0.95rem]">— {t.attribution}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

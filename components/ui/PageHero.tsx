import { site } from "@/config/site";
import type { Img } from "@/types/content";
import { ThemedImage } from "./ThemedImage";

type Props = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  img: Img;
  /** Kept for existing callers; the hero is always left-aligned now. */
  align?: "left" | "center";
  children?: React.ReactNode;
  size?: "full" | "short";
  /** Kept for existing callers; the heading size is capped centrally (no giant words, owner rule). */
  titleSize?: string;
  titleClass?: string;
  fitText?: string;
};

/**
 * Hero pattern H5 (magazine cover): an issue line and a left-aligned heading on the
 * deep ground, the photograph inset inside the page margins, and a caption under it.
 * Headings stay well under 7vw (owner rule, 6 Nov 2026: no giant words).
 */
export function PageHero({ title, subtitle, img, children, size = "full" }: Props) {
  const full = size === "full";
  return (
    <section className="relative isolate overflow-hidden bg-deep text-[#f5f0e8]">
      <div className="starfield -z-10" aria-hidden />
      <div className="gutter pb-10 pt-[5.5rem] md:pb-14 md:pt-[6.5rem]">
        <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-[0.75rem] uppercase tracking-[0.18em] text-[#f5f0e8]/75">{site.name}</p>
            <h1
              className="display mt-3 text-balance"
              style={{ fontSize: full ? "clamp(2.4rem,1.4rem + 3.4vw,4.75rem)" : "clamp(2.1rem,1.3rem + 2.6vw,3.75rem)" }}
            >
              {title}
            </h1>
          </div>
          {(subtitle || children) && (
            <div className="lg:col-span-5 lg:pb-2">
              {subtitle && <p className="max-w-[30rem] text-[1.0625rem] leading-snug md:text-[1.125rem]">{subtitle}</p>}
              {children && <div className="mt-6">{children}</div>}
            </div>
          )}
        </div>
        <figure className="mt-8 md:mt-10">
          <div className={`relative overflow-hidden rounded-[3px] ${full ? "h-[min(56svh,34rem)] min-h-[16rem]" : "h-[min(38svh,22rem)] min-h-[12rem]"}`}>
            <ThemedImage img={img} sizes="(min-width: 1500px) 1440px, 100vw" priority className="kenburns object-cover" />
            {!img.srcNight && <div aria-hidden className="night-only absolute inset-0 bg-[#0d1829]/45 mix-blend-multiply" />}
          </div>
          <figcaption aria-hidden className="mt-3 text-[0.8125rem] text-[#f5f0e8]/70">
            {img.alt}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

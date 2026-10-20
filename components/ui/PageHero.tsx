import type { Img } from "@/types/content";
import { ThemedImage } from "./ThemedImage";

type Props = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  img: Img;
  /** Where the subtitle sits: bottom left (Home, Our Story) or bottom centre (Destinations). */
  align?: "left" | "center";
  children?: React.ReactNode;
  size?: "full" | "short";
  /** CSS font size for the giant heading. Tune so the longest line fills the width on desktop. */
  titleSize?: string;
  /** Extra classes for the heading. */
  titleClass?: string;
  /** Text used to size the heading when `title` isn't a plain string. */
  fitText?: string;
};

/**
 * Cap the size so the longest single word always fits the screen width.
 * Wide caps run about 0.86em per character; 0.9 leaves a little air.
 */
function fitSize(size: string, text: string) {
  const longest = Math.max(4, ...text.split(/\s+/).map((w) => w.length));
  return `min(${size}, calc((100vw - 2.6rem) / ${(longest * 0.9).toFixed(2)}))`;
}

/** Full-bleed photograph with a giant caps heading across the top. */
export function PageHero({
  title,
  subtitle,
  img,
  align = "left",
  children,
  size = "full",
  titleSize = "clamp(2.9rem,9.2vw,8.6rem)",
  titleClass = "",
  fitText,
}: Props) {
  const text = fitText ?? (typeof title === "string" ? title : "");
  return (
    <section
      className={`relative isolate flex flex-col overflow-hidden bg-deep text-[#f5f0e8] ${
        size === "full" ? "min-h-[36rem] h-[min(100svh,56rem)]" : "min-h-[26rem] h-[60svh] max-h-[38rem]"
      }`}
    >
      <ThemedImage img={img} sizes="100vw" priority className="kenburns -z-20 object-cover" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(20_16_12/0.48)_0%,rgb(20_16_12/0.12)_38%,rgb(20_16_12/0.18)_62%,rgb(20_16_12/0.6)_100%)]"
      />
      {!img.srcNight && <div aria-hidden className="night-only absolute inset-0 -z-10 bg-[#0d1829]/55 mix-blend-multiply" />}
      <div className="starfield -z-10" aria-hidden />

      <div className="gutter pt-[4.6rem]">
        <h1 className={`display text-balance ${align === "center" ? "text-center" : ""} ${titleClass}`} style={{ fontSize: text ? fitSize(titleSize, text) : titleSize }}>
          {title}
        </h1>
      </div>

      <div
        className={`gutter mt-auto pb-10 md:pb-12 ${align === "center" ? "mx-auto max-w-md text-center" : "max-w-[25rem] lg:max-w-[28rem]"}`}
      >
        {subtitle && <p className="text-[1.0625rem] leading-snug md:text-[1.125rem]">{subtitle}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

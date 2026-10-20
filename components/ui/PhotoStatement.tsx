import type { Img } from "@/types/content";
import { ParallaxImage } from "./Parallax";
import { Reveal } from "./Reveal";

/** A big statement set in light type over a full-bleed, drifting photograph. */
export function PhotoStatement({
  label,
  id,
  img,
  children,
  align = "left",
}: {
  label: string;
  id: string;
  img: Img;
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section aria-labelledby={id} className="relative bg-deep text-[#f5f0e8]">
      <ParallaxImage img={img} className="flex min-h-[100svh] items-end">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.35)_0%,rgb(0_0_0/0.15)_40%,rgb(0_0_0/0.7)_100%)]" aria-hidden />
        <div className="starfield" aria-hidden />
        <Reveal className={`gutter relative w-full pb-16 pt-40 md:pb-24 ${align === "center" ? "mx-auto text-center" : ""}`}>
          <h2 id={id} className="label text-[#f6c88f]">
            {label}
          </h2>
          <p className={`statement mt-8 max-w-[64rem] text-[1.9rem] leading-[1.12] md:text-[3.1rem] ${align === "center" ? "mx-auto" : ""}`}>{children}</p>
        </Reveal>
      </ParallaxImage>
    </section>
  );
}

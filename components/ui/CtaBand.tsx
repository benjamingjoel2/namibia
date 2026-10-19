import { ctaLabel } from "@/config/site";
import type { Img } from "@/types/content";
import { ArrowButton } from "./ArrowButton";
import { ParallaxImage } from "./Parallax";
import { Reveal } from "./Reveal";

const defaultImg: Img = {
  src: "/images/cta-day.jpg",
  srcNight: "/images/cta-night.jpg",
  alt: "Placeholder: low sun over red dunes, long shadows in the valleys",
  altNight: "Placeholder: the Milky Way arching over a dune crest",
};

/** Full-width call to action: a centred card over a drifting photograph. */
export function CtaBand({
  label = "Your Namibia begins at first light",
  text = "Tell us when you'd like to travel and how you like to move. We'll come back with a route built around the light, with honest distances and the right car.",
  img = defaultImg,
}: {
  label?: string;
  text?: string;
  img?: Img;
}) {
  return (
    <section aria-labelledby="cta-label" className="bg-deep">
      <ParallaxImage img={img} className="py-24 md:py-40">
        <div className="absolute inset-0 bg-black/25" aria-hidden />
        <div className="starfield" aria-hidden />
        <Reveal className="gutter relative">
          <div className="mx-auto max-w-[44rem] bg-bg-alt p-6 text-fg md:p-8 md:pb-10">
            <h2 id="cta-label" className="label">
              {label}
            </h2>
            <p className="statement mt-10 text-[1.6rem] md:mt-12 md:text-[2.3rem]">{text}</p>
            <ArrowButton href="/contact" className="mt-10">
              {ctaLabel}
            </ArrowButton>
          </div>
        </Reveal>
      </ParallaxImage>
    </section>
  );
}

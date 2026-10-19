import type { Metadata } from "next";
import { FeaturedDestinations } from "@/components/home/FeaturedDestinations";
import { Testimonials } from "@/components/home/Testimonials";
import { ThreePoints } from "@/components/home/ThreePoints";
import { TonightSky } from "@/components/home/TonightSky";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { CtaBand } from "@/components/ui/CtaBand";
import { DuneDivider } from "@/components/ui/DuneDivider";
import { PageHero } from "@/components/ui/PageHero";
import { ParallaxBand } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel, Statement } from "@/components/ui/Section";
import { ctaLabel, site } from "@/config/site";
import { featuredDestinations } from "@/data/destinations";
import { testimonials } from "@/data/testimonials";
import { travelAgencyJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: `${site.name}: private journeys across Namibia` },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencyJsonLd()) }} />

      <PageHero
        title="Follow the light"
        subtitle="Private journeys through Namibia, timed for sunrise, sunset and the stars. Drive yourself, travel with a guide, or fly between remote camps."
        img={{
          src: "/images/hero-home-day.jpg",
          alt: "Placeholder: Sossusvlei's dunes at dawn, half in shadow and half lit apricot",
          srcNight: "/images/hero-home-night.jpg",
          altNight: "Placeholder: the Milky Way rising over a dune crest",
        }}
        titleSize="clamp(2.9rem,8.1vw,8.6rem)" titleClass="md:whitespace-nowrap"
      >
        <ArrowButton href="/contact" tone="light">
          {ctaLabel}
        </ArrowButton>
      </PageHero>

      <TonightSky />

      <section aria-labelledby="mission-label" className="section-y relative bg-bg text-fg">
        <div className="gutter">
          <SectionLabel id="mission-label">Space, silence, and respect</SectionLabel>
          <Reveal>
            <Statement className="mt-16 max-w-[62rem] md:mt-24">
              We travel privately or in very small groups. We work with community conservancies and local guides, so the money a journey brings stays where it was made. And we leave the desert as we found it: tracks raked, lights off, nothing taken but photographs.
            </Statement>
          </Reveal>
        </div>
      </section>

      <DuneDivider into="alt" variant={0} />
      <FeaturedDestinations items={featuredDestinations} />

      <ParallaxBand
        img={{
          src: "/images/band-deadvlei-day.jpg",
          alt: "Placeholder: dead camelthorn trees on a white clay pan below red dunes",
          srcNight: "/images/band-deadvlei-night.jpg",
          altNight: "Placeholder: Deadvlei's trees under a sky full of stars",
        }}
      />

      <ThreePoints />

      <DuneDivider into="band" variant={1} />
      <Testimonials items={testimonials} />

      <CtaBand />
    </>
  );
}

import type { Metadata } from "next";
import { FeaturedDestinations } from "@/components/home/FeaturedDestinations";
import { ThreePoints } from "@/components/home/ThreePoints";
import { DayStory } from "@/components/home/DayStory";
import { PhotoStrip } from "@/components/home/PhotoStrip";
import { PhotoStatement } from "@/components/ui/PhotoStatement";
import { TonightSky } from "@/components/home/TonightSky";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { CtaBand } from "@/components/ui/CtaBand";
import { DuneDivider } from "@/components/ui/DuneDivider";
import { PageHero } from "@/components/ui/PageHero";
import { ctaLabel, site } from "@/config/site";
import { featuredDestinations } from "@/data/destinations";
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
          src: "/photos/hero-home-day.jpg",
          alt: "A tall dune at Sossusvlei, half in shadow and half lit orange",
          srcNight: "/photos/hero-home-night-spitzkoppe.jpg",
          altNight: "The Milky Way over the granite peaks of Spitzkoppe",
        }}
        titleSize="clamp(2.9rem,8.1vw,8.6rem)" titleClass="md:whitespace-nowrap"
      >
        <ArrowButton href="/contact" tone="light">
          {ctaLabel}
        </ArrowButton>
      </PageHero>

      <TonightSky />

      <PhotoStatement
        id="mission-label"
        label="Space, silence, and respect"
        img={{
          src: "/photos/dest-namibrand.jpg",
          alt: "Red sand, golden grass and mountains on the edge of the Namib",
          srcNight: "/photos/band-night-sky.jpg",
          altNight: "The Milky Way over a quiver tree",
        }}
      >
        We travel privately or in very small groups. We work with community conservancies and local guides, so the money a journey brings stays where it was made. And we leave the desert as we found it: tracks raked, lights off, nothing taken but photographs.
      </PhotoStatement>

      <DayStory />

      <FeaturedDestinations items={featuredDestinations} />

      <DuneDivider into="alt" variant={0} />
      <ThreePoints />

      <DuneDivider into="bg" variant={2} />
      <PhotoStrip />

      <CtaBand />
    </>
  );
}

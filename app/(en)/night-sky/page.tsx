import Link from "next/link";
import { MoonPlanner } from "@/components/sky/MoonPlanner";
import { SkyByMonth } from "@/components/sky/SkyByMonth";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { ParallaxBand } from "@/components/ui/Parallax";
import { PhotoCards } from "@/components/ui/PhotoCards";
import { PhotoStatement } from "@/components/ui/PhotoStatement";
import { SectionLabel, Statement, VerifyTag } from "@/components/ui/Section";
import { darkSkyFacts } from "@/data/sky";
import { journeys } from "@/data/journeys";
import { routeTotals } from "@/lib/route";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Night Sky: stargazing in Namibia",
  description:
    "Why Namibia's skies are among the darkest on Earth, the NamibRand International Dark Sky Reserve, what's up in the southern sky each month, and a moon-phase planner for any date.",
  path: "/night-sky",
  image: "/photos/hero-night-sky.jpg",
});

export default function NightSkyPage() {
  const starJourneys = journeys
    .map((j) => ({ j, nights: routeTotals(j.days).stargazingNights }))
    .filter((x) => x.nights > 0)
    .sort((a, b) => b.nights - a.nights);

  const factImgs = [
    { src: "/photos/journey-dunes-dark-skies.jpg", alt: "The Milky Way over the desert" },
    { src: "/photos/journal-namibrand.jpg", alt: "The Milky Way over desert rocks" },
    { src: "/photos/dest-spitzkoppe-2.jpg", alt: "The Spitzkoppe rock arch under the stars" },
    { src: "/photos/band-deadvlei-night.jpg", alt: "A dead camelthorn tree in Deadvlei under the stars" },
  ];

  return (
    <div className="force-night bg-bg text-fg">
      <PageHero
        title="After dark"
        subtitle="Turn off the lights. Namibia's best show starts after dinner."
        img={{ src: "/photos/hero-night-sky.jpg", alt: "The Milky Way over a rock outcrop" }}
      />

      <section aria-labelledby="why-label" className="section-y relative bg-bg">
        <div className="starfield" aria-hidden />
        <div className="gutter relative">
          <SectionLabel id="why-label">Why Namibia&rsquo;s skies are so dark</SectionLabel>
          <Statement className="mt-10 max-w-[60rem]">
            On a moonless night in the Namib, the Milky Way is bright enough to cast a shadow. There&rsquo;s no trick to it: very few people, very dry air, and a long way to the nearest town.
          </Statement>
          <div className="mt-14">
            <PhotoCards columns={4} items={darkSkyFacts.map((f, i) => ({ img: factImgs[i], title: f.title, text: f.text }))} />
          </div>
        </div>
      </section>

      <PhotoStatement id="namibrand-label" label="The NamibRand · an International Dark Sky Reserve" img={{ src: "/photos/cta-night.jpg", alt: "The Milky Way over the desert" }}>
        A private reserve on the edge of the Namib, made of old farms returned to the desert. Lights low, shielded and warm. We plan every night here around the new moon.
      </PhotoStatement>
      <div className="bg-bg">
        <div className="gutter grid gap-6 py-12 md:grid-cols-2">
          <p className="max-w-[36rem]">
            The NamibRand Nature Reserve was recognised as an International Dark Sky Reserve by DarkSky International, the first in Africa. <VerifyTag>verify details</VerifyTag>
          </p>
          <p className="max-w-[36rem]">
            We bring a night-sky guide and a telescope, and at least one night sleeping outside. Our{" "}
            <Link href="/journeys/dunes-and-dark-skies" className="text-accent underline underline-offset-4">
              Dunes &amp; Dark Skies
            </Link>{" "}
            journey is built around it.
          </p>
        </div>
      </div>

      <section aria-labelledby="months-label" className="section-y relative bg-bg-alt">
        <div className="starfield" aria-hidden />
        <div className="gutter relative">
          <SectionLabel id="months-label">The southern sky, month by month</SectionLabel>
          <Statement className="mt-8 max-w-[48rem]">The Milky Way&rsquo;s core, the Magellanic Clouds and the Southern Cross: when to look, and where.</Statement>
          <div className="mt-12">
            <SkyByMonth />
          </div>
        </div>
      </section>

      <ParallaxBand img={{ src: "/photos/band-night-sky.jpg", alt: "The Milky Way over a quiver tree" }} />

      <section aria-labelledby="moon-label" id="moon" className="section-y relative bg-bg">
        <div className="starfield" aria-hidden />
        <div className="gutter relative">
          <SectionLabel id="moon-label">Plan by the moon</SectionLabel>
          <Statement className="mt-8 max-w-[48rem]">A full moon washes out the stars. Pick dates near the new moon for the darkest nights.</Statement>
          <div className="mt-14">
            <MoonPlanner />
          </div>
        </div>
      </section>

      <section aria-labelledby="sj-label" className="section-y bg-bg-alt">
        <div className="gutter">
          <SectionLabel id="sj-label">Journeys with stargazing nights</SectionLabel>
          <div className="mt-12">
            <PhotoCards
              columns={4}
              items={starJourneys.slice(0, 4).map(({ j, nights }) => ({
                img: j.hero,
                title: j.title,
                kicker: `✦ ${nights} DARK-SKY NIGHTS`,
                href: `/journeys/${j.slug}`,
              }))}
            />
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
            {starJourneys.slice(4).map(({ j, nights }) => (
              <li key={j.slug}>
                <Link href={`/journeys/${j.slug}`} className="underline underline-offset-4">
                  {j.title}
                </Link>{" "}
                <span className="text-muted">✦ {nights}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand img={{ src: "/photos/cta-night.jpg", alt: "The Milky Way over the desert" }} label="Dates around the new moon" text="Tell us roughly when you can travel. We'll find the darkest week and build the route around it." />
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { MoonPlanner } from "@/components/sky/MoonPlanner";
import { SkyByMonth } from "@/components/sky/SkyByMonth";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { ParallaxBand } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { DashedRule, Num, SectionLabel, Statement, VerifyTag } from "@/components/ui/Section";
import { darkSkyFacts } from "@/data/sky";
import { journeys } from "@/data/journeys";
import { routeTotals } from "@/lib/route";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Night Sky: stargazing in Namibia",
  description:
    "Why Namibia's skies are among the darkest on Earth, the NamibRand International Dark Sky Reserve, what's up in the southern sky each month, and a moon-phase planner for any date.",
  path: "/night-sky",
  image: "/images/hero-night-sky.jpg",
});

export default function NightSkyPage() {
  const starJourneys = journeys
    .map((j) => ({ j, nights: routeTotals(j.days).stargazingNights }))
    .filter((x) => x.nights > 0)
    .sort((a, b) => b.nights - a.nights);

  return (
    <>
      <PageHero
        title="After dark"
        subtitle="Turn off the lights. Namibia's best show starts after dinner."
        img={{ src: "/images/hero-night-sky.jpg", alt: "Placeholder: the southern Milky Way over a dune and a camelthorn tree" }}
      />

      <section aria-labelledby="why-label" className="section-y bg-bg">
        <div className="gutter">
          <SectionLabel id="why-label">Why Namibia&rsquo;s skies are so dark</SectionLabel>
          <Statement className="mt-14 max-w-[60rem]">
            On a moonless night in the Namib, the Milky Way is bright enough to cast a shadow. There&rsquo;s no trick to it: just very few people, very dry air, and a long way to the nearest town.
          </Statement>
          <DashedRule className="mt-16" />
          <ol className="mt-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {darkSkyFacts.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 0.08}>
                <Num n={i + 1} />
                <h3 className="mt-3 text-[1.35rem]">{f.title}</h3>
                <p className="mt-2">{f.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="namibrand-label" className="bg-bg-alt">
        <div className="grid md:grid-cols-2">
          <div className="gutter section-y">
            <SectionLabel id="namibrand-label">The NamibRand</SectionLabel>
            <p className="statement mt-10 text-[1.75rem] md:text-[2.1rem]">An International Dark Sky Reserve, on the edge of the Namib.</p>
            <div className="mt-8 max-w-[34rem] space-y-4">
              <p>
                The NamibRand Nature Reserve is a large private reserve south of Sossusvlei, assembled from old livestock farms and returned to the desert. Its lodges keep their lighting low, shielded and warm, and it was recognised as an International Dark Sky Reserve by DarkSky International, the first in Africa. <VerifyTag>verify details</VerifyTag>
              </p>
              <p>
                We plan NamibRand nights around the new moon, with a night-sky guide and a telescope, and at least one night sleeping outside. Our{" "}
                <Link href="/journeys/dunes-and-dark-skies" className="underline underline-offset-4">
                  Dunes &amp; Dark Skies
                </Link>{" "}
                journey is built around it.
              </p>
            </div>
          </div>
          <div className="relative min-h-[26rem]">
            <Image src="/images/dest-namibrand.jpg" alt="Placeholder: stars over dunes in the NamibRand" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section aria-labelledby="months-label" className="section-y bg-bg">
        <div className="gutter">
          <SectionLabel id="months-label">The southern sky, month by month</SectionLabel>
          <p className="mt-6 max-w-[38rem]">The Milky Way&rsquo;s core, the Magellanic Clouds and the Southern Cross: when to look, and where.</p>
          <div className="mt-12">
            <SkyByMonth />
          </div>
        </div>
      </section>

      <ParallaxBand img={{ src: "/images/band-night-sky.jpg", alt: "Placeholder: a star-filled sky above the desert" }} />

      <section aria-labelledby="moon-label" id="moon" className="section-y bg-bg-alt">
        <div className="gutter">
          <SectionLabel id="moon-label">Plan by the moon</SectionLabel>
          <Statement className="mt-10 max-w-[48rem]">A full moon washes out the stars. Pick dates near the new moon for the darkest nights.</Statement>
          <div className="mt-14">
            <MoonPlanner />
          </div>
        </div>
      </section>

      <section aria-labelledby="sj-label" className="section-y bg-bg">
        <div className="gutter">
          <SectionLabel id="sj-label">Journeys with stargazing nights</SectionLabel>
          <ul className="mt-10">
            {starJourneys.map(({ j, nights }) => (
              <li key={j.slug} className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-dashed border-line py-5 last:border-b">
                <Link href={`/journeys/${j.slug}`} className="statement text-[1.4rem] underline-offset-4 hover:underline md:text-[1.8rem]">
                  {j.title}
                </Link>
                <span className="text-muted">
                  <span className="text-accent">✦</span> {nights} dark-sky night{nights === 1 ? "" : "s"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand label="Dates around the new moon" text="Tell us roughly when you can travel. We'll find the darkest week and build the route around it." />
    </>
  );
}

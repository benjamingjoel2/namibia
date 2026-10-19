import Image from "next/image";
import Link from "next/link";
import { MonthSlider } from "@/components/etosha/MonthSlider";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { ParallaxBand } from "@/components/ui/Parallax";
import { DashedRule, Num, SectionLabel, Statement, VerifyTag } from "@/components/ui/Section";
import { journeysFor } from "@/data/journeys";
import { stays } from "@/data/stays";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Waterhole Watch: Etosha by season",
  description:
    "What to expect in Etosha National Park each month: the dry season at the waterholes, the green season's birds and newborns, and the floodlit waterholes at night.",
  path: "/waterhole-watch",
  image: "/photos/hero-waterhole.jpg",
});

const tips = [
  ["Sit still", "Pick a waterhole, switch off the engine and wait. An hour at one beats ten minutes at six."],
  ["Gate times are law", "Camp gates open at sunrise and close at sunset. Arrive late and you'll be fined, and you'll miss the floodlit waterhole."],
  ["Slow down", "The speed limit is 60 km/h. At 40, you'll see the lion in the grass."],
  ["Bring a warm layer", "Dry-season nights are cold, and the best floodlit sightings often come after ten."],
];

export default function WaterholeWatchPage() {
  const etoshaJourneys = journeysFor("etosha");
  const etoshaStays = stays.filter((s) => s.destinationSlug === "etosha");

  return (
    <>
      <PageHero
        title="Waterhole watch"
        subtitle="In the dry season, Etosha's animals come to the water. You just need to sit still long enough."
        img={{
          src: "/photos/hero-waterhole.jpg",
          alt: "Zebras drinking at an Etosha waterhole",
          srcNight: "/photos/etosha-waterhole-dusk.jpg",
          altNight: "Two elephants at a waterhole just after sunset",
        }}
      />

      <section aria-labelledby="intro-label" className="section-y bg-bg">
        <div className="gutter">
          <SectionLabel id="intro-label">Etosha changes with the rain</SectionLabel>
          <Statement className="mt-14 max-w-[62rem]">
            From roughly June to October, there&rsquo;s little water anywhere but the waterholes, and everything comes to drink. When the rains arrive, the pan can flood, the grass turns green, and the birds come in their thousands.
          </Statement>
          <p className="mt-8 text-muted">
            Seasons shift each year with the rain. <VerifyTag>verify each season</VerifyTag>
          </p>
        </div>
      </section>

      <section aria-labelledby="slider-label" className="section-y bg-bg-alt">
        <div className="gutter">
          <SectionLabel id="slider-label">Month by month</SectionLabel>
          <div className="mt-12">
            <MonthSlider />
          </div>
        </div>
      </section>

      <ParallaxBand
        img={{
          src: "/photos/band-etosha.jpg",
          alt: "A lone tree on the edge of the Etosha pan",
          srcNight: "/photos/etosha-waterhole-dusk.jpg",
          altNight: "Two elephants at a waterhole just after sunset",
        }}
      />

      <section aria-labelledby="night-label" className="section-y relative bg-deep text-on-deep">
        <div className="starfield" aria-hidden />
        <div className="gutter relative grid gap-12 md:grid-cols-2">
          <div>
            <SectionLabel id="night-label">After dark: the floodlit waterholes</SectionLabel>
            <p className="statement mt-10 text-[1.75rem] md:text-[2.2rem]">Some of Etosha&rsquo;s best sightings happen after dinner.</p>
            <div className="mt-8 max-w-[34rem] space-y-4">
              <p>
                Several of the rest camps inside the park have a floodlit waterhole a short walk from the rooms. You sit on a bench in the dark, behind a low wall, and wait. Black rhino are often seen here at night, along with elephants, lions and hyena. <VerifyTag>verify camps</VerifyTag>
              </p>
              <p>
                Switch the site to night mode and the waterhole notes above move to the front. Our Etosha journeys always include at least two nights inside or right at the edge of the park, so you can walk to the water after dark.
              </p>
            </div>
          </div>
          <div className="relative min-h-[22rem]">
            <Image src="/photos/etosha-waterhole-dusk.jpg" alt="Two elephants at a waterhole just after sunset" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section aria-labelledby="tips-label" className="section-y bg-bg">
        <div className="gutter">
          <SectionLabel id="tips-label">How to watch a waterhole</SectionLabel>
          <DashedRule className="mt-10" />
          <ol className="mt-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {tips.map(([t, d], i) => (
              <li key={t}>
                <Num n={i + 1} />
                <h3 className="mt-3 text-[1.35rem]">{t}</h3>
                <p className="mt-2">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="ej-label" className="section-y bg-bg-alt">
        <div className="gutter grid gap-14 lg:grid-cols-2">
          <div>
            <SectionLabel id="ej-label">Etosha journeys</SectionLabel>
            <ul className="mt-8">
              {etoshaJourneys.map((j) => (
                <li key={j.slug} className="border-t border-dashed border-line py-4 last:border-b">
                  <Link href={`/journeys/${j.slug}`} className="statement text-[1.35rem] underline-offset-4 hover:underline">
                    {j.title}
                  </Link>
                  <p className="mt-1 text-muted">{j.summary}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label">Where to stay</p>
            <ul className="mt-8">
              {etoshaStays.map((s) => (
                <li key={s.id} className="border-t border-dashed border-line py-4 last:border-b">
                  <p className="text-[1.25rem]">{s.name}</p>
                  <p className="mt-1">{s.blurb}</p>
                  {s.floodlitWaterhole && <p className="mt-1 text-sm text-accent">✦ Floodlit waterhole</p>}
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link href="/destinations/etosha" className="underline underline-offset-4">
                More on Etosha
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand label="Choose your season" text="Dry season for the waterholes, green season for birds and newborns. Tell us your month and we'll tell you honestly what to expect." />
    </>
  );
}

import Link from "next/link";
import { MonthSlider } from "@/components/etosha/MonthSlider";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { PhotoCards } from "@/components/ui/PhotoCards";
import { PhotoStatement } from "@/components/ui/PhotoStatement";
import { SectionLabel, VerifyTag } from "@/components/ui/Section";
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

const tipImgs = [
  { src: "/photos/journey-kids.jpg", alt: "Giraffe at a waterhole in Etosha" },
  { src: "/photos/style-self-drive.jpg", alt: "A 4x4 stopped for an elephant on a park road" },
  { src: "/photos/band-etosha.jpg", alt: "A lone tree on the edge of the Etosha pan" },
  { src: "/photos/etosha-waterhole-dusk.jpg", alt: "Two elephants at a waterhole just after sunset" },
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

      <PhotoStatement
        id="intro-label"
        label="Etosha changes with the rain"
        img={{
          src: "/photos/dest-etosha.jpg",
          alt: "Springbok, zebra and oryx at an Etosha waterhole",
          srcNight: "/photos/etosha-waterhole-dusk.jpg",
          altNight: "Two elephants at a waterhole just after sunset",
        }}
      >
        From roughly June to October there&rsquo;s little water anywhere but the waterholes, and everything comes to drink. When the rains arrive, the pan can flood and the birds come in their thousands.
      </PhotoStatement>

      <section aria-labelledby="slider-label" className="section-y bg-bg-alt">
        <div className="gutter">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <SectionLabel id="slider-label">Month by month</SectionLabel>
            <p className="text-sm text-muted">
              Seasons shift each year with the rain. <VerifyTag>verify each season</VerifyTag>
            </p>
          </div>
          <div className="mt-10">
            <MonthSlider />
          </div>
        </div>
      </section>

      <PhotoStatement id="night-label" label="After dark: the floodlit waterholes" img={{ src: "/photos/etosha-waterhole-dusk.jpg", alt: "Two elephants at a waterhole just after sunset" }}>
        Some of Etosha&rsquo;s best sightings happen after dinner.
      </PhotoStatement>
      <div className="bg-deep text-on-deep">
        <div className="gutter grid gap-6 pb-20 pt-4 md:grid-cols-2">
          <p className="max-w-[36rem]">
            Several of the rest camps inside the park have a floodlit waterhole a short walk from the rooms. You sit on a bench in the dark, behind a low wall, and wait. Black rhino are often seen here at night, along with elephants, lions and hyena. <VerifyTag>verify camps</VerifyTag>
          </p>
          <p className="max-w-[36rem]">
            Switch the site to night mode and the waterhole notes move to the front. Our Etosha journeys always include at least two nights inside or right at the edge of the park, so you can walk to the water after dark.
          </p>
        </div>
      </div>

      <section aria-labelledby="tips-label" className="section-y bg-bg">
        <div className="gutter">
          <SectionLabel id="tips-label">How to watch a waterhole</SectionLabel>
          <div className="mt-10">
            <PhotoCards columns={4} items={tips.map(([t, d], i) => ({ img: tipImgs[i], title: t, text: d }))} />
          </div>
        </div>
      </section>

      <section aria-labelledby="ej-label" className="section-y bg-bg-alt">
        <div className="gutter">
          <SectionLabel id="ej-label">Etosha journeys</SectionLabel>
          <div className="mt-10">
            <PhotoCards
              columns={4}
              items={etoshaJourneys.slice(0, 4).map((j) => ({ img: j.hero, title: j.title, kicker: `${j.days.length} DAYS`, href: `/journeys/${j.slug}` }))}
            />
            {etoshaJourneys.length > 4 && (
              <p className="mt-6">
                Also:{" "}
                {etoshaJourneys.slice(4).map((j, i) => (
                  <span key={j.slug}>
                    {i > 0 && " · "}
                    <Link href={`/journeys/${j.slug}`} className="underline underline-offset-4">
                      {j.title}
                    </Link>
                  </span>
                ))}
              </p>
            )}
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-[16rem_1fr]">
            <p className="label">Where to stay</p>
            <ul className="space-y-4">
              {etoshaStays.map((s) => (
                <li key={s.id}>
                  <p className="text-[1.25rem]">{s.name}</p>
                  <p className="mt-1 max-w-[40rem]">{s.blurb}</p>
                  {s.floodlitWaterhole && <p className="mt-1 text-sm text-accent">✦ Floodlit waterhole</p>}
                </li>
              ))}
              <li>
                <Link href="/destinations/etosha" className="underline underline-offset-4">
                  More on Etosha
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CtaBand label="Choose your season" text="Dry season for the waterholes, green season for birds and newborns. Tell us your month and we'll tell you honestly what to expect." />
    </>
  );
}

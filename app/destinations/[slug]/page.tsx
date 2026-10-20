import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/ui/CtaBand";
import { MonthsStrip } from "@/components/ui/MonthsStrip";
import { PageHero } from "@/components/ui/PageHero";
import { ParallaxImage } from "@/components/ui/Parallax";
import { PhotoCards } from "@/components/ui/PhotoCards";
import { PlaceholderTag, SectionLabel, Statement } from "@/components/ui/Section";
import { destinations, getDestination } from "@/data/destinations";
import { journeysFor } from "@/data/journeys";
import { getStay } from "@/data/stays";
import { formatHours } from "@/lib/route";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = getDestination((await params).slug);
  if (!d) return {};
  return pageMetadata({ title: d.name, description: `${d.tagline} Best light, best months, distances and where to stay.`, path: `/destinations/${d.slug}`, image: d.hero.src });
}

const stayType = { camping: "Camping", lodge: "Lodge", "luxury-camp": "Luxury camp" } as const;

export default async function DestinationPage({ params }: Props) {
  const d = getDestination((await params).slug);
  if (!d) notFound();
  const stays = d.stayIds.map(getStay).filter((s) => s !== undefined);
  const trips = journeysFor(d.slug);
  const idx = destinations.findIndex((x) => x.slug === d.slug);
  const next = destinations[(idx + 1) % destinations.length];

  return (
    <>
      <PageHero title={d.name.split(",")[0]} subtitle={d.tagline} img={d.hero} titleSize="clamp(2.6rem,7.6vw,7.6rem)" />

      <nav aria-label="Breadcrumb" className="gutter bg-bg pt-6 text-sm text-muted">
        <ol className="flex gap-2">
          <li>
            <Link href="/destinations" className="underline underline-offset-4">
              Destinations
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page">{d.name}</li>
        </ol>
      </nav>

      <section aria-labelledby="intro-label" className="section-y bg-bg !pt-16">
        <div className="gutter">
          <SectionLabel id="intro-label">{d.region}</SectionLabel>
          <Statement className="mt-12 max-w-[60rem]">{d.intro[0]}</Statement>
        </div>
      </section>

      <section aria-label={`About ${d.name}`} className="bg-bg-alt">
        <div className="grid md:grid-cols-2">
          <div className="gutter section-y space-y-5">
            {d.intro.slice(1).map((p) => (
              <p key={p.slice(0, 20)} className="max-w-[34rem] text-[1.1rem]">
                {p}
              </p>
            ))}
            {d.fromPrevious && (
              <div className="max-w-[34rem] border-t border-dashed border-line pt-5">
                <p className="label">Getting here</p>
                <p className="mt-2">
                  From {d.fromPrevious.from}: about <strong>{d.fromPrevious.km} km</strong>, {d.fromPrevious.gravelKm} km of it gravel,{" "}
                  {formatHours(d.fromPrevious.hours)} at the wheel.
                </p>
                {d.fromPrevious.note && <p className="mt-1 text-muted">{d.fromPrevious.note}</p>}
                <p className="mt-1 text-sm text-muted">Editable estimate; we confirm routes before you travel.</p>
              </div>
            )}
          </div>
          <div className="relative min-h-[24rem]">
            <Image src={d.detail.src} alt={d.detail.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section aria-labelledby="light-label" className="relative bg-deep text-[#f5f0e8]">
        <ParallaxImage img={d.hero} className="py-24 md:py-36">
          <div className="absolute inset-0 bg-black/55" aria-hidden />
          <div className="starfield" aria-hidden />
          <div className="gutter relative">
            <h2 id="light-label" className="label text-[#f6c88f]">
              The best light
            </h2>
            <p className="statement mt-6 max-w-[40rem] text-[1.9rem] md:text-[2.8rem]">Where to be, and when.</p>
            <dl className="mt-12 grid gap-4 md:grid-cols-3">
              <LightItem n={1} title="Sunrise" text={d.bestLight.sunrise} />
              <LightItem n={2} title="Sunset" text={d.bestLight.sunset} />
              {d.bestLight.night && <LightItem n={3} title="After dark" text={d.bestLight.night} />}
            </dl>
            <div className="mt-10 grid gap-6 border border-[#f5f0e8]/25 bg-[#0b0f17]/45 p-6 backdrop-blur-md md:grid-cols-2">
              <div>
                <p className="label">Best months</p>
                <MonthsStrip months={d.bestMonths} className="mt-4" />
              </div>
              <p className="max-w-[34rem]">{d.bestMonthsNote}</p>
            </div>
          </div>
        </ParallaxImage>
      </section>

      {stays.length > 0 && (
        <section aria-labelledby="stays-label" className="section-y bg-bg-alt">
          <div className="gutter">
            <div className="flex flex-wrap items-center gap-3">
              <SectionLabel id="stays-label">Where we stay</SectionLabel>
              <PlaceholderTag>placeholder names</PlaceholderTag>
            </div>
            <div className="mt-10">
              <PhotoCards
                stagger={false}
                items={stays.map((st) => ({
                  img: st.image,
                  title: st.name.replace(" (placeholder)", ""),
                  kicker: `${stayType[st.type].toUpperCase()}${st.darkSky ? " · ✦ DARK SKY" : ""}${st.floodlitWaterhole ? " · ✦ FLOODLIT WATERHOLE" : ""}`,
                  text: st.blurb,
                }))}
              />
            </div>
          </div>
        </section>
      )}

      {trips.length > 0 && (
        <section aria-labelledby="trips-label" className="section-y bg-bg">
          <div className="gutter">
            <SectionLabel id="trips-label">Journeys that come here</SectionLabel>
            <div className="mt-10">
              <PhotoCards
                stagger={false}
                items={trips.map((j) => ({ img: j.hero, title: j.title, kicker: `${j.days.length} DAYS`, href: `/journeys/${j.slug}` }))}
              />
            </div>
          </div>
        </section>
      )}

      <section aria-label="Next destination">
        <Link href={`/destinations/${next.slug}`} className="group relative block h-[70svh] min-h-[26rem] overflow-hidden text-[#f5f0e8]">
          <Image src={next.hero.src} alt={next.hero.alt} fill sizes="100vw" className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.04]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.2)_0%,rgb(0_0_0/0.7)_100%)]" aria-hidden />
          <div className="gutter absolute inset-x-0 bottom-0 pb-12">
            <p className="text-sm tracking-[0.2em] text-[#f6c88f]">NEXT DESTINATION →</p>
            <p className="display mt-4 text-[clamp(2.4rem,7vw,7rem)]">{next.name.split(",")[0]}</p>
            <p className="mt-4 max-w-[34rem] text-[1.1rem] text-[#f5f0e8]/90">{next.tagline}</p>
          </div>
        </Link>
      </section>

      <CtaBand label={`Plan a journey with ${d.name.split(",")[0].split(" & ")[0]}`} />
    </>
  );
}

function LightItem({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <div className="border border-[#f5f0e8]/25 bg-[#0b0f17]/45 p-6 backdrop-blur-md">
      <dt>
        <span className="block text-sm tabular-nums tracking-[0.2em] text-[#f6c88f]">({n})</span>
        <span className="display mt-3 block text-[2rem]">{title}</span>
      </dt>
      <dd className="mt-3 text-[#f5f0e8]/90">{text}</dd>
    </div>
  );
}

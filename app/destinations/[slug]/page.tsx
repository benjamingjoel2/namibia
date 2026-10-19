import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Price } from "@/components/layout/CurrencySwitcher";
import { CtaBand } from "@/components/ui/CtaBand";
import { MonthsStrip } from "@/components/ui/MonthsStrip";
import { PageHero } from "@/components/ui/PageHero";
import { DashedRule, Num, PlaceholderTag, SectionLabel, Statement } from "@/components/ui/Section";
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
      <PageHero title={d.name.split(",")[0]} subtitle={d.tagline} img={d.hero} titleClass="text-[clamp(2.6rem,7.6vw,7.6rem)]" />

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

      <section aria-labelledby="light-label" className="section-y bg-bg">
        <div className="gutter">
          <SectionLabel id="light-label">The best light</SectionLabel>
          <DashedRule className="mt-10" />
          <dl className="mt-6 grid gap-10 md:grid-cols-3 md:gap-6">
            <LightItem n={1} title="Sunrise" text={d.bestLight.sunrise} />
            <LightItem n={2} title="Sunset" text={d.bestLight.sunset} />
            {d.bestLight.night && <LightItem n={3} title="After dark" text={d.bestLight.night} />}
          </dl>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <div>
              <p className="label">Best months</p>
              <MonthsStrip months={d.bestMonths} className="mt-4" />
            </div>
            <p className="max-w-[34rem]">{d.bestMonthsNote}</p>
          </div>
        </div>
      </section>

      {stays.length > 0 && (
        <section aria-labelledby="stays-label" className="section-y bg-bg-alt">
          <div className="gutter">
            <div className="flex flex-wrap items-center gap-3">
              <SectionLabel id="stays-label">Where we stay</SectionLabel>
              <PlaceholderTag>placeholder names</PlaceholderTag>
            </div>
            <ul className="mt-10">
              {stays.map((s, i) => (
                <li key={s.id} className="grid gap-6 border-t border-dashed border-line py-6 md:grid-cols-[minmax(0,28.5rem)_1fr]">
                  <div className="relative aspect-[1.27] overflow-hidden">
                    <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 768px) 456px, 100vw" className="object-cover" />
                  </div>
                  <div>
                    <Num n={i + 1} />
                    <h3 className="mt-3 text-[1.55rem]">{s.name}</h3>
                    <p className="mt-1 text-sm uppercase tracking-[0.08em] text-muted">{stayType[s.type]}</p>
                    <p className="mt-4 max-w-[30rem]">{s.blurb}</p>
                    {s.darkSky && <p className="mt-3 text-sm text-accent">✦ Dark-sky location</p>}
                    {s.floodlitWaterhole && <p className="mt-3 text-sm text-accent">✦ Floodlit waterhole</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {trips.length > 0 && (
        <section aria-labelledby="trips-label" className="section-y bg-bg">
          <div className="gutter">
            <SectionLabel id="trips-label">Journeys that come here</SectionLabel>
            <ul className="mt-10">
              {trips.map((j) => (
                <li key={j.slug} className="grid gap-2 border-t border-dashed border-line py-5 last:border-b md:grid-cols-[1fr_auto] md:items-baseline">
                  <div>
                    <Link href={`/journeys/${j.slug}`} className="statement text-[1.5rem] underline-offset-4 hover:underline md:text-[1.9rem]">
                      {j.title}
                    </Link>
                    <p className="mt-1 text-muted">
                      {j.days.length} days · {j.summary}
                    </p>
                  </div>
                  <p>
                    <Price usd={Math.min(...j.styles.map((s) => s.fromUSD))} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-label="Next destination" className="bg-bg-alt py-10">
        <div className="gutter flex flex-wrap items-baseline justify-between gap-4">
          <span className="label">Next destination</span>
          <Link href={`/destinations/${next.slug}`} className="statement text-[1.5rem] underline-offset-4 hover:underline">
            {next.name} →
          </Link>
        </div>
      </section>

      <CtaBand label={`Plan a journey with ${d.name.split(",")[0].split(" & ")[0]}`} />
    </>
  );
}

function LightItem({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <div>
      <Num n={n} />
      <dt className="mt-3 text-[1.55rem]">{title}</dt>
      <dd className="mt-3 max-w-[26rem]">{text}</dd>
    </div>
  );
}

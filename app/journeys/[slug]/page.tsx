import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Price } from "@/components/layout/CurrencySwitcher";
import { RoutePlanner } from "@/components/journey/RoutePlanner";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { CtaBand } from "@/components/ui/CtaBand";
import { MonthsStrip } from "@/components/ui/MonthsStrip";
import { PageHero } from "@/components/ui/PageHero";
import { DashedRule, Num, PlaceholderTag, SectionLabel, Statement } from "@/components/ui/Section";
import { ctaLabel } from "@/config/site";
import { getDestination } from "@/data/destinations";
import { getJourney, journeys } from "@/data/journeys";
import { getStay } from "@/data/stays";
import { styleName } from "@/data/travelStyles";
import { formatHours, routeTotals } from "@/lib/route";
import { journeyJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return journeys.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const j = getJourney((await params).slug);
  if (!j) return {};
  return pageMetadata({ title: j.title, description: `${j.summary} ${j.days.length} days, day-by-day route, light notes and stargazing nights.`, path: `/journeys/${j.slug}`, image: j.hero.src });
}

export default async function JourneyPage({ params }: Props) {
  const j = getJourney((await params).slug);
  if (!j) notFound();
  const t = routeTotals(j.days);
  const lightDays = j.days.filter((d) => d.sunrise || d.sunset);
  const starDays = j.days.filter((d) => d.stargazing);
  const stayIds = [...new Set(j.days.map((d) => d.stayId).filter((x): x is string => !!x))];
  const stays = stayIds.map(getStay).filter((s) => s !== undefined);
  const places = j.destinationSlugs.map(getDestination).filter((d) => d !== undefined);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(journeyJsonLd(j)) }} />
      <PageHero title={j.title} subtitle={j.summary} img={j.hero} titleSize="clamp(2.4rem,6.6vw,6.6rem)">
        <ArrowButton href={`/contact?journey=${j.slug}`} tone="light">
          {ctaLabel}
        </ArrowButton>
      </PageHero>

      <nav aria-label="Breadcrumb" className="gutter bg-bg pt-6 text-sm text-muted">
        <ol className="flex gap-2">
          <li>
            <Link href="/journeys" className="underline underline-offset-4">
              Journeys
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page">{j.title}</li>
        </ol>
      </nav>

      <section aria-labelledby="intro-label" className="section-y bg-bg !pt-16">
        <div className="gutter">
          <SectionLabel id="intro-label">{j.days.length} days</SectionLabel>
          <Statement className="mt-12 max-w-[62rem]">{j.intro}</Statement>
          <dl className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Route">
              {places.map((p, i) => (
                <span key={p.slug}>
                  {i > 0 && " · "}
                  <Link href={`/destinations/${p.slug}`} className="underline-offset-4 hover:underline">
                    {p.name.split(",")[0]}
                  </Link>
                </span>
              ))}
            </Fact>
            <Fact label="Best months">
              <MonthsStrip months={j.bestMonths} className="mt-1" />
            </Fact>
            <Fact label="On the road">
              {t.km > 0 ? `${t.km.toLocaleString("en-GB")} km, ${Math.round((t.gravelKm / t.km) * 100)}% gravel` : "Almost none"}
              {t.flightMinutes > 0 && <span className="block">About {formatHours(t.flightMinutes / 60)} flying</span>}
            </Fact>
            <Fact label="Stargazing nights">
              <span className="text-accent">✦</span> {t.stargazingNights}
            </Fact>
          </dl>
        </div>
      </section>

      <section aria-labelledby="styles-label" className="section-y bg-bg-alt">
        <div className="gutter">
          <SectionLabel id="styles-label">How you can travel it</SectionLabel>
          <DashedRule className="mt-10" />
          <ol className="mt-6 grid gap-10 md:grid-cols-3 md:gap-6">
            {j.styles.map((s, i) => (
              <li key={s.style}>
                <Num n={i + 1} />
                <h3 className="mt-3 text-[1.55rem]">{styleName[s.style]}</h3>
                <p className="mt-2 text-[1.15rem]">
                  <Price usd={s.fromUSD} />
                </p>
                <p className="mt-3 max-w-[26rem]">{s.note}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm text-muted">
            Indicative prices per person sharing, in the currency you choose in the footer. Not sure which style?{" "}
            <Link href="/how-to-travel#chooser" className="underline underline-offset-4">
              Try the chooser
            </Link>
            .
          </p>
        </div>
      </section>

      <section aria-labelledby="planner-label" className="section-y bg-bg">
        <div className="gutter">
          <h2 id="planner-label" className="sr-only">
            Day by day
          </h2>
          <RoutePlanner days={j.days} heading="Day by day" />
        </div>
      </section>

      <section aria-labelledby="light-label" className="section-y bg-band">
        <div className="gutter grid gap-14 lg:grid-cols-2">
          <div>
            <SectionLabel id="light-label">Where to be when the light is right</SectionLabel>
            <ul className="mt-8">
              {lightDays.map((d) => (
                <li key={d.day} className="border-t border-dashed border-fg/40 py-4">
                  <p className="text-sm text-muted">
                    Day {d.day} · {d.to}
                  </p>
                  {d.sunrise && (
                    <p className="mt-1">
                      <span className="font-semibold">Sunrise: </span>
                      {d.sunrise}
                    </p>
                  )}
                  {d.sunset && (
                    <p className="mt-1">
                      <span className="font-semibold">Sunset: </span>
                      {d.sunset}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label">Stargazing nights</p>
            <ul className="mt-8">
              {starDays.map((d) => (
                <li key={d.day} className="border-t border-dashed border-fg/40 py-4">
                  <p className="text-sm text-muted">
                    Night {d.day} · {d.to}
                  </p>
                  <p className="mt-1">
                    <span className="text-accent">✦</span> {d.skyNote ?? "A dark-sky night. Walk away from the lights and let your eyes adjust."}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link href="/night-sky#moon" className="underline underline-offset-4">
                Check the moon for your dates
              </Link>
            </p>
          </div>
        </div>
      </section>

      {stays.length > 0 && (
        <section aria-labelledby="stays-label" className="section-y bg-bg">
          <div className="gutter">
            <div className="flex flex-wrap items-center gap-3">
              <SectionLabel id="stays-label">Where you&rsquo;ll stay</SectionLabel>
              <PlaceholderTag>placeholder names</PlaceholderTag>
            </div>
            <ul className="mt-10 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
              {stays.map((s) => (
                <li key={s.id} className="border-t border-dashed border-line py-5">
                  <p className="text-[1.25rem]">{s.name}</p>
                  <p className="mt-1 text-[0.98rem]">{s.blurb}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">Every stay can be swapped: camping, lodges or luxury camps.</p>
          </div>
        </section>
      )}

      <CtaBand label={`Plan ${j.title}`} text="Tell us your dates and how you'd like to travel. We'll adjust the route, check the moon, and come back with an honest quote." />
    </>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-dashed border-line pt-3">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}

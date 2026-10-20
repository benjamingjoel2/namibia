import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Price } from "@/components/layout/CurrencySwitcher";
import { RoutePlanner } from "@/components/journey/RoutePlanner";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { CtaBand } from "@/components/ui/CtaBand";
import { MonthsStrip } from "@/components/ui/MonthsStrip";
import { PageHero } from "@/components/ui/PageHero";
import { ParallaxImage } from "@/components/ui/Parallax";
import { PhotoCards } from "@/components/ui/PhotoCards";
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

      <section aria-labelledby="route-strip-label" className="bg-bg pb-20">
        <h2 id="route-strip-label" className="label gutter">
          Places on this route
        </h2>
        <ol className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:px-6" tabIndex={0} aria-label="Places on this route">
          {places.map((p, i) => (
            <li key={p.slug} className="shrink-0 snap-start">
              <Link href={`/destinations/${p.slug}`} className="group relative block h-[24rem] w-[19rem] max-w-[82vw] overflow-hidden text-[#f5f0e8] md:h-[28rem] md:w-[22rem]">
                <Image src={p.hero.src} alt={p.hero.alt} fill sizes="22rem" className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]" />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(0_0_0/0.75)_100%)]" aria-hidden />
                <span className="absolute inset-x-0 bottom-0 p-5">
                  <span className="block text-sm tabular-nums tracking-[0.2em] text-[#f6c88f]">STOP {i + 1}</span>
                  <span className="statement mt-2 block text-[1.6rem] leading-tight">{p.name.split(",")[0]}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
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

      <section aria-labelledby="light-label" className="relative bg-deep text-[#f5f0e8]">
        <ParallaxImage img={{ src: j.hero.src, alt: j.hero.alt }} className="py-24 md:py-36">
          <div className="absolute inset-0 bg-black/60" aria-hidden />
          <div className="starfield" aria-hidden />
          <div className="gutter relative grid gap-6 lg:grid-cols-2">
            <div className="border border-[#f5f0e8]/25 bg-[#0b0f17]/45 p-6 backdrop-blur-md md:p-8">
              <h2 id="light-label" className="label text-[#f6c88f]">
                Where to be when the light is right
              </h2>
              <ul className="mt-6">
                {lightDays.map((d) => (
                  <li key={d.day} className="border-t border-[#f5f0e8]/20 py-4">
                    <p className="text-sm text-[#f5f0e8]/70">
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
            <div className="self-start border border-[#f5f0e8]/25 bg-[#0b0f17]/45 p-6 backdrop-blur-md md:p-8">
              <p className="label text-[#f6c88f]">Stargazing nights</p>
              <ul className="mt-6">
                {starDays.map((d) => (
                  <li key={d.day} className="border-t border-[#f5f0e8]/20 py-4">
                    <p className="text-sm text-[#f5f0e8]/70">
                      Night {d.day} · {d.to}
                    </p>
                    <p className="mt-1">
                      <span className="text-[#f6c88f]">✦</span> {d.skyNote ?? "A dark-sky night. Walk away from the lights and let your eyes adjust."}
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
        </ParallaxImage>
      </section>

      {stays.length > 0 && (
        <section aria-labelledby="stays-label" className="section-y bg-bg">
          <div className="gutter">
            <div className="flex flex-wrap items-center gap-3">
              <SectionLabel id="stays-label">Where you&rsquo;ll stay</SectionLabel>
              <PlaceholderTag>placeholder names</PlaceholderTag>
            </div>
            <div className="mt-10">
              <PhotoCards
                stagger={false}
                items={stays.map((st) => ({ img: st.image, title: st.name.replace(" (placeholder)", ""), text: st.blurb }))}
              />
            </div>
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

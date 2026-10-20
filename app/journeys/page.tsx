import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/layout/CurrencySwitcher";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Statement } from "@/components/ui/Section";
import { journeys } from "@/data/journeys";
import { styleName } from "@/data/travelStyles";
import { routeTotals } from "@/lib/route";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Journeys: private Namibia itineraries",
  description: "Eight private journeys across Namibia, from the classic loop to the Skeleton Coast by air, each with a day-by-day route planner, light notes and stargazing nights.",
  path: "/journeys",
  image: "/photos/hero-journeys.jpg",
});

export default function JourneysPage() {
  return (
    <>
      <PageHero
        title="Journeys"
        subtitle="Eight ways through Namibia, each built around the light. Every one can be changed: longer, slower, or with a different way of travelling."
        img={{ src: "/photos/hero-journeys.jpg", alt: "Acacias and mountains in the Namib" }}
      />

      <section aria-label="Introduction" className="section-y bg-deep text-on-deep">
        <div className="gutter">
          <Statement className="max-w-[60rem]">
            Start with one of these, then tell us what you&rsquo;d change. Every journey is private, every route is real, and every price is an honest &ldquo;from&rdquo;.
          </Statement>
        </div>
      </section>

      <section aria-labelledby="all-journeys" className="bg-bg-alt pb-16">
        <h2 id="all-journeys" className="sr-only">
          All journeys
        </h2>
        <ol>
          {journeys.map((j, i) => {
            const t = routeTotals(j.days);
            return (
              <li key={j.slug} className="group relative min-h-[86svh] overflow-hidden text-[#f5f0e8]">
                <Image src={j.hero.src} alt={j.hero.alt} fill sizes="100vw" className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.3)_0%,transparent_30%,rgb(0_0_0/0.8)_100%)]" aria-hidden />
                <Reveal className="gutter relative flex min-h-[86svh] flex-col justify-end pb-10 pt-32 md:pb-14">
                  <p className="text-sm tabular-nums tracking-[0.2em] text-[#f6c88f]">
                    ({String(i + 1).padStart(2, "0")}) · {j.days.length} DAYS
                  </p>
                  <h3 className="display mt-4 max-w-[70rem] text-[clamp(2.2rem,6vw,6rem)]">
                    <Link href={`/journeys/${j.slug}`} className="after:absolute after:inset-0">
                      {j.title}
                    </Link>
                  </h3>
                  <p className="mt-5 max-w-[36rem] text-[1.1rem] text-[#f5f0e8]/90">{j.summary}</p>
                  <dl className="mt-8 grid max-w-[52rem] grid-cols-2 gap-x-8 gap-y-4 border-t border-[#f5f0e8]/30 pt-5 text-[0.98rem] md:grid-cols-4">
                    <div>
                      <dt className="text-sm text-[#f5f0e8]/70">Price</dt>
                      <dd>
                        <Price usd={Math.min(...j.styles.map((s) => s.fromUSD))} />
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-[#f5f0e8]/70">Styles</dt>
                      <dd>{j.styles.map((s) => styleName[s.style]).join(" · ")}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-[#f5f0e8]/70">On the road</dt>
                      <dd>{t.km > 0 ? `${t.km.toLocaleString("en-GB")} km` : "Flown"}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-[#f5f0e8]/70">Stargazing nights</dt>
                      <dd>✦ {t.stargazingNights}</dd>
                    </div>
                  </dl>
                </Reveal>
              </li>
            );
          })}
        </ol>
        <p className="gutter mt-8 text-sm text-muted">Prices are indicative, per person sharing, and converted at indicative rates. Change currency in the footer.</p>
      </section>

      <CtaBand />
    </>
  );
}

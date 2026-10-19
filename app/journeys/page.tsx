import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/layout/CurrencySwitcher";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { DashedRule, Num, Statement } from "@/components/ui/Section";
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

      <section aria-label="Introduction" className="section-y bg-bg">
        <div className="gutter">
          <Statement className="max-w-[60rem]">
            Start with one of these, then tell us what you&rsquo;d change. Every journey is private, every route is real, and every price is an honest &ldquo;from&rdquo;.
          </Statement>
        </div>
      </section>

      <section aria-labelledby="all-journeys" className="bg-bg-alt pb-24 pt-12">
        <h2 id="all-journeys" className="sr-only">
          All journeys
        </h2>
        <ol className="gutter">
          {journeys.map((j, i) => {
            const t = routeTotals(j.days);
            const flip = i % 2 === 1;
            return (
              <li key={j.slug}>
                <DashedRule />
                <Reveal className={`grid gap-6 py-6 md:grid-cols-2 ${flip ? "" : ""}`}>
                  <Link href={`/journeys/${j.slug}`} className={`relative block aspect-[1.3] overflow-hidden ${flip ? "md:order-2" : ""}`} tabIndex={-1} aria-hidden>
                    <Image src={j.hero.src} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] hover:scale-[1.03]" />
                  </Link>
                  <div className="max-w-[32rem]">
                    <Num n={i + 1} pad />
                    <h3 className="mt-4 text-[1.9rem] leading-tight">
                      <Link href={`/journeys/${j.slug}`} className="underline-offset-4 hover:underline">
                        {j.title}
                      </Link>
                    </h3>
                    <p className="mt-4">{j.summary}</p>
                    <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-[0.98rem]">
                      <div>
                        <dt className="text-sm text-muted">Length</dt>
                        <dd>{j.days.length} days</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted">Price</dt>
                        <dd>
                          <Price usd={Math.min(...j.styles.map((s) => s.fromUSD))} />
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted">Styles</dt>
                        <dd>{j.styles.map((s) => styleName[s.style]).join(" · ")}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-muted">Stargazing nights</dt>
                        <dd>{t.stargazingNights}</dd>
                      </div>
                    </dl>
                    <ArrowButton href={`/journeys/${j.slug}`} className="mt-8">
                      See the route
                    </ArrowButton>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
        <p className="gutter mt-6 text-sm text-muted">Prices are indicative, per person sharing, and converted at indicative rates. Change currency in the footer.</p>
      </section>

      <CtaBand />
    </>
  );
}

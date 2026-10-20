import Image from "next/image";
import Link from "next/link";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { CtaBand } from "@/components/ui/CtaBand";
import { MonthsStrip } from "@/components/ui/MonthsStrip";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Statement } from "@/components/ui/Section";
import { destinations } from "@/data/destinations";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Destinations: where we go in Namibia",
  description:
    "Sossusvlei and Deadvlei, the NamibRand, Etosha, the Skeleton Coast, Damaraland, Spitzkoppe, Kaokoland, the Zambezi Region, Fish River Canyon, Lüderitz and the Kalahari: best light, best months and distances.",
  path: "/destinations",
  image: "/photos/hero-destinations.jpg",
});

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Where the
            <br />
            light falls
          </>
        }
        fitText="Where the light falls"
        align="center"
        subtitle="Fourteen places, each with its own hour: when the dunes turn red, when the fog lifts, when the elephants come to drink."
        img={{ src: "/photos/hero-destinations.jpg", alt: "A road winding through the desert" }}
      />

      <section aria-label="Introduction" className="section-y bg-deep text-on-deep">
        <div className="gutter">
          <Statement className="max-w-[60rem]">
            Namibia is huge and quiet, and its distances are real. We&rsquo;ll tell you honestly how far each place is from the last, what the light does there, and when to go.
          </Statement>
        </div>
      </section>

      <section aria-labelledby="all-dest" className="bg-bg-alt">
        <h2 id="all-dest" className="sr-only">
          All destinations
        </h2>
        <ol>
          {destinations.map((d, i) => (
            <li key={d.slug} id={d.slug} className="scroll-mt-16">
              <div className="group relative h-[82svh] min-h-[30rem] overflow-hidden text-[#f5f0e8]">
                <Image src={d.hero.src} alt={d.hero.alt} fill sizes="100vw" className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.25)_0%,transparent_35%,rgb(0_0_0/0.7)_100%)]" aria-hidden />
                <div className="gutter absolute inset-x-0 bottom-0 pb-10 md:pb-14">
                  <p className="text-sm tabular-nums tracking-[0.2em] text-[#f6c88f]">
                    ({String(i + 1).padStart(2, "0")}) · {d.region.toUpperCase()}
                  </p>
                  <h3 className="display mt-4 text-[clamp(2.4rem,7vw,7rem)]">
                    <Link href={`/destinations/${d.slug}`} className="after:absolute after:inset-0">
                      {d.name.split(",")[0]}
                    </Link>
                  </h3>
                  <p className="mt-5 max-w-[34rem] text-[1.1rem] text-[#f5f0e8]/90">{d.tagline}</p>
                </div>
              </div>
              <Reveal className="gutter grid gap-10 py-14 md:grid-cols-[1.1fr_1fr] md:py-20">
                <div className="max-w-[36rem]">
                  <p className="text-[1.15rem] leading-relaxed">{d.intro[0]}</p>
                  <p className="mt-5 text-[0.98rem]">
                    <span className="font-semibold">Best light: </span>
                    <span className="text-muted">{d.bestLight.sunrise}</span>
                  </p>
                  <MonthsStrip months={d.bestMonths} className="mt-6" />
                  <ArrowButton href={`/destinations/${d.slug}`} className="mt-8">
                    Discover {d.name.split(",")[0].split(" & ")[0]}
                  </ArrowButton>
                </div>
                <div className="relative aspect-[1.3] overflow-hidden">
                  <Image src={d.detail.src} alt={d.detail.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand />
    </>
  );
}

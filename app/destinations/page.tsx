import Image from "next/image";
import Link from "next/link";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { CtaBand } from "@/components/ui/CtaBand";
import { MonthsStrip } from "@/components/ui/MonthsStrip";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { DashedRule, Num, Statement } from "@/components/ui/Section";
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

      <section aria-label="Introduction" className="section-y bg-band">
        <div className="gutter">
          <Statement className="max-w-[60rem]">
            Namibia is huge and quiet, and its distances are real. We&rsquo;ll tell you honestly how far each place is from the last, what the light does there, and when to go.
          </Statement>
        </div>
      </section>

      <section aria-labelledby="all-dest" className="bg-bg-alt pb-24 pt-16 md:pb-32">
        <h2 id="all-dest" className="sr-only">
          All destinations
        </h2>
        <ol className="gutter">
          {destinations.map((d, i) => (
            <li key={d.slug} id={d.slug} className="scroll-mt-24">
              <DashedRule />
              <Reveal className="pb-16 pt-4 md:pb-24">
                <Num n={i + 1} />
                <Link href={`/destinations/${d.slug}`} className="relative mt-4 block aspect-[1.4] overflow-hidden md:aspect-[2.75]" tabIndex={-1} aria-hidden>
                  <Image src={d.hero.src} alt="" fill sizes="100vw" className="object-cover transition-transform duration-[1.2s] hover:scale-[1.02]" />
                </Link>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-[0.95rem]">{d.region}</p>
                    <h3 className="statement mt-2 text-[2rem] md:text-[2.6rem]">
                      <Link href={`/destinations/${d.slug}`} className="underline-offset-[6px] hover:underline">
                        {d.name}
                      </Link>
                    </h3>
                  </div>
                  <div className="max-w-[34rem]">
                    <p>{d.intro[0]}</p>
                    <p className="mt-4 text-[0.95rem]">
                      <span className="font-semibold">Best light: </span>
                      <span className="text-muted">{d.bestLight.sunrise}</span>
                    </p>
                    <MonthsStrip months={d.bestMonths} className="mt-5" />
                    <ArrowButton href={`/destinations/${d.slug}`} className="mt-8">
                      Discover {d.name.split(",")[0].split(" & ")[0]}
                    </ArrowButton>
                  </div>
                </div>
                <div className="relative mx-auto mt-14 aspect-[1.27] w-full max-w-[28.5rem] overflow-hidden">
                  <Image src={d.detail.src} alt={d.detail.alt} fill sizes="(min-width: 768px) 456px, 100vw" className="object-cover" />
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

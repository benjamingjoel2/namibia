import Link from "next/link";
import { RoutePicker } from "@/components/journey/RoutePicker";
import { RoutePlanner } from "@/components/journey/RoutePlanner";
import { Chooser } from "@/components/travel/Chooser";
import { StyleComparison } from "@/components/travel/StyleComparison";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { ParallaxImage } from "@/components/ui/Parallax";
import { PhotoStatement } from "@/components/ui/PhotoStatement";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel, Statement } from "@/components/ui/Section";
import { journeys } from "@/data/journeys";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How to travel Namibia: self-drive, guided or fly-in",
  description:
    "An honest comparison of self-drive, guided and fly-in travel in Namibia, a short quiz to choose, and day-by-day route planners with gravel, tarmac, fuel and driving times.",
  path: "/how-to-travel",
  image: "/photos/hero-how-to-travel.jpg",
});

const roadTruths = [
  ["Gravel is the norm", "Most of the roads you'll want are gravel. Good gravel is fine at 80 km/h; corrugations, loose patches and blind crests are why we suggest that, not more."],
  ["Driving on the left", "Like the UK and southern Africa. Rental cars are usually manual; ask for automatic early."],
  ["Distances are real", "Towns can be 200 km apart. Fill up whenever you can, even if the tank is half full."],
  ["Don't drive at night", "Animals on the road, no lights, no help. Plan to arrive by late afternoon."],
  ["Two spare tyres", "Punctures happen. We insist on two spares for remote routes, and we'll show you how to change one."],
  ["4x4 or not?", "A sedan can do some tarmac-heavy routes. For most of ours, a 4x4 with high clearance is safer and more comfortable."],
];

export default function HowToTravelPage() {
  const shown = journeys.filter((j) => j.styles.some((s) => s.style === "self-drive"));
  return (
    <>
      <PageHero
        title="How to travel"
        subtitle="Namibia is famous for self-drive, but it isn't for everyone. Here's the honest version, and a quick way to choose."
        img={{ src: "/photos/hero-how-to-travel.jpg", alt: "A 4x4 with a rooftop tent under storm clouds" }}
      />

      <PhotoStatement id="intro-label" label="Self-drive, guided or fly-in" img={{ src: "/photos/journal-self-drive.jpg", alt: "A gravel track winding through dry hills" }}>
        Namibia has more gravel road than tarmac. We&rsquo;ll tell you which car, which tyres and where to fill up, or put a guide at the wheel, or fly you over it all.
      </PhotoStatement>

      <section aria-labelledby="compare-label" className="section-y relative bg-bg-alt">
        <div className="gutter">
          <SectionLabel id="compare-label">The honest comparison</SectionLabel>
          <div className="mt-10">
            <StyleComparison />
          </div>
        </div>
      </section>

      <section aria-labelledby="chooser-label" id="chooser" className="section-y bg-bg">
        <div className="gutter">
          <SectionLabel id="chooser-label">Which style suits you?</SectionLabel>
          <Statement className="mt-10 max-w-[44rem]">Five questions. One honest suggestion.</Statement>
          <div className="mt-14">
            <Chooser />
          </div>
        </div>
      </section>

      <section aria-labelledby="road-label" className="relative bg-deep text-[#f5f0e8]">
        <ParallaxImage img={{ src: "/photos/hero-destinations.jpg", alt: "A road winding through the desert" }} className="py-24 md:py-36">
          <div className="absolute inset-0 bg-black/50" aria-hidden />
          <div className="gutter relative">
            <h2 id="road-label" className="label text-[#f6c88f]">
              Before you take the wheel
            </h2>
            <p className="statement mt-6 max-w-[40rem] text-[1.9rem] md:text-[2.8rem]">Six honest things about Namibia&rsquo;s roads.</p>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {roadTruths.map(([t, d], i) => (
                <Reveal as="li" key={t} delay={(i % 3) * 0.08} className="border border-[#f5f0e8]/25 bg-[#0b0f17]/45 p-6 backdrop-blur-md">
                  <p className="text-sm tabular-nums tracking-[0.2em] text-[#f6c88f]">({i + 1})</p>
                  <h3 className="mt-3 text-[1.4rem]">{t}</h3>
                  <p className="mt-2 text-[#f5f0e8]/90">{d}</p>
                </Reveal>
              ))}
            </ul>
            <p className="mt-12">
              More practical answers in the{" "}
              <Link href="/faq" className="underline underline-offset-4">
                FAQ
              </Link>
              .
            </p>
          </div>
        </ParallaxImage>
      </section>

      <section aria-labelledby="planner-label" className="section-y bg-bg">
        <div className="gutter">
          <SectionLabel id="planner-label">Route day planner</SectionLabel>
          <Statement className="mt-10 max-w-[50rem]">Every day of every journey: distance, gravel and tarmac, time at the wheel, fuel stops and the right vehicle.</Statement>
          <div className="mt-14">
            <RoutePicker
              journeys={shown.map((j) => ({ slug: j.slug, title: j.title }))}
              planners={shown.map((j) => (
                <RoutePlanner key={j.slug} days={j.days} heading={j.title} />
              ))}
            />
          </div>
        </div>
      </section>

      <CtaBand label="Still deciding?" text="Tell us how you like to travel and we'll suggest a mix: some driving, some flying, a guide where it counts." />
    </>
  );
}

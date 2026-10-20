import Image from "next/image";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { PhotoCards } from "@/components/ui/PhotoCards";
import { PhotoStatement } from "@/components/ui/PhotoStatement";
import { Reveal } from "@/components/ui/Reveal";
import { DashedRule, Num, PlaceholderTag, SectionLabel } from "@/components/ui/Section";
import { founder, team } from "@/data/team";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Story",
  description: "Why Namib Light exists, who plans your journey, and how we travel: privately, honestly, with local communities, and with the lights off.",
  path: "/our-story",
  image: "/photos/hero-our-story.jpg",
});

const commitments = [
  ["Local first", "Namibian guides, Namibian-owned lodges where we can, and community conservancies wherever they exist."],
  ["Leave no trace", "Stay on tracks, take everything out, keep lights low at night. The desert takes decades to heal a tyre mark."],
  ["Honest numbers", "Real distances, honest prices, and the drawbacks of a route as well as its beauty."],
];

const commitmentImgs = [
  { src: "/photos/stay-6.jpg", alt: "Thatched huts beside a river" },
  { src: "/photos/dest-sossusvlei.jpg", alt: "A dune crest at Sossusvlei with a line of footprints" },
  { src: "/photos/point-honesty.jpg", alt: "A 4x4 on sandy tracks near the dunes" },
];

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        title="Space and silence"
        subtitle="We started Namib Light to share the Namibia we love: wide, quiet and best at the edges of the day."
        img={{ src: "/photos/hero-our-story.jpg", alt: "Sunlit dune crests" }}
        titleSize="clamp(2.6rem,7.9vw,8.4rem)"
      />

      <PhotoStatement id="purpose-label" label="Why we exist" img={{ src: "/photos/journey-photographers.jpg", alt: "A dead camelthorn tree in Deadvlei" }}>
        The best journeys here are slow and well-timed: a dune at dawn with nobody else on it, a waterhole at dusk, a night so dark you can see the Milky Way&rsquo;s shadow. Everything we plan is built around that, and around the people who call this country home.
      </PhotoStatement>

      <section aria-labelledby="founder-label" className="bg-bg-alt">
        <div className="grid md:grid-cols-2">
          <div className="gutter section-y">
            <div className="flex flex-wrap items-center gap-3">
              <SectionLabel id="founder-label">Where it began</SectionLabel>
              <PlaceholderTag />
            </div>
            <h3 className="mt-10 text-[1.75rem] md:mt-14">{founder.name}</h3>
            <p className="mt-1 text-muted">{founder.role}</p>
            <p className="mt-6 max-w-[33rem]">{founder.bio}</p>
          </div>
          <div className="relative min-h-[30rem] md:min-h-[42rem]">
            <Image src={founder.image.src} alt={founder.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section aria-labelledby="team-label" className="section-y bg-bg">
        <div className="gutter">
          <div className="flex flex-wrap items-center gap-3">
            <SectionLabel id="team-label">The team</SectionLabel>
            <PlaceholderTag />
          </div>
          <ul className="mt-10">
            {team.map((m, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={m.role}>
                  <DashedRule />
                  <Reveal className={`grid gap-6 py-6 md:grid-cols-[minmax(0,28.5rem)_1fr] ${flip ? "md:grid-cols-[1fr_minmax(0,28.5rem)]" : ""}`}>
                    <div className={`relative aspect-[1.27] overflow-hidden ${flip ? "md:order-2" : ""}`}>
                      <Image src={m.image.src} alt={m.image.alt} fill sizes="(min-width: 768px) 456px, 100vw" className="object-cover" />
                    </div>
                    <div className="max-w-[36rem]">
                      <Num n={i + 1} />
                      <h3 className="mt-3 text-[1.55rem]">{m.name}</h3>
                      <p className="mt-1 text-muted">{m.role}</p>
                      <p className="mt-6">{m.bio}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
          <DashedRule />
        </div>
      </section>

      <section aria-labelledby="how-label" className="section-y bg-bg-alt">
        <div className="gutter">
          <SectionLabel id="how-label">How we travel</SectionLabel>
          <div className="mt-10">
            <PhotoCards items={commitments.map(([t, d], i) => ({ img: commitmentImgs[i], title: t, text: d }))} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

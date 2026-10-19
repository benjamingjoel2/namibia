import Image from "next/image";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { DashedRule, Num, PlaceholderTag, SectionLabel, Statement } from "@/components/ui/Section";
import { founder, team } from "@/data/team";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Story",
  description: "Why Namib Light exists, who plans your journey, and how we travel: privately, honestly, with local communities, and with the lights off.",
  path: "/our-story",
  image: "/images/hero-our-story.jpg",
});

const commitments = [
  ["Local first", "Namibian guides, Namibian-owned lodges where we can, and community conservancies wherever they exist."],
  ["Leave no trace", "Stay on tracks, take everything out, keep lights low at night. The desert takes decades to heal a tyre mark."],
  ["Honest numbers", "Real distances, honest prices, and the drawbacks of a route as well as its beauty."],
];

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        title="Space and silence"
        subtitle="We started Namib Light to share the Namibia we love: wide, quiet and best at the edges of the day."
        img={{ src: "/images/hero-our-story.jpg", alt: "Placeholder: first light on dunes in the NamibRand" }}
        titleClass="text-[clamp(2.6rem,7.9vw,8.4rem)]"
      />

      <section aria-label="Our purpose" className="section-y bg-bg">
        <div className="gutter">
          <Statement className="max-w-[62rem]">
            We believe the best journeys here are slow and well-timed: a dune at dawn with nobody else on it, a waterhole at dusk, a night so dark you can see the Milky Way&rsquo;s shadow. Everything we plan is built around that, and around the people who call this country home.
          </Statement>
        </div>
      </section>

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

      <section aria-labelledby="how-label" className="section-y bg-band">
        <div className="gutter">
          <SectionLabel id="how-label">How we travel</SectionLabel>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
            {commitments.map(([t, d], i) => (
              <li key={t} className="border-t border-dashed border-fg/45 pt-5">
                <Num n={i + 1} />
                <h3 className="mt-3 text-[1.35rem]">{t}</h3>
                <p className="mt-2">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { PhotoCards } from "@/components/ui/PhotoCards";
import { PhotoStatement } from "@/components/ui/PhotoStatement";
import { SectionLabel } from "@/components/ui/Section";
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

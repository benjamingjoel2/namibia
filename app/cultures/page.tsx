import Image from "next/image";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { ParallaxBand } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { DashedRule, Num, PlaceholderTag, SectionLabel, Statement } from "@/components/ui/Section";
import { cultures } from "@/data/cultures";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cultures of Namibia, with respect",
  description:
    "The Owambo, Herero, Himba, San, Nama, Damara and other peoples of Namibia: their histories, and how to visit in ways that benefit communities. Why we avoid 'show village' tourism.",
  path: "/cultures",
  image: "/images/hero-cultures.jpg",
});

const principles = [
  ["Community-owned, or not at all", "We arrange cultural visits only through community-owned conservancies and community-run enterprises, so the people you meet set the terms and keep the income."],
  ["Consent, always", "Ask before every photograph, and accept a no. Never photograph children without a parent's clear consent. Some of our guests choose not to photograph people at all."],
  ["Paid fairly, paid directly", "Fees go to the community, not to a middleman. No sweets, no handouts, no 'gifts' that create dependence."],
  ["Small and unhurried", "Small groups, a guide from the community, time to talk. A conversation, not a spectacle."],
];

export default function CulturesPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Cultures of
            <br />
            Namibia
          </>
        }
        subtitle="Many peoples, many languages, one country. Here's how we visit, and why we avoid some of what's on offer."
        img={{ src: "/images/hero-cultures.jpg", alt: "Placeholder: the hills of the Kunene at dawn" }}
      />

      <section aria-labelledby="intro-label" className="section-y bg-bg">
        <div className="gutter">
          <SectionLabel id="intro-label">With respect</SectionLabel>
          <Statement className="mt-14 max-w-[62rem]">
            The people of Namibia are not part of the scenery. They are farmers, teachers, guides, artists and conservationists, with long histories, some of them painful. We&rsquo;d like you to meet people the way you&rsquo;d want to be met.
          </Statement>
        </div>
      </section>

      <section aria-labelledby="principles-label" className="section-y bg-bg-alt">
        <div className="gutter">
          <SectionLabel id="principles-label">How we visit</SectionLabel>
          <DashedRule className="mt-10" />
          <ol className="mt-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {principles.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 0.08}>
                <Num n={i + 1} />
                <h3 className="mt-3 text-[1.35rem]">{t}</h3>
                <p className="mt-2">{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="show-label" className="section-y bg-deep text-on-deep">
        <div className="gutter grid gap-12 md:grid-cols-2">
          <div>
            <SectionLabel id="show-label">Why we avoid &ldquo;show villages&rdquo;</SectionLabel>
            <p className="statement mt-10 text-[1.75rem] md:text-[2.2rem]">If a visit is set up for tourists, by outsiders, it usually isn&rsquo;t for the people in it.</p>
          </div>
          <div className="space-y-4 md:pt-16">
            <p>
              Across Namibia, some operators sell quick &ldquo;village visits&rdquo;: a drive-in, a few photographs, sweets or maize handed over, and gone. The people photographed often see little of the money and have little say. Some are asked to stage a way of life for the camera.
            </p>
            <p>
              We don&rsquo;t book them. Instead, we work with community-owned conservancies and community-run enterprises, where people choose what to share and are paid for their time and knowledge. If we can&rsquo;t arrange a visit on those terms, we don&rsquo;t arrange one.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="peoples-label" className="section-y bg-bg">
        <div className="gutter">
          <SectionLabel id="peoples-label">Peoples of Namibia</SectionLabel>
          <p className="mt-6 max-w-[40rem] text-muted">
            Short introductions only. Every community is more varied than any page can show. Before launch, this page will be reviewed with community representatives.
          </p>
          <ol className="mt-12">
            {cultures.map((c, i) => (
              <li key={c.slug} id={c.slug} className="scroll-mt-24 border-t border-dashed border-line py-10">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
                  <div>
                    <Num n={i + 1} />
                    <h3 className="statement mt-3 text-[2rem] md:text-[2.5rem]">{c.name}</h3>
                    {c.selfName && <p className="mt-2 text-muted">{c.selfName}</p>}
                    <p className="mt-2 text-sm">{c.regions}</p>
                  </div>
                  <div className="space-y-4">
                    {c.overview.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                    <div className="border-l-2 border-accent pl-4">
                      <p className="label">History</p>
                      <p className="mt-1">{c.history}</p>
                    </div>
                    <div>
                      <p className="label">Visiting well</p>
                      <ul className="mt-1 list-disc space-y-1 pl-5">
                        {c.visitWell.map((v) => (
                          <li key={v.slice(0, 24)}>{v}</li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-sm">
                      <span className="text-muted">Partner: </span>
                      {c.partner.name} <PlaceholderTag />
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ParallaxBand img={{ src: "/images/band-cultures.jpg", alt: "Placeholder: ancient engravings on red sandstone" }} />

      <section aria-labelledby="craft-label" className="bg-bg-alt">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[22rem]">
            <Image src="/images/culture-craft.jpg" alt="Placeholder: a woven basket pattern" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="gutter section-y">
            <SectionLabel id="craft-label">A note on images</SectionLabel>
            <p className="mt-8 max-w-[32rem]">
              You won&rsquo;t find portraits of people on this page. We&rsquo;d rather show nobody than show someone who didn&rsquo;t agree to it. When we add photographs of people, it will be with their consent, their names if they wish, and their words.
            </p>
          </div>
        </div>
      </section>

      <CtaBand label="Travel with respect" text="Tell us what you'd like to learn about. We'll suggest community-run experiences, and be honest when something isn't right." />
    </>
  );
}

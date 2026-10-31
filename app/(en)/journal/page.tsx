import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { PhotoCards } from "@/components/ui/PhotoCards";
import { Reveal } from "@/components/ui/Reveal";
import { allPosts, formatDate } from "@/lib/journal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Journal",
  description: "Notes from the road: timing sunrise at Sossusvlei, an honest guide to self-drive, stargazing in the NamibRand, and Etosha by season.",
  path: "/journal",
  image: "/photos/hero-journal.jpg",
});

export default function JournalPage() {
  const [lead, ...rest] = allPosts();
  return (
    <>
      <PageHero size="short" title="Journal" subtitle="Notes from the road, written to be useful." img={{ src: "/photos/hero-journal.jpg", alt: "A gravel road through the hills" }} />
      <section aria-labelledby="posts" className="bg-bg pb-24">
        <h2 id="posts" className="sr-only">
          Posts
        </h2>

        {lead && (
          <article className="group relative min-h-[82svh] overflow-hidden text-[#f5f0e8]">
            <Image src={lead.hero} alt={lead.heroAlt} fill sizes="100vw" className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.2)_0%,transparent_35%,rgb(0_0_0/0.78)_100%)]" aria-hidden />
            <Reveal className="gutter relative flex min-h-[82svh] flex-col justify-end pb-12 pt-32">
              <p className="text-sm tracking-[0.2em] text-[#f6c88f]">
                LATEST · <time dateTime={lead.date}>{formatDate(lead.date).toUpperCase()}</time>
              </p>
              <h3 className="display mt-4 max-w-[64rem] text-[clamp(2.2rem,5.6vw,5.6rem)]">
                <Link href={`/journal/${lead.slug}`} className="after:absolute after:inset-0">
                  {lead.title}
                </Link>
              </h3>
              <p className="mt-5 max-w-[36rem] text-[1.15rem] text-[#f5f0e8]/90">{lead.excerpt}</p>
              <p className="mt-6 text-[1.02rem]">Read the story →</p>
            </Reveal>
          </article>
        )}

        <div className="gutter mt-16">
          <PhotoCards
            items={rest.map((p) => ({
              img: { src: p.hero, alt: p.heroAlt },
              title: p.title,
              kicker: formatDate(p.date).toUpperCase(),
              text: p.excerpt,
              href: `/journal/${p.slug}`,
            }))}
          />
        </div>
      </section>
    </>
  );
}

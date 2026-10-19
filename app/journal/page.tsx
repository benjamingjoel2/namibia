import Image from "next/image";
import Link from "next/link";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { DashedRule, Num } from "@/components/ui/Section";
import { allPosts, formatDate } from "@/lib/journal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Journal",
  description: "Notes from the road: timing sunrise at Sossusvlei, an honest guide to self-drive, stargazing in the NamibRand, and Etosha by season.",
  path: "/journal",
  image: "/photos/hero-journal.jpg",
});

export default function JournalPage() {
  const posts = allPosts();
  return (
    <>
      <PageHero size="short" title="Journal" subtitle="Notes from the road, written to be useful." img={{ src: "/photos/hero-journal.jpg", alt: "A gravel road through the hills" }} />
      <section aria-labelledby="posts" className="section-y bg-bg">
        <h2 id="posts" className="sr-only">
          Posts
        </h2>
        <ol className="gutter">
          {posts.map((p, i) => (
            <li key={p.slug}>
              <DashedRule />
              <Reveal className="grid gap-6 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <Link href={`/journal/${p.slug}`} className="relative block aspect-[1.6] overflow-hidden" tabIndex={-1} aria-hidden>
                  <Image src={p.hero} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] hover:scale-[1.03]" />
                </Link>
                <article className="max-w-[32rem]">
                  <Num n={i + 1} pad />
                  <h3 className="mt-4 text-[1.75rem] leading-tight">
                    <Link href={`/journal/${p.slug}`} className="underline-offset-4 hover:underline">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.tags.join(", ")}
                  </p>
                  <p className="mt-4">{p.excerpt}</p>
                  <ArrowButton href={`/journal/${p.slug}`} className="mt-8">
                    Read
                  </ArrowButton>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

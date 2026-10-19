import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { site } from "@/config/site";
import { allPosts, formatDate, getPost, readingMinutes } from "@/lib/journal";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    ...pageMetadata({ title: post.meta.title, description: post.meta.excerpt, path: `/journal/${post.meta.slug}`, image: post.meta.hero }),
    openGraph: { type: "article", publishedTime: post.meta.date, title: post.meta.title, description: post.meta.excerpt, images: [post.meta.hero] },
  };
}

const components = {
  a: ({ href = "", children }: { href?: string; children?: React.ReactNode }) =>
    href.startsWith("/") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    ),
};

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const { meta, content } = post;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.excerpt,
    datePublished: meta.date,
    image: `${site.url}${meta.hero}`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero size="short" title={meta.title} img={{ src: meta.hero, alt: meta.heroAlt }} titleClass="text-[clamp(2rem,4.6vw,4.6rem)] !leading-[0.95]">
        <p className="text-sm">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time> · {readingMinutes(content)} min read
        </p>
      </PageHero>
      <article className="section-y bg-bg">
        <div className="gutter">
          <nav aria-label="Breadcrumb" className="mx-auto mb-10 max-w-[42rem] text-sm text-muted">
            <Link href="/journal" className="underline underline-offset-4">
              Journal
            </Link>
          </nav>
          <p className="statement mx-auto max-w-[42rem] text-[1.5rem] md:text-[1.85rem]">{meta.excerpt}</p>
          <div className="prose-namib mx-auto mt-10 max-w-[42rem] text-[1.12rem] leading-[1.7]">
            <MDXRemote source={content} components={components} />
          </div>
        </div>
      </article>
      <CtaBand />
    </>
  );
}

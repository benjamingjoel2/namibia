import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel, VerifyTag } from "@/components/ui/Section";
import { faqs } from "@/data/faq";
import { pageMetadata } from "@/lib/seo";
import type { FaqItem } from "@/types/content";

export const metadata = pageMetadata({
  title: "FAQ: travelling in Namibia",
  description: "Entry requirements, self-drive safety, gravel roads, driving on the left, 4x4s and rooftop tents, fuel, malaria, best time to visit, park fees, money, tipping and travelling with children.",
  path: "/faq",
  image: "/images/hero-faq.jpg",
});

const order: FaqItem["category"][] = ["Before you go", "On the road", "Health & safety", "Money", "Booking"];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero size="short" title="Questions" subtitle="Practical, honest answers. Where rules change, we say so." img={{ src: "/images/hero-faq.jpg", alt: "Placeholder: granite hills in evening light" }} />

      <div className="section-y bg-bg">
        <div className="gutter grid gap-12 lg:grid-cols-[16rem_1fr]">
          <nav aria-label="FAQ sections" className="lg:sticky lg:top-24 lg:self-start">
            <ul className="space-y-2">
              {order.map((c) => (
                <li key={c}>
                  <a href={`#${slug(c)}`} className="underline-offset-4 hover:underline">
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-16">
            {order.map((c) => (
              <section key={c} aria-labelledby={slug(c)}>
                <SectionLabel id={slug(c)}>{c}</SectionLabel>
                <div className="mt-6">
                  {faqs
                    .filter((f) => f.category === c)
                    .map((f) => (
                      <details key={f.q} className="group border-t border-dashed border-line last:border-b">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.25rem] [&::-webkit-details-marker]:hidden">
                          <span>{f.q}</span>
                          <span aria-hidden className="mt-1 text-lg transition-transform group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <div className="max-w-[44rem] space-y-3 pb-6">
                          {f.a.map((p) => (
                            <p key={p.slice(0, 24)}>{p}</p>
                          ))}
                          {f.verify && (
                            <p className="text-sm text-muted">
                              <VerifyTag /> {f.verify}
                            </p>
                          )}
                        </div>
                      </details>
                    ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      <CtaBand label="Something we haven't answered?" text="Ask us anything: roads, seasons, children, cameras. A real person will reply." />
    </>
  );
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-");

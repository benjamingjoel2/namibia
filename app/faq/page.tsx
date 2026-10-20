import Image from "next/image";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { VerifyTag } from "@/components/ui/Section";
import { faqs } from "@/data/faq";
import { pageMetadata } from "@/lib/seo";
import type { FaqItem } from "@/types/content";

export const metadata = pageMetadata({
  title: "FAQ: travelling in Namibia",
  description: "Entry requirements, self-drive safety, gravel roads, driving on the left, 4x4s and rooftop tents, fuel, malaria, best time to visit, park fees, money, tipping and travelling with children.",
  path: "/faq",
  image: "/photos/hero-faq.jpg",
});

const order: FaqItem["category"][] = ["Before you go", "On the road", "Health & safety", "Money", "Booking"];

const topicImg: Record<FaqItem["category"], { src: string; alt: string }> = {
  "Before you go": { src: "/photos/hero-journeys.jpg", alt: "Acacias and mountains in the Namib" },
  "On the road": { src: "/photos/hero-how-to-travel.jpg", alt: "A 4x4 with a rooftop tent under storm clouds" },
  "Health & safety": { src: "/photos/dest-kalahari.jpg", alt: "Red Kalahari sand and a camelthorn tree" },
  Money: { src: "/photos/dest-windhoek.jpg", alt: "Windhoek's Christuskirche" },
  Booking: { src: "/photos/stay-1.jpg", alt: "A tented chalet in the desert" },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero size="short" title="Questions" subtitle="Practical, honest answers. Where rules change, we say so." img={{ src: "/photos/hero-faq.jpg", alt: "Spitzkoppe at sunset, seen through a rock arch" }} />

      <nav aria-label="FAQ topics" className="bg-bg pb-6 pt-16 md:pt-20">
        <div className="gutter">
          <p className="label">Jump to a topic</p>
          <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {order.map((c) => {
              const n = faqs.filter((f) => f.category === c).length;
              return (
                <li key={c}>
                  <a href={`#${slug(c)}`} className="group relative block aspect-[4/5] overflow-hidden text-[#f5f0e8]">
                    <Image src={topicImg[c].src} alt="" fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]" />
                    <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgb(0_0_0/0.78)_100%)]" aria-hidden />
                    <span className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                      <span className="block text-xs tracking-[0.2em] text-[#f6c88f]">{n} QUESTIONS</span>
                      <span className="statement mt-1 block text-[1.35rem] leading-tight md:text-[1.6rem]">{c}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="bg-bg pb-24">
        {order.map((c) => (
          <section key={c} aria-labelledby={slug(c)} className="scroll-mt-16 pt-16">
            <div className="relative h-[42svh] min-h-[16rem] overflow-hidden text-[#f5f0e8]">
              <Image src={topicImg[c].src} alt={topicImg[c].alt} fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.15)_0%,rgb(0_0_0/0.65)_100%)]" aria-hidden />
              <div className="gutter absolute inset-x-0 bottom-0 pb-8">
                <h2 id={slug(c)} className="display" style={{ fontSize: "min(clamp(2.2rem,6vw,5.6rem), calc((100vw - 2.6rem) / 7.6))" }}>
                  {c}
                </h2>
              </div>
            </div>
            <div className="gutter mt-6">
              <div className="mx-auto max-w-[56rem]">
                {faqs
                  .filter((f) => f.category === c)
                  .map((f) => (
                    <details key={f.q} className="group border-t border-dashed border-line last:border-b">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.3rem] [&::-webkit-details-marker]:hidden">
                        <span>{f.q}</span>
                        <span aria-hidden className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-fg text-bg text-lg transition-transform group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <div className="max-w-[46rem] space-y-3 pb-6">
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
            </div>
          </section>
        ))}
      </div>

      <CtaBand label="Something we haven't answered?" text="Ask us anything: roads, seasons, children, cameras. A real person will reply." />
    </>
  );
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-");

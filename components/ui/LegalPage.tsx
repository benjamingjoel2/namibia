import { PageHero } from "./PageHero";
import { PlaceholderTag } from "./Section";

export function LegalPage({ title, updated, placeholder = true, children }: { title: string; updated: string; placeholder?: boolean; children: React.ReactNode }) {
  return (
    <>
      <PageHero size="short" title={title} img={{ src: "/photos/hero-legal.jpg", alt: "Desert dunes at dawn" }} titleSize="clamp(2.4rem,6.4vw,6.4rem)" />
      <article className="section-y bg-bg">
        <div className="gutter">
          <div className="mx-auto max-w-[44rem]">
            <p className="text-sm text-muted">
              Last updated: {updated} {placeholder && <PlaceholderTag>draft for legal review</PlaceholderTag>}
            </p>
            <div className="prose-namib mt-10 text-[1.08rem] leading-[1.7]">{children}</div>
          </div>
        </div>
      </article>
    </>
  );
}

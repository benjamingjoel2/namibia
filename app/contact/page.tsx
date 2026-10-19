import { PlanningForm } from "@/components/contact/PlanningForm";
import { ThemedImage } from "@/components/ui/ThemedImage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Plan your journey",
  description: "Tell us when you'd like to travel, how you like to move and what you'd love to see. A planner will reply, usually within a day.",
  path: "/contact",
  image: "/photos/hero-contact.jpg",
});

export default function ContactPage() {
  return (
    <>
      <section aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-bg pb-16 md:pb-24">
        <div className="absolute inset-x-0 top-0 -z-10 h-[46rem] bg-deep">
          <ThemedImage
            img={{
              src: "/photos/hero-contact.jpg",
              alt: "The sun setting over the desert",
              srcNight: "/photos/cta-night.jpg",
              altNight: "The Milky Way over the desert",
            }}
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" aria-hidden />
          <div className="starfield" aria-hidden />
        </div>

        <div className="gutter pt-[4.6rem] text-[#f5f0e8]">
          <h1 id="contact-title" className="display text-center text-[clamp(2.6rem,8.4vw,8.6rem)]">
            Plan your journey
          </h1>
        </div>

        <div className="gutter mt-10 md:mt-16">
          <div className="mx-auto max-w-[44rem] bg-bg-alt p-6 text-fg shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5)] md:p-10">
            <h2 className="text-[1.6rem]">Tell us about your trip</h2>
            <p className="mt-3 text-[0.98rem]">
              A few details help us suggest the right route, season and way of travelling. Only the starred fields are needed. A planner will reply personally.
            </p>
            <div className="mt-10">
              <PlanningForm />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="info-title" className="bg-deep text-on-deep">
        <div className="gutter grid gap-10 py-16 md:grid-cols-[1fr_2fr] md:py-20">
          <h2 id="info-title" className="text-[1.6rem]">
            Contact info
          </h2>
          <dl className="grid gap-8 sm:grid-cols-2">
            <Info label="Office">
              {site.contact.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </Info>
            <Info label="Email">
              <a href={`mailto:${site.contact.email}`} className="underline underline-offset-4">
                {site.contact.email}
              </a>
            </Info>
            <Info label="Phone">
              <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="underline underline-offset-4">
                {site.contact.phone}
              </a>
            </Info>
            <Info label="WhatsApp">
              <a href={`https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, "")}`} className="underline underline-offset-4" rel="noopener noreferrer" target="_blank">
                {site.contact.whatsapp}
                <span className="sr-only"> (opens WhatsApp)</span>
              </a>
            </Info>
            <Info label="Hours">Monday to Friday, 08:00–17:00 Namibian time (PLACEHOLDER). Travellers on the road: 24 hours.</Info>
            <Info label="Registration">{site.registration}</Info>
          </dl>
        </div>
      </section>
    </>
  );
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-sm text-on-deep/80">{label}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}

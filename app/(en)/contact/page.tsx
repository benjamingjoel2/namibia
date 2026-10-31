import { PlanningForm } from "@/components/contact/PlanningForm";
import { ParallaxImage } from "@/components/ui/Parallax";
import { PhotoCards } from "@/components/ui/PhotoCards";
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
      <section aria-labelledby="contact-title" className="relative bg-deep">
        {/* Photo stays pinned while the form scrolls over it. */}
        <div className="sticky top-0 -mb-[100svh] h-[100svh] overflow-hidden" aria-hidden>
          <ThemedImage
            img={{
              src: "/photos/hero-contact.jpg",
              alt: "",
              srcNight: "/photos/cta-night.jpg",
              altNight: "",
            }}
            sizes="100vw"
            priority
            className="kenburns object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.45)_0%,rgb(0_0_0/0.2)_40%,rgb(0_0_0/0.55)_100%)]" />
          <div className="starfield" />
        </div>

        <div className="relative pb-24 md:pb-32">
          <div className="gutter pt-[4.6rem] text-[#f5f0e8]">
            <h1 id="contact-title" className="display text-center" style={{ fontSize: "min(clamp(2.6rem,8.4vw,8.6rem), calc((100vw - 2.6rem) / 7.2))" }}>
              Plan your journey
            </h1>
            <p className="mx-auto mt-6 max-w-[34rem] text-center text-[1.1rem] text-[#f5f0e8]/90">
              A planner will reply personally, before the next sunrise.
            </p>
          </div>

          <div className="gutter mt-12 md:mt-20">
            <div className="mx-auto max-w-[46rem] bg-bg-alt/95 p-6 text-fg shadow-[0_40px_120px_-40px_rgba(0,0,0,0.7)] backdrop-blur-md md:p-10">
              <h2 className="text-[1.6rem]">Tell us about your trip</h2>
              <p className="mt-3 text-[0.98rem]">
                A few details help us suggest the right route, season and way of travelling. Only the starred fields are needed.
              </p>
              <div className="mt-10">
                <PlanningForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="next-title" className="section-y bg-bg">
        <div className="gutter">
          <h2 id="next-title" className="label">
            What happens next
          </h2>
          <p className="statement mt-6 max-w-[40rem] text-[1.9rem] md:text-[2.8rem]">Three steps, no pressure.</p>
          <div className="mt-12">
            <PhotoCards
              items={[
                { img: { src: "/photos/journal-sossusvlei.jpg", alt: "A sunlit dune crest at Sossusvlei" }, kicker: "STEP 1", title: "You tell us", text: "Dates, travel style, must-sees. Five minutes on this page." },
                { img: { src: "/photos/dest-spitzkoppe-2.jpg", alt: "The Spitzkoppe rock arch under the stars" }, kicker: "STEP 2", title: "We plan it around the light", text: "A route timed for sunrise, sunset and the moon, with honest distances and the right car." },
                { img: { src: "/photos/stay-10.jpg", alt: "A campfire at a lodge among the rocks" }, kicker: "STEP 3", title: "We talk it through", text: "By email, or on a call if you prefer. Change anything until it feels right." },
              ]}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="info-title" className="relative bg-deep text-[#f5f0e8]">
        <ParallaxImage img={{ src: "/photos/dest-windhoek-2.jpg", alt: "The hills around Windhoek" }} className="py-24 md:py-32">
          <div className="absolute inset-0 bg-black/55" aria-hidden />
          <div className="gutter relative grid gap-10 md:grid-cols-[1fr_2fr]">
            <div>
              <h2 id="info-title" className="label text-[#f6c88f]">
                Contact info
              </h2>
              <p className="statement mt-6 text-[1.9rem] md:text-[2.6rem]">Or just say hello.</p>
            </div>
            <dl className="grid gap-4 sm:grid-cols-2">
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
              <Info label="Hours">Monday to Friday, 08:00–17:00 Namibian time. We reply within one working day.</Info>
            </dl>
          </div>
        </ParallaxImage>
      </section>
    </>
  );
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border border-[#f5f0e8]/25 bg-[#0b0f17]/45 p-5 backdrop-blur-md">
      <dt className="text-sm text-[#f5f0e8]/75">{label}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}

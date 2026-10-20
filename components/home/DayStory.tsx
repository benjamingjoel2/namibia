"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Chapter = {
  time: string;
  moment: string;
  place: string;
  title: string;
  text: string;
  img: string;
  alt: string;
  href: string;
  /** 0 = sunrise, 1 = sunset; null = night (moon). */
  sun: number | null;
  /** Colour wash over the photo for this hour. */
  tint: string;
};

const chapters: Chapter[] = [
  {
    time: "05:40",
    moment: "Dawn",
    place: "Sossusvlei",
    title: "The dunes wake up first",
    text: "The gate opens at sunrise. Ten minutes later the crests turn from grey to apricot to red, one ridge at a time.",
    img: "/photos/journey-first-light.jpg",
    alt: "A red dune crest at first light",
    href: "/destinations/sossusvlei",
    sun: 0.04,
    tint: "rgb(60 30 50 / 0.35)",
  },
  {
    time: "07:15",
    moment: "Early morning",
    place: "Deadvlei",
    title: "A white pan, black trees, red walls",
    text: "Walk in while the clay is still in shadow and the dunes behind are lit. It lasts about half an hour.",
    img: "/photos/band-deadvlei-day.jpg",
    alt: "Dead camelthorn trees on Deadvlei's white pan below red dunes",
    href: "/journal/sossusvlei-at-sunrise",
    sun: 0.16,
    tint: "rgb(30 40 70 / 0.18)",
  },
  {
    time: "11:00",
    moment: "Midday",
    place: "On the road",
    title: "Four hundred kilometres of gravel",
    text: "Namibia has more gravel than tarmac. We'll tell you which car, which tyres and where to fill up.",
    img: "/photos/hero-how-to-travel.jpg",
    alt: "A 4x4 with a rooftop tent under storm clouds",
    href: "/how-to-travel",
    sun: 0.45,
    tint: "rgb(20 20 20 / 0.12)",
  },
  {
    time: "15:30",
    moment: "Afternoon",
    place: "Damaraland",
    title: "Elephants that know where the water is",
    text: "Desert-adapted elephants follow the dry riverbeds. We track them with local guides, at a respectful distance.",
    img: "/photos/dest-damaraland-2.jpg",
    alt: "A desert-adapted elephant and calf on the sand",
    href: "/destinations/damaraland",
    sun: 0.68,
    tint: "rgb(60 30 10 / 0.18)",
  },
  {
    time: "17:20",
    moment: "Golden hour",
    place: "Etosha",
    title: "Everything comes to drink",
    text: "In the dry season, the animals come to the water. You just need to sit still long enough.",
    img: "/photos/hero-waterhole.jpg",
    alt: "Zebras drinking at an Etosha waterhole",
    href: "/waterhole-watch",
    sun: 0.86,
    tint: "rgb(120 60 10 / 0.22)",
  },
  {
    time: "18:40",
    moment: "Dusk",
    place: "Etosha",
    title: "Back in camp before the gate closes",
    text: "Then walk to the waterhole. Some of the best sightings happen after dinner.",
    img: "/photos/etosha-waterhole-dusk.jpg",
    alt: "Two elephants at a waterhole just after sunset",
    href: "/destinations/etosha",
    sun: 0.99,
    tint: "rgb(60 20 40 / 0.25)",
  },
  {
    time: "22:00",
    moment: "Night",
    place: "Spitzkoppe",
    title: "Turn off the lights",
    text: "Namibia's best show starts after dinner. On a moonless night the Milky Way casts a shadow.",
    img: "/photos/hero-home-night-spitzkoppe.jpg",
    alt: "The Milky Way over the granite peaks of Spitzkoppe",
    href: "/night-sky",
    sun: null,
    tint: "rgb(5 10 30 / 0.3)",
  },
];

/** Point on the sky arc for a sun position 0..1 (quadratic curve). */
function arcPoint(t: number) {
  const x = 40 + t * 920;
  const y = (1 - t) * (1 - t) * 96 + 2 * (1 - t) * t * -40 + t * t * 96;
  return { x, y };
}

/**
 * A day in Namibia, told in one scroll: a pinned full-screen photo stage that
 * crossfades between the hours while the captions scroll past. A sun crosses
 * the sky rail and becomes the moon at night.
 */
export function DayStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const ch = chapters[active];
  const sun = ch.sun === null ? null : arcPoint(ch.sun);

  return (
    <section aria-labelledby="day-title" className="relative bg-[#0b0f17] text-[#f5f0e8]">
      {/* Pinned stage */}
      <div className="sticky top-0 -mb-[100svh] h-[100svh] overflow-hidden" aria-hidden>
        {chapters.map((c, i) => (
          <div
            key={c.img}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={c.img}
              alt=""
              fill
              sizes="100vw"
              loading={i < 2 ? "eager" : "lazy"}
              className={`object-cover transition-transform duration-[8000ms] ease-out ${i === active ? "scale-100" : "scale-[1.08]"}`}
            />
          </div>
        ))}
        <div className="absolute inset-0 transition-colors duration-[1200ms]" style={{ backgroundColor: ch.tint }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.45)_0%,transparent_30%,transparent_55%,rgb(0_0_0/0.7)_100%)]" />

        {/* Clock and sky rail */}
        <div className="absolute inset-x-0 top-[4.6rem] flex flex-col items-start gap-3 px-5 md:items-end md:px-6">
          <div className="md:text-right">
            <p className="display text-[clamp(2.6rem,7vw,6.5rem)] tabular-nums [text-shadow:0_2px_24px_rgb(0_0_0/0.35)]">{ch.time}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[#f5f0e8]/90 [text-shadow:0_1px_8px_rgb(0_0_0/0.6)]">
              {ch.moment} · {ch.place}
            </p>
          </div>
          <svg viewBox="0 0 1000 110" className="hidden w-[min(36vw,30rem)] md:block">
            <path d="M40 96 Q 500 -40 960 96" fill="none" stroke="#f5f0e8" strokeOpacity="0.35" strokeDasharray="4 6" />
            <line x1="20" y1="96" x2="980" y2="96" stroke="#f5f0e8" strokeOpacity="0.35" />
            {sun ? (
              <circle cx={sun.x} cy={sun.y} r="14" fill="#f6c88f" className="transition-all duration-[1200ms]" style={{ filter: "drop-shadow(0 0 12px #f6c88f)" }} />
            ) : (
              <g className="transition-all duration-[1200ms]">
                <circle cx="760" cy="20" r="13" fill="#f1e8da" />
                <circle cx="768" cy="15" r="12" fill="#1b2337" />
              </g>
            )}
          </svg>
        </div>

        {/* Progress ticks */}
        <ol className="absolute bottom-6 right-5 hidden flex-col gap-2 md:flex">
          {chapters.map((c, i) => (
            <li key={c.time} className={`h-[3px] rounded-full bg-[#f5f0e8] transition-all duration-500 ${i === active ? "w-10 opacity-100" : "w-4 opacity-40"}`} />
          ))}
        </ol>
      </div>

      {/* Scrolling captions */}
      <h2 id="day-title" className="sr-only">
        A day in Namibia
      </h2>
      <div className="relative">
        <div className="flex h-[70svh] items-end px-5 pb-16 md:px-6">
          <p className="label max-w-xs text-[#f5f0e8]/90">A day in Namibia. Scroll from dawn to dark.</p>
        </div>
        {chapters.map((c, i) => (
          <article
            key={c.time}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className="flex min-h-[110svh] items-end px-5 pb-[12svh] md:px-6"
          >
            <div
              className={`max-w-[34rem] bg-[#0b0f17]/45 p-6 backdrop-blur-md transition-all duration-700 md:p-8 ${i === active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-60"}`}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-[#f6c88f]">
                {c.time} · {c.place}
              </p>
              <h3 className="statement mt-4 text-[2rem] leading-[1.05] md:text-[3.2rem]">{c.title}</h3>
              <p className="mt-5 text-[1.1rem] leading-relaxed text-[#f5f0e8]/90 md:text-[1.2rem]">{c.text}</p>
              <Link href={c.href} className="mt-6 inline-block border-b border-[#f5f0e8]/70 pb-1 text-[1.02rem] hover:border-[#f5f0e8]">
                {i === chapters.length - 1 ? "Explore the night sky" : `More on ${c.place}`} →
              </Link>
              <span className="sr-only">Photo: {c.alt}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

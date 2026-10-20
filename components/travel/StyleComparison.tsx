import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { styleProfiles } from "@/data/travelStyles";

const cost = (n: 1 | 2 | 3) => (
  <span role="img" aria-label={["", "Lowest cost", "Mid cost", "Highest cost"][n]}>
    <span aria-hidden>
      {"$".repeat(n)}
      <span className="opacity-30">{"$".repeat(3 - n)}</span>
    </span>
  </span>
);

/** An honest three-way comparison: tall photo cards, then the details. */
export function StyleComparison() {
  return (
    <ol className="grid gap-14 md:grid-cols-3 md:gap-6">
      {styleProfiles.map((p, i) => (
        <Reveal as="li" key={p.style} delay={i * 0.1}>
          <div className="group relative aspect-[3/4] overflow-hidden text-[#f5f0e8]">
            <Image src={`/photos/style-${p.style}.jpg`} alt={`${p.name} travel in Namibia`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.25)_0%,transparent_35%,rgb(0_0_0/0.78)_100%)]" aria-hidden />
            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-7">
              <span className="text-sm tabular-nums tracking-[0.2em] text-[#f6c88f]">({i + 1})</span>
              <span>
                <h3 className="display text-[clamp(2rem,3vw,2.9rem)]">{p.name}</h3>
                <span className="mt-3 block text-[1.05rem] text-[#f5f0e8]/90">{p.oneLine}</span>
              </span>
            </div>
          </div>
          <dl className="mt-6 space-y-4 text-[0.98rem]">
            <div>
              <dt className="label">Good for</dt>
              <dd>
                <ul className="mt-1 list-disc pl-4">
                  {p.goodFor.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="label">Harder if</dt>
              <dd>
                <ul className="mt-1 list-disc pl-4">
                  {p.harderIf.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="label">Pace</dt>
              <dd className="mt-1">{p.pace}</dd>
            </div>
            <div>
              <dt className="label">Cost</dt>
              <dd className="mt-1 font-sans tracking-widest">{cost(p.costIndex)}</dd>
            </div>
          </dl>
          <p className="mt-6 border-l-2 border-accent pl-4 italic">{p.honestNote}</p>
        </Reveal>
      ))}
    </ol>
  );
}

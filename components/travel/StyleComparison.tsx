import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Num } from "@/components/ui/Section";
import { styleProfiles } from "@/data/travelStyles";

const cost = (n: 1 | 2 | 3) => (
  <span role="img" aria-label={["", "Lowest cost", "Mid cost", "Highest cost"][n]}>
    <span aria-hidden>
      {"$".repeat(n)}
      <span className="opacity-30">{"$".repeat(3 - n)}</span>
    </span>
  </span>
);

/** An honest three-way comparison, laid out like the reference's three points. */
export function StyleComparison() {
  return (
    <ol className="grid gap-14 md:grid-cols-3 md:gap-6">
      {styleProfiles.map((p, i) => (
        <Reveal as="li" key={p.style} delay={i * 0.1}>
          <Num n={i + 1} />
          <h3 className="mt-4 text-[1.55rem] leading-tight">{p.name}</h3>
          <p className="mt-1 text-muted">{p.oneLine}</p>
          <div className="relative mt-6 aspect-[1.27] overflow-hidden">
            <Image src={`/photos/style-${p.style}.jpg`} alt={`${p.name} travel in Namibia`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
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

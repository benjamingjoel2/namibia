import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { destinations } from "@/data/destinations";
import { journeys } from "@/data/journeys";
import { LOCALES, languageAlternates, localePath } from "@/lib/i18n-paths";
import { allPosts } from "@/lib/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/destinations", "/journeys", "/night-sky", "/how-to-travel", "/waterhole-watch", "/cultures", "/our-story", "/journal", "/faq", "/contact", "/privacy", "/terms", "/cookies", "/accessibility"];
  const u = (p: string) => `${site.url}${p === "/" ? "" : p}`;
  const entries: { path: string; lastModified?: string; changeFrequency: "monthly" | "yearly"; priority: number }[] = [
    ...pages.map((p) => ({ path: p, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...destinations.map((d) => ({ path: `/destinations/${d.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...journeys.map((j) => ({ path: `/journeys/${j.slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...allPosts().map((p) => ({ path: `/journal/${p.slug}`, lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
  // Every page in every language, each with its hreflang alternates.
  return entries.flatMap(({ path, ...e }) => {
    const languages = Object.fromEntries(Object.entries(languageAlternates(path)).map(([k, v]) => [k, u(v)]));
    return LOCALES.map((l) => ({ ...e, url: u(localePath(path, l)), alternates: { languages } }));
  });
}

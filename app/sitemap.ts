import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { destinations } from "@/data/destinations";
import { journeys } from "@/data/journeys";
import { allPosts } from "@/lib/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/destinations", "/journeys", "/night-sky", "/how-to-travel", "/waterhole-watch", "/cultures", "/our-story", "/journal", "/faq", "/contact", "/privacy", "/terms", "/cookies", "/accessibility"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...destinations.map((d) => ({ url: `${site.url}/destinations/${d.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...journeys.map((j) => ({ url: `${site.url}/journeys/${j.slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...allPosts().map((p) => ({ url: `${site.url}/journal/${p.slug}`, lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}

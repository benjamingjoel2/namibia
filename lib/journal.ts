import { intlLocale, locale } from "@/lib/locale";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { JournalMeta } from "@/types/content";

// English posts live in content/journal; translations in content/journal-<locale> (same slugs).
const DIRS = {
  en: path.join(process.cwd(), "content", "journal"),
  fr: path.join(process.cwd(), "content", "journal-fr"),
  de: path.join(process.cwd(), "content", "journal-de"),
  es: path.join(process.cwd(), "content", "journal-es"),
};
const DIR = DIRS[locale];

function readPost(file: string) {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const meta: JournalMeta = {
    slug: file.replace(/\.mdx$/, ""),
    title: String(data.title),
    date: String(data.date),
    excerpt: String(data.excerpt),
    hero: String(data.hero),
    heroAlt: String(data.heroAlt),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
  };
  return { meta, content };
}

export function allPosts(): JournalMeta[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => readPost(f).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  const file = `${slug}.mdx`;
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(path.join(DIR, file))) return null;
  return readPost(file);
}

export const formatDate = (iso: string) => new Date(iso).toLocaleDateString(intlLocale, { day: "numeric", month: "long", year: "numeric" });

export function readingMinutes(content: string) {
  return Math.max(1, Math.round(content.split(/\s+/).length / 220));
}

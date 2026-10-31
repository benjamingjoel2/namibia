import type { Metadata } from "next";
import { site } from "@/config/site";
import { languageAlternates, localePath } from "@/lib/i18n-paths";
import { locale } from "@/lib/locale";
import type { Journey } from "@/types/content";

export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const images = image ? [{ url: image, width: 2000, height: 1250 }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: path, languages: languageAlternates(path) },
    openGraph: { title, description, url: path, ...(images && { images }) },
    twitter: { title, description, ...(images && { images: images.map((i) => i.url) }) },
  };
}

export function travelAgencyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.name,
    url: `${site.url}${localePath("/", locale)}`,
    description: site.description,
    email: site.contact.email,
    slogan: site.promise,
    areaServed: { "@type": "Country", name: "Namibia" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "The Hub Initiative HQ, Unit 10, Pietan Park, 13 Reger Street",
      addressLocality: "Windhoek",
      addressCountry: "NA",
    },
  };
}

export function journeyJsonLd(j: Journey) {
  const minPrice = Math.min(...j.styles.map((s) => s.fromUSD));
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: j.title,
    description: j.summary,
    url: `${site.url}${localePath(`/journeys/${j.slug}`, locale)}`,
    image: `${site.url}${j.hero.src}`,
    touristType: j.tags,
    provider: { "@type": "TravelAgency", name: site.name, url: site.url },
    offers: {
      "@type": "Offer",
      price: minPrice,
      priceCurrency: "USD",
      description: "Indicative 'from' price per person sharing",
      url: `${site.url}${localePath("/contact", locale)}`,
    },
    itinerary: {
      "@type": "ItemList",
      itemListElement: j.days.map((d) => ({
        "@type": "ListItem",
        position: d.day,
        name: `Day ${d.day}: ${d.title}`,
      })),
    },
  };
}

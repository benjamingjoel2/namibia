import type { Metadata } from "next";
import { site } from "@/config/site";
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
    alternates: { canonical: path },
    openGraph: { title, description, url: path, ...(images && { images }) },
    twitter: { title, description, ...(images && { images: images.map((i) => i.url) }) },
  };
}

export function travelAgencyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.name,
    url: site.url,
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
    url: `${site.url}/journeys/${j.slug}`,
    image: `${site.url}${j.hero.src}`,
    touristType: j.tags,
    provider: { "@type": "TravelAgency", name: site.name, url: site.url },
    offers: {
      "@type": "Offer",
      price: minPrice,
      priceCurrency: "USD",
      description: "Indicative 'from' price per person sharing",
      url: `${site.url}/contact`,
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

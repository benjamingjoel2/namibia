/** Brand settings. No phone, WhatsApp, social links or licence numbers (owner decision). */
export const site = {
  name: "Namib Light",
  promise: "Follow the light. Stay for the stars.",
  description:
    "Private journeys across Namibia: Sossusvlei's dunes at sunrise, Etosha's waterholes, the Skeleton Coast and some of the darkest skies on Earth. Self-drive, guided or fly-in.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://namiblight.tourground.com",
  locale: "en_GB",
  contact: {
    /** Business address: The Hub Initiative HQ, premium coworking in Windhoek. */
    address: ["The Hub Initiative HQ, Unit 10, Pietan Park", "13 Reger Street, Windhoek, Namibia"],
    email: "namiblight@tourground.com",
  },
} as const;

export const mainNav = [
  { label: "Destinations", href: "/destinations" },
  { label: "Journeys", href: "/journeys" },
  { label: "Night Sky", href: "/night-sky" },
  { label: "How to Travel", href: "/how-to-travel" },
  { label: "Our Story", href: "/our-story" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = [
  { label: "Destinations", href: "/destinations" },
  { label: "Journeys", href: "/journeys" },
  { label: "Night Sky", href: "/night-sky" },
  { label: "Waterhole Watch", href: "/waterhole-watch" },
  { label: "How to Travel", href: "/how-to-travel" },
  { label: "Cultures of Namibia", href: "/cultures" },
  { label: "Journal", href: "/journal" },
  { label: "Our Story", href: "/our-story" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const legalNav = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Booking terms", href: "/terms" },
  { label: "Cookie policy", href: "/cookies" },
  { label: "Accessibility statement", href: "/accessibility" },
] as const;

export const ctaLabel = "Plan Your Journey";

/** Brand settings. Everything marked PLACEHOLDER must be replaced before launch. */
export const site = {
  name: "Namib Light",
  legalName: "Namib Light Journeys (Pty) Ltd", // PLACEHOLDER
  promise: "Follow the light. Stay for the stars.",
  description:
    "Private journeys across Namibia: Sossusvlei's dunes at sunrise, Etosha's waterholes, the Skeleton Coast and some of the darkest skies on Earth. Self-drive, guided or fly-in.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://namib-light.vercel.app",
  locale: "en_GB",
  contact: {
    address: ["PLACEHOLDER Street 00", "Windhoek, Namibia"],
    email: "hello@namiblight.example",
    phone: "+264 00 000 0000",
    whatsapp: "+264 00 000 0000",
  },
  registration: "Namibia Tourism Board reg. no. PLACEHOLDER",
  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],
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
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Accessibility statement", href: "/accessibility" },
] as const;

export const ctaLabel = "Plan Your Journey";

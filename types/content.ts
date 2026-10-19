/**
 * Content types for Namib Light. Every page renders from typed data in /data,
 * so copy, distances and prices can be edited without touching components.
 */

/** An image slot. `srcNight` is shown instead when night mode is on. */
export type Img = {
  src: string;
  alt: string;
  srcNight?: string;
  altNight?: string;
  credit?: string;
};

export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type TravelStyle = "self-drive" | "guided" | "fly-in";

export type Vehicle =
  | "4x4-lodges"
  | "4x4-rooftop"
  | "sedan-ok"
  | "guided-vehicle"
  | "light-aircraft";

export type Interest =
  | "photography"
  | "wildlife"
  | "stars"
  | "culture"
  | "walking"
  | "desert"
  | "family";

export interface Destination {
  slug: string;
  name: string;
  /** Short region label shown above the name, e.g. "Namib-Naukluft". */
  region: string;
  /** One line for lists and cards. */
  tagline: string;
  /** Opening paragraphs in our voice. */
  intro: string[];
  hero: Img;
  detail: Img;
  bestLight: { sunrise: string; sunset: string; night?: string };
  bestMonths: Month[];
  bestMonthsNote: string;
  /** Editable estimate of the usual previous stop and the drive from it. */
  fromPrevious?: {
    from: string;
    km: number;
    gravelKm: number;
    hours: number;
    note?: string;
  };
  stayIds: string[];
  /** Position in the homepage (01)–(03) feature, if any. */
  featured?: 1 | 2 | 3;
}

export interface RouteDay {
  day: number;
  title: string;
  from: string;
  to: string;
  /** Road distance in km. 0 for rest days. Editable estimate. */
  distanceKm: number;
  /** How much of distanceKm is gravel. Tarmac is the rest. */
  gravelKm: number;
  driveHours: number;
  fuelStops: string[];
  vehicle: Vehicle;
  /** For fly-in days: approximate flying time. */
  flightMinutes?: number;
  sunrise?: string;
  sunset?: string;
  stargazing?: boolean;
  skyNote?: string;
  stayId?: string;
  activities: string[];
  note?: string;
}

export interface JourneyStyleOption {
  style: TravelStyle;
  /** Indicative per-person price in USD, sharing. */
  fromUSD: number;
  note: string;
}

export interface Journey {
  slug: string;
  title: string;
  summary: string;
  intro: string;
  hero: Img;
  days: RouteDay[];
  styles: JourneyStyleOption[];
  bestMonths: Month[];
  destinationSlugs: string[];
  tags: Interest[];
}

export type StayType = "camping" | "lodge" | "luxury-camp";

export interface Stay {
  id: string;
  /** Placeholder until real partners are confirmed. */
  name: string;
  destinationSlug: string;
  type: StayType;
  blurb: string;
  image: Img;
  darkSky?: boolean;
  floodlitWaterhole?: boolean;
}

export type EtoshaSeason = "dry" | "transition" | "green";

export interface EtoshaMonth {
  month: Month;
  season: EtoshaSeason;
  headline: string;
  wildlife: string;
  birds: string;
  waterholes: string;
  floodlit: string;
  weather: string;
  verify: boolean;
}

export interface SkyMonth {
  month: Month;
  headline: string;
  milkyWayCore: string;
  magellanicClouds: string;
  southernCross: string;
  alsoUp: string;
  nights: string;
  verify: boolean;
}

export interface Culture {
  slug: string;
  name: string;
  /** How people refer to themselves, where it differs. */
  selfName?: string;
  regions: string;
  overview: string[];
  history: string;
  visitWell: string[];
  partner: { name: string; type: "conservancy" | "community-run" | "cooperative" };
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: Img;
}

export interface Testimonial {
  quote: string;
  /** Kept as a placeholder until we have real, consented quotes. */
  attribution: string;
  placeholder: true;
}

export interface FaqItem {
  q: string;
  a: string[];
  category: "Before you go" | "On the road" | "Health & safety" | "Money" | "Booking";
  verify?: string;
}

export interface StyleProfile {
  style: TravelStyle;
  name: string;
  oneLine: string;
  goodFor: string[];
  harderIf: string[];
  pace: string;
  costIndex: 1 | 2 | 3;
  honestNote: string;
}

export interface ChooserOption {
  label: string;
  scores: Record<TravelStyle, number>;
}

export interface ChooserQuestion {
  id: string;
  question: string;
  options: ChooserOption[];
}

export interface JournalMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  hero: string;
  heroAlt: string;
  tags: string[];
}

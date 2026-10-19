import type { FaqItem } from "@/types/content";

/**
 * Practical answers. Anything with `verify` must be checked against the
 * named official source before launch and reviewed regularly.
 */
export const faqs: FaqItem[] = [
  {
    category: "Before you go",
    q: "Do I need a visa for Namibia?",
    a: [
      "Visa rules for many nationalities have changed recently. Since 2025, travellers from a number of countries that used to enter visa-free, including several in Europe and North America, need a visa, often available online or on arrival.",
      "Please check the current rules for your passport with official Namibian government sources before you book flights. We'll remind you, but we can't give immigration advice.",
    ],
    verify: "Verify against official Namibian government sources (Ministry of Home Affairs, Immigration, Safety and Security).",
  },
  {
    category: "Before you go",
    q: "When is the best time to visit?",
    a: [
      "It depends on what you want. The dry, cool months (roughly May to October) are best for Etosha's waterholes, comfortable days and the clearest night skies. Desert nights are cold.",
      "The green season (roughly December to March) brings dramatic skies, newborn animals, migrant birds and fewer visitors, along with heat, storms and some muddy roads. October and November are very hot.",
    ],
    verify: "Seasons vary with each year's rainfall.",
  },
  {
    category: "Before you go",
    q: "How hot, or cold, does it get?",
    a: [
      "Both, sometimes on the same day. In the desert, summer middays can pass 40 °C, while winter nights can drop close to freezing. The coast is cool and foggy all year.",
      "Pack layers: a warm jacket, a hat, sunscreen and good shoes for sand.",
    ],
  },
  {
    category: "Before you go",
    q: "Can we travel with children?",
    a: [
      "Yes, and Namibia can be wonderful for families: dunes to run down, animals at the water, enormous starry skies. We plan shorter driving days and lodges with family rooms and pools.",
      "Some lodges and activities have minimum ages, and malaria advice matters more for young children in the north. See our Namibia with Kids journey.",
    ],
  },
  {
    category: "On the road",
    q: "Is self-drive safe?",
    a: [
      "For a careful driver, generally yes. The main risk on Namibia's roads isn't crime but driving too fast on gravel. Keep to around 80 km/h on gravel, slow down for corners and crests, and never drive at night.",
      "We give every self-drive guest a briefing, a road book, a vehicle with two spare tyres, and a phone number answered 24 hours a day.",
    ],
  },
  {
    category: "On the road",
    q: "How bad are the gravel roads?",
    a: [
      "Mostly they're good: wide, graded and empty. But conditions vary with weather and maintenance, and corrugations, loose patches and sand can catch drivers out.",
      "We tell you honestly how much of each day is gravel. You'll see it on every journey's route planner.",
    ],
  },
  {
    category: "On the road",
    q: "Which side of the road do they drive on?",
    a: ["The left, as in the UK and southern Africa. Most rental vehicles are manual; ask us early if you need an automatic."],
  },
  {
    category: "On the road",
    q: "Do I need a 4x4? What about a rooftop tent?",
    a: [
      "For most of our routes, we recommend a 4x4 with high clearance. It's more comfortable and safer on gravel, and some stretches (the last 5 km to Sossusvlei, parts of Damaraland and Kaokoland) need it.",
      "A rooftop tent is fun and cheaper, with campsites in beautiful places. But setting up camp every evening is work. Many guests mix camping and lodge nights.",
    ],
  },
  {
    category: "On the road",
    q: "How far apart are fuel stations?",
    a: [
      "Sometimes 200 km or more. Fill up whenever you pass a station, even at half a tank. Each journey's route planner lists the fuel stops.",
      "Some rural stations take cash only, or run out occasionally. Carry some cash.",
    ],
  },
  {
    category: "On the road",
    q: "Will I have phone signal and Wi-Fi?",
    a: [
      "In towns and along main roads, usually. In much of the desert and the far north, no. Most lodges have Wi-Fi, often slow. A local SIM is cheap and useful.",
      "We'll give you offline maps and a satellite option for remote routes.",
    ],
  },
  {
    category: "Health & safety",
    q: "Is there malaria?",
    a: [
      "Malaria is present in parts of northern Namibia, mainly the far north and north-east (including the Zambezi Region and Kavango), with higher risk in the rainy season. Etosha is generally considered lower risk. The south, the desert and the coast are generally considered malaria-free.",
      "Talk to a travel-health clinic before you go about whether you need antimalarials for your route and season.",
    ],
    verify: "Verify current advice with a travel-health clinic and official health sources.",
  },
  {
    category: "Health & safety",
    q: "What about the heat and sun?",
    a: ["Drink more water than you think, walk dunes early, rest at midday, and wear a hat. In the hottest months we plan around the heat, not through it."],
  },
  {
    category: "Money",
    q: "Which currency should I bring? Can I use cards?",
    a: [
      "The Namibian dollar (N$) is pegged to the South African rand, and rand are accepted almost everywhere. Cards work in towns and most lodges; carry some cash for fuel, park fees at some gates, and small purchases.",
      "Our prices are shown in US dollars, with an indicative conversion you can switch in the footer.",
    ],
  },
  {
    category: "Money",
    q: "What are park fees?",
    a: [
      "National parks such as Etosha and Namib-Naukluft (for Sossusvlei) charge daily conservation fees per person and per vehicle. Rates change from time to time.",
      "On our journeys, park fees are either included or clearly listed in your quote.",
    ],
    verify: "Verify current fees with the Namibia Wildlife Resorts / Ministry of Environment.",
  },
  {
    category: "Money",
    q: "Should I tip?",
    a: [
      "Tipping is customary and appreciated, especially for guides, trackers and lodge staff. We'll send you a simple guide with suggested amounts before you travel.",
      "At fuel stations, a small tip for the attendant who fills your tank and cleans your windscreen is normal.",
    ],
  },
  {
    category: "Booking",
    q: "What deposit do you take, and what if I need to cancel?",
    a: [
      "PLACEHOLDER: deposit amount, balance due date and cancellation terms to be confirmed. Our full terms will be on the Terms page.",
      "We strongly recommend travel insurance that covers cancellation, medical care and evacuation.",
    ],
  },
  {
    category: "Booking",
    q: "Is every journey private?",
    a: ["Yes. Self-drive journeys are yours alone; guided and fly-in journeys are private unless you ask us to join a small group."],
  },
  {
    category: "Booking",
    q: "Can you change a journey?",
    a: ["Always. The journeys on this site are starting points. Tell us what you'd change: longer, slower, more stars, fewer miles."],
  },
];

import type { Journey, RouteDay, Vehicle } from "@/types/content";

/**
 * Journeys with day-by-day route data. Every distance, gravel share and
 * driving time is an editable ESTIMATE: check against current road reports
 * before quoting. Prices are indicative "from" USD per person sharing.
 */

type DayOpts = Partial<Omit<RouteDay, "day" | "title" | "from" | "to">>;

/** A driving day. */
function drive(day: number, title: string, from: string, to: string, km: number, gravelKm: number, hours: number, vehicle: Vehicle, o: DayOpts = {}): RouteDay {
  return { day, title, from, to, distanceKm: km, gravelKm, driveHours: hours, fuelStops: [], vehicle, activities: [], ...o };
}

/** A day based in one place (local drives only). */
function stay(day: number, title: string, at: string, vehicle: Vehicle, o: DayOpts = {}): RouteDay {
  return { day, title, from: at, to: at, distanceKm: 0, gravelKm: 0, driveHours: 0, fuelStops: [], vehicle, activities: [], ...o };
}

/** A flying day between camps. */
function fly(day: number, title: string, from: string, to: string, minutes: number, o: DayOpts = {}): RouteDay {
  return { day, title, from, to, distanceKm: 0, gravelKm: 0, driveHours: 0, fuelStops: [], vehicle: "light-aircraft", flightMinutes: minutes, activities: [], ...o };
}

const V: Vehicle = "4x4-lodges";

export const journeys: Journey[] = [
  {
    slug: "namibia-first-light",
    title: "Namibia, First Light",
    summary: "Sossusvlei, Swakopmund, Damaraland and Etosha: the great loop, timed for the light.",
    intro:
      "Our signature first journey. Dawn on the dunes, a cool breath of the coast, elephants in Damaraland's riverbeds and three nights around Etosha's waterholes. Twelve days, with no single drive over six hours until the last.",
    hero: { src: "/images/journey-first-light.jpg", alt: "Placeholder: dunes at first light" },
    bestMonths: [4, 5, 6, 7, 8, 9, 10],
    destinationSlugs: ["windhoek", "sossusvlei", "swakopmund", "damaraland", "twyfelfontein", "etosha"],
    tags: ["photography", "wildlife", "desert", "stars"],
    styles: [
      { style: "self-drive", fromUSD: 3950, note: "Fully equipped 4x4, lodges, a detailed road book and a 24-hour line." },
      { style: "guided", fromUSD: 7900, note: "A private guide and vehicle for the whole route. You never touch a map." },
      { style: "fly-in", fromUSD: 11800, note: "Light aircraft between camps. Twelve days become a series of short hops." },
    ],
    days: [
      drive(1, "Arrive in Windhoek", "Hosea Kutako Airport", "Windhoek", 45, 0, 0.75, V, {
        fuelStops: ["Windhoek"],
        sunset: "A quiet hill on the city's edge, if you land in time.",
        stayId: "acacia-house",
        activities: ["Collect the car and a route briefing", "Early dinner"],
      }),
      drive(2, "Into the Namib", "Windhoek", "Sossusvlei (Sesriem)", 330, 240, 5, V, {
        fuelStops: ["Rehoboth", "Sesriem"],
        sunset: "Elim Dune, a short drive from the gate.",
        stargazing: true,
        skyNote: "First night of real dark. Walk ten steps from the lodge lights.",
        stayId: "red-sands",
        activities: ["Spreetshoogte or Remhoogte pass", "Sesriem Canyon in the late afternoon"],
        note: "Fill up in Rehoboth. Gravel from there on.",
      }),
      drive(3, "Sossusvlei & Deadvlei", "Sesriem", "Sesriem", 130, 10, 2.5, V, {
        fuelStops: ["Sesriem"],
        sunrise: "At the gate when it opens, then on to Deadvlei. The pan lights up while the dunes are still in shade.",
        sunset: "Back to Elim, or sundowners from the lodge.",
        stargazing: true,
        stayId: "red-sands",
        activities: ["Deadvlei walk", "Optional climb of Big Daddy", "Midday rest"],
        note: "The last 5 km to Sossusvlei are deep sand: use the park shuttle or engage 4x4 and drop tyre pressure.",
      }),
      drive(4, "To the coast", "Sesriem", "Swakopmund", 340, 300, 5, V, {
        fuelStops: ["Solitaire", "Walvis Bay"],
        sunset: "The jetty, as the fog lifts.",
        stayId: "fog-line",
        activities: ["Solitaire stop", "Kuiseb and Gaub passes", "Tropic of Capricorn sign"],
      }),
      drive(5, "Lagoon and dunes", "Swakopmund", "Swakopmund", 70, 0, 1, V, {
        fuelStops: ["Swakopmund"],
        sunrise: "Walvis Bay lagoon as the flamingos feed.",
        stayId: "fog-line",
        activities: ["Optional guided Sandwich Harbour 4x4 trip", "Cafés and a slow afternoon"],
      }),
      drive(6, "North to Damaraland", "Swakopmund", "Damaraland", 350, 220, 5, V, {
        fuelStops: ["Henties Bay", "Uis"],
        sunset: "The ridge behind the lodge: table mountains turn red.",
        stargazing: true,
        stayId: "granite-valley",
        activities: ["Salt road along the coast", "Brandberg on the skyline"],
        note: "Uis is the last reliable fuel. Fill up even if half full.",
      }),
      drive(7, "Elephants and engravings", "Damaraland", "Damaraland", 80, 80, 3, V, {
        fuelStops: [],
        sunrise: "In the riverbed with a local tracker, when the elephants are moving.",
        sunset: "Organ Pipes and Burnt Mountain.",
        stargazing: true,
        stayId: "granite-valley",
        activities: ["Desert-adapted elephant tracking (guided)", "Twyfelfontein engravings with a community guide"],
      }),
      drive(8, "To Etosha", "Damaraland", "Etosha (Okaukuejo)", 300, 90, 4.5, V, {
        fuelStops: ["Khorixas", "Outjo", "Okaukuejo"],
        sunset: "In camp by sunset. Gate times are strict.",
        stargazing: true,
        skyNote: "Then the floodlit waterhole, with a warm layer.",
        stayId: "pans-edge",
        activities: ["Afternoon drive to the first waterholes", "Floodlit waterhole after dinner"],
      }),
      drive(9, "Etosha's west and centre", "Okaukuejo", "Okaukuejo", 120, 120, 5, V, {
        fuelStops: ["Okaukuejo"],
        sunrise: "Gate opening, then the nearest waterhole before the dust rises.",
        sunset: "The pan's edge, gold and white.",
        stargazing: true,
        stayId: "pans-edge",
        activities: ["Long game drive with a midday rest", "Floodlit waterhole"],
        note: "Speed limit inside the park is 60 km/h. Drive slower; you'll see more.",
      }),
      drive(10, "Across the park", "Okaukuejo", "Etosha east (Namutoni)", 140, 140, 5, V, {
        fuelStops: ["Halali", "Namutoni"],
        sunrise: "Waterholes on the way east.",
        stayId: "pans-edge",
        activities: ["Halali waterholes", "Fischer's Pan in the afternoon"],
      }),
      drive(11, "Back to Windhoek", "Namutoni", "Windhoek", 530, 0, 6, V, {
        fuelStops: ["Tsumeb", "Otjiwarongo", "Okahandja"],
        stayId: "acacia-house",
        activities: ["Okahandja craft market"],
        note: "The longest day, all good tarmac. Or fly from the nearest airstrip: ask us.",
      }),
      drive(12, "Depart", "Windhoek", "Hosea Kutako Airport", 45, 0, 0.75, V, {
        fuelStops: ["Windhoek"],
        activities: ["Return the car at the airport"],
      }),
    ],
  },

  {
    slug: "classic-self-drive",
    title: "The Classic Self-Drive",
    summary: "Two weeks at your own pace: Kalahari, dunes, coast, granite, elephants and Etosha.",
    intro:
      "For confident drivers who want time. Fourteen days, a 4x4 with a rooftop tent or lodge nights, and a route with breathing room: no driving day over five and a half hours on gravel.",
    hero: { src: "/images/journey-classic-self-drive.jpg", alt: "Placeholder: a 4x4 on a gravel road" },
    bestMonths: [4, 5, 6, 7, 8, 9, 10],
    destinationSlugs: ["windhoek", "kalahari", "sossusvlei", "swakopmund", "spitzkoppe", "damaraland", "etosha"],
    tags: ["desert", "wildlife", "stars", "walking"],
    styles: [
      { style: "self-drive", fromUSD: 2900, note: "Rooftop-tent 4x4 and campsites, or upgrade any night to a lodge." },
      { style: "guided", fromUSD: 6900, note: "The same route with a private guide." },
    ],
    days: [
      drive(1, "Arrive in Windhoek", "Hosea Kutako Airport", "Windhoek", 45, 0, 0.75, "4x4-rooftop", { fuelStops: ["Windhoek"], stayId: "acacia-house", activities: ["Vehicle handover: tent, fridge, two spare tyres"] }),
      drive(2, "Into the Kalahari", "Windhoek", "Kalahari", 270, 20, 3, "4x4-rooftop", {
        fuelStops: ["Rehoboth", "Mariental"],
        sunset: "On a red dune crest, grass glowing.",
        stargazing: true,
        stayId: "red-grass",
        activities: ["Afternoon dune walk"],
      }),
      drive(3, "West to the dunes", "Kalahari", "Sossusvlei (Sesriem)", 330, 200, 4.5, "4x4-rooftop", {
        fuelStops: ["Mariental", "Maltahöhe", "Sesriem"],
        sunset: "Elim Dune.",
        stargazing: true,
        stayId: "red-sands",
        activities: ["Sesriem Canyon"],
      }),
      drive(4, "Sossusvlei & Deadvlei", "Sesriem", "Sesriem", 130, 10, 2.5, "4x4-rooftop", {
        fuelStops: ["Sesriem"],
        sunrise: "Through the gate at opening; Deadvlei within the hour.",
        stargazing: true,
        stayId: "red-sands",
        activities: ["Deadvlei", "Dune 45 on the way out"],
        note: "Drop tyre pressure for the final sand stretch, or take the shuttle.",
      }),
      drive(5, "To the coast", "Sesriem", "Swakopmund", 340, 300, 5, "4x4-rooftop", { fuelStops: ["Solitaire", "Walvis Bay"], stayId: "fog-line", activities: ["Kuiseb Canyon viewpoint"] }),
      stay(6, "Swakopmund", "Swakopmund", "4x4-rooftop", { sunrise: "Walvis Bay lagoon.", stayId: "fog-line", activities: ["Rest day: laundry, restock, seafood"] }),
      drive(7, "Granite and stars", "Swakopmund", "Spitzkoppe", 150, 40, 2, "4x4-rooftop", {
        fuelStops: ["Swakopmund", "Usakos"],
        sunset: "West faces of the granite.",
        stargazing: true,
        skyNote: "The rock arch frames the Milky Way on moonless nights.",
        activities: ["Community campsite among the boulders", "Rock-art walk with a local guide"],
      }),
      drive(8, "To Damaraland", "Spitzkoppe", "Damaraland", 270, 200, 4, "4x4-rooftop", {
        fuelStops: ["Uis"],
        stargazing: true,
        stayId: "granite-valley",
        activities: ["Brandberg viewpoint"],
      }),
      stay(9, "Elephants and engravings", "Damaraland", "4x4-rooftop", {
        sunrise: "Riverbeds with a tracker.",
        stargazing: true,
        stayId: "granite-valley",
        activities: ["Elephant tracking (guided)", "Twyfelfontein"],
      }),
      drive(10, "To Etosha", "Damaraland", "Etosha (Okaukuejo)", 300, 90, 4.5, "4x4-rooftop", {
        fuelStops: ["Khorixas", "Outjo"],
        stargazing: true,
        skyNote: "Floodlit waterhole.",
        stayId: "pans-edge",
        activities: ["Afternoon game drive"],
      }),
      drive(11, "Etosha", "Okaukuejo", "Okaukuejo", 120, 120, 5, "4x4-rooftop", { fuelStops: ["Okaukuejo"], sunrise: "Gate opening.", stargazing: true, stayId: "pans-edge", activities: ["Waterholes"] }),
      drive(12, "Across the park", "Okaukuejo", "Etosha east (Namutoni)", 140, 140, 5, "4x4-rooftop", { fuelStops: ["Halali", "Namutoni"], stayId: "pans-edge", activities: ["Halali", "Fischer's Pan"] }),
      drive(13, "South to Windhoek", "Namutoni", "Windhoek", 530, 0, 6, "4x4-rooftop", {
        fuelStops: ["Tsumeb", "Otjiwarongo"],
        stayId: "acacia-house",
        note: "Long but easy. Break it at Otjiwarongo if you like.",
      }),
      drive(14, "Depart", "Windhoek", "Hosea Kutako Airport", 45, 0, 0.75, "4x4-rooftop", { fuelStops: [], activities: ["Return the vehicle"] }),
    ],
  },

  {
    slug: "skeleton-coast-by-air",
    title: "Skeleton Coast by Air",
    summary: "Dunes, a fogbound coast and the Kunene River, linked by light aircraft.",
    intro:
      "Eight days, with no gravel roads at all. Small planes carry you from the dunes to the far north coast and on to the Kunene. The flights are part of the journey: the shipwrecks and the dune sea are best seen from above.",
    hero: { src: "/images/journey-skeleton-coast-air.jpg", alt: "Placeholder: a light aircraft over the desert" },
    bestMonths: [9, 10, 11, 12, 1, 2, 3, 4, 5],
    destinationSlugs: ["windhoek", "namibrand", "sossusvlei", "skeleton-coast", "kaokoland"],
    tags: ["photography", "desert", "stars"],
    styles: [{ style: "fly-in", fromUSD: 14500, note: "All flights, camps, guided activities and park fees." }],
    days: [
      drive(1, "Arrive in Windhoek", "Hosea Kutako Airport", "Windhoek", 45, 0, 0.75, "guided-vehicle", { stayId: "acacia-house", activities: ["Met at the airport"] }),
      fly(2, "Fly to the dunes", "Windhoek (Eros)", "NamibRand", 75, {
        sunset: "Gravel plains below the camp.",
        stargazing: true,
        skyNote: "Dark Sky Reserve. Sleep out under the stars.",
        stayId: "dune-edge",
        activities: ["Afternoon nature drive"],
      }),
      stay(3, "Sossusvlei from the air and on foot", "NamibRand", "guided-vehicle", {
        sunrise: "Guided to Deadvlei for first light.",
        stargazing: true,
        stayId: "dune-edge",
        activities: ["Deadvlei with a guide", "Optional scenic flight over the dune sea"],
      }),
      fly(4, "Up the coast", "NamibRand", "Skeleton Coast", 180, {
        sunset: "Inland, where the fog breaks.",
        stargazing: true,
        stayId: "shipwreck-camp",
        activities: ["Low-level coastal flight (weather permitting)", "Shipwrecks and seal colonies"],
      }),
      stay(5, "The Skeleton Coast", "Skeleton Coast", "guided-vehicle", {
        sunrise: "Fog on the dunes.",
        stargazing: true,
        stayId: "shipwreck-camp",
        activities: ["Dry riverbeds and desert-adapted wildlife", "Clay castles"],
      }),
      fly(6, "To the Kunene", "Skeleton Coast", "Kunene River", 60, {
        sunset: "On the river, with the Angolan hills opposite.",
        stayId: "kunene-camp",
        activities: ["Boat trip on the river"],
      }),
      stay(7, "Kunene", "Kunene River", "guided-vehicle", {
        sunrise: "River mist and birdsong.",
        stargazing: true,
        stayId: "kunene-camp",
        activities: ["Community-guided visit arranged with consent (see Cultures)", "Walk to a viewpoint"],
      }),
      fly(8, "Fly to Windhoek", "Kunene River", "Windhoek (Eros)", 150, { activities: ["Connect to international flights"] }),
    ],
  },

  {
    slug: "dunes-and-dark-skies",
    title: "Dunes & Dark Skies",
    summary: "A week in the NamibRand and Sossusvlei, planned around the new moon.",
    intro:
      "Seven days, three of them in an International Dark Sky Reserve. We set the dates around the new moon, add a night-sky guide and a telescope, and leave the days for slow walks and sunrise on the dunes.",
    hero: { src: "/images/journey-dunes-dark-skies.jpg", alt: "Placeholder: the Milky Way over a dune and a camelthorn tree" },
    bestMonths: [4, 5, 6, 7, 8, 9],
    destinationSlugs: ["windhoek", "namibrand", "sossusvlei"],
    tags: ["stars", "desert", "photography", "walking"],
    styles: [
      { style: "self-drive", fromUSD: 3600, note: "4x4 and lodges; we'll time it to the new moon." },
      { style: "guided", fromUSD: 6200, note: "Private guide, plus a night-sky guide in the reserve." },
      { style: "fly-in", fromUSD: 7900, note: "Fly to the reserve; no long drives." },
    ],
    days: [
      drive(1, "Arrive in Windhoek", "Hosea Kutako Airport", "Windhoek", 45, 0, 0.75, V, { stayId: "acacia-house" }),
      drive(2, "To the NamibRand", "Windhoek", "NamibRand", 390, 270, 6, V, {
        fuelStops: ["Rehoboth", "Maltahöhe"],
        sunset: "Arrive with the mountains turning violet.",
        stargazing: true,
        stayId: "dune-edge",
        note: "A long gravel day; leave early. The fly-in option skips it.",
      }),
      stay(3, "Under the stars", "NamibRand", V, {
        sunrise: "Walk out into the grass between the dunes.",
        stargazing: true,
        skyNote: "Telescope session with a night-sky guide: Magellanic Clouds, Omega Centauri, the Jewel Box.",
        stayId: "dune-edge",
        activities: ["Guided walk", "Night-sky session"],
      }),
      stay(4, "Sleep out", "NamibRand", V, {
        sunset: "Sundowners on a dune.",
        stargazing: true,
        skyNote: "A night on a bedroll under the open sky.",
        stayId: "dune-edge",
        activities: ["Astrophotography workshop (optional)"],
      }),
      drive(5, "North to Sesriem", "NamibRand", "Sossusvlei (Sesriem)", 100, 100, 1.75, V, {
        fuelStops: ["Sesriem"],
        sunset: "Elim Dune.",
        stargazing: true,
        stayId: "red-sands",
        activities: ["Sesriem Canyon"],
      }),
      drive(6, "Sossusvlei & Deadvlei", "Sesriem", "Sesriem", 130, 10, 2.5, V, {
        sunrise: "Deadvlei at first light.",
        stargazing: true,
        skyNote: "Last dark night: lie back on the lodge deck and find the Southern Cross.",
        stayId: "red-sands",
        activities: ["Deadvlei", "Big Daddy"],
      }),
      drive(7, "Back to Windhoek", "Sesriem", "Windhoek", 330, 240, 5, V, { fuelStops: ["Sesriem", "Rehoboth"], note: "Or fly from the Sossusvlei airstrip." }),
    ],
  },

  {
    slug: "etosha-and-the-zambezi",
    title: "Etosha & the Zambezi",
    summary: "From the white pan to green rivers: the wildlife journey.",
    intro:
      "Twelve days for wildlife. Four nights around Etosha's waterholes, then east along the rivers of the Kavango and Zambezi Region for boats, hippo, buffalo and hundreds of birds. Almost all of it is on tarmac.",
    hero: { src: "/images/journey-etosha-zambezi.jpg", alt: "Placeholder: a river winding through floodplain" },
    bestMonths: [5, 6, 7, 8, 9, 10],
    destinationSlugs: ["windhoek", "etosha", "zambezi"],
    tags: ["wildlife", "photography"],
    styles: [
      { style: "self-drive", fromUSD: 4200, note: "Mostly tarmac; a 4x4 for the river parks." },
      { style: "guided", fromUSD: 8400, note: "Private guide and vehicle throughout." },
      { style: "fly-in", fromUSD: 11200, note: "Fly between Etosha and the rivers." },
    ],
    days: [
      drive(1, "Arrive in Windhoek", "Hosea Kutako Airport", "Windhoek", 45, 0, 0.75, V, { stayId: "acacia-house" }),
      drive(2, "North to Etosha", "Windhoek", "Etosha (Okaukuejo)", 430, 0, 5, V, {
        fuelStops: ["Okahandja", "Otjiwarongo", "Outjo"],
        stargazing: true,
        skyNote: "Floodlit waterhole.",
        stayId: "pans-edge",
      }),
      drive(3, "Etosha west", "Okaukuejo", "Okaukuejo", 120, 120, 5, V, { sunrise: "Gate opening.", stargazing: true, stayId: "pans-edge", activities: ["Waterholes"] }),
      drive(4, "Across the park", "Okaukuejo", "Namutoni", 140, 140, 5, V, { fuelStops: ["Halali"], stayId: "pans-edge" }),
      drive(5, "Etosha east", "Namutoni", "Namutoni", 100, 100, 4, V, { sunrise: "Fischer's Pan.", stayId: "pans-edge", activities: ["Waterholes", "Fort at Namutoni"] }),
      drive(6, "To the Kavango", "Namutoni", "Rundu", 360, 0, 4.5, V, {
        fuelStops: ["Tsumeb", "Grootfontein", "Rundu"],
        sunset: "Over the Kavango River, with Angola on the far bank.",
        activities: ["Riverside lodge (placeholder)"],
      }),
      drive(7, "Downriver", "Rundu", "Divundu (Bwabwata)", 200, 0, 2.5, V, {
        fuelStops: ["Divundu"],
        sunset: "On the water.",
        activities: ["Popa Falls", "Sunset boat trip"],
      }),
      drive(8, "Mahango", "Divundu", "Divundu", 60, 40, 3, V, { sunrise: "Mahango floodplain.", activities: ["Game drive in Mahango", "Birding"] }),
      drive(9, "To the Kwando", "Divundu", "Kwando (Kongola)", 200, 0, 2.5, V, { fuelStops: ["Divundu", "Kongola"], stayId: "riverbend", activities: ["Afternoon boat trip"] }),
      drive(10, "Nkasa Rupara", "Kongola", "Kongola", 160, 120, 5, V, {
        sunrise: "Floodplain in mist.",
        stayId: "riverbend",
        activities: ["Full-day drive in a swampy, wild park"],
        note: "4x4 essential; tracks can flood. We'll check conditions the week before.",
      }),
      stay(11, "On the river", "Kwando", V, { sunrise: "From the deck.", sunset: "From a boat.", stayId: "riverbend", activities: ["Walking with a guide", "Boat trip"] }),
      drive(12, "Depart from Katima Mulilo", "Kongola", "Katima Mulilo", 120, 0, 1.5, V, {
        fuelStops: ["Katima Mulilo"],
        note: "Fly out, or continue to Victoria Falls (about three hours further).",
      }),
    ],
  },

  {
    slug: "the-deep-south",
    title: "The Deep South: Fish River & Kolmanskop",
    summary: "Kalahari, canyon, ghost town, wild horses and the NamibRand.",
    intro:
      "Ten days in the quiet south, where few travellers go. Red Kalahari grass, the scale of Fish River Canyon, a diamond town full of sand, and a long scenic drive north to the dark skies of the NamibRand.",
    hero: { src: "/images/journey-deep-south.jpg", alt: "Placeholder: Fish River Canyon at dusk" },
    bestMonths: [4, 5, 6, 7, 8, 9],
    destinationSlugs: ["windhoek", "kalahari", "fish-river-canyon", "luderitz", "namibrand", "sossusvlei"],
    tags: ["desert", "photography", "walking", "stars"],
    styles: [
      { style: "self-drive", fromUSD: 3700, note: "4x4 and lodges; long, quiet roads." },
      { style: "guided", fromUSD: 7400, note: "Private guide throughout." },
    ],
    days: [
      drive(1, "Arrive in Windhoek", "Hosea Kutako Airport", "Windhoek", 45, 0, 0.75, V, { stayId: "acacia-house" }),
      drive(2, "Into the Kalahari", "Windhoek", "Kalahari", 270, 20, 3, V, { fuelStops: ["Rehoboth", "Mariental"], sunset: "Dune crest.", stargazing: true, stayId: "red-grass" }),
      drive(3, "South to the canyon", "Kalahari", "Fish River Canyon", 400, 80, 5, V, {
        fuelStops: ["Mariental", "Keetmanshoop"],
        sunset: "The rim, as the layers turn copper.",
        stargazing: true,
        stayId: "canyon-rim",
        activities: ["Quiver tree forest near Keetmanshoop"],
      }),
      drive(4, "Canyon day", "Hobas", "Hobas", 140, 140, 3, V, {
        sunrise: "Main viewpoint.",
        stargazing: true,
        stayId: "canyon-rim",
        activities: ["Rim walk", "Ai-Ais hot springs"],
      }),
      drive(5, "West to Lüderitz", "Fish River Canyon", "Lüderitz", 370, 110, 4.5, V, {
        fuelStops: ["Seeheim", "Aus", "Lüderitz"],
        sunset: "Lüderitz peninsula.",
        stayId: "harbour-house",
        activities: ["Wild horses near Aus"],
      }),
      drive(6, "Kolmanskop", "Lüderitz", "Lüderitz", 60, 40, 2, V, {
        sunrise: "Inside Kolmanskop with a photo permit.",
        stayId: "harbour-house",
        activities: ["Ghost town tour", "Peninsula drive", "Oysters"],
      }),
      drive(7, "The scenic road north", "Lüderitz", "NamibRand", 350, 250, 5.5, V, {
        fuelStops: ["Aus", "Helmeringhausen"],
        stargazing: true,
        stayId: "dune-edge",
        note: "Fuel at Helmeringhausen; there's little after it.",
      }),
      stay(8, "Under the stars", "NamibRand", V, { sunrise: "Walk out from camp.", stargazing: true, skyNote: "Night-sky session.", stayId: "dune-edge" }),
      drive(9, "To Sossusvlei", "NamibRand", "Sossusvlei (Sesriem)", 100, 100, 1.75, V, { fuelStops: ["Sesriem"], sunset: "Elim Dune.", stargazing: true, stayId: "red-sands" }),
      drive(10, "Deadvlei, then home", "Sesriem", "Windhoek", 460, 250, 7.5, V, {
        sunrise: "Deadvlei at first light.",
        fuelStops: ["Sesriem", "Rehoboth"],
        note: "A big last day. Or fly from the Sossusvlei airstrip: ask us.",
      }),
    ],
  },

  {
    slug: "photographers-namibia",
    title: "Photographer's Namibia",
    summary: "Every sunrise and sunset in the right place, with time to go back.",
    intro:
      "Twelve days built backwards from the light. Two dawns at Deadvlei, guided access to Sandwich Harbour, the Spitzkoppe arch under the Milky Way, Damaraland's elephants and Etosha's floodlit waterholes. Dates are planned around the new moon.",
    hero: { src: "/images/journey-photographers.jpg", alt: "Placeholder: Deadvlei's trees against red dunes" },
    bestMonths: [5, 6, 7, 8, 9],
    destinationSlugs: ["windhoek", "sossusvlei", "swakopmund", "spitzkoppe", "damaraland", "etosha"],
    tags: ["photography", "stars", "wildlife", "desert"],
    styles: [
      { style: "self-drive", fromUSD: 4400, note: "Light-timed road book and photo permits arranged." },
      { style: "guided", fromUSD: 9200, note: "A photographer-guide, a vehicle with room for gear, and no rush." },
      { style: "fly-in", fromUSD: 13600, note: "Includes a doors-off scenic flight over the dune sea." },
    ],
    days: [
      drive(1, "Arrive in Windhoek", "Hosea Kutako Airport", "Windhoek", 45, 0, 0.75, V, { stayId: "acacia-house", activities: ["Gear check and route briefing"] }),
      drive(2, "To the dunes", "Windhoek", "Sossusvlei (inside the gate)", 330, 240, 5, V, {
        fuelStops: ["Rehoboth", "Sesriem"],
        sunset: "Elim Dune: long lens on the ridges.",
        stargazing: true,
        stayId: "red-sands",
      }),
      drive(3, "Deadvlei, first attempt", "Sesriem", "Sesriem", 130, 10, 2.5, V, {
        sunrise: "In Deadvlei before the sun hits the pan. Shoot the trees against shaded dunes.",
        sunset: "Dune 45's ridge line, from below.",
        stargazing: true,
        stayId: "red-sands",
      }),
      drive(4, "Deadvlei, second chance", "Sesriem", "Sesriem", 130, 10, 2.5, V, {
        sunrise: "Back to Deadvlei, or Big Daddy's crest for the overview.",
        sunset: "Sesriem Canyon rim.",
        stargazing: true,
        stayId: "red-sands",
        note: "The second morning is insurance against wind and haze.",
      }),
      drive(5, "To the coast", "Sesriem", "Swakopmund", 340, 300, 5, V, { fuelStops: ["Solitaire", "Walvis Bay"], sunset: "Jetty.", stayId: "fog-line" }),
      drive(6, "Sandwich Harbour", "Swakopmund", "Swakopmund", 120, 80, 5, "guided-vehicle", {
        sunrise: "Flamingos on the lagoon.",
        stayId: "fog-line",
        activities: ["Guided 4x4 to where the dunes meet the sea"],
        note: "Tide-dependent; we'll book the day that suits the tide.",
      }),
      drive(7, "Spitzkoppe", "Swakopmund", "Spitzkoppe", 150, 40, 2, V, {
        sunset: "West faces glowing orange.",
        stargazing: true,
        skyNote: "The rock arch and the Milky Way core (core best roughly May–September, verify).",
        activities: ["Arch at night"],
      }),
      drive(8, "To Damaraland", "Spitzkoppe", "Damaraland", 270, 200, 4, V, { fuelStops: ["Uis"], stargazing: true, stayId: "granite-valley" }),
      stay(9, "Elephants", "Damaraland", V, {
        sunrise: "Riverbed with a tracker. Side-light on dust.",
        sunset: "Table mountains.",
        stargazing: true,
        stayId: "granite-valley",
      }),
      drive(10, "To Etosha", "Damaraland", "Etosha (Okaukuejo)", 300, 90, 4.5, V, {
        fuelStops: ["Khorixas", "Outjo"],
        stargazing: true,
        skyNote: "Floodlit waterhole: bring a fast lens and a beanbag.",
        stayId: "pans-edge",
      }),
      drive(11, "Etosha", "Okaukuejo", "Okaukuejo", 120, 120, 5, V, { sunrise: "Gate opening.", sunset: "Pan's edge.", stargazing: true, stayId: "pans-edge" }),
      drive(12, "Back to Windhoek", "Okaukuejo", "Windhoek", 430, 0, 5, V, { fuelStops: ["Outjo", "Otjiwarongo"] }),
    ],
  },

  {
    slug: "namibia-with-kids",
    title: "Namibia with Kids",
    summary: "Short drives, pools, dunes to run down, and animals at the water.",
    intro:
      "Thirteen days with no driving day over six hours, and most under five. A pool most afternoons, dunes to run down, a boat with dolphins and seals, and Etosha's waterholes, where small children can see a lot without getting out of the car.",
    hero: { src: "/images/journey-kids.jpg", alt: "Placeholder: animals at a waterhole" },
    bestMonths: [4, 5, 6, 7, 8, 9, 10],
    destinationSlugs: ["windhoek", "kalahari", "sossusvlei", "swakopmund", "etosha"],
    tags: ["family", "wildlife", "desert", "stars"],
    styles: [
      { style: "self-drive", fromUSD: 3300, note: "Child-friendly lodges and family rooms; child prices on request." },
      { style: "guided", fromUSD: 6600, note: "A private guide who's good with children." },
    ],
    days: [
      drive(1, "Arrive in Windhoek", "Hosea Kutako Airport", "Windhoek", 45, 0, 0.75, V, { stayId: "acacia-house", activities: ["Child seats fitted to the car"] }),
      drive(2, "Into the Kalahari", "Windhoek", "Kalahari", 270, 20, 3, V, { fuelStops: ["Rehoboth", "Mariental"], sunset: "Dune crest.", stargazing: true, stayId: "red-grass" }),
      stay(3, "A slow day", "Kalahari", V, { sunrise: "Short dune walk.", stargazing: true, skyNote: "Easy first stargazing: find the Southern Cross.", stayId: "red-grass", activities: ["Pool", "Farm animals"] }),
      drive(4, "To the dunes", "Kalahari", "Sossusvlei (Sesriem)", 330, 200, 4.5, V, { fuelStops: ["Mariental", "Maltahöhe", "Sesriem"], stayId: "red-sands" }),
      drive(5, "Run down a dune", "Sesriem", "Sesriem", 130, 10, 2.5, V, {
        sunrise: "Early, before the sand gets hot.",
        stayId: "red-sands",
        activities: ["Dune climb and run down", "Sesriem Canyon in the shade"],
      }),
      drive(6, "To the coast", "Sesriem", "Swakopmund", 340, 300, 5, V, {
        fuelStops: ["Solitaire", "Walvis Bay"],
        stayId: "fog-line",
        activities: ["Apple pie in Solitaire"],
        note: "The longest gravel day. Several stops planned.",
      }),
      stay(7, "Little creatures", "Swakopmund", V, { stayId: "fog-line", activities: ["Guided Living Desert walk: geckos, chameleons, beetles"] }),
      drive(8, "Boat day", "Swakopmund", "Swakopmund", 70, 0, 1, V, { stayId: "fog-line", activities: ["Walvis Bay boat: seals, dolphins, pelicans"] }),
      drive(9, "Inland to Erongo", "Swakopmund", "Omaruru (Erongo)", 230, 0, 3, V, { fuelStops: ["Usakos", "Omaruru"], stargazing: true, activities: ["Farm lodge (placeholder)"] }),
      drive(10, "To Etosha", "Omaruru", "Etosha (Okaukuejo)", 290, 0, 3.5, V, { fuelStops: ["Outjo"], stargazing: true, skyNote: "Floodlit waterhole in pyjamas.", stayId: "pans-edge" }),
      drive(11, "Etosha", "Okaukuejo", "Okaukuejo", 100, 100, 4, V, { sunrise: "Gate opening.", stayId: "pans-edge", activities: ["Short morning and afternoon drives", "Pool at midday"] }),
      drive(12, "Back to Windhoek", "Okaukuejo", "Windhoek", 430, 0, 5, V, { fuelStops: ["Outjo", "Otjiwarongo"], stayId: "acacia-house" }),
      drive(13, "Depart", "Windhoek", "Hosea Kutako Airport", 45, 0, 0.75, V),
    ],
  },
];

export const getJourney = (slug: string) => journeys.find((j) => j.slug === slug);
export const journeysFor = (destinationSlug: string) => journeys.filter((j) => j.destinationSlugs.includes(destinationSlug));

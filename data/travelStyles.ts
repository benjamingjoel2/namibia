import type { ChooserQuestion, StyleProfile, TravelStyle } from "@/types/content";

export const styleProfiles: StyleProfile[] = [
  {
    style: "self-drive",
    name: "Self-drive",
    oneLine: "Your car, your pace, our route.",
    goodFor: ["Confident drivers who enjoy the road", "Travellers who like freedom and long views", "Families who want their own space", "Longer trips on a sensible budget"],
    harderIf: ["You've never driven on gravel or on the left", "You'd rather not change a tyre in the heat", "You have less than ten days"],
    pace: "Typically 3–5 hours of driving on travel days, often on gravel. Rest days built in.",
    costIndex: 1,
    honestNote:
      "Namibia has more gravel road than tarmac. It's not difficult, but it is tiring, and most accidents happen when people drive too fast on it. We'll tell you which car, which tyres, and where to fill up.",
  },
  {
    style: "guided",
    name: "Guided",
    oneLine: "A private guide drives; you watch.",
    goodFor: ["First-timers in Africa", "Wildlife and birding: guides see what you'd miss", "Photographers who want someone else watching the road", "Anyone who wants to switch off"],
    harderIf: ["You want long stretches of solitude as a couple", "You're on a tight budget"],
    pace: "The same distances as self-drive, but you're not the one at the wheel.",
    costIndex: 2,
    honestNote: "The guide matters more than the vehicle. We use a small group of guides we know well, and we'll introduce you before you book.",
  },
  {
    style: "fly-in",
    name: "Fly-in",
    oneLine: "Light aircraft between remote camps.",
    goodFor: ["Short trips with a lot to see", "The far north and the Skeleton Coast, where roads don't go", "Seeing the dune sea and coast from the air", "Travellers who dislike long drives"],
    harderIf: ["You're a nervous flier in small planes", "You need lots of luggage (soft bags, strict weight limits)", "You're on a budget"],
    pace: "Flights of 1–3 hours between camps; each camp's guides drive you locally.",
    costIndex: 3,
    honestNote: "Flying is the most expensive way to travel here, but it can turn a 12-day road trip into eight relaxed days. We often mix it: drive the south, fly the north.",
  },
];

export const chooserQuestions: ChooserQuestion[] = [
  {
    id: "gravel",
    question: "How do you feel about 400 km of gravel in a day?",
    options: [
      { label: "Sounds like an adventure", scores: { "self-drive": 3, guided: 1, "fly-in": 0 } },
      { label: "Fine, if someone else drives", scores: { "self-drive": 0, guided: 3, "fly-in": 1 } },
      { label: "I'd rather fly over it", scores: { "self-drive": 0, guided: 0, "fly-in": 3 } },
    ],
  },
  {
    id: "tyre",
    question: "Do you want to change your own tyre?",
    options: [
      { label: "I can, and I don't mind", scores: { "self-drive": 3, guided: 0, "fly-in": 0 } },
      { label: "I could, but I'd rather not", scores: { "self-drive": 1, guided: 2, "fly-in": 1 } },
      { label: "Absolutely not", scores: { "self-drive": 0, guided: 2, "fly-in": 2 } },
    ],
  },
  {
    id: "time",
    question: "Is your time short?",
    options: [
      { label: "Under 8 days", scores: { "self-drive": 0, guided: 1, "fly-in": 3 } },
      { label: "8 to 12 days", scores: { "self-drive": 2, guided: 2, "fly-in": 1 } },
      { label: "Two weeks or more", scores: { "self-drive": 3, guided: 1, "fly-in": 0 } },
    ],
  },
  {
    id: "wildlife",
    question: "How important is wildlife and expert interpretation?",
    options: [
      { label: "Nice to have; I'm here for landscapes", scores: { "self-drive": 2, guided: 0, "fly-in": 1 } },
      { label: "Important: I'd like someone to explain what we see", scores: { "self-drive": 0, guided: 3, "fly-in": 1 } },
    ],
  },
  {
    id: "budget",
    question: "Which matters more?",
    options: [
      { label: "Keeping costs sensible", scores: { "self-drive": 3, guided: 0, "fly-in": 0 } },
      { label: "A balance", scores: { "self-drive": 1, guided: 2, "fly-in": 1 } },
      { label: "Comfort and time, whatever it costs", scores: { "self-drive": 0, guided: 1, "fly-in": 3 } },
    ],
  },
];

/** Highest total wins; ties go to the less committal option (guided). */
export function recommendStyle(answers: Record<string, number>): { style: TravelStyle; scores: Record<TravelStyle, number> } {
  const scores: Record<TravelStyle, number> = { "self-drive": 0, guided: 0, "fly-in": 0 };
  for (const q of chooserQuestions) {
    const idx = answers[q.id];
    const opt = idx === undefined ? undefined : q.options[idx];
    if (!opt) continue;
    for (const k of Object.keys(scores) as TravelStyle[]) scores[k] += opt.scores[k];
  }
  const order: TravelStyle[] = ["guided", "self-drive", "fly-in"];
  const style = order.reduce((best, s) => (scores[s] > scores[best] ? s : best), order[0]);
  return { style, scores };
}

export const styleName: Record<TravelStyle, string> = { "self-drive": "Self-drive", guided: "Guided", "fly-in": "Fly-in" };

import type { TeamMember } from "@/types/content";

/** PLACEHOLDER team. Replace names, roles, bios and portraits. */
export const founder: TeamMember = {
  name: "Founder name to come",
  role: "Founder & journey designer",
  bio: "Placeholder bio. Grew up between Windhoek and a farm on the edge of the Namib, and has driven most of the country's gravel roads, many of them twice. Started Namib Light to plan the kind of trips friends kept asking for: unhurried, honest about distances, and always timed for the light.",
  image: { src: "/images/team-1.jpg", alt: "Placeholder portrait of the founder" },
};

export const team: TeamMember[] = [
  {
    name: "Team member name to come",
    role: "Head guide",
    bio: "Placeholder bio. A guide of many years who knows the Damaraland riverbeds and the elephants that use them. Reads tracks and weather better than any forecast.",
    image: { src: "/images/team-2.jpg", alt: "Placeholder portrait of the head guide" },
  },
  {
    name: "Team member name to come",
    role: "Night-sky guide",
    bio: "Placeholder bio. An amateur astronomer who brings a telescope, a red torch and endless patience to our camps in the NamibRand.",
    image: { src: "/images/team-3.jpg", alt: "Placeholder portrait of the night-sky guide" },
  },
  {
    name: "Team member name to come",
    role: "Self-drive planner",
    bio: "Placeholder bio. Plans every self-drive route, checks road reports each week and answers WhatsApp messages from the road.",
    image: { src: "/images/team-4.jpg", alt: "Placeholder portrait of the self-drive planner" },
  },
];

import { ArrowButton } from "@/components/ui/ArrowButton";
import { PageHero } from "@/components/ui/PageHero";

export default function NotFound() {
  return (
    <PageHero size="short" title="Off the map" subtitle="This page isn't here. Even the best road books have gaps." img={{ src: "/images/hero-legal.jpg", alt: "Placeholder: quiet dunes" }}>
      <ArrowButton href="/" tone="light">
        Back to the start
      </ArrowButton>
    </PageHero>
  );
}

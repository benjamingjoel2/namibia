import { LegalPage } from "@/components/ui/LegalPage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Accessibility statement", description: `How ${site.name} makes this website accessible, and how to tell us when it isn't.`, path: "/accessibility" });

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility" updated="PLACEHOLDER">
      <p>We want everyone to be able to plan a journey with us. This website aims to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.</p>
      <h2>What we&rsquo;ve done</h2>
      <ul>
        <li>Text and controls are designed for strong contrast in both day and night mode.</li>
        <li>Everything works with a keyboard, with visible focus, and with a &ldquo;skip to content&rdquo; link.</li>
        <li>Animations and parallax are switched off if your device asks for reduced motion.</li>
        <li>Content is visible even if JavaScript fails to load.</li>
        <li>Images have text alternatives; decorative images are hidden from screen readers.</li>
        <li>Interactive tools (the moon planner, the Etosha month slider, the travel-style chooser and the route planners) use standard form controls and announce their results.</li>
        <li>The planning form has labels on every field and explains errors next to the field they relate to.</li>
      </ul>
      <h2>Known limitations</h2>
      <ul>
        <li>Photographs are currently placeholders. Final images will be checked for alt text when they&rsquo;re added.</li>
        <li>PLACEHOLDER: results of an independent audit.</li>
      </ul>
      <h2>Tell us</h2>
      <p>
        If anything on this site is hard to use, email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or call {site.contact.phone}. We&rsquo;ll help you plan by email or phone in the meantime, and fix what we can.
      </p>
      <p>We also plan journeys for travellers with access needs. Tell us what you need, and we&rsquo;ll be honest about what&rsquo;s possible on Namibia&rsquo;s roads and in its camps.</p>
    </LegalPage>
  );
}

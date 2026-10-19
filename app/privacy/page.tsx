import { LegalPage } from "@/components/ui/LegalPage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Privacy notice", description: `How ${site.name} collects and uses your personal information.`, path: "/privacy" });

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy" updated="PLACEHOLDER">
      <p>
        <strong>This is a placeholder draft.</strong> It must be reviewed by a qualified adviser for Namibian law and for the laws of the countries our guests come from (for example the UK and EU GDPR) before launch.
      </p>
      <h2>Who we are</h2>
      <p>
        {site.legalName} (&ldquo;{site.name}&rdquo;, &ldquo;we&rdquo;), {site.contact.address.join(", ")}. Contact: {site.contact.email}.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>Details you give us in the planning form: travel dates, preferences, number and ages of travellers, budget, name, email, phone and notes.</li>
        <li>Booking details needed to arrange your trip, such as passport names and dietary or medical needs, only when you book.</li>
        <li>Basic technical data from your browser. Your theme (day/night) and currency choices are stored only on your own device.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiry and plan your journey.</li>
        <li>To make bookings with lodges, guides, airlines and vehicle providers on your behalf.</li>
        <li>We don&rsquo;t sell your data, and we don&rsquo;t send marketing unless you ask us to.</li>
      </ul>
      <h2>Who we share it with</h2>
      <p>Only the suppliers needed for your trip, and service providers that help us run the business (for example email and CRM tools), under appropriate agreements. PLACEHOLDER: list processors.</p>
      <h2>How long we keep it</h2>
      <p>PLACEHOLDER: retention periods for enquiries and bookings.</p>
      <h2>Your rights</h2>
      <p>You can ask to see, correct or delete your information, or object to how we use it. Email {site.contact.email}.</p>
    </LegalPage>
  );
}

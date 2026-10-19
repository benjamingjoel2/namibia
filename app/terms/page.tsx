import { LegalPage } from "@/components/ui/LegalPage";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Terms and conditions", description: `Booking terms for journeys with ${site.name}.`, path: "/terms" });

export default function TermsPage() {
  return (
    <LegalPage title="Terms" updated="PLACEHOLDER">
      <p>
        <strong>This is a placeholder draft.</strong> Final booking terms must be written and reviewed by a qualified adviser before any bookings are taken.
      </p>
      <h2>Who you&rsquo;re booking with</h2>
      <p>
        {site.legalName}, {site.contact.address.join(", ")}. {site.registration}.
      </p>
      <h2>Prices</h2>
      <p>Prices on this website are indicative &ldquo;from&rdquo; prices per person sharing, in US dollars. Converted prices use indicative exchange rates and are for guidance only. Your quote is the binding price.</p>
      <h2>Deposits and payment</h2>
      <p>PLACEHOLDER: deposit amount, when the balance is due, accepted payment methods.</p>
      <h2>Cancellations and changes</h2>
      <p>PLACEHOLDER: cancellation charges by notice period, changes by you, changes by us, and what happens if a supplier cancels.</p>
      <h2>Travel insurance</h2>
      <p>Comprehensive travel insurance, including cancellation, medical care and emergency evacuation, is a condition of booking.</p>
      <h2>Self-drive</h2>
      <p>PLACEHOLDER: driver requirements, licence rules, vehicle rental terms and responsibilities on the road.</p>
      <h2>Entry requirements</h2>
      <p>You are responsible for meeting passport, visa and health requirements. Rules change: check official Namibian government sources before you travel.</p>
      <h2>Complaints</h2>
      <p>Tell us straight away if something isn&rsquo;t right on your trip, so we can fix it. After you return, write to {site.contact.email}.</p>
    </LegalPage>
  );
}

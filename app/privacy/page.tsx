import Link from "next/link";
import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Privacy policy", description: "How Namib Light collects, uses and protects your personal information.", path: "/privacy" });

export default function Page() {
  return (
    <LegalPage title="Privacy policy" updated="30 October 2026" placeholder={false}>
      <h2>Who we are</h2>
      <p>Namib Light plans tailor-made journeys in Namibia. In this policy, “we”, “us” and “our” mean Namib Light, of The Hub Initiative HQ, Unit 10, Pietan Park, 13 Reger Street, Windhoek, Namibia. We are responsible for the personal information you share with us through this website.</p>
      <p>If you have any question about this policy or your information, email us at <a href="mailto:namiblight@tourground.com">namiblight@tourground.com</a>.</p>
      <h2>What we collect</h2>
      <p>We only collect what you choose to give us, and what we need to answer you and plan your trip:</p>
      <ul>
        <li>Contact details you enter in the planning form: your name, email address and, if you give it, a phone number and your country.</li>
        <li>Trip details: who is travelling, approximate dates, interests, travel style and anything else you tell us. Please only share health, dietary or accessibility information if you want us to take it into account.</li>
        <li>Messages and emails you send us, and our replies.</li>
        <li>If you go on to travel with us: the details our partners need to deliver your trip, such as passport names, dates of birth, flight details and emergency contacts.</li>
        <li>Basic technical information that any web server receives (such as your IP address, browser type and the pages requested), kept briefly in server logs for security and to keep the site running.</li>
      </ul>
      <h2>How we use it and why</h2>
      <ul>
        <li>To answer your enquiry and prepare a tailor-made proposal (steps you ask us to take before entering into a contract).</li>
        <li>To arrange and look after your trip if you book (performance of our contract with you).</li>
        <li>To send our newsletter or guide, only if you sign up for it (your consent, which you can withdraw at any time).</li>
        <li>To keep records we are required to keep, for example for accounting and tax (legal obligation).</li>
        <li>To keep the website secure and working (our legitimate interests).</li>
      </ul>
      <p>We do not sell your information, and we do not use it for automated decision-making or profiling.</p>
      <h2>Who we share it with</h2>
      <p>We only share your information where it is needed for the purposes above:</p>
      <ul>
        <li>With the lodges, camps, hotels, guides, drivers, airlines and other suppliers who deliver your trip, when you book.</li>
        <li>Our website host, which serves the site and keeps short-lived technical logs.</li>
        <li>Our email provider, which delivers your enquiry to us and our replies to you.</li>
        <li>With professional advisers or authorities where the law requires it.</li>
      </ul>
      <p>Some of these suppliers and service providers are outside the country you live in. Where we transfer your information internationally, we take steps to make sure it is protected to the standard required by law.</p>
      <h2>How long we keep it</h2>
      <p>We keep enquiries for up to two years after our last contact so we can pick up where we left off if you come back to us. If you travel with us, we keep booking records for as long as accounting and tax law requires (usually up to seven years). Newsletter details are kept until you unsubscribe.</p>
      <h2>Your rights</h2>
      <p>Depending on where you live, you have the right to ask for a copy of the information we hold about you, to have it corrected or deleted, to restrict or object to how we use it, to receive it in a portable format, and to withdraw your consent at any time. To use any of these rights, email <a href="mailto:namiblight@tourground.com">namiblight@tourground.com</a>. We will reply within one month.</p>
      <p>If you are unhappy with how we have handled your information, please tell us first so we can put it right. You can also complain to the data-protection authority where you live.</p>
      <h2>Security</h2>
      <p>Our website is served over an encrypted connection (HTTPS), and we limit access to your information to the people who need it to plan and run your trip.</p>
      <h2>Cookies and local storage</h2>
      <p>How this website uses cookies and your browser’s storage is explained in our <Link href="/cookies">Cookie Policy</Link>.</p>
      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. The date at the top of the page shows when it last changed.</p>
    </LegalPage>
  );
}

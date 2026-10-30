import Link from "next/link";
import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Cookie policy", description: "How the Namib Light website uses cookies and your browser’s local storage.", path: "/cookies" });

export default function Page() {
  return (
    <LegalPage title="Cookie policy" updated="30 October 2026" placeholder={false}>
      <h2>What cookies and local storage are</h2>
      <p>Cookies are small text files a website saves in your browser. Local storage is a similar feature that lets a website remember information on your own device. Neither is sent to us unless a page specifically reads it.</p>
      <h2>Cookies we use</h2>
      <p>This website does not set any cookies, and it does not use advertising or tracking cookies of any kind.</p>
      <h2>Local storage we use</h2>
      <p>We use your browser’s local storage only for features you choose to use:</p>
      <ul>
        <li>nl-theme (local storage): Remembers whether you chose the day or night look for the site. Kept until you clear your browser data.</li>
        <li>nl-currency (local storage): Remembers the display currency you chose for guide prices. Kept until you clear your browser data.</li>
      </ul>
      <p>This information stays on your device. It is not sent to us until you choose to submit the form.</p>
      <h2>Analytics and third parties</h2>
      <p>We do not use analytics, advertising or social-media tracking on this website. Photographs and fonts are served from our own website, so no third party receives information about your visit when you load a page.</p>
      <h2>Consent and how to withdraw it</h2>
      <p>Both items above are strictly necessary to remember choices you make, so they do not need your consent and there is no cookie banner. If we ever add analytics or other optional cookies, we will ask for your consent first and you will be able to change your choice at any time.</p>
      <p>You can remove anything this site has stored at any time by clearing your browser’s site data for this website (usually under Settings, then Privacy, then Cookies and site data), or by using a private browsing window. You can also block cookies and storage entirely in your browser settings; the site will still work, but a half-completed trip planner will not be remembered.</p>
      <h2>Questions</h2>
      <p>If you have any questions about this policy, email us at <a href="mailto:namiblight@tourground.com">namiblight@tourground.com</a>. Our <Link href="/privacy">Privacy Policy</Link> explains how we handle personal information.</p>
    </LegalPage>
  );
}

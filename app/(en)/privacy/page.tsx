// i18n-skip-strings: the copy comes from data/legal.json, written in full in every language.
import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { locale } from "@/lib/locale";
import { localePath } from "@/lib/i18n-paths";
import legal from "@/data/legal.json";

const doc = legal[locale].privacy;

export const metadata = pageMetadata({ title: doc.title, description: doc.title + ", Namib Light.", path: localePath("/privacy", locale) });

export default function Page() {
  return (
    <LegalPage title={doc.title} updated={doc.updated.replace(/^[^:]*:\s*/, "")} placeholder={false}>
      <div className="legal" dangerouslySetInnerHTML={{ __html: doc.html }} />
    </LegalPage>
  );
}

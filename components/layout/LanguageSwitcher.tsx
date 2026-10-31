"use client";
// i18n-skip-strings

import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_LABELS, localePath } from "@/lib/i18n-paths";
import { locale } from "@/lib/locale";

/** EN · FR · DE · ES. Plain links to the same page in each language; no automatic redirects. */
const NAV_LABEL = { en: "Language", fr: "Langue", de: "Sprache", es: "Idioma" } as const;

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname() || "/";
  return (
    <nav aria-label={NAV_LABEL[locale]} className={`flex items-center text-[0.8125rem] font-medium uppercase tracking-[0.14em] ${className}`}>
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && (
            <span aria-hidden="true" className="px-1.5 opacity-60">
              ·
            </span>
          )}
          {l === locale ? (
            <span aria-current="true" lang={l} title={LOCALE_LABELS[l]} className="underline decoration-1 underline-offset-[5px]">
              {l.toUpperCase()}
            </span>
          ) : (
            <a
              href={localePath(pathname, l)}
              hrefLang={l}
              lang={l}
              title={LOCALE_LABELS[l]}
              aria-label={LOCALE_LABELS[l]}
              className="opacity-80 underline-offset-[5px] hover:underline hover:opacity-100 focus-visible:opacity-100"
            >
              {l.toUpperCase()}
            </a>
          )}
        </span>
      ))}
    </nav>
  );
}

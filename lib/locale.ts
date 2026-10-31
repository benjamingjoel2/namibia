// i18n-skip-strings
/**
 * The language of the page tree this module belongs to. English here; scripts/i18n.mjs
 * writes a copy of lib/ for each other language with its own code.
 */
export const locale: "en" | "fr" | "de" | "es" = "en";

/** Locale for dates and numbers. */
export const intlLocale = ({ en: "en-GB", fr: "fr-FR", de: "de-DE", es: "es-ES" } as const)[locale];

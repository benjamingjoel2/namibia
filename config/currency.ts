/**
 * Indicative exchange rates from USD. Edit freely; they are labelled
 * "indicative" wherever prices are shown. Last reviewed: PLACEHOLDER.
 */
export const currencies = [
  { code: "USD", symbol: "$", label: "US dollar", rateFromUSD: 1 },
  { code: "NAD", symbol: "N$", label: "Namibian dollar", rateFromUSD: 17.5 },
  { code: "ZAR", symbol: "R", label: "South African rand", rateFromUSD: 17.5 },
  { code: "EUR", symbol: "€", label: "Euro", rateFromUSD: 0.86 },
  { code: "GBP", symbol: "£", label: "Pound sterling", rateFromUSD: 0.75 },
] as const;

export type CurrencyCode = (typeof currencies)[number]["code"];

export const defaultCurrency: CurrencyCode = "USD";

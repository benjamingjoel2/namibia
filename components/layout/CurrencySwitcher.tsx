"use client";

import { currencies, type CurrencyCode } from "@/config/currency";
import { formatPrice, useCurrency } from "@/lib/currency";

export function CurrencySwitcher({ className = "" }: { className?: string }) {
  const { code, setCode } = useCurrency();
  return (
    <label className={`inline-flex items-center gap-2 text-sm ${className}`}>
      <span>Currency</span>
      <select
        value={code}
        onChange={(e) => setCode(e.target.value as CurrencyCode)}
        className="cursor-pointer rounded-none border-b border-current/50 bg-transparent py-1 pr-1 text-sm focus-visible:border-current"
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code} className="text-camelthorn">
            {c.code}
          </option>
        ))}
      </select>
    </label>
  );
}

/** "From $4,850" in the visitor's chosen currency. */
export function Price({ usd, suffix = "pp" }: { usd: number; suffix?: string }) {
  const { code } = useCurrency();
  return (
    <span>
      From <strong className="font-semibold">{formatPrice(usd, code)}</strong>
      {suffix && <span className="text-muted"> {suffix}</span>}
    </span>
  );
}


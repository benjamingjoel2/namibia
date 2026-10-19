"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { currencies, defaultCurrency, type CurrencyCode } from "@/config/currency";

type Ctx = { code: CurrencyCode; setCode: (c: CurrencyCode) => void };

const CurrencyContext = createContext<Ctx>({ code: defaultCurrency, setCode: () => {} });

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [code, setCodeState] = useState<CurrencyCode>(defaultCurrency);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nl-currency");
      if (saved && currencies.some((c) => c.code === saved)) {
        // Saved preference is only readable after hydration.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCodeState(saved as CurrencyCode);
      }
    } catch {}
  }, []);

  const setCode = useCallback((c: CurrencyCode) => {
    setCodeState(c);
    try {
      localStorage.setItem("nl-currency", c);
    } catch {}
  }, []);

  return <CurrencyContext.Provider value={{ code, setCode }}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

/** Round to a tidy figure so converted prices don't look falsely precise. */
export function formatPrice(usd: number, code: CurrencyCode) {
  const c = currencies.find((x) => x.code === code) ?? currencies[0];
  const raw = usd * c.rateFromUSD;
  const step = raw >= 100000 ? 1000 : raw >= 10000 ? 100 : 50;
  const rounded = Math.round(raw / step) * step;
  return `${c.symbol}${rounded.toLocaleString("en-GB")}`;
}

"use client";

/**
 * PlantCare AI - bilingual context (English / Arabic).
 * English is the default interface language; Arabic can be toggled
 * from the header. Direction (LTR/RTL) follows the language.
 */
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ar, en, type TKey } from "@/lib/i18n";

type Lang = "en" | "ar";

interface I18nContextValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (lang: Lang) => void;
  t: (key: TKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restore saved preference after hydration (async to avoid cascading renders)
  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => {
      if (cancelled) return;
      try {
        const saved = window.localStorage.getItem("plantcare_lang");
        if (saved === "ar" || saved === "en") setLangState(saved);
      } catch {
        /* localStorage unavailable */
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Keep <html> attributes in sync
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      window.localStorage.setItem("plantcare_lang", lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);

  const t = useCallback(
    (key: TKey) => (lang === "ar" ? ar[key] : en[key]),
    [lang]
  );

  return (
    <I18nContext.Provider
      value={{ lang, dir: lang === "ar" ? "rtl" : "ltr", setLang, t }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

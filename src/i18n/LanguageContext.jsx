import { createContext, useContext, useState, useCallback } from "react";
import { translations } from "./translations";

const SUPPORTED = ["en", "es"];
const STORAGE_KEY = "portfolio_lang";

function detectInitialLang() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED.includes(saved)) return saved;
  const browser = (navigator.language || navigator.userLanguage || "en")
    .slice(0, 2)
    .toLowerCase();
  return SUPPORTED.includes(browser) ? browser : "en";
}

// Resolve a dot-separated key path, e.g. "hero.viewProjects"
function resolve(obj, path) {
  return path.split(".").reduce((acc, k) => acc?.[k], obj);
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang);

  const setLang = useCallback((code) => {
    if (!SUPPORTED.includes(code)) return;
    localStorage.setItem(STORAGE_KEY, code);
    document.documentElement.lang = code;
    setLangState(code);
  }, []);

  // t("hero.viewProjects") → string in current language
  const t = useCallback(
    (key) => resolve(translations[lang], key) ?? resolve(translations.en, key) ?? key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}

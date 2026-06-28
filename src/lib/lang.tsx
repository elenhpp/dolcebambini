import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "./site-content";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: <T>(o: { el: T; en: T }) => T };
const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("el");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("db-lang") as Lang | null) : null;
    if (stored === "el" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("db-lang", l);
  };

  const t = <T,>(o: { el: T; en: T }) => o[lang];

  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const c = useContext(LangCtx);
  if (!c) throw new Error("useLang must be inside LangProvider");
  return c;
}

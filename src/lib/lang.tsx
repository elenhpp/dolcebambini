import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang, Tr } from "./site-content";

export const LANGS: Lang[] = ["el", "en", "it", "es", "pt"];

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: <T>(o: Tr<T>) => T;
};
const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("el");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("db-lang") as Lang | null) : null;
    if (stored && (LANGS as string[]).includes(stored)) setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("db-lang", l);
  };

  const t = <T,>(o: Tr<T>): T => {
    const v = (o as Partial<Record<Lang, T>>)[lang];
    return (v !== undefined ? v : o.en) as T;
  };

  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const c = useContext(LangCtx);
  if (!c) throw new Error("useLang must be inside LangProvider");
  return c;
}

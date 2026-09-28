import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang, Tr } from "./site-content";

export const LANGS: Lang[] = ["el", "en", "it", "es", "pt"];

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: <T>(o: Tr<T>) => T;
  /** False until the visitor's saved language has been read, so animations can wait for the final text. */
  ready: boolean;
};
const LangCtx = createContext<Ctx | null>(null);

export const DEFAULT_LANG: Lang = "en";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("db-lang") as Lang | null) : null;
    if (stored && (LANGS as string[]).includes(stored)) setLangState(stored);
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("db-lang", l);
  };

  const t = <T,>(o: Tr<T>): T => {
    const v = (o as Partial<Record<Lang, T>>)[lang];
    return (v !== undefined ? v : o.en) as T;
  };

  return <LangCtx.Provider value={{ lang, setLang, t, ready }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const c = useContext(LangCtx);
  if (!c) throw new Error("useLang must be inside LangProvider");
  return c;
}

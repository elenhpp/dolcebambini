import { useEffect, useState } from "react";
import type { Lang, Tr } from "./site-content";

export type FieldOverride = Partial<Record<Lang, string>>;
export type ProductOverride = { title?: FieldOverride; desc?: FieldOverride };
export type Overrides = Record<string, Record<string, ProductOverride>>; // category -> code -> override

const KEY = "db-product-overrides";
const EVT = "db-product-overrides-changed";

function read(): Overrides {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}") as Overrides;
  } catch {
    return {};
  }
}

function write(next: Overrides) {
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(EVT));
}

export function useOverrides(): [Overrides, (updater: (prev: Overrides) => Overrides) => void] {
  const [state, setState] = useState<Overrides>({});

  useEffect(() => {
    setState(read());
    const handler = () => setState(read());
    window.addEventListener(EVT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const update = (updater: (prev: Overrides) => Overrides) => {
    const next = updater(read());
    write(next);
    setState(next);
  };

  return [state, update];
}

export function setProductField(
  category: string,
  code: string,
  field: "title" | "desc",
  lang: Lang,
  value: string,
) {
  const cur = read();
  const cat = { ...(cur[category] || {}) };
  const prod: ProductOverride = { ...(cat[code] || {}) };
  const f: FieldOverride = { ...(prod[field] || {}) };
  if (value.trim() === "") delete f[lang];
  else f[lang] = value;
  if (Object.keys(f).length === 0) delete prod[field];
  else prod[field] = f;
  if (Object.keys(prod).length === 0) delete cat[code];
  else cat[code] = prod;
  const next = { ...cur, [category]: cat };
  if (Object.keys(cat).length === 0) delete next[category];
  write(next);
}

export function clearAllOverrides() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(EVT));
}

export function mergeTr(
  base: Tr<string> | undefined,
  override: FieldOverride | undefined,
): Tr<string> | undefined {
  if (!override || Object.keys(override).length === 0) return base;
  if (!base) return { en: override.en ?? "", ...override } as Tr<string>;
  return { ...base, ...override } as Tr<string>;
}

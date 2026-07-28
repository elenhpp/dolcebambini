import { PRODUCTS, resolveImage } from "./site-content";
import { SILK_VARIANTS, COMMUNION_VARIANTS } from "./remote-gallery";

// Every bundled product photo. Products only carry a single `image`, but the
// folder holds the other shots of the same item (back views, accessories, set
// photos). We group them by filename so each product page shows the full set.
const LOCAL = import.meta.glob("../assets/images/*", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const IMG_EXT = /\.(webp|jpe?g|png)$/i;
const PREFIX = "../assets/images/";

const LOCAL_FILES = Object.keys(LOCAL)
  .map((k) => k.slice(PREFIX.length))
  .filter((f) => IMG_EXT.test(f))
  .sort((a, b) => a.localeCompare(b, "en"));

const stem = (f: string) => f.replace(IMG_EXT, "");

/** "K31-2(9856)" -> ["K","31","2","9856"]: splits on separators and letter/digit turns. */
function toks(s: string): string[] {
  return s
    .toUpperCase()
    .replace(/([A-Z])(\d)/g, "$1 $2")
    .replace(/(\d)([A-Z])/g, "$1 $2")
    .split(/[^A-Z0-9]+/)
    .filter(Boolean);
}

/**
 * Token-wise prefix test. Comparing tokens rather than raw strings keeps
 * "K3-1" apart from "K31", which plain string prefixes would conflate.
 */
function isPrefix(file: string[], key: string[]): boolean {
  if (!key.length || key.length > file.length) return false;
  for (let i = 0; i < key.length - 1; i++) if (file[i] !== key[i]) return false;
  const lastKey = key[key.length - 1];
  const lastFile = file[key.length - 1];
  // The final token may carry an alpha variant marker: "N" also matches "NB".
  return (
    lastFile === lastKey ||
    (lastFile.startsWith(lastKey) && /^[A-Z]+$/.test(lastFile.slice(lastKey.length)))
  );
}

type Key = { code: string; toks: string[]; series: boolean; codeLen: number };

function keysFor(code: string, image: string): Key[] {
  const codeToks = toks(code);
  const keys: Key[] = [{ code, toks: codeToks, series: false, codeLen: codeToks.length }];

  if (image.startsWith("src/assets/images/")) {
    keys.push({
      code,
      toks: toks(stem(image.slice("src/assets/images/".length))),
      series: false,
      codeLen: codeToks.length,
    });
  }

  // Accessory sets are numbered per series ("K31-1(9856)", "K31-2(9856)", ...),
  // so letter-prefixed codes also claim their whole series.
  if (/^[A-Z]+$/.test(codeToks[0] ?? "") && /^\d+$/.test(codeToks[1] ?? "")) {
    keys.push({
      code,
      toks: [codeToks[0], codeToks[1]],
      series: true,
      codeLen: codeToks.length,
    });
  }
  return keys;
}

/** category -> code -> local filenames, each file owned by exactly one product. */
function buildLocalIndex(): Record<string, Record<string, string[]>> {
  const index: Record<string, Record<string, string[]>> = {};

  for (const [category, products] of Object.entries(PRODUCTS)) {
    const keys: Key[] = [];
    const byCode: Record<string, string[]> = {};
    for (const p of products) {
      byCode[p.code] = [];
      keys.push(...keysFor(p.code, p.image));
    }
    // Exact keys before series keys, longer before shorter, and for equal series
    // keys the more general product wins ("K5" keeps K5-*, not "K5-9758-8").
    keys.sort(
      (a, b) =>
        Number(a.series) - Number(b.series) ||
        b.toks.length - a.toks.length ||
        a.codeLen - b.codeLen,
    );

    for (const file of LOCAL_FILES) {
      const fileToks = toks(stem(file));
      const hit = keys.find((k) => isPrefix(fileToks, k.toks));
      if (hit) byCode[hit.code].push(file);
    }
    index[category] = byCode;
  }
  return index;
}

let localIndex: Record<string, Record<string, string[]>> | null = null;

/** Remote categories are listed in the generated manifest instead. */
function remoteGallery(category: string, code: string, image: string): string[] {
  if (category === "silk") {
    const base = image.replace(/-front\.jpg$/, "");
    return (SILK_VARIANTS[code] ?? []).map((v) => `${base}-${v}.jpg`);
  }
  if (category === "communion") {
    const base = image.replace(/_01\.jpg$/, "");
    return (COMMUNION_VARIANTS[code] ?? []).map((v) => `${base}_${v}.jpg`);
  }
  return [];
}

/**
 * Every photo for a product, primary shot first and de-duplicated.
 * Returns [] when the product is unknown.
 */
export function galleryFor(category: string, code: string): string[] {
  const product = (PRODUCTS[category] ?? []).find((p) => p.code === code);
  if (!product) return [];

  const remote = remoteGallery(category, code, product.image);
  let extras: string[];
  if (remote.length) {
    extras = remote;
  } else {
    localIndex ??= buildLocalIndex();
    extras = (localIndex[category]?.[code] ?? []).map((f) => PREFIX + f);
  }

  const urls = [
    resolveImage(product.image),
    ...extras.map((e) => (e.startsWith(PREFIX) ? LOCAL[e] : e)),
  ].filter(Boolean);

  return [...new Set(urls)];
}

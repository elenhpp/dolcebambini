import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS, T, resolveImage, type Product } from "@/lib/site-content";
import { galleryFor } from "@/lib/product-gallery";
import { useLang } from "@/lib/lang";
import { useOverrides, mergeTr } from "@/lib/product-overrides";

export function ProductDetail({ category, code }: { category: string; code: string }) {
  const { t } = useLang();
  const overrides = useOverrides();

  const product: Product | undefined = useMemo(
    () => (PRODUCTS[category] ?? []).find((p) => p.code === code),
    [category, code],
  );

  const ov = overrides[category]?.[code];
  const mergedTitle = mergeTr(product?.title, ov?.title);
  const mergedDesc = mergeTr(product?.desc, ov?.desc);
  const mergedLongDesc = mergeTr(undefined, ov?.longDesc);

  // Every shot of this product, plus any extra images an admin has attached.
  const gallery = useMemo(() => {
    let base = galleryFor(category, code);
    if (!base.length && product?.image) base = [resolveImage(product.image)];
    const extras = (ov?.images ?? []).filter((u) => u && u.trim() !== "").map(resolveImage);
    return [...new Set([...base, ...extras])];
  }, [category, code, product?.image, ov?.images]);

  const [active, setActive] = useState(0);

  // A different product means a different gallery — start from its first photo.
  useEffect(() => setActive(0), [category, code]);

  const count = gallery.length;
  const step = (delta: number) => setActive((i) => (i + delta + count) % count);

  useEffect(() => {
    if (count < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl mb-3">Not found</h1>
        <Link to={`/${category}` as string} className="text-primary underline">
          ← Back
        </Link>
      </div>
    );
  }

  const title = mergedTitle ? t(mergedTitle) : `${t(T.copy.baptismalFallback)} ${product.code}`;
  const shortDesc = mergedDesc ? t(mergedDesc) : "";
  const longDesc = mergedLongDesc ? t(mergedLongDesc) : "";
  const mainImage = gallery[active] ?? resolveImage(product.image);

  return (
    <div className="mx-auto max-w-6xl px-5 lg:px-8 pt-8 pb-20">
      <div className="mb-6">
        <Link
          to={`/${category}` as string}
          className="text-xs font-semibold tracking-[0.18em] uppercase text-primary hover:underline"
        >
          ← {category}
        </Link>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-muted border border-border/60 soft-shadow">
            <img
              key={mainImage}
              src={mainImage}
              alt={`${title} — ${t(T.copy.photo)} ${active + 1}/${count}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "0.4";
              }}
            />

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={t(T.copy.prevPhoto)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-background/85 backdrop-blur border border-border/60 text-foreground/80 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-background transition"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={t(T.copy.nextPhoto)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-background/85 backdrop-blur border border-border/60 text-foreground/80 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-background transition"
                >
                  <ChevronRight size={18} />
                </button>
                <div className="absolute bottom-3 right-3 rounded-full bg-background/85 backdrop-blur px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-foreground/80 border border-border/60">
                  {active + 1} / {count}
                </div>
              </>
            )}
          </div>

          {count > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={active === i}
                  className={`relative aspect-square overflow-hidden rounded-xl border transition ${
                    active === i
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border/60 hover:border-foreground/40"
                  }`}
                  aria-label={`${t(T.copy.photo)} ${i + 1}`}
                >
                  <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="text-[11px] tracking-[0.35em] uppercase text-primary mb-3">
            {t(T.code)} {product.code}
          </div>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-5">{title}</h1>
          {shortDesc && (
            <p className="text-base text-muted-foreground leading-relaxed mb-6">{shortDesc}</p>
          )}
          {longDesc && (
            <div className="prose prose-neutral max-w-none text-sm leading-relaxed whitespace-pre-line text-foreground/90">
              {longDesc}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

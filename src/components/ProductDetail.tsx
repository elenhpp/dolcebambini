import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { PRODUCTS, T, type Product } from "@/lib/site-content";
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

  const gallery = useMemo(() => {
    const extras = (ov?.images ?? []).filter((u) => u && u.trim() !== "");
    const base = product?.image ? [product.image] : [];
    return [...base, ...extras];
  }, [product?.image, ov?.images]);

  const [active, setActive] = useState(0);

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
  const mainImage = gallery[active] ?? product.image;

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
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-muted border border-border/60 soft-shadow">
            <img
              src={mainImage}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "0.4";
              }}
            />
          </div>
          {gallery.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative aspect-square overflow-hidden rounded-xl border transition ${
                    active === i
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border/60 hover:border-foreground/40"
                  }`}
                  aria-label={`Photo ${i + 1}`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
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

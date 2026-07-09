import type { Product } from "@/lib/site-content";
import { T, resolveImage } from "@/lib/site-content";

import { useLang } from "@/lib/lang";
import { useOverrides, mergeTr } from "@/lib/product-overrides";
import { Link } from "@tanstack/react-router";

const DETAIL_CATEGORIES = new Set(["boys", "girls"]);

export function ProductCard({ product, index = 0, category }: { product: Product; index?: number; category?: string }) {
  const { t } = useLang();
  const overrides = useOverrides();
  const ov = category ? overrides[category]?.[product.code] : undefined;

  const mergedTitle = mergeTr(product.title, ov?.title);
  const mergedDesc = mergeTr(product.desc, ov?.desc);

  const title = mergedTitle
    ? t(mergedTitle)
    : `${t(T.copy.baptismalFallback)} ${product.code}`;

  const linkable = category && DETAIL_CATEGORIES.has(category);

  const inner = (
    <div className="shimmer relative rounded-3xl bg-card border border-border/60 soft-shadow overflow-hidden h-full">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.4"; }}
        />
        <div
          className="shimmer absolute top-3 left-3 z-[3] rounded-full bg-background/90 backdrop-blur px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-foreground/80 border border-border/60"
        >
          {t(T.code)} {product.code}
        </div>
      </div>

      <div className="relative p-5">
        <h3 className="font-display text-xl leading-tight text-foreground">{title}</h3>
        {mergedDesc && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
            {t(mergedDesc)}
          </p>
        )}
        <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-primary">
          {t(T.viewDetails)}
          <span aria-hidden>→</span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="fade-up group h-full"
      style={{ animationDelay: `${Math.min(index * 60, 600)}ms` }}
    >
      {linkable ? (
        <Link
          to={`/${category}/${product.code}` as string}
          className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-3xl"
        >
          {inner}
        </Link>
      ) : (
        inner
      )}
    </div>
  );
}

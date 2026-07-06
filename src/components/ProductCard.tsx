import type { Product } from "@/lib/site-content";
import { T } from "@/lib/site-content";
import { useLang } from "@/lib/lang";
import { Tilt } from "@/components/Tilt";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { t } = useLang();

  const title = product.title
    ? t(product.title)
    : `${t(T.copy.baptismalFallback)} ${product.code}`;

  return (
    <div
      className="fade-up"
      style={{ animationDelay: `${Math.min(index * 60, 600)}ms` }}
    >
      <Tilt className="group h-full" max={8} scale={1.03}>
        <div className="relative rounded-3xl bg-card border border-border/60 soft-shadow overflow-hidden">
          <div className="relative aspect-[3/4] overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={title}
              loading="lazy"
              data-tilt-inner
              data-tilt-depth="18"
              className="w-full h-full object-cover transition-transform duration-500"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.4"; }}
            />
            <div
              data-tilt-inner
              data-tilt-depth="26"
              className="absolute top-3 left-3 z-[3] rounded-full bg-background/90 backdrop-blur px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-foreground/80 border border-border/60"
            >
              {t(T.code)} {product.code}
            </div>
          </div>

          <div className="relative p-5" data-tilt-inner data-tilt-depth="8">
            <h3 className="font-display text-xl leading-tight text-foreground">{title}</h3>
            {product.desc && (
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {t(product.desc)}
              </p>
            )}
            <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-primary">
              {t(T.viewDetails)}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );
}

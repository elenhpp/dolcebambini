import { useRef, useState, type MouseEvent } from "react";
import type { Product } from "@/lib/site-content";
import { T } from "@/lib/site-content";
import { useLang } from "@/lib/lang";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { lang, t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<{ rx: number; ry: number; gx: number; gy: number }>({
    rx: 0, ry: 0, gx: 50, gy: 50,
  });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const ry = (x - 0.5) * 12;   // rotateY
    const rx = (0.5 - y) * 12;   // rotateX
    setStyle({ rx, ry, gx: x * 100, gy: y * 100 });
  };
  const reset = () => setStyle({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const title = product.title
    ? (lang === "el" ? product.title.el : product.title.en)
    : `${lang === "el" ? "Βαπτιστικό" : "Baptismal Outfit"} ${product.code}`;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="fade-up"
      style={{ perspective: "1200px", animationDelay: `${Math.min(index * 60, 600)}ms` }}
    >
      <div
        className="shimmer group relative rounded-3xl bg-card border border-border/60 soft-shadow overflow-hidden transition-[box-shadow,transform] duration-500 will-change-transform"
        style={{
          transform: `rotateX(${style.rx}deg) rotateY(${style.ry}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* glossy radial follow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]"
          style={{
            background: `radial-gradient(420px circle at ${style.gx}% ${style.gy}%, oklch(1 0 0 / 0.35), transparent 55%)`,
          }}
        />
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            style={{ transform: `translateZ(40px)` }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.4"; }}
          />
          <div className="absolute top-3 left-3 z-[3] shimmer rounded-full bg-background/90 backdrop-blur px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-foreground/80 border border-border/60">
            {t(T.code)} {product.code}
          </div>
        </div>

        <div className="relative p-5" style={{ transform: `translateZ(25px)` }}>
          <h3 className="font-display text-xl leading-tight text-foreground">{title}</h3>
          {product.desc && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
              {lang === "el" ? product.desc.el : product.desc.en}
            </p>
          )}
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-primary">
            {t(T.viewDetails)}
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

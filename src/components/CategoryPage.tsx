import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/site-content";
import { useLang } from "@/lib/lang";

export function CategoryPage({
  title, sub, products,
}: { title: { el: string; en: string }; sub: { el: string; en: string }; products: Product[] }) {
  const { t } = useLang();
  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-12 pb-20">
      <header className="text-center max-w-3xl mx-auto mb-14 fade-up">
        <div className="text-[11px] tracking-[0.35em] uppercase text-primary mb-3">{t(sub)}</div>
        <h1 className="font-display text-5xl md:text-6xl tracking-tight">{t(title)}</h1>
      </header>
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p, i) => <ProductCard key={p.code} product={p} index={i} />)}
      </div>
    </div>
  );
}

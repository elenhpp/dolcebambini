import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/lib/lang";
import { T, PRODUCTS } from "@/lib/site-content";
import { ProductCard } from "@/components/ProductCard";
import { Sparkles, Scissors, Layers, Award, Download } from "lucide-react";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import heroPreload from "@/assets/hero-new/7017b-2.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dolce Bambini — Χειροποίητα Βαπτιστικά | Collection 2026" },
      { name: "description", content: "Χειροποίητα βαπτιστικά ρούχα και ενδύματα κοινωνίας. Collection 2026 για αγόρι και κορίτσι, Silk Collection και αξεσουάρ βάπτισης." },
    ],
    links: [
      { rel: "preload", as: "image", href: heroPreload.url },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useLang();
  const featured = [...PRODUCTS.girls.slice(0, 2), ...PRODUCTS.boys.slice(0, 2)];
  const icons = [Award, Sparkles, Layers, Scissors];

  return (
    <div>
      {/* HERO SLIDESHOW */}
      <section className="relative w-full overflow-hidden bg-foreground">
        <HeroSlideshow />
      </section>

      {/* HERO */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-primary/15 blur-3xl float-soft" />
        <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full bg-sky/40 blur-3xl float-soft" style={{ animationDelay: "1.5s" }} />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-card/80 backdrop-blur border border-border/60 px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase text-foreground/75 soft-shadow">
              <Sparkles size={12} className="text-primary" />
              {t(T.estd)} · Collection 2026
            </div>
            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              {t(T.heroTitle)}
            </h1>
            <p className="mt-6 text-lg text-foreground/70 max-w-lg leading-relaxed">
              {t(T.heroSub)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/girls" className="shimmer inline-flex items-center rounded-full bg-primary text-primary-foreground px-7 py-3 text-sm font-medium tracking-wide soft-shadow hover:scale-[1.02] transition-transform">
                {t(T.heroCtaGirls)}
              </Link>
              <Link to="/boys" className="inline-flex items-center rounded-full bg-card border border-border px-7 py-3 text-sm font-medium tracking-wide soft-shadow hover:bg-muted transition-colors">
                {t(T.heroCtaBoys)}
              </Link>
            </div>
          </div>

          <div className="relative h-[480px] lg:h-[560px]">
            <div className="absolute top-0 right-4 w-56 lg:w-64 aspect-[3/4] rounded-3xl overflow-hidden float-shadow float-soft border-4 border-card">
              <img src={PRODUCTS.girls[0].image} alt="Featured girls" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 w-60 lg:w-72 aspect-[3/4] rounded-3xl overflow-hidden float-shadow float-soft border-4 border-card" style={{ animationDelay: "2s" }}>
              <img src={PRODUCTS.boys[0].image} alt="Featured boys" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-24 left-32 w-44 lg:w-52 aspect-[3/4] rounded-3xl overflow-hidden float-shadow float-soft border-4 border-card" style={{ animationDelay: "1s" }}>
              <img src={PRODUCTS.silk[0].image} alt="Featured silk" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-5xl px-5 lg:px-8 py-24 text-center">
        <div className="text-[11px] tracking-[0.35em] uppercase text-primary mb-4">{t(T.copy.since1978)}</div>
        <h2 className="font-display text-4xl md:text-5xl tracking-tight">{t(T.storyTitle)}</h2>
        <p className="mt-6 text-lg text-foreground/70 leading-relaxed max-w-3xl mx-auto">{t(T.storyBody)}</p>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t(T.values).map((v, i) => {
            const Icon = icons[i];
            return (
              <div key={v.t} className="group relative rounded-3xl bg-card border border-border/60 p-7 soft-shadow hover:-translate-y-1 transition-transform duration-500 fade-up" style={{ animationDelay: `${i * 90}ms` }}>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-sky/40 grid place-items-center text-primary mb-5">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-2xl mb-2">{v.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-[11px] tracking-[0.35em] uppercase text-primary mb-2">Collection 2026</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">
              {t(T.copy.featuredPieces)}
            </h2>
          </div>
          <div className="flex gap-3 text-sm">
            <Link to="/girls" className="text-primary hover:underline">{t(T.copy.allGirls)} →</Link>
            <Link to="/boys" className="text-primary hover:underline">{t(T.copy.allBoys)} →</Link>
          </div>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => <ProductCard key={p.code} product={p} index={i} />)}
        </div>
      </section>

      {/* SIZE CHART */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-24">
        <div className="relative rounded-3xl bg-gradient-to-br from-blush/60 via-card to-sky/40 border border-border/60 p-10 lg:p-14 float-shadow grid lg:grid-cols-[1.5fr_1fr] gap-8 items-center overflow-hidden">
          <div>
            <div className="text-[11px] tracking-[0.35em] uppercase text-primary mb-3">{t(T.sizeChart)}</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">
              {t(T.copy.perfectSize)}
            </h2>
            <p className="mt-4 text-foreground/70 max-w-xl leading-relaxed">{t(T.sizeChartBody)}</p>
          </div>
          <div className="flex lg:justify-end">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium tracking-wide soft-shadow hover:scale-[1.02] transition-transform"
            >
              <Download size={16} /> {t(T.sizeChartCta)}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

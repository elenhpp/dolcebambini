import { createFileRoute, Link } from "@tanstack/react-router";
import { T } from "@/lib/site-content";
import { useLang } from "@/lib/lang";
import featuredBoys from "@/assets/images/8529W.webp";
import featuredGirls from "@/assets/images/6057-1(1).webp";

function Page() {
  const { t } = useLang();
  return (
    <div className="mx-auto max-w-5xl px-5 lg:px-8 pt-12 pb-20">
      <header className="text-center max-w-3xl mx-auto mb-14 fade-up">
        <div className="text-[11px] tracking-[0.35em] uppercase text-primary mb-3">
          {t(T.pages.winter.sub)}
        </div>
        <h1 className="font-display text-5xl md:text-6xl tracking-tight">
          {t(T.pages.winter.title)}
        </h1>
      </header>

      <div className="grid gap-7 sm:grid-cols-2">
        <Link
          to="/winterBoys"
          className="group relative rounded-3xl overflow-hidden soft-shadow border border-border/60 aspect-[4/5]"
        >
          <img
            src={featuredBoys}
            alt={t(T.pages.winterBoys.title)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <span className="inline-flex items-center rounded-full bg-background/90 backdrop-blur px-6 py-2.5 text-sm font-medium tracking-wide text-foreground soft-shadow">
              {t(T.heroCtaBoys)}
            </span>
          </div>
        </Link>

        <Link
          to="/winterGirls"
          className="group relative rounded-3xl overflow-hidden soft-shadow border border-border/60 aspect-[4/5]"
        >
          <img
            src={featuredGirls}
            alt={t(T.pages.winterGirls.title)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <span className="inline-flex items-center rounded-full bg-background/90 backdrop-blur px-6 py-2.5 text-sm font-medium tracking-wide text-foreground soft-shadow">
              {t(T.heroCtaGirls)}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/winter")({
  head: () => ({
    meta: [
      { title: "Winter Collection | Dolce Bambini" },
      { name: "description", content: "Winter baptism collection for boys and girls." },
    ],
  }),
  component: Page,
});

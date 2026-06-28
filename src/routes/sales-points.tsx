import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/lang";
import { T, CONTACT } from "@/lib/site-content";
import { MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/sales-points")({
  head: () => ({ meta: [
    { title: "Σημεία Πώλησης | Dolce Bambini" },
    { name: "description", content: "Βρείτε τα καταστήματα που διαθέτουν Dolce Bambini." },
  ]}),
  component: Page,
});

function Page() {
  const { t } = useLang();
  return (
    <div className="mx-auto max-w-6xl px-5 lg:px-8 pt-12 pb-24">
      <header className="text-center max-w-3xl mx-auto mb-12 fade-up">
        <div className="text-[11px] tracking-[0.35em] uppercase text-primary mb-3">{t(T.pages.sales.sub)}</div>
        <h1 className="font-display text-5xl md:text-6xl tracking-tight">{t(T.pages.sales.title)}</h1>
        <p className="mt-5 text-foreground/70 leading-relaxed">{t(T.salesNote)}</p>
      </header>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-7">
        <div className="shimmer-loop rounded-3xl bg-card border border-border/60 soft-shadow p-8 fade-up">
          <h2 className="font-display text-3xl mb-3">{t(T.copy.flagshipStore)}</h2>
          <p className="text-sm text-foreground/70 mb-5">{t(T.copy.visitGlyfada)}</p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 text-primary" />{t(CONTACT.address)}</li>
            <li className="flex items-center gap-3"><Phone size={16} className="text-primary" />{CONTACT.phone}</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-dashed border-border bg-gradient-to-br from-blush/40 to-sky/30 p-10 grid place-items-center text-center min-h-[280px] fade-up" style={{ animationDelay: "120ms" }}>
          <div>
            <div className="font-display text-2xl mb-2">{t(T.copy.map)}</div>
            <p className="text-sm text-muted-foreground max-w-xs">{t(T.salesPlaceholder)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

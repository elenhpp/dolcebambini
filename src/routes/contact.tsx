import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLang } from "@/lib/lang";
import { T, CONTACT } from "@/lib/site-content";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Επικοινωνία | Dolce Bambini" },
    { name: "description", content: "Επικοινωνήστε με την Dolce Bambini στη Γλυφάδα." },
  ]}),
  component: Page,
});

function Page() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-5 lg:px-8 pt-12 pb-24">
      <header className="text-center max-w-3xl mx-auto mb-12 fade-up">
        <div className="text-[11px] tracking-[0.35em] uppercase text-primary mb-3">{t(T.pages.contact.sub)}</div>
        <h1 className="font-display text-5xl md:text-6xl tracking-tight">{t(T.pages.contact.title)}</h1>
      </header>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-7">
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-3xl bg-card border border-border/60 soft-shadow p-8 lg:p-10 fade-up"
        >
          <div className="grid gap-5">
            <Field label={t(T.contactForm.name)}>
              <input required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition" />
            </Field>
            <Field label={t(T.contactForm.email)}>
              <input required type="email" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition" />
            </Field>
            <Field label={t(T.contactForm.message)}>
              <textarea required rows={5} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition resize-none" />
            </Field>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium tracking-wide soft-shadow hover:scale-[1.01] transition-transform"
            >
              <Send size={15} /> {t(T.contactForm.send)}
            </button>
            {sent && <p className="text-sm text-primary text-center">{t(T.contactForm.sent)}</p>}
          </div>
        </form>

        <div className="space-y-5 fade-up" style={{ animationDelay: "120ms" }}>
          <div className="rounded-3xl bg-gradient-to-br from-blush/50 via-card to-sky/40 border border-border/60 p-8 soft-shadow">
            <h3 className="font-display text-2xl mb-5">{t(T.copy.getInTouch)}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 text-primary shrink-0" />{t(CONTACT.address)}</li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-primary" /><a href={`tel:${CONTACT.phone.replace(/\s/g,"")}`} className="hover:text-primary">{CONTACT.phone}</a></li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-primary" /><a href={`mailto:${CONTACT.email}`} className="hover:text-primary">{CONTACT.email}</a></li>
            </ul>
          </div>
          <div className="rounded-3xl border border-dashed border-border bg-muted/40 h-56 grid place-items-center text-sm text-muted-foreground">
            {t(T.copy.googleMap)}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] tracking-[0.2em] uppercase text-foreground/65 mb-2">{label}</span>
      {children}
    </label>
  );
}

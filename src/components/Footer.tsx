import { Link } from "@tanstack/react-router";
import { CONTACT, NAV, T } from "@/lib/site-content";
import { useLang } from "@/lib/lang";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/dolce-logo-transparent.png.asset.json";

export function Footer() {
  const { lang, t } = useLang();
  const privacyLabel: Record<string, string> = {
    el: "Πολιτική Απορρήτου (GDPR)",
    en: "Privacy Policy (GDPR)",
    it: "Informativa sulla Privacy (GDPR)",
    es: "Política de Privacidad (RGPD)",
    pt: "Política de Privacidade (RGPD)",
  };
  return (
    <footer className="mt-32 border-t border-border/60 bg-gradient-to-b from-background to-muted/40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo.url} alt={t(T.brand)} className="h-60 md:h-80 w-auto object-contain -ml-1" />
          <p className="mt-5 text-sm text-muted-foreground max-w-sm leading-relaxed">{t(T.footer.tagline)}</p>
        </div>

        <div>
          <div className="text-xs tracking-[0.2em] uppercase text-foreground/70 mb-4">{t(T.footer.quickLinks)}</div>
          <ul className="space-y-4 text-sm">
            {NAV.map((n) => (
              <li key={n.key}>
                <Link to={n.to} className="text-foreground/70 hover:text-primary transition-colors">
                  {n[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs tracking-[0.2em] uppercase text-foreground/70 mb-4">{t(T.footer.contact)}</div>
          <ul className="space-y-3 text-sm text-foreground/75">
            <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 text-primary shrink-0" />{t(CONTACT.address)}</li>
            <li className="flex items-center gap-2"><Phone size={15} className="text-primary" /><a href={`tel:${CONTACT.phone.replace(/\s/g,"")}`}>{CONTACT.phone}</a></li>
            <li className="flex items-center gap-2"><Mail size={15} className="text-primary" /><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a href="https://www.instagram.com/dolce.bambini.official/" aria-label="Instagram" className="w-9 h-9 grid place-items-center rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"><Instagram size={16} /></a>
            <a href="https://www.facebook.com/profile.php?id=100063765693096" aria-label="Facebook" className="w-9 h-9 grid place-items-center rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"><Facebook size={16} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-5 text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Dolce Bambini. {t(T.footer.rights)}</span>
          <div className="flex items-center gap-4">
            <Link to="/gdpr" className="hover:text-primary transition-colors">{privacyLabel[lang] ?? privacyLabel.en}</Link>
            <span>{t(T.footer.designed)}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

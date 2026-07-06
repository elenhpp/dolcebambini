import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/lang";
import { X } from "lucide-react";

const STORAGE_KEY = "db-cookie-consent";

type Consent = "pending" | "accepted";

const COPY: Record<string, { message: string; accept: string; privacy: string }> = {
  el: {
    message: "Χρησιμοποιούμε cookies για την καλύτερη λειτουργία του ιστότοπου και την εξατομίκευση της εμπειρίας σας. Με τη χρήση του ιστότοπου, συμφωνείτε με την Πολιτική Απορρήτου μας.",
    accept: "Αποδοχή",
    privacy: "Πολιτική Απορρήτου",
  },
  en: {
    message: "We use cookies to improve site functionality and personalize your experience. By using the site, you agree to our Privacy Policy.",
    accept: "Accept",
    privacy: "Privacy Policy",
  },
  it: {
    message: "Utilizziamo cookie per migliorare la funzionalità del sito e personalizzare la tua esperienza. Usando il sito, accetti la nostra Informativa sulla Privacy.",
    accept: "Accetta",
    privacy: "Informativa Privacy",
  },
  es: {
    message: "Usamos cookies para mejorar la funcionalidad del sitio y personalizar tu experiencia. Al usar el sitio, aceptas nuestra Política de Privacidad.",
    accept: "Aceptar",
    privacy: "Política de Privacidad",
  },
  pt: {
    message: "Utilizamos cookies para melhorar a funcionalidade do site e personalizar a sua experiência. Ao usar o site, concorda com a nossa Política de Privacidade.",
    accept: "Aceitar",
    privacy: "Política de Privacidade",
  },
};

export function CookieConsent() {
  const { lang } = useLang();
  const [status, setStatus] = useState<Consent>("accepted");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = typeof window !== "undefined" ? (localStorage.getItem(STORAGE_KEY) as Consent | null) : null;
    setStatus(saved ?? "pending");
  }, []);

  const accept = () => {
    setStatus("accepted");
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, "accepted");
  };

  if (!mounted || status !== "pending") return null;

  const c = COPY[lang] ?? COPY.el;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-border/60 bg-background/95 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-sm text-foreground/80 leading-relaxed max-w-3xl">
            {c.message}
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/privacy" className="text-sm text-primary hover:underline underline-offset-4">
              {c.privacy}
            </Link>
            <button
              onClick={accept}
              className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {c.accept}
            </button>
            <button
              onClick={accept}
              aria-label="Close"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

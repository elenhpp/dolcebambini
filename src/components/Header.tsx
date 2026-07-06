import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { NAV, T, type Lang } from "@/lib/site-content";
import { useLang, LANGS } from "@/lib/lang";
import { Menu, X } from "lucide-react";
import logo from "@/assets/dolce-logo-transparent.png.asset.json";

export function Header() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);

  const navLabel = (n: (typeof NAV)[number]) => n[lang];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/75 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="group flex items-center leading-none" aria-label={t(T.brand)}>
            <img
              src={logo.url}
              alt={t(T.brand)}
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((n) => (
              <Link
                key={n.key}
                to={n.to}
                className="text-[11px] tracking-[0.18em] font-medium text-foreground/75 hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground underline decoration-primary decoration-2 underline-offset-[6px]" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {navLabel(n)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center rounded-full border border-border/70 p-0.5 bg-card shadow-sm">
              {LANGS.map((l: Lang) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 text-[10px] font-semibold tracking-widest rounded-full transition-all ${
                    lang === l ? "bg-primary text-primary-foreground shadow" : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <button className="lg:hidden p-2 -mr-2" onClick={() => setOpen((o) => !o)} aria-label="Menu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden pb-6 fade-up">
            <nav className="flex flex-col gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.key}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 text-sm tracking-[0.15em] text-foreground/80 rounded-lg hover:bg-muted"
                  activeProps={{ className: "text-primary bg-muted" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {navLabel(n)}
                </Link>
              ))}
              <div className="flex flex-wrap items-center gap-2 mt-3 px-3">
                {LANGS.map((l: Lang) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1.5 text-xs font-semibold tracking-widest rounded-full border ${
                      lang === l ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground/70"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

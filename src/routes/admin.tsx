import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PRODUCTS, type Lang } from "@/lib/site-content";
import { useLang } from "@/lib/lang";
import { ProductCard } from "@/components/ProductCard";
import {
  useOverrides,
  setProductField,
  clearAllOverrides,
  mergeTr,
} from "@/lib/product-overrides";

const CATEGORIES = ["boys", "girls", "silk", "accessories", "communion"] as const;
type Cat = (typeof CATEGORIES)[number];

const EDIT_LANGS: Lang[] = ["el", "en"];

function AdminPage() {
  const [category, setCategory] = useState<Cat>("boys");
  const [overrides] = useOverrides();
  const { t } = useLang();
  const products = PRODUCTS[category] ?? [];

  const editedCount = useMemo(
    () => Object.keys(overrides[category] ?? {}).length,
    [overrides, category],
  );

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-10 pb-20">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] tracking-[0.35em] uppercase text-primary mb-2">Admin</div>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight">
            Edit product content
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
            Changes are saved locally in your browser and applied instantly across the site.
            Visit any category to see the update, or use the live preview below.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to={`/${category}` as string}
            className="text-xs font-semibold tracking-[0.18em] uppercase text-primary hover:underline"
          >
            View {category} →
          </Link>
          <button
            onClick={() => {
              if (confirm("Reset ALL edits back to defaults?")) clearAllOverrides();
            }}
            className="rounded-full border border-border/70 px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground hover:border-foreground/40"
          >
            Reset all
          </button>
        </div>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const count = Object.keys(overrides[c] ?? {}).length;
          return (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase transition ${
                c === category
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/70 text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {c}
              {count > 0 && (
                <span className="ml-2 rounded-full bg-background/20 px-2 py-0.5 text-[10px]">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {editedCount > 0 && (
        <div className="mb-6 text-xs text-muted-foreground">
          {editedCount} product{editedCount === 1 ? "" : "s"} in this category have edits.
        </div>
      )}

      <div className="space-y-8">
        {products.map((p) => {
          const ov = overrides[category]?.[p.code];
          const mergedTitle = mergeTr(p.title, ov?.title);
          const mergedDesc = mergeTr(p.desc, ov?.desc);
          const previewProduct = { ...p, title: mergedTitle, desc: mergedDesc };
          return (
            <section
              key={p.code}
              className="rounded-3xl border border-border/60 bg-card soft-shadow overflow-hidden"
            >
              <div className="grid gap-6 p-6 md:grid-cols-[280px_1fr]">
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
                    Code {p.code}
                  </div>
                  <ProductCard product={previewProduct} category={category} />
                </div>
                <div className="space-y-5">
                  {EDIT_LANGS.map((lang) => (
                    <div key={lang} className="space-y-2">
                      <div className="text-[11px] tracking-[0.25em] uppercase text-primary">
                        {lang.toUpperCase()}
                      </div>
                      <label className="block">
                        <span className="block text-xs font-medium text-muted-foreground mb-1">
                          Title
                        </span>
                        <input
                          type="text"
                          defaultValue={mergedTitle?.[lang] ?? ""}
                          placeholder={p.title?.[lang] ?? ""}
                          onChange={(e) =>
                            setProductField(category, p.code, "title", lang, e.target.value)
                          }
                          className="w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                        />
                      </label>
                      <label className="block">
                        <span className="block text-xs font-medium text-muted-foreground mb-1">
                          Description
                        </span>
                        <textarea
                          rows={4}
                          defaultValue={mergedDesc?.[lang] ?? ""}
                          placeholder={p.desc?.[lang] ?? ""}
                          onChange={(e) =>
                            setProductField(category, p.code, "desc", lang, e.target.value)
                          }
                          className="w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none resize-y"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Edit Products | Dolce Bambini" },
      { name: "description", content: "Edit product titles and descriptions." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

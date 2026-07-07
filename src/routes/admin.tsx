import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PRODUCTS, type Lang, type Product } from "@/lib/site-content";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/ProductCard";
import {
  useOverrides,
  saveProductOverride,
  deleteProductOverride,
  mergeTr,
  type FieldMap,
} from "@/lib/product-overrides";

const CATEGORIES = ["boys", "girls", "silk", "accessories", "communion"] as const;
type Cat = (typeof CATEGORIES)[number];
const EDIT_LANGS: Lang[] = ["el", "en"];

type Status = "idle" | "saving" | "saved" | "error";

function ProductEditor({
  product,
  category,
  serverTitle,
  serverDesc,
}: {
  product: Product;
  category: string;
  serverTitle: FieldMap;
  serverDesc: FieldMap;
}) {
  const code = product.code;
  const baseTitle = (product.title as FieldMap | undefined) ?? {};
  const baseDesc = (product.desc as FieldMap | undefined) ?? {};
  const [title, setTitle] = useState<FieldMap>(serverTitle);
  const [desc, setDesc] = useState<FieldMap>(serverDesc);
  const [status, setStatus] = useState<Status>("idle");
  const [dirty, setDirty] = useState(false);

  // resync when server updates via realtime while we're not editing
  useEffect(() => {
    if (!dirty) {
      setTitle(serverTitle);
      setDesc(serverDesc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(serverTitle), JSON.stringify(serverDesc)]);

  useEffect(() => {
    if (!dirty) return;
    const handle = setTimeout(async () => {
      setStatus("saving");
      try {
        await saveProductOverride(category, code, title, desc);
        setStatus("saved");
        setDirty(false);
        setTimeout(() => setStatus("idle"), 1200);
      } catch (e) {
        console.error(e);
        setStatus("error");
      }
    }, 600);
    return () => clearTimeout(handle);
  }, [title, desc, dirty, category, code]);

  const mergedTitle = mergeTr(product.title, title);
  const mergedDesc = mergeTr(product.desc, desc);
  const previewProduct: Product = { ...product, title: mergedTitle, desc: mergedDesc };

  const hasOverride =
    Object.values(title).some((v) => v && v.trim() !== "") ||
    Object.values(desc).some((v) => v && v.trim() !== "");

  return (
    <section className="rounded-3xl border border-border/60 bg-card soft-shadow overflow-hidden">
      <div className="grid gap-6 p-6 md:grid-cols-[1fr]">
        <div className="flex items-center justify-between">
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Code {code}
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span
              className={
                status === "saving"
                  ? "text-muted-foreground"
                  : status === "saved"
                    ? "text-primary"
                    : status === "error"
                      ? "text-red-500"
                      : "text-muted-foreground/50"
              }
            >
              {status === "saving" && "Saving…"}
              {status === "saved" && "Saved ✓"}
              {status === "error" && "Save failed"}
            </span>
            {hasOverride && (
              <button
                onClick={async () => {
                  if (!confirm(`Reset ${code} to defaults?`)) return;
                  await deleteProductOverride(category, code);
                  setTitle({});
                  setDesc({});
                  setDirty(false);
                }}
                className="text-muted-foreground hover:text-foreground underline underline-offset-2"
              >
                Reset
              </button>
            )}
          </div>
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
                  value={title[lang] ?? ""}
                  placeholder={baseTitle[lang] ?? ""}
                  onChange={(e) => {
                    setDirty(true);
                    setTitle((prev) => ({ ...prev, [lang]: e.target.value }));
                  }}
                  className="w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="block text-xs font-medium text-muted-foreground mb-1">
                  Description
                </span>
                <textarea
                  rows={4}
                  value={desc[lang] ?? ""}
                  placeholder={baseDesc[lang] ?? ""}
                  onChange={(e) => {
                    setDirty(true);
                    setDesc((prev) => ({ ...prev, [lang]: e.target.value }));
                  }}
                  className="w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none resize-y"
                />
              </label>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-dashed border-border/60 p-4">
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Live preview
          </div>
          <div className="max-w-xs">
            <ProductCard product={previewProduct} category={category} />
          </div>
        </div>
      </div>
    </section>
  );
}

function AdminPage() {
  const navigate = useNavigate();
  const overrides = useOverrides();
  const [category, setCategory] = useState<Cat>("boys");
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [claimMsg, setClaimMsg] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const refresh = async (uid: string | null) => {
      if (!uid) {
        if (mounted) {
          setIsAdmin(false);
          setUserId(null);
          setEmail(null);
        }
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin")
        .maybeSingle();
      if (mounted) setIsAdmin(!!data);
    };

    supabase.auth.getSession().then(({ data }) => {
      const uid = data.session?.user.id ?? null;
      if (!mounted) return;
      setUserId(uid);
      setEmail(data.session?.user.email ?? null);
      if (!uid) {
        navigate({ to: "/auth" });
      } else {
        refresh(uid);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const uid = session?.user.id ?? null;
      setUserId(uid);
      setEmail(session?.user.email ?? null);
      if (!uid) navigate({ to: "/auth" });
      else refresh(uid);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const claim = async () => {
    setClaiming(true);
    setClaimMsg(null);
    try {
      const { data, error } = await supabase.rpc("claim_admin");
      if (error) throw error;
      if (data) {
        setIsAdmin(true);
        setClaimMsg("You are now the admin.");
      } else {
        setClaimMsg("An admin already exists. Ask them to grant you access.");
      }
    } catch (e) {
      setClaimMsg(e instanceof Error ? e.message : String(e));
    } finally {
      setClaiming(false);
    }
  };

  const products = PRODUCTS[category] ?? [];
  const editedCount = useMemo(
    () => Object.keys(overrides[category] ?? {}).length,
    [overrides, category],
  );

  if (userId === null) return null; // redirecting

  if (isAdmin === false) {
    return (
      <div className="mx-auto max-w-lg px-5 pt-20 pb-20 text-center">
        <div className="text-[11px] tracking-[0.35em] uppercase text-primary mb-3">Admin</div>
        <h1 className="font-display text-3xl tracking-tight mb-3">Not an admin yet</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Signed in as <span className="font-medium">{email}</span>. Only admins can edit
          product content. If you are the site owner and no admin exists yet, claim it now.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={claim}
            disabled={claiming}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold tracking-[0.18em] uppercase text-primary-foreground hover:opacity-90 disabled:opacity-60"
          >
            {claiming ? "…" : "Claim admin"}
          </button>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
            className="rounded-full border border-border/70 px-5 py-2.5 text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground"
          >
            Sign out
          </button>
        </div>
        {claimMsg && <p className="mt-6 text-sm text-muted-foreground">{claimMsg}</p>}
      </div>
    );
  }

  if (isAdmin === null) {
    return <div className="mx-auto max-w-7xl px-5 pt-16 text-sm text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-10 pb-20">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] tracking-[0.35em] uppercase text-primary mb-2">Admin</div>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight">
            Edit product content
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
            Changes save to Lovable Cloud and appear instantly for every visitor.
            Signed in as <span className="font-medium">{email}</span>.
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
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
            className="rounded-full border border-border/70 px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground hover:border-foreground/40"
          >
            Sign out
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

      <div className="space-y-6">
        {products.map((p) => {
          const ov = overrides[category]?.[p.code];
          return (
            <ProductEditor
              key={p.code}
              product={p}
              category={category}
              serverTitle={ov?.title ?? {}}
              serverDesc={ov?.desc ?? {}}
            />
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

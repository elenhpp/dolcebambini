import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setMsg("Check your inbox to confirm your email, then sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      }
    } catch (e) {
      setMsg(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-5 pt-16 pb-20">
      <div className="text-[11px] tracking-[0.35em] uppercase text-primary mb-3 text-center">
        Admin access
      </div>
      <h1 className="font-display text-4xl text-center tracking-tight mb-8">
        {mode === "signin" ? "Sign in" : "Create account"}
      </h1>
      <form onSubmit={submit} className="space-y-4 rounded-3xl border border-border/60 bg-card soft-shadow p-6">
        <label className="block">
          <span className="block text-xs font-medium text-muted-foreground mb-1">Email</span>
          <input
            type="email" required autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-medium text-muted-foreground mb-1">Password</span>
          <input
            type="password" required minLength={6}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </label>
        {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
        <button
          type="submit" disabled={loading}
          className="w-full rounded-full bg-primary px-5 py-2.5 text-sm font-semibold tracking-[0.18em] uppercase text-primary-foreground hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "…" : mode === "signin" ? "Sign in" : "Sign up"}
        </button>
        <button
          type="button"
          onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setMsg(null); }}
          className="w-full text-xs text-muted-foreground hover:text-foreground"
        >
          {mode === "signin" ? "No account? Create one" : "Already have an account? Sign in"}
        </button>
      </form>
      <div className="mt-6 text-center">
        <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
          ← Back to site
        </Link>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in | Dolce Bambini" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

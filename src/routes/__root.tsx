import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LangProvider } from "@/lib/lang";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">Try again</button>
          <a href="/" className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dolce Bambini — Χειροποίητα Βαπτιστικά από το 1978" },
      { name: "description", content: "Dolce Bambini: χειροποίητα βαπτιστικά ρούχα και ενδύματα κοινωνίας με ρομαντική κομψότητα. Collection 2026 για αγόρι και κορίτσι." },
      { property: "og:title", content: "Dolce Bambini — Χειροποίητα Βαπτιστικά από το 1978" },
      { property: "og:description", content: "Dolce Bambini: χειροποίητα βαπτιστικά ρούχα και ενδύματα κοινωνίας με ρομαντική κομψότητα. Collection 2026 για αγόρι και κορίτσι." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Dolce Bambini — Χειροποίητα Βαπτιστικά από το 1978" },
      { name: "twitter:description", content: "Dolce Bambini: χειροποίητα βαπτιστικά ρούχα και ενδύματα κοινωνίας με ρομαντική κομψότητα. Collection 2026 για αγόρι και κορίτσι." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/136f8e10-5c13-47b6-850b-f4f0198d3b94/id-preview-8f762833--1d8a9e94-cf19-4c0b-bb93-fb121794a578.lovable.app-1782660930478.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/136f8e10-5c13-47b6-850b-f4f0198d3b94/id-preview-8f762833--1d8a9e94-cf19-4c0b-bb93-fb121794a578.lovable.app-1782660930478.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="el">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1"><Outlet /></main>
          <Footer />
        </div>
      </LangProvider>
    </QueryClientProvider>
  );
}

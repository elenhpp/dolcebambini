import { createFileRoute } from "@tanstack/react-router";
import { ProductDetail } from "@/components/ProductDetail";

function Page() {
  const { code } = Route.useParams();
  return <ProductDetail category="silk" code={code} />;
}

export const Route = createFileRoute("/silk/$code")({
  head: () => ({
    meta: [
      { title: "Silk Collection — Προϊόν | Dolce Bambini" },
      { name: "description", content: "Λεπτομέρειες μεταξωτού βαπτιστικού." },
    ],
  }),
  component: Page,
});

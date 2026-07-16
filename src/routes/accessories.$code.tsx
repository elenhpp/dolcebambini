import { createFileRoute } from "@tanstack/react-router";
import { ProductDetail } from "@/components/ProductDetail";

function Page() {
  const { code } = Route.useParams();
  return <ProductDetail category="accessories" code={code} />;
}

export const Route = createFileRoute("/accessories/$code")({
  head: () => ({
    meta: [
      { title: "Αξεσουάρ Βάπτισης — Προϊόν | Dolce Bambini" },
      { name: "description", content: "Λεπτομέρειες αξεσουάρ βάπτισης." },
    ],
  }),
  component: Page,
});

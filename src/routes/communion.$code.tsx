import { createFileRoute } from "@tanstack/react-router";
import { ProductDetail } from "@/components/ProductDetail";

function Page() {
  const { code } = Route.useParams();
  return <ProductDetail category="communion" code={code} />;
}

export const Route = createFileRoute("/communion/$code")({
  head: () => ({
    meta: [
      { title: "Communion — Προϊόν | Dolce Bambini" },
      { name: "description", content: "Λεπτομέρειες φορέματος Πρώτης Κοινωνίας." },
    ],
  }),
  component: Page,
});

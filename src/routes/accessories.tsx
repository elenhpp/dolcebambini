import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import { PRODUCTS, T } from "@/lib/site-content";

function Page() {
  return (
    <CategoryPage
      title={T.pages.accessories.title}
      sub={T.pages.accessories.sub}
      products={PRODUCTS.accessories}
    />
  );
}

export const Route = createFileRoute("/accessories")({
  head: () => ({ meta: [
    { title: "Αξεσουάρ Βάπτισης | Dolce Bambini" },
    { name: "description", content: "Σετ και αξεσουάρ βάπτισης Dolce Bambini." },
  ]}),
  component: Page,
});

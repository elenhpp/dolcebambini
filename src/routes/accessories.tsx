import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import { PRODUCTS, T } from "@/lib/site-content";

function Page() {
  return (
    <CategoryPage
      title={{ el: T.pages.accessories.el.title, en: T.pages.accessories.en.title }}
      sub={{ el: T.pages.accessories.el.sub, en: T.pages.accessories.en.sub }}
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

import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import { PRODUCTS, T } from "@/lib/site-content";

function Page() {
  return (
    <CategoryPage
      title={{ el: T.pages.girls.el.title, en: T.pages.girls.en.title }}
      sub={{ el: T.pages.girls.el.sub, en: T.pages.girls.en.sub }}
      products={PRODUCTS.girls}
    />
  );
}

export const Route = createFileRoute("/girls")({
  head: () => ({ meta: [
    { title: "Κορίτσι — Collection 2026 | Dolce Bambini" },
    { name: "description", content: "Βαπτιστικά φορέματα για κορίτσι από τη συλλογή 2026 της Dolce Bambini." },
  ]}),
  component: Page,
});

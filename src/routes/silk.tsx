import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import { PRODUCTS, T } from "@/lib/site-content";

function Page() {
  return (
    <CategoryPage
      title={{ el: T.pages.silk.el.title, en: T.pages.silk.en.title }}
      sub={{ el: T.pages.silk.el.sub, en: T.pages.silk.en.sub }}
      products={PRODUCTS.silk}
    />
  );
}

export const Route = createFileRoute("/silk")({
  head: () => ({ meta: [
    { title: "Silk Collection | Dolce Bambini" },
    { name: "description", content: "Πολυτελή μεταξωτά βαπτιστικά φορέματα Silk Collection." },
  ]}),
  component: Page,
});

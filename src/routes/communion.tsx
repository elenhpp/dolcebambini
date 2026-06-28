import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import { PRODUCTS, T } from "@/lib/site-content";

function Page() {
  return (
    <CategoryPage
      title={{ el: T.pages.communion.el.title, en: T.pages.communion.en.title }}
      sub={{ el: T.pages.communion.el.sub, en: T.pages.communion.en.sub }}
      products={PRODUCTS.communion}
    />
  );
}

export const Route = createFileRoute("/communion")({
  head: () => ({ meta: [
    { title: "Communion Collection | Dolce Bambini" },
    { name: "description", content: "Φορέματα Πρώτης Κοινωνίας Dolce Bambini." },
  ]}),
  component: Page,
});

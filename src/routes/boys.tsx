import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import { PRODUCTS, T } from "@/lib/site-content";

function Page() {
  return (
    <CategoryPage
      title={T.pages.boys.title}
      sub={T.pages.boys.sub}
      products={PRODUCTS.boys} category="boys"
    />
  );
}

export const Route = createFileRoute("/boys")({
  head: () => ({ meta: [
    { title: "Αγόρι — Collection 2026 | Dolce Bambini" },
    { name: "description", content: "Βαπτιστικά σύνολα για αγόρι από τη συλλογή 2026 της Dolce Bambini." },
  ]}),
  component: Page,
});

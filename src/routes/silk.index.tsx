import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import { PRODUCTS, T } from "@/lib/site-content";

function Page() {
  return (
    <CategoryPage
      title={T.pages.silk.title}
      sub={T.pages.silk.sub}
      products={PRODUCTS.silk}
      category="silk"
    />
  );
}

export const Route = createFileRoute("/silk/")({
  head: () => ({
    meta: [
      { title: "Silk Collection | Dolce Bambini" },
      { name: "description", content: "Πολυτελή μεταξωτά βαπτιστικά φορέματα Silk Collection." },
    ],
  }),
  component: Page,
});

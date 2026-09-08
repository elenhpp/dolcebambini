import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import { PRODUCTS, T } from "@/lib/site-content";

function Page() {
  return (
    <CategoryPage
      title={T.pages.winterBoys.title}
      sub={T.pages.winterBoys.sub}
      products={PRODUCTS.winterBoys}
      category="winterBoys"
    />
  );
}

export const Route = createFileRoute("/winterBoys/")({
  head: () => ({
    meta: [
      { title: "Winter — Boy | Dolce Bambini" },
      {
        name: "description",
        content: "Winter baptism sets for boys from the Dolce Bambini 2026 collection.",
      },
    ],
  }),
  component: Page,
});

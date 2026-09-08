import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import { PRODUCTS, T } from "@/lib/site-content";

function Page() {
  return (
    <CategoryPage
      title={T.pages.winterGirls.title}
      sub={T.pages.winterGirls.sub}
      products={PRODUCTS.winterGirls}
      category="winterGirls"
    />
  );
}

export const Route = createFileRoute("/winterGirls/")({
  head: () => ({
    meta: [
      { title: "Winter — Girl | Dolce Bambini" },
      {
        name: "description",
        content:
          "Winter baptism dresses and coats for girls from the Dolce Bambini 2026 collection.",
      },
    ],
  }),
  component: Page,
});

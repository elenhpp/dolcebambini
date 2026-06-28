import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import { PRODUCTS, T } from "@/lib/site-content";

function Page() {
  return (
    <CategoryPage
      title={T.pages.communion.title}
      sub={T.pages.communion.sub}
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

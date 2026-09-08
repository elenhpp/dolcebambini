import { createFileRoute } from "@tanstack/react-router";
import { ProductDetail } from "@/components/ProductDetail";

function Page() {
  const { code } = Route.useParams();
  return <ProductDetail category="winterGirls" code={code} />;
}

export const Route = createFileRoute("/winterGirls/$code")({
  head: () => ({
    meta: [
      { title: "Winter — Girl — Product | Dolce Bambini" },
      { name: "description", content: "Product details." },
    ],
  }),
  component: Page,
});

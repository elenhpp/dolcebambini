import { createFileRoute } from "@tanstack/react-router";
import { ProductDetail } from "@/components/ProductDetail";

function Page() {
  const { code } = Route.useParams();
  return <ProductDetail category="winterBoys" code={code} />;
}

export const Route = createFileRoute("/winterBoys/$code")({
  head: () => ({
    meta: [
      { title: "Winter — Boy — Product | Dolce Bambini" },
      { name: "description", content: "Product details." },
    ],
  }),
  component: Page,
});

import { createFileRoute } from "@tanstack/react-router";
import { ProductDetail } from "@/components/ProductDetail";

function Page() {
  const { code } = Route.useParams();
  return <ProductDetail category="boys" code={code} />;
}

export const Route = createFileRoute("/boys/$code")({
  head: () => ({
    meta: [
      { title: "Boys — Product | Dolce Bambini" },
      { name: "description", content: "Product details." },
    ],
  }),
  component: Page,
});

import { createFileRoute } from "@tanstack/react-router";
import { ProductDetail } from "@/components/ProductDetail";

function Page() {
  const { code } = Route.useParams();
  return <ProductDetail category="girls" code={code} />;
}

export const Route = createFileRoute("/girls/$code")({
  head: () => ({
    meta: [
      { title: "Girls — Product | Dolce Bambini" },
      { name: "description", content: "Product details." },
    ],
  }),
  component: Page,
});

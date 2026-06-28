import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import { PRODUCTS, T } from "@/lib/site-content";

export const Route = createFileRoute("/boys")({
  head: () => ({ meta: [{ title: "Αγόρι — Collection 2026 | Dolce Bambini" }, { name: "description", content: "Βαπτιστικά σύνολα για αγόρι, Collection 2026." }] }),
  component: () => <CategoryPage title={T.pages.boys.el && { el: T.pages.boys.el.title, en: T.pages.boys.en.title }} sub={{ el: T.pages.boys.el.sub, en: T.pages.boys.en.sub }} products={PRODUCTS.boys} />,
});

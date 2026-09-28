import { createFileRoute } from "@tanstack/react-router";
import { SilkHome } from "@/components/home/SilkHome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dolce Bambini — Χειροποίητα Βαπτιστικά | Collection 2026" },
      { name: "description", content: "Χειροποίητα βαπτιστικά ρούχα και ενδύματα κοινωνίας. Collection 2026 για αγόρι και κορίτσι, Silk Collection και αξεσουάρ βάπτισης." },
    ],
    links: [],
  }),
  component: SilkHome,
});

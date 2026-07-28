import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/silk")({
  component: () => <Outlet />,
});

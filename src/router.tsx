import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // The homepage is a scroll animation that always starts from the top
    scrollRestoration: ({ location }) => location.pathname !== "/",
    defaultPreloadStaleTime: 0,
  });

  return router;
};

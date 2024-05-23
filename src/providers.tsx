import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // this is set to true if the token is set
      // if you wanna make a query before the token is set, set enabled to true in query
      enabled: false,
      refetchOnWindowFocus: false,
      staleTime: 1000,
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

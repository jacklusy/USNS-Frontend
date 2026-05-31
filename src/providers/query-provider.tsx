"use client";

import { useEffect, useRef, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { handleGlobalQueryError } from "@/lib/query-error-handler";
import { createQueryClient } from "@/lib/query-client";
import { setupOnlineManager } from "@/lib/online-manager-setup";

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const queryClientRef = useRef<ReturnType<typeof createQueryClient> | null>(
    null,
  );

  const [queryClient] = useState(() => {
    const client = createQueryClient((error) => {
      const invalidate = () => {
        void queryClientRef.current?.invalidateQueries();
      };
      handleGlobalQueryError(error, invalidate);
    });
    queryClientRef.current = client;
    return client;
  });

  useEffect(() => {
    return setupOnlineManager(queryClient);
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" ? (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      ) : null}
    </QueryClientProvider>
  );
}

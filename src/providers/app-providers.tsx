"use client";

import { ToastContainer } from "@/components/shared/ToastContainer";
import { QueryProvider } from "./query-provider";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      {children}
      <ToastContainer />
    </QueryProvider>
  );
}

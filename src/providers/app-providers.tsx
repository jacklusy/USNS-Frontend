"use client";

import { ToastContainer } from "@/components/shared/ToastContainer";
import { AuthNavigationBootstrap } from "./auth-navigation-bootstrap";
import { QueryProvider } from "./query-provider";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <AuthNavigationBootstrap />
      {children}
      <ToastContainer />
    </QueryProvider>
  );
}

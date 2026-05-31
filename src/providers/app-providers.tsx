"use client";

import { ToastContainer } from "@/components/shared/ToastContainer";
import { AuthNavigationBootstrap } from "./auth-navigation-bootstrap";
import { ErrorBoundaryProvider } from "./error-boundary-provider";
import { QueryProvider } from "./query-provider";
import { ThemeSync } from "./theme-sync";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <ThemeSync />
      <AuthNavigationBootstrap />
      <ErrorBoundaryProvider>{children}</ErrorBoundaryProvider>
      <ToastContainer />
    </QueryProvider>
  );
}

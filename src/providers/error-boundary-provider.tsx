"use client";

import { usePathname } from "next/navigation";
import { AppErrorBoundary } from "@/components/shared/AppErrorBoundary";

interface ErrorBoundaryProviderProps {
  children: React.ReactNode;
}

export function ErrorBoundaryProvider({
  children,
}: ErrorBoundaryProviderProps) {
  const pathname = usePathname();

  return <AppErrorBoundary key={pathname}>{children}</AppErrorBoundary>;
}

"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { loginWithReturn } from "@/constants/routes.constants";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { AuthGuardShell } from "@/components/layouts/AuthGuardShell";

interface RouteGuardProps {
  children: ReactNode;
}

export function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isHydrated } = useAuth();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace(loginWithReturn(pathname));
    }
  }, [isHydrated, isAuthenticated, pathname, router]);

  if (!isHydrated || !isAuthenticated) {
    return <AuthGuardShell />;
  }

  return <>{children}</>;
}

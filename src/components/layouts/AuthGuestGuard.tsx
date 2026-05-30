"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes.constants";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { AuthGuardShell } from "./AuthGuardShell";

interface AuthGuestGuardProps {
  children: ReactNode;
}

export function AuthGuestGuard({ children }: AuthGuestGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isHydrated } = useAuth();

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.replace(ROUTES.DASHBOARD);
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated) {
    return <AuthGuardShell />;
  }

  if (isAuthenticated) {
    return <AuthGuardShell />;
  }

  return <>{children}</>;
}

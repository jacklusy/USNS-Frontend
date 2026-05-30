"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { loginWithReturn } from "@/constants/routes.constants";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { AuthGuardShell } from "./AuthGuardShell";

interface AuthRequireGuardProps {
  children: ReactNode;
}

export function AuthRequireGuard({ children }: AuthRequireGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isHydrated } = useAuth();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace(loginWithReturn(pathname));
    }
  }, [isHydrated, isAuthenticated, pathname, router]);

  if (!isHydrated) {
    return <AuthGuardShell />;
  }

  if (!isAuthenticated) {
    return <AuthGuardShell />;
  }

  return <>{children}</>;
}

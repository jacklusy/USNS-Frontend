"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes.constants";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { AuthGuardShell } from "@/components/layouts/AuthGuardShell";

export function HomeRedirect() {
  const router = useRouter();
  const { isAuthenticated, isHydrated } = useAuth();

  useEffect(() => {
    if (!isHydrated) return;
    router.replace(isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN);
  }, [isHydrated, isAuthenticated, router]);

  return <AuthGuardShell />;
}

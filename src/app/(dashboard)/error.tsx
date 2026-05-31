"use client";

import { useEffect } from "react";
import { HttpErrorScreen } from "@/components/shared/HttpErrorScreen";
import { HTTP_ERROR_PAGES } from "@/constants/http-error.constants";
import { ROUTES } from "@/constants/routes.constants";
import { logClientError, reportClientError } from "@/lib/error-logger";
import { useRouter } from "next/navigation";

interface DashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  const router = useRouter();

  useEffect(() => {
    logClientError(error, { boundary: "dashboard-error" });
    reportClientError(error, { boundary: "dashboard-error" });
  }, [error]);

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push(ROUTES.DASHBOARD);
  };

  return (
    <HttpErrorScreen
      config={HTTP_ERROR_PAGES.server}
      onGoBack={handleGoBack}
      onGoDashboard={() => router.push(ROUTES.DASHBOARD)}
      onRetry={reset}
    />
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { HttpErrorScreen } from "@/components/shared/HttpErrorScreen";
import {
  HTTP_ERROR_PAGES,
  HTTP_ERROR_RATE_LIMIT_DEFAULT_SECONDS,
  type HttpErrorPageKey,
} from "@/constants/http-error.constants";
import { ROUTES } from "@/constants/routes.constants";

interface HttpErrorPageViewProps {
  pageKey: HttpErrorPageKey;
}

export function HttpErrorPageView({ pageKey }: HttpErrorPageViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const config = HTTP_ERROR_PAGES[pageKey];

  const retryAfterRaw = searchParams.get("retryAfter");
  const retryAfterParsed = retryAfterRaw
    ? Number.parseInt(retryAfterRaw, 10)
    : NaN;
  const retryAfterSeconds = Number.isNaN(retryAfterParsed)
    ? HTTP_ERROR_RATE_LIMIT_DEFAULT_SECONDS
    : retryAfterParsed;

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push(ROUTES.DASHBOARD);
  };

  return (
    <HttpErrorScreen
      config={config}
      retryAfterSeconds={
        pageKey === "rateLimit" ? retryAfterSeconds : undefined
      }
      onGoBack={handleGoBack}
      onGoDashboard={() => router.push(ROUTES.DASHBOARD)}
      onRetry={() => router.refresh()}
    />
  );
}

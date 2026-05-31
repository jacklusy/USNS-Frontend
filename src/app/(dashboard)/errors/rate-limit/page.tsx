import type { Metadata } from "next";
import { Suspense } from "react";
import { HttpErrorPageView } from "@/components/shared/HttpErrorPageView";
import { HTTP_ERROR_PAGES } from "@/constants/http-error.constants";

export const metadata: Metadata = {
  title: HTTP_ERROR_PAGES.rateLimit.documentTitle,
};

export default function RateLimitErrorPage() {
  return (
    <Suspense fallback={null}>
      <HttpErrorPageView pageKey="rateLimit" />
    </Suspense>
  );
}

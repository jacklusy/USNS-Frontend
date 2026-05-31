import { redirectToAuthError } from "@/lib/auth-error-router";
import {
  redirectToHttpError,
  shouldRedirectToHttpErrorPage,
} from "@/lib/http-error-router";
import { showQueryErrorToast } from "@/hooks/useToast";
import type { AppError } from "@/types/error.types";

export function handleGlobalQueryError(
  error: AppError,
  onNetworkRetry?: () => void,
): void {
  if (error.code === "UNAUTHORIZED") {
    redirectToAuthError("unauthorized");
    return;
  }

  if (shouldRedirectToHttpErrorPage(error.code)) {
    redirectToHttpError(error.code, {
      retryAfterSeconds: error.retryAfterSeconds,
    });
    return;
  }

  if (error.code === "NETWORK_ERROR") {
    showQueryErrorToast(error.message, onNetworkRetry);
    return;
  }

  if (error.code === "VALIDATION_ERROR" || error.code === "NOT_FOUND") {
    showQueryErrorToast(error.message);
    return;
  }

  showQueryErrorToast(error.message);
}

import { ROUTES, errorsRateLimitRoute } from "@/constants/routes.constants";
import type { AppErrorCode } from "@/types/error.types";

export interface HttpErrorRedirectOptions {
  retryAfterSeconds?: number;
}

const HTTP_ERROR_ROUTES: Partial<Record<AppErrorCode, string>> = {
  BAD_REQUEST: ROUTES.ERRORS_BAD_REQUEST,
  FORBIDDEN: ROUTES.ERRORS_FORBIDDEN,
  CONFLICT: ROUTES.ERRORS_CONFLICT,
  VALIDATION_ERROR: ROUTES.ERRORS_VALIDATION,
  RATE_LIMITED: ROUTES.ERRORS_RATE_LIMIT,
  SERVER_ERROR: ROUTES.ERRORS_SERVER,
  SERVICE_UNAVAILABLE: ROUTES.ERRORS_UNAVAILABLE,
};

let navigate: ((path: string) => void) | null = null;

export function registerHttpErrorRouter(
  navigateFn: (path: string) => void,
): void {
  navigate = navigateFn;
}

export function redirectToHttpError(
  code: AppErrorCode,
  options?: HttpErrorRedirectOptions,
): void {
  const basePath = HTTP_ERROR_ROUTES[code];
  if (!basePath) {
    return;
  }

  if (code === "RATE_LIMITED") {
    navigate?.(
      errorsRateLimitRoute(options?.retryAfterSeconds),
    );
    return;
  }

  navigate?.(basePath);
}

export function shouldRedirectToHttpErrorPage(code: AppErrorCode): boolean {
  return code in HTTP_ERROR_ROUTES;
}

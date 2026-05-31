import { QueryCache, QueryClient } from "@tanstack/react-query";
import type { AppError, AppErrorCode } from "@/types/error.types";

function isAppError(value: unknown): value is AppError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value
  );
}

function normalizeQueryError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }
  if (error instanceof Error) {
    return {
      code: "NETWORK_ERROR",
      message: error.message,
    };
  }
  return {
    code: "NETWORK_ERROR",
    message: "An unexpected error occurred",
  };
}

const NO_RETRY_CODES: ReadonlySet<AppErrorCode> = new Set([
  "UNAUTHORIZED",
  "FORBIDDEN",
  "NOT_FOUND",
  "BAD_REQUEST",
  "CONFLICT",
  "VALIDATION_ERROR",
]);

function shouldRetryQuery(failureCount: number, error: unknown): boolean {
  const appError = normalizeQueryError(error);
  if (NO_RETRY_CODES.has(appError.code)) {
    return false;
  }
  if (appError.code === "NETWORK_ERROR") {
    return failureCount < 3;
  }
  if (
    appError.code === "SERVER_ERROR" ||
    appError.code === "SERVICE_UNAVAILABLE" ||
    appError.code === "RATE_LIMITED"
  ) {
    return failureCount < 1;
  }
  return failureCount < 1;
}

const STALE_TIME_MS = 5 * 60 * 1000;
const GC_TIME_MS = 10 * 60 * 1000;

export function createQueryClient(
  onError?: (error: AppError) => void,
): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME_MS,
        gcTime: GC_TIME_MS,
        retry: shouldRetryQuery,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        const appError = normalizeQueryError(error);
        onError?.(appError);
      },
    }),
  });
}

export type { AppErrorCode };

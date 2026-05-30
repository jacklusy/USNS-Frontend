import type { AppError } from "@/types/error.types";

export function validationError(
  details: Record<string, string[]>,
  message = "Validation failed",
): AppError {
  return {
    code: "VALIDATION_ERROR",
    message,
    details,
  };
}

export function notFoundError(message: string): AppError {
  return {
    code: "NOT_FOUND",
    message,
  };
}

export function forbiddenError(message: string): AppError {
  return {
    code: "FORBIDDEN",
    message,
  };
}

import type { UseFormSetError, FieldValues, Path } from "react-hook-form";
import type { AppError } from "@/types/error.types";

export function applyAppErrorToForm<T extends FieldValues>(
  error: AppError,
  setError: UseFormSetError<T>,
): boolean {
  if (error.code !== "VALIDATION_ERROR" || !error.details) {
    return false;
  }

  let mapped = false;
  for (const [field, messages] of Object.entries(error.details)) {
    const message = messages[0];
    if (message) {
      setError(field as Path<T>, { type: "server", message });
      mapped = true;
    }
  }
  return mapped;
}

import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { AppError } from "@/types/error.types";

export function applyAppErrorToForm<T extends FieldValues>(
  error: AppError,
  setError: UseFormSetError<T>,
): boolean {
  if (error.code !== "VALIDATION_ERROR" || !error.details) {
    return false;
  }

  for (const [field, messages] of Object.entries(error.details)) {
    const message = messages[0];
    if (!message) continue;
    setError(field as Path<T>, { message });
  }

  return true;
}

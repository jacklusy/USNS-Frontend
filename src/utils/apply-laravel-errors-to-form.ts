import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { AppError } from "@/types/error.types";

const GLOBAL_ERROR_KEYS = new Set(["general", "error", "message"]);

export interface ApplyLaravelErrorsResult {
  mappedFieldCount: number;
  globalMessage: string | null;
}

function joinFieldMessages(messages: string[]): string {
  return messages.filter(Boolean).join(" · ");
}

function isLikelyFormFieldKey(key: string): boolean {
  if (GLOBAL_ERROR_KEYS.has(key)) {
    return false;
  }
  return /^[a-zA-Z][\w.-]*$/.test(key);
}

export function applyLaravelErrorsToForm<T extends FieldValues>(
  errors: Record<string, string[]>,
  setError: UseFormSetError<T>,
): ApplyLaravelErrorsResult {
  const globalMessages: string[] = [];
  let mappedFieldCount = 0;

  for (const [fieldKey, messages] of Object.entries(errors)) {
    const joined = joinFieldMessages(messages);
    if (!joined) {
      continue;
    }

    if (isLikelyFormFieldKey(fieldKey)) {
      setError(fieldKey as Path<T>, { type: "server", message: joined });
      mappedFieldCount += 1;
      continue;
    }

    globalMessages.push(joined);
  }

  const globalMessage =
    globalMessages.length > 0 ? globalMessages.join(" · ") : null;

  if (globalMessage) {
    setError("root", { type: "server", message: globalMessage });
  }

  return { mappedFieldCount, globalMessage };
}

export function applyAppErrorToForm<T extends FieldValues>(
  error: AppError,
  setError: UseFormSetError<T>,
): boolean {
  if (error.code !== "VALIDATION_ERROR" || !error.details) {
    return false;
  }

  const result = applyLaravelErrorsToForm(error.details, setError);
  return result.mappedFieldCount > 0 || result.globalMessage !== null;
}

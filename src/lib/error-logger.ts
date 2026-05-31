import { env } from "@/config/env";

export interface ClientErrorContext {
  boundary?: string;
  route?: string;
}

function isError(value: unknown): value is Error {
  return value instanceof Error;
}

export function logClientError(
  error: unknown,
  context?: ClientErrorContext,
): void {
  if (!env.isDevelopment) {
    return;
  }
  const payload = isError(error)
    ? { message: error.message, stack: error.stack, context }
    : { error, context };
  console.error("[USNS client error]", payload);
}

export function reportClientError(
  _error: unknown,
  _context?: ClientErrorContext,
): void {}

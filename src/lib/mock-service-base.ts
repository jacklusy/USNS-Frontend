import { env } from "@/config/env";
import {
  getDelayOverrideMs,
  getSimulatedErrorCode,
  useMockDevStore,
} from "@/store/mock-dev.slice";
import type { AppError, AppErrorCode } from "@/types/error.types";

const DEFAULT_DELAY_MIN_MS = 200;
const DEFAULT_DELAY_MAX_MS = 500;

const SIMULATED_ERROR_MESSAGES: Record<AppErrorCode, string> = {
  UNAUTHORIZED: "Simulated unauthorized response from mock service.",
  FORBIDDEN: "Simulated forbidden response from mock service.",
  NOT_FOUND: "Simulated not found response from mock service.",
  BAD_REQUEST: "Simulated bad request response from mock service.",
  CONFLICT: "Simulated conflict response from mock service.",
  VALIDATION_ERROR: "Simulated validation error from mock service.",
  RATE_LIMITED: "Simulated rate limit response from mock service.",
  NETWORK_ERROR: "Simulated network error from mock service.",
  SERVER_ERROR: "Simulated server error from mock service.",
  SERVICE_UNAVAILABLE: "Simulated service unavailable from mock service.",
};

function randomDelayMs(): number {
  const override = getDelayOverrideMs();
  if (override !== null && override >= 0) {
    return override;
  }
  const min = env.mockDelayMinMs;
  const max = env.mockDelayMaxMs;
  return min + Math.floor(Math.random() * (max - min + 1));
}

export abstract class MockServiceBase {
  protected throwIfSimulatedError(): void {
    const code = getSimulatedErrorCode();
    if (!code) {
      return;
    }
    useMockDevStore.getState().setSimulatedErrorCode(null);
    const error: AppError = {
      code,
      message: SIMULATED_ERROR_MESSAGES[code],
      details:
        code === "VALIDATION_ERROR"
          ? { email: ["The email has already been taken."] }
          : undefined,
      retryAfterSeconds: code === "RATE_LIMITED" ? 30 : undefined,
    };
    throw error;
  }

  protected delay(ms?: number): Promise<void> {
    this.throwIfSimulatedError();
    const waitMs = ms ?? randomDelayMs();
    return new Promise((resolve) => setTimeout(resolve, waitMs));
  }
}

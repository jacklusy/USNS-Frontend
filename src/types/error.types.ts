export type AppErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "BAD_REQUEST"
  | "CONFLICT"
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "NETWORK_ERROR"
  | "SERVER_ERROR"
  | "SERVICE_UNAVAILABLE";

export interface AppError {
  code: AppErrorCode;
  message: string;
  details?: Record<string, string[]>;
  retryAfterSeconds?: number;
}

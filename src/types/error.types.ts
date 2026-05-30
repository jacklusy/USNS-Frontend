export type AppErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "NETWORK_ERROR"
  | "SERVER_ERROR";

export interface AppError {
  code: AppErrorCode;
  message: string;
  details?: Record<string, string[]>;
}

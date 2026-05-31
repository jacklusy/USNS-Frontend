import {
  AlertCircle,
  AlertTriangle,
  Ban,
  Clock,
  FileWarning,
  ServerCrash,
  ShieldAlert,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type HttpErrorPageKey =
  | "badRequest"
  | "forbidden"
  | "conflict"
  | "validation"
  | "rateLimit"
  | "server"
  | "unavailable";

export type HttpErrorActionKind =
  | "goBack"
  | "goDashboard"
  | "retry"
  | "rateLimitCountdown"
  | "autoRetry";

export interface HttpErrorPageConfig {
  pageKey: HttpErrorPageKey;
  documentTitle: string;
  title: string;
  description: string;
  icon: LucideIcon;
  primaryLabel: string;
  primaryAction: HttpErrorActionKind;
  secondaryLabel?: string;
  secondaryAction?: HttpErrorActionKind;
}

export const HTTP_ERROR_PAGES: Record<HttpErrorPageKey, HttpErrorPageConfig> = {
  badRequest: {
    pageKey: "badRequest",
    documentTitle: "Bad request — USNS Dashboard",
    title: "Invalid request",
    description:
      "Something in your request could not be processed. Check your input and try again.",
    icon: FileWarning,
    primaryLabel: "Go back",
    primaryAction: "goBack",
    secondaryLabel: "Go to dashboard",
    secondaryAction: "goDashboard",
  },
  forbidden: {
    pageKey: "forbidden",
    documentTitle: "Access denied — USNS Dashboard",
    title: "Access denied",
    description:
      "You do not have permission to view this page. Contact your administrator if you believe this is a mistake.",
    icon: Ban,
    primaryLabel: "Go back",
    primaryAction: "goBack",
    secondaryLabel: "Go to dashboard",
    secondaryAction: "goDashboard",
  },
  conflict: {
    pageKey: "conflict",
    documentTitle: "Conflict — USNS Dashboard",
    title: "Conflict detected",
    description:
      "This action conflicts with current data. Refresh the page or adjust your changes and try again.",
    icon: AlertTriangle,
    primaryLabel: "Refresh page",
    primaryAction: "retry",
    secondaryLabel: "Go to dashboard",
    secondaryAction: "goDashboard",
  },
  validation: {
    pageKey: "validation",
    documentTitle: "Validation error — USNS Dashboard",
    title: "Validation failed",
    description:
      "One or more fields need correction before this request can be completed. Review the form and try again.",
    icon: AlertCircle,
    primaryLabel: "Go back",
    primaryAction: "goBack",
    secondaryLabel: "Go to dashboard",
    secondaryAction: "goDashboard",
  },
  rateLimit: {
    pageKey: "rateLimit",
    documentTitle: "Too many requests — USNS Dashboard",
    title: "Too many requests",
    description:
      "You have sent too many requests in a short time. Wait a moment before trying again.",
    icon: Clock,
    primaryLabel: "Try again",
    primaryAction: "rateLimitCountdown",
    secondaryLabel: "Go to dashboard",
    secondaryAction: "goDashboard",
  },
  server: {
    pageKey: "server",
    documentTitle: "Server error — USNS Dashboard",
    title: "Server error",
    description:
      "Something went wrong on our servers. Please try again in a few moments.",
    icon: ServerCrash,
    primaryLabel: "Try again",
    primaryAction: "retry",
    secondaryLabel: "Go to dashboard",
    secondaryAction: "goDashboard",
  },
  unavailable: {
    pageKey: "unavailable",
    documentTitle: "Service unavailable — USNS Dashboard",
    title: "Service unavailable",
    description:
      "The service is temporarily unavailable due to maintenance or high load. We will retry automatically.",
    icon: ShieldAlert,
    primaryLabel: "Retry now",
    primaryAction: "retry",
    secondaryLabel: "Go to dashboard",
    secondaryAction: "goDashboard",
  },
} as const;

export const HTTP_ERROR_AUTO_RETRY = {
  intervalMs: 5000,
  maxAttempts: 5,
} as const;

export const HTTP_ERROR_RATE_LIMIT_DEFAULT_SECONDS = 60;

export const DEV_ERRORS_COPY = {
  title: "Error screens",
  description:
    "Trigger HTTP error pages through the global error router, as in production handling.",
} as const;

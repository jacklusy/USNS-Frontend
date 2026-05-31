import type { AppErrorCode } from "@/types/error.types";

export const MOCK_DEV_COPY = {
  title: "Mock development tools",
  description:
    "Configure simulated API errors and network delay for mock service calls. Settings apply to the next mock request.",
  errorSectionTitle: "Simulated error",
  errorSectionDescription:
    "The next mock service call throws the selected error. Clears automatically after one request.",
  delaySectionTitle: "Response delay",
  delaySectionDescription:
    "Override random delay (200–500ms default). Leave empty to use environment defaults.",
  clearLabel: "Clear all",
  seedStatsTitle: "Mock seed counts",
  delayMsLabel: "Delay (ms)",
  noErrorLabel: "None",
} as const;

export const MOCK_DEV_ERROR_OPTIONS: {
  value: AppErrorCode | null;
  label: string;
}[] = [
  { value: null, label: "None" },
  { value: "BAD_REQUEST", label: "400 Bad Request" },
  { value: "FORBIDDEN", label: "403 Forbidden" },
  { value: "NOT_FOUND", label: "404 Not Found" },
  { value: "CONFLICT", label: "409 Conflict" },
  { value: "VALIDATION_ERROR", label: "422 Validation" },
  { value: "RATE_LIMITED", label: "429 Rate Limited" },
  { value: "SERVER_ERROR", label: "500 Server Error" },
  { value: "SERVICE_UNAVAILABLE", label: "503 Unavailable" },
  { value: "NETWORK_ERROR", label: "Network Error" },
];

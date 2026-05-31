const DEFAULT_ACTIVITY_POLL_INTERVAL_MS = 60_000;

function parseActivityPollInterval(): number {
  const raw = process.env.NEXT_PUBLIC_ACTIVITY_POLL_INTERVAL_MS;
  if (!raw) {
    return DEFAULT_ACTIVITY_POLL_INTERVAL_MS;
  }
  const parsed = Number(raw);
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }
  return DEFAULT_ACTIVITY_POLL_INTERVAL_MS;
}

export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  isMockMode: process.env.NEXT_PUBLIC_MOCK_MODE === "true",
  isDevelopment: process.env.NODE_ENV === "development",
  activityPollIntervalMs: parseActivityPollInterval(),
} as const;

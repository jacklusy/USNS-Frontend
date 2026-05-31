const DEFAULT_ACTIVITY_POLL_INTERVAL_MS = 60_000;
const DEFAULT_MOCK_DELAY_MIN_MS = 200;
const DEFAULT_MOCK_DELAY_MAX_MS = 500;

function parsePositiveInt(
  raw: string | undefined,
  fallback: number,
): number {
  if (!raw) {
    return fallback;
  }
  const parsed = Number.parseInt(raw, 10);
  if (Number.isFinite(parsed) && parsed >= 0) {
    return parsed;
  }
  return fallback;
}

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
  mockDelayMinMs: parsePositiveInt(
    process.env.NEXT_PUBLIC_MOCK_DELAY_MIN_MS,
    DEFAULT_MOCK_DELAY_MIN_MS,
  ),
  mockDelayMaxMs: parsePositiveInt(
    process.env.NEXT_PUBLIC_MOCK_DELAY_MAX_MS,
    DEFAULT_MOCK_DELAY_MAX_MS,
  ),
} as const;

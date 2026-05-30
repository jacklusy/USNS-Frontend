export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  isMockMode: process.env.NEXT_PUBLIC_MOCK_MODE === "true",
} as const;

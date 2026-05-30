export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  DASHBOARD: "/dashboard",
  SETTINGS: "/settings",
  SESSION_EXPIRED: "/session-expired",
  ERRORS_UNAUTHORIZED: "/errors/unauthorized",
  ERRORS_FORBIDDEN: "/errors/forbidden",
} as const;

export function loginWithReturn(returnUrl: string): string {
  const params = new URLSearchParams({ returnUrl });
  return `${ROUTES.LOGIN}?${params.toString()}`;
}

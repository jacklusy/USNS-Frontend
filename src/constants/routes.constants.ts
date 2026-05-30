export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  DASHBOARD: "/dashboard",
  SETTINGS: "/settings",
  PROFILE: "/profile",
  SESSION_EXPIRED: "/session-expired",
  ERRORS_UNAUTHORIZED: "/errors/unauthorized",
  ERRORS_FORBIDDEN: "/errors/forbidden",
  ANNOUNCEMENTS: "/announcements",
  USERS: "/users",
  DEV_UI_KIT: "/dev/ui-kit",
} as const;

export function loginWithReturn(returnUrl: string): string {
  const params = new URLSearchParams({ returnUrl });
  return `${ROUTES.LOGIN}?${params.toString()}`;
}

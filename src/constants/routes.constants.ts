export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  DASHBOARD: "/dashboard",
} as const;

export function loginWithReturn(returnUrl: string): string {
  const params = new URLSearchParams({ returnUrl });
  return `${ROUTES.LOGIN}?${params.toString()}`;
}

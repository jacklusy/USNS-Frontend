import { ROUTES } from "@/constants/routes.constants";

export type AuthErrorType = "unauthorized" | "forbidden" | "session-expired";

const AUTH_ERROR_ROUTES: Record<AuthErrorType, string> = {
  unauthorized: ROUTES.ERRORS_UNAUTHORIZED,
  forbidden: ROUTES.ERRORS_FORBIDDEN,
  "session-expired": ROUTES.SESSION_EXPIRED,
};

let navigate: ((path: string) => void) | null = null;

export function registerAuthErrorRouter(navigateFn: (path: string) => void): void {
  navigate = navigateFn;
}

export function redirectToAuthError(type: AuthErrorType): void {
  const path = AUTH_ERROR_ROUTES[type];
  navigate?.(path);
}

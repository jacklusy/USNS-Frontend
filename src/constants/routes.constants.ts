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
  ERRORS_BAD_REQUEST: "/errors/bad-request",
  ERRORS_CONFLICT: "/errors/conflict",
  ERRORS_VALIDATION: "/errors/validation",
  ERRORS_RATE_LIMIT: "/errors/rate-limit",
  ERRORS_SERVER: "/errors/server",
  ERRORS_UNAVAILABLE: "/errors/unavailable",
  DEV_ERRORS: "/dev/errors",
  DEV_MOCK_TOOLS: "/dev/mock-tools",
  ANNOUNCEMENTS: "/announcements",
  NOTIFICATIONS: "/notifications",
  USERS: "/users",
  ROLES: "/roles",
  COLLEGES: "/colleges",
  DEPARTMENTS: "/departments",
  PROGRAMS: "/programs",
  COURSES: "/courses",
  ACADEMIC_YEARS: "/academic-years",
  FACULTY: "/faculty",
  STAFF: "/staff",
  AUDIT: "/audit",
  REPORTS: "/reports",
  DEV_UI_KIT: "/dev/ui-kit",
} as const;

export function collegeDetailRoute(id: string): string {
  return `${ROUTES.COLLEGES}/${id}`;
}

export function departmentDetailRoute(id: string): string {
  return `${ROUTES.DEPARTMENTS}/${id}`;
}

export function programDetailRoute(id: string): string {
  return `${ROUTES.PROGRAMS}/${id}`;
}

export function courseDetailRoute(id: string): string {
  return `${ROUTES.COURSES}/${id}`;
}

export function academicYearDetailRoute(id: string): string {
  return `${ROUTES.ACADEMIC_YEARS}/${id}`;
}

export function userDetailRoute(id: string): string {
  return `${ROUTES.USERS}/${id}`;
}

export function facultyDetailRoute(id: string): string {
  return `${ROUTES.FACULTY}/${id}`;
}

export function staffDetailRoute(id: string): string {
  return `${ROUTES.STAFF}/${id}`;
}

export function auditLogDetailRoute(id: string): string {
  return `${ROUTES.AUDIT}/logs/${id}`;
}

export function systemEventDetailRoute(id: string): string {
  return `${ROUTES.AUDIT}/system-events/${id}`;
}

export function reportsEnrollmentRoute(): string {
  return `${ROUTES.REPORTS}/enrollment`;
}

export function reportsUsageRoute(): string {
  return `${ROUTES.REPORTS}/usage`;
}

export function profilePasswordTab(): string {
  return `${ROUTES.PROFILE}?tab=password`;
}

export function profilePreferencesTab(): string {
  return `${ROUTES.PROFILE}?tab=preferences`;
}

export function loginWithReturn(returnUrl: string): string {
  const params = new URLSearchParams({ returnUrl });
  return `${ROUTES.LOGIN}?${params.toString()}`;
}

export function errorsRateLimitRoute(retryAfterSeconds?: number): string {
  if (retryAfterSeconds === undefined) {
    return ROUTES.ERRORS_RATE_LIMIT;
  }
  const params = new URLSearchParams({
    retryAfter: String(retryAfterSeconds),
  });
  return `${ROUTES.ERRORS_RATE_LIMIT}?${params.toString()}`;
}

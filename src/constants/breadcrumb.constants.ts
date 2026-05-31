export const BREADCRUMB_SEGMENT_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  settings: "Settings",
  users: "Users",
  roles: "Roles",
  colleges: "Colleges",
  departments: "Departments",
  programs: "Programs",
  courses: "Courses",
  "academic-years": "Academic calendar",
  reports: "Reports",
  audit: "Audit logs",
  errors: "Errors",
  unauthorized: "Unauthorized",
  forbidden: "Access denied",
  profile: "Profile",
  announcements: "Announcements",
  notifications: "Notifications",
  logs: "Log detail",
  "system-events": "System event",
};

export const BREADCRUMB_ROUTE_LABELS: Record<string, string> = {
  "/errors/unauthorized": "Unauthorized",
  "/errors/forbidden": "Access denied",
  "/dashboard": "Dashboard",
  "/settings": "Settings",
  "/announcements": "Announcements",
  "/users": "Users",
  "/roles": "Roles",
  "/colleges": "Colleges",
  "/departments": "Departments",
  "/programs": "Programs",
  "/courses": "Courses",
  "/academic-years": "Academic calendar",
  "/audit": "Audit & monitoring",
  "/notifications": "Notification center",
};

export function formatSegmentLabel(segment: string): string {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

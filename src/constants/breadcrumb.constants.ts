export const BREADCRUMB_SEGMENT_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  settings: "Settings",
  users: "Users",
  reports: "Reports",
  audit: "Audit logs",
  errors: "Errors",
  unauthorized: "Unauthorized",
  forbidden: "Access denied",
  profile: "Profile",
};

export const BREADCRUMB_ROUTE_LABELS: Record<string, string> = {
  "/errors/unauthorized": "Unauthorized",
  "/errors/forbidden": "Access denied",
  "/dashboard": "Dashboard",
  "/settings": "Settings",
};

export function formatSegmentLabel(segment: string): string {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

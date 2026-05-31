import type { AuditLogResult } from "@/modules/audit/types/audit-log.types";
import type { LoginResult } from "@/modules/audit/types/login-history.types";
import type {
  SystemEventCategory,
  SystemEventSeverity,
} from "@/modules/audit/types/system-event.types";

export const AUDIT_LOG_ACTION_OPTIONS = [
  { label: "Create", value: "create" },
  { label: "Update", value: "update" },
  { label: "Delete", value: "delete" },
  { label: "Login", value: "login" },
  { label: "Export", value: "export" },
  { label: "Status change", value: "status_change" },
] as const;

export const AUDIT_LOG_RESOURCE_TYPE_OPTIONS = [
  { label: "User", value: "user" },
  { label: "Role", value: "role" },
  { label: "College", value: "college" },
  { label: "Department", value: "department" },
  { label: "Course", value: "course" },
  { label: "Settings", value: "settings" },
  { label: "Report", value: "report" },
] as const;

export const AUDIT_LOG_RESULT_LABELS: Record<AuditLogResult, string> = {
  success: "Success",
  failure: "Failure",
};

export const LOGIN_RESULT_LABELS: Record<LoginResult, string> = {
  success: "Success",
  failed: "Failed",
  blocked: "Blocked",
};

export const SYSTEM_EVENT_CATEGORY_LABELS: Record<
  SystemEventCategory,
  string
> = {
  system: "System",
  security: "Security",
  configuration: "Configuration",
  backup: "Backup",
};

export const SYSTEM_EVENT_SEVERITY_LABELS: Record<
  SystemEventSeverity,
  string
> = {
  info: "Info",
  warning: "Warning",
  critical: "Critical",
};

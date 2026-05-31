import { AUDIT_LOG_ACTION_OPTIONS } from "@/constants/audit-log.constants";

export function formatAuditTimestamp(iso: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function formatAuditActionLabel(action: string): string {
  const match = AUDIT_LOG_ACTION_OPTIONS.find((item) => item.value === action);
  return match?.label ?? action;
}

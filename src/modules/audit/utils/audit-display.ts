import { AUDIT_LOG_ACTION_OPTIONS } from "@/constants/audit-log.constants";

export function formatAuditTimestamp(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function formatAuditActionLabel(action: string): string {
  const match = AUDIT_LOG_ACTION_OPTIONS.find((item) => item.value === action);
  return match?.label ?? action;
}

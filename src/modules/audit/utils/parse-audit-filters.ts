import type { DateRangeValue } from "@/types/date-picker.types";
import type { FilterValues } from "@/types/filter.types";
import type { AuditLogListQueryParams } from "../types/audit-log.types";
import type { AuditLogResult } from "../types/audit-log.types";
import type { LoginHistoryListQueryParams } from "../types/login-history.types";
import type { LoginResult } from "../types/login-history.types";
import type { SystemEventListQueryParams } from "../types/system-event.types";
import type {
  SystemEventCategory,
  SystemEventSeverity,
} from "../types/system-event.types";

function dateRangeToIsoBounds(
  value: FilterValues[string],
): { dateFrom?: string; dateTo?: string } {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  const range = value as DateRangeValue;
  return {
    dateFrom: range.start
      ? range.start.toISOString().slice(0, 10)
      : undefined,
    dateTo: range.end ? range.end.toISOString().slice(0, 10) : undefined,
  };
}

function isAuditResult(value: string): value is AuditLogResult {
  return value === "success" || value === "failure";
}

function isLoginResult(value: string): value is LoginResult {
  return value === "success" || value === "failed" || value === "blocked";
}

function isSystemCategory(value: string): value is SystemEventCategory {
  return (
    value === "system" ||
    value === "security" ||
    value === "configuration" ||
    value === "backup"
  );
}

function isSystemSeverity(value: string): value is SystemEventSeverity {
  return value === "info" || value === "warning" || value === "critical";
}

export function parseAuditLogFilterValues(
  values: FilterValues,
): Pick<
  AuditLogListQueryParams,
  "search" | "action" | "resourceType" | "result" | "dateFrom" | "dateTo"
> {
  const actorRaw = values.actor;
  const search =
    typeof actorRaw === "string" && actorRaw.trim() ? actorRaw.trim() : undefined;
  const actionRaw = values.action;
  const action =
    typeof actionRaw === "string" && actionRaw ? actionRaw : undefined;
  const resourceRaw = values.resourceType;
  const resourceType =
    typeof resourceRaw === "string" && resourceRaw ? resourceRaw : undefined;
  const resultRaw = values.result;
  const result =
    typeof resultRaw === "string" && isAuditResult(resultRaw)
      ? resultRaw
      : undefined;
  const dates = dateRangeToIsoBounds(values.occurred);
  return { search, action, resourceType, result, ...dates };
}

export function parseLoginHistoryFilterValues(
  values: FilterValues,
): Pick<
  LoginHistoryListQueryParams,
  "search" | "result" | "dateFrom" | "dateTo"
> {
  const userRaw = values.user;
  const search =
    typeof userRaw === "string" && userRaw.trim() ? userRaw.trim() : undefined;
  const resultRaw = values.result;
  const result =
    typeof resultRaw === "string" && isLoginResult(resultRaw)
      ? resultRaw
      : undefined;
  const dates = dateRangeToIsoBounds(values.occurred);
  return { search, result, ...dates };
}

export function parseSystemEventFilterValues(
  values: FilterValues,
): Pick<
  SystemEventListQueryParams,
  "category" | "severity" | "dateFrom" | "dateTo"
> {
  const categoryRaw = values.category;
  const category =
    typeof categoryRaw === "string" && isSystemCategory(categoryRaw)
      ? categoryRaw
      : undefined;
  const severityRaw = values.severity;
  const severity =
    typeof severityRaw === "string" && isSystemSeverity(severityRaw)
      ? severityRaw
      : undefined;
  const dates = dateRangeToIsoBounds(values.occurred);
  return { category, severity, ...dates };
}

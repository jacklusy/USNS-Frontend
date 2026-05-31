import type { AuditLogListQueryParams } from "../types/audit-log.types";
import type { LoginHistoryListQueryParams } from "../types/login-history.types";
import type { SystemEventListQueryParams } from "../types/system-event.types";

const auditRoot = ["audit"] as const;

export const auditQueryKeys = {
  root: auditRoot,
  all: [...auditRoot] as const,
  logs: {
    list: (params: AuditLogListQueryParams) =>
      [...auditRoot, "logs", "list", params] as const,
    detail: (id: string) => [...auditRoot, "logs", "detail", id] as const,
  },
  loginHistory: {
    list: (params: LoginHistoryListQueryParams) =>
      [...auditRoot, "loginHistory", "list", params] as const,
  },
  systemEvents: {
    list: (params: SystemEventListQueryParams) =>
      [...auditRoot, "systemEvents", "list", params] as const,
    detail: (id: string) =>
      [...auditRoot, "systemEvents", "detail", id] as const,
  },
};

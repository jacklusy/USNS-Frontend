import { resolveService } from "@/lib/service-resolver";
import type { IAuditLogService } from "./audit-log.service";
import { mockAuditLogService } from "./audit-log.service.mock";
import { realAuditLogService } from "./audit-log.service.real";
import type { ILoginHistoryService } from "./login-history.service";
import { mockLoginHistoryService } from "./login-history.service.mock";
import { realLoginHistoryService } from "./login-history.service.real";
import type { ISystemEventService } from "./system-event.service";
import { mockSystemEventService } from "./system-event.service.mock";
import { realSystemEventService } from "./system-event.service.real";

export const auditLogService = resolveService<IAuditLogService>(
  mockAuditLogService,
  realAuditLogService,
);

export const loginHistoryService = resolveService<ILoginHistoryService>(
  mockLoginHistoryService,
  realLoginHistoryService,
);

export const systemEventService = resolveService<ISystemEventService>(
  mockSystemEventService,
  realSystemEventService,
);

export type { IAuditLogService } from "./audit-log.service";
export type { ILoginHistoryService } from "./login-history.service";
export type { ISystemEventService } from "./system-event.service";

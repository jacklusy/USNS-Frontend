import {
  auditLogDetailDtoFromSeed,
  toAuditLog,
  toAuditLogDetail,
  type AuditLogSeedRecord,
} from "@/lib/transformers/audit.transformer";
import type {
  AuditLog,
  AuditLogDetail,
  AuditLogListQueryParams,
  AuditLogResult,
} from "@/modules/audit/types/audit-log.types";
import { paginate } from "@/mock/lib/mock-query";
import type { PaginatedResponse } from "@/types/api.types";
import type { AuditLogDetailDto } from "@/types/dto/audit.dto";

const ACTORS = [
  { name: "James Okonkwo", id: "usr_admin" },
  { name: "Omar Farouk", id: "usr_dba" },
  { name: "Dr. Layla Hassan", id: "usr_president" },
  { name: "Sara Mitchell", id: "usr_dean" },
];

const ACTIONS = ["create", "update", "delete", "login", "export", "status_change"];
const RESOURCES = ["user", "role", "college", "department", "course", "settings", "report"];

function buildSeedLogs(): AuditLogDetailDto[] {
  const logs: AuditLogSeedRecord[] = [];
  for (let i = 1; i <= 52; i++) {
    const actor = ACTORS[i % ACTORS.length];
    const action = ACTIONS[i % ACTIONS.length];
    const resourceType = RESOURCES[i % RESOURCES.length];
    const result: AuditLogResult = i % 7 === 0 ? "failure" : "success";
    const day = String(Math.max(1, 31 - (i % 28))).padStart(2, "0");
    const timestamp = `2026-05-${day}T${String(8 + (i % 12)).padStart(2, "0")}:${String(i % 60).padStart(2, "0")}:00.000Z`;
    const resourceId = `${resourceType}_${String(100 + i)}`;
    const before: Record<string, string> | undefined =
      action === "update" || action === "status_change"
        ? { status: "active", role: "admin" }
        : undefined;
    const after: Record<string, string> | undefined =
      action === "update" || action === "status_change"
        ? {
            status: i % 2 === 0 ? "suspended" : "active",
            role: "admin",
          }
        : action === "create"
          ? { status: "active", email: `user${i}@usns.edu` }
          : undefined;
    logs.push({
      id: `alog_${String(i).padStart(3, "0")}`,
      timestamp,
      actorName: actor.name,
      actorId: actor.id,
      action,
      resourceType,
      resourceId,
      ipAddress: `192.168.${i % 5}.${10 + (i % 200)}`,
      result,
      payloadBefore: before,
      payloadAfter: after,
      metadata: { source: "dashboard", sessionId: `sess_${i}` },
    });
  }
  return logs.map(auditLogDetailDtoFromSeed);
}

let auditLogDtoStore: AuditLogDetailDto[] = buildSeedLogs();

function hydrateAuditLogs(): AuditLogDetail[] {
  return auditLogDtoStore.map(toAuditLogDetail);
}

export function getAuditLogStoreCount(): number {
  return auditLogDtoStore.length;
}

function matchesDate(
  timestamp: Date,
  dateFrom?: string,
  dateTo?: string,
): boolean {
  const day = timestamp.toISOString().slice(0, 10);
  if (dateFrom && day < dateFrom) return false;
  if (dateTo && day > dateTo) return false;
  return true;
}

export function filterAuditLogs(
  items: AuditLogDetail[],
  params: Omit<AuditLogListQueryParams, "page" | "per_page">,
): AuditLogDetail[] {
  return items.filter((item) => {
    if (params.search) {
      const q = params.search.toLowerCase();
      if (!item.actorName.toLowerCase().includes(q)) return false;
    }
    if (params.action && item.action !== params.action) return false;
    if (params.resourceType && item.resourceType !== params.resourceType) {
      return false;
    }
    if (params.result && item.result !== params.result) return false;
    if (!matchesDate(item.timestamp, params.dateFrom, params.dateTo)) {
      return false;
    }
    return true;
  });
}

export function paginateAuditLogs(
  items: AuditLog[],
  page: number,
  perPage: number,
): PaginatedResponse<AuditLog> {
  return paginate(items, page, perPage);
}

export function listAuditLogsFromStore(
  params: AuditLogListQueryParams,
): PaginatedResponse<AuditLog> {
  const filtered = filterAuditLogs(hydrateAuditLogs(), params);
  const sorted = [...filtered].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
  );
  return paginateAuditLogs(sorted, params.page, params.per_page);
}

export function listAllAuditLogsFromStore(
  params: Omit<AuditLogListQueryParams, "page" | "per_page">,
): AuditLog[] {
  const filtered = filterAuditLogs(hydrateAuditLogs(), params);
  return [...filtered].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
  );
}

export function getAuditLogByIdFromStore(id: string): AuditLogDetail | null {
  const dto = auditLogDtoStore.find((item) => item.id === id);
  return dto ? toAuditLogDetail(dto) : null;
}

import { parseApiDate, toApiTimestamp } from "@/lib/transformers/common";
import type {
  AuditLog,
  AuditLogDetail,
} from "@/modules/audit/types/audit-log.types";
import type { AuditLogDetailDto, AuditLogDto } from "@/types/dto/audit.dto";

export function toAuditLog(dto: AuditLogDto): AuditLog {
  return {
    id: dto.id,
    timestamp: parseApiDate(dto.timestamp),
    actorName: dto.actor_name,
    actorId: dto.actor_id,
    action: dto.action,
    resourceType: dto.resource_type,
    resourceId: dto.resource_id,
    ipAddress: dto.ip_address,
    result: dto.result,
  };
}

export function toAuditLogDetail(dto: AuditLogDetailDto): AuditLogDetail {
  return {
    ...toAuditLog(dto),
    payloadBefore: dto.payload_before,
    payloadAfter: dto.payload_after,
    metadata: dto.metadata,
  };
}

export function toAuditLogDto(log: AuditLog): AuditLogDto {
  return {
    id: log.id,
    timestamp: toApiTimestamp(log.timestamp),
    actor_name: log.actorName,
    actor_id: log.actorId,
    action: log.action,
    resource_type: log.resourceType,
    resource_id: log.resourceId,
    ip_address: log.ipAddress,
    result: log.result,
  };
}

export interface AuditLogSeedRecord {
  id: string;
  timestamp: string;
  actorName: string;
  actorId?: string;
  action: string;
  resourceType: string;
  resourceId: string;
  ipAddress: string;
  result: AuditLog["result"];
  payloadBefore?: Record<string, string>;
  payloadAfter?: Record<string, string>;
  metadata?: Record<string, string>;
}

export function auditLogDetailDtoFromSeed(
  record: AuditLogSeedRecord,
): AuditLogDetailDto {
  return {
    id: record.id,
    timestamp: record.timestamp,
    actor_name: record.actorName,
    actor_id: record.actorId,
    action: record.action,
    resource_type: record.resourceType,
    resource_id: record.resourceId,
    ip_address: record.ipAddress,
    result: record.result,
    payload_before: record.payloadBefore,
    payload_after: record.payloadAfter,
    metadata: record.metadata,
  };
}

export function toAuditLogDetailDto(detail: AuditLogDetail): AuditLogDetailDto {
  return {
    ...toAuditLogDto(detail),
    payload_before: detail.payloadBefore,
    payload_after: detail.payloadAfter,
    metadata: detail.metadata,
  };
}

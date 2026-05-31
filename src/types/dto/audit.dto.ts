import type { ApiTimestamp } from "@/types/dto/common.dto";
import type { AuditLogResult } from "@/modules/audit/types/audit-log.types";

export interface AuditLogDto {
  id: string;
  timestamp: ApiTimestamp;
  actor_name: string;
  actor_id?: string;
  action: string;
  resource_type: string;
  resource_id: string;
  ip_address: string;
  result: AuditLogResult;
}

export interface AuditLogDetailDto extends AuditLogDto {
  payload_before?: Record<string, string>;
  payload_after?: Record<string, string>;
  metadata?: Record<string, string>;
}

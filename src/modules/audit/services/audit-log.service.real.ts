import { toAuditLog, toAuditLogDetail } from "@/lib/transformers/audit.transformer";
import { get, getPaginated } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { AuditLogDetailDto, AuditLogDto } from "@/types/dto/audit.dto";
import type {
  AuditExportResult,
  AuditLog,
  AuditLogDetail,
  AuditLogListQueryParams,
} from "../types/audit-log.types";
import type { IAuditLogService } from "./audit-log.service";

function buildListQuery(params: AuditLogListQueryParams): string {
  const search = new URLSearchParams();
  search.set("page", String(params.page));
  search.set("per_page", String(params.per_page));
  if (params.search) search.set("search", params.search);
  if (params.action) search.set("action", params.action);
  if (params.resourceType) search.set("resource_type", params.resourceType);
  if (params.result) search.set("result", params.result);
  if (params.dateFrom) search.set("date_from", params.dateFrom);
  if (params.dateTo) search.set("date_to", params.dateTo);
  const query = search.toString();
  return query ? `?${query}` : "";
}

export class RealAuditLogService implements IAuditLogService {
  async list(
    params: AuditLogListQueryParams,
  ): Promise<PaginatedResponse<AuditLog>> {
    const response = await getPaginated<AuditLogDto>(
      `${ENDPOINTS.audit.list}${buildListQuery(params)}`,
    );
    return {
      data: response.data.map(toAuditLog),
      meta: response.meta,
    };
  }

  async getById(id: string): Promise<ApiResponse<AuditLogDetail>> {
    const data = await get<AuditLogDetailDto>(ENDPOINTS.audit.byId(id));
    return { data: toAuditLogDetail(data) };
  }

  async exportCsv(
    params: Omit<AuditLogListQueryParams, "page" | "per_page">,
  ): Promise<ApiResponse<AuditExportResult>> {
    const search = new URLSearchParams();
    if (params.search) search.set("search", params.search);
    if (params.action) search.set("action", params.action);
    if (params.resourceType) search.set("resource_type", params.resourceType);
    if (params.result) search.set("result", params.result);
    if (params.dateFrom) search.set("date_from", params.dateFrom);
    if (params.dateTo) search.set("date_to", params.dateTo);
    const query = search.toString();
    const path = query
      ? `${ENDPOINTS.audit.export}?${query}`
      : ENDPOINTS.audit.export;
    const data = await get<AuditExportResult>(path);
    return { data };
  }
}

export const realAuditLogService = new RealAuditLogService();

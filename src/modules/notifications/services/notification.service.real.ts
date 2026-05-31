import { toNotification } from "@/lib/transformers/notification.transformer";
import { del, get, getPaginated, post, put } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse } from "@/types/api.types";
import type { NotificationDto } from "@/types/dto/notification.dto";
import type {
  Notification,
  NotificationListQueryParams,
  NotificationPaginatedResponse,
  UpdateNotificationPreferenceInput,
} from "../types/notification.types";
import type { NotificationPreferences } from "../types/preferences.types";
import type { INotificationService } from "./notification.service";

function buildListQuery(params: NotificationListQueryParams): string {
  const search = new URLSearchParams();
  search.set("page", String(params.page));
  search.set("per_page", String(params.per_page));
  if (params.category) search.set("category", params.category);
  if (params.read) search.set("read", params.read);
  const query = search.toString();
  return query ? `?${query}` : "";
}

export class RealNotificationService implements INotificationService {
  async list(
    params: NotificationListQueryParams,
  ): Promise<NotificationPaginatedResponse> {
    const response = await getPaginated<NotificationDto>(
      `${ENDPOINTS.notifications.list}${buildListQuery(params)}`,
    );
    return {
      data: response.data.map(toNotification),
      meta: response.meta as NotificationPaginatedResponse["meta"],
    };
  }

  async listRecentUnread(limit: number): Promise<ApiResponse<Notification[]>> {
    const data = await get<NotificationDto[]>(
      `${ENDPOINTS.notifications.recent}?limit=${limit}`,
    );
    return { data: data.map(toNotification) };
  }

  async markRead(id: string): Promise<ApiResponse<Notification>> {
    const data = await post<NotificationDto, Record<string, never>>(
      ENDPOINTS.notifications.markRead(id),
      {},
    );
    return { data: toNotification(data) };
  }

  async markUnread(id: string): Promise<ApiResponse<Notification>> {
    const data = await post<NotificationDto, Record<string, never>>(
      ENDPOINTS.notifications.markUnread(id),
      {},
    );
    return { data: toNotification(data) };
  }

  async markAllRead(): Promise<ApiResponse<null>> {
    await post<null, Record<string, never>>(
      ENDPOINTS.notifications.markAllRead,
      {},
    );
    return { data: null };
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    await del(ENDPOINTS.notifications.delete(id));
    return { data: null };
  }

  async getPreferences(): Promise<ApiResponse<NotificationPreferences>> {
    const data = await get<NotificationPreferences>(
      ENDPOINTS.notifications.preferences,
    );
    return { data };
  }

  async updatePreference(
    input: UpdateNotificationPreferenceInput,
  ): Promise<ApiResponse<NotificationPreferences>> {
    const data = await put<NotificationPreferences, UpdateNotificationPreferenceInput>(
      ENDPOINTS.notifications.preferences,
      input,
    );
    return { data };
  }

  async resetPreferences(): Promise<ApiResponse<NotificationPreferences>> {
    const data = await post<NotificationPreferences, Record<string, never>>(
      ENDPOINTS.notifications.preferencesReset,
      {},
    );
    return { data };
  }
}

export const realNotificationService = new RealNotificationService();

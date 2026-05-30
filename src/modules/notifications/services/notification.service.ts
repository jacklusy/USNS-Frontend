import type { ApiResponse } from "@/types/api.types";
import type {
  Notification,
  NotificationListQueryParams,
  NotificationPaginatedResponse,
  UpdateNotificationPreferenceInput,
} from "../types/notification.types";
import type { NotificationPreferences } from "../types/preferences.types";

export interface INotificationService {
  list(params: NotificationListQueryParams): Promise<NotificationPaginatedResponse>;
  listRecentUnread(limit: number): Promise<ApiResponse<Notification[]>>;
  markRead(id: string): Promise<ApiResponse<Notification>>;
  markUnread(id: string): Promise<ApiResponse<Notification>>;
  markAllRead(): Promise<ApiResponse<null>>;
  delete(id: string): Promise<ApiResponse<null>>;
  getPreferences(): Promise<ApiResponse<NotificationPreferences>>;
  updatePreference(
    input: UpdateNotificationPreferenceInput,
  ): Promise<ApiResponse<NotificationPreferences>>;
  resetPreferences(): Promise<ApiResponse<NotificationPreferences>>;
}

import type { ApiResponse } from "@/types/api.types";
import type {
  Notification,
  NotificationListQueryParams,
  NotificationPaginatedResponse,
  UpdateNotificationPreferenceInput,
} from "../types/notification.types";
import type { NotificationPreferences } from "../types/preferences.types";
import type { INotificationService } from "./notification.service";

export class RealNotificationService implements INotificationService {
  async list(
    _params: NotificationListQueryParams,
  ): Promise<NotificationPaginatedResponse> {
    throw new Error("Notifications API not integrated");
  }

  async listRecentUnread(
    _limit: number,
  ): Promise<ApiResponse<Notification[]>> {
    throw new Error("Notifications API not integrated");
  }

  async markRead(_id: string): Promise<ApiResponse<Notification>> {
    throw new Error("Notifications API not integrated");
  }

  async markUnread(_id: string): Promise<ApiResponse<Notification>> {
    throw new Error("Notifications API not integrated");
  }

  async markAllRead(): Promise<ApiResponse<null>> {
    throw new Error("Notifications API not integrated");
  }

  async delete(_id: string): Promise<ApiResponse<null>> {
    throw new Error("Notifications API not integrated");
  }

  async getPreferences(): Promise<ApiResponse<NotificationPreferences>> {
    throw new Error("Notifications API not integrated");
  }

  async updatePreference(
    _input: UpdateNotificationPreferenceInput,
  ): Promise<ApiResponse<NotificationPreferences>> {
    throw new Error("Notifications API not integrated");
  }

  async resetPreferences(): Promise<ApiResponse<NotificationPreferences>> {
    throw new Error("Notifications API not integrated");
  }
}

export const realNotificationService = new RealNotificationService();

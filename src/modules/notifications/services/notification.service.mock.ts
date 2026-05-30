import { MockServiceBase } from "@/lib/mock-service-base";
import {
  countUnreadNotifications,
  deleteNotificationFromStore,
  filterNotifications,
  getNotificationsStore,
  listRecentUnreadFromStore,
  markAllNotificationsReadInStore,
  markNotificationReadInStore,
  markNotificationUnreadInStore,
  paginateNotifications,
} from "@/mock/notifications/notifications.mock";
import {
  getPreferencesForUser,
  resetPreferencesForUser,
  updatePreferenceForUser,
} from "@/mock/notifications/preferences.mock";
import { useAuthStore } from "@/store/auth.slice";
import type { ApiResponse } from "@/types/api.types";
import type { AppError } from "@/types/error.types";
import type {
  Notification,
  NotificationListQueryParams,
  NotificationPaginatedResponse,
  UpdateNotificationPreferenceInput,
} from "../types/notification.types";
import type { NotificationPreferences } from "../types/preferences.types";
import type { INotificationService } from "./notification.service";

function notFound(message: string): AppError {
  return { code: "NOT_FOUND", message };
}

function getCurrentUserId(): string {
  return useAuthStore.getState().user?.id ?? "guest";
}

export class MockNotificationService
  extends MockServiceBase
  implements INotificationService
{
  async list(
    params: NotificationListQueryParams,
  ): Promise<NotificationPaginatedResponse> {
    await this.delay();
    const filtered = filterNotifications(getNotificationsStore(), params);
    const sorted = [...filtered].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    return paginateNotifications(sorted, params.page, params.per_page);
  }

  async listRecentUnread(limit: number): Promise<ApiResponse<Notification[]>> {
    await this.delay();
    return { data: listRecentUnreadFromStore(limit) };
  }

  async markRead(id: string): Promise<ApiResponse<Notification>> {
    await this.delay();
    const updated = markNotificationReadInStore(id);
    if (!updated) throw notFound("Notification not found");
    return { data: updated };
  }

  async markUnread(id: string): Promise<ApiResponse<Notification>> {
    await this.delay();
    const updated = markNotificationUnreadInStore(id);
    if (!updated) throw notFound("Notification not found");
    return { data: updated };
  }

  async markAllRead(): Promise<ApiResponse<null>> {
    await this.delay();
    markAllNotificationsReadInStore();
    return { data: null };
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    await this.delay();
    const removed = deleteNotificationFromStore(id);
    if (!removed) throw notFound("Notification not found");
    return { data: null };
  }

  async getPreferences(): Promise<ApiResponse<NotificationPreferences>> {
    await this.delay();
    return { data: getPreferencesForUser(getCurrentUserId()) };
  }

  async updatePreference(
    input: UpdateNotificationPreferenceInput,
  ): Promise<ApiResponse<NotificationPreferences>> {
    await this.delay();
    return {
      data: updatePreferenceForUser(getCurrentUserId(), input),
    };
  }

  async resetPreferences(): Promise<ApiResponse<NotificationPreferences>> {
    await this.delay();
    return { data: resetPreferencesForUser(getCurrentUserId()) };
  }
}

export const mockNotificationService = new MockNotificationService();

export function getMockUnreadCount(): number {
  return countUnreadNotifications();
}

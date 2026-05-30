import type { Notification } from "../types/notification.types";
import { useNotificationStore } from "@/store/notification.slice";

export function syncNotificationStoreFromItems(items: Notification[]): void {
  useNotificationStore.getState().syncFromItems(items);
}

export function syncNotificationStoreUnreadCount(count: number): void {
  useNotificationStore.getState().syncUnreadCount(count);
}

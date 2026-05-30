import { create } from "zustand";
import {
  INITIAL_NOTIFICATIONS,
  INITIAL_UNREAD_COUNT,
} from "@/constants/notifications.constants";
import type { NotificationItem } from "@/types/notification.types";

interface NotificationState {
  unreadCount: number;
  notifications: NotificationItem[];
  setNotifications: (items: NotificationItem[]) => void;
  setUnreadCount: (count: number) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
}

function countUnread(items: NotificationItem[]): number {
  return items.filter((item) => !item.read).length;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  unreadCount: INITIAL_UNREAD_COUNT,
  notifications: INITIAL_NOTIFICATIONS,
  setNotifications: (items) =>
    set({
      notifications: items,
      unreadCount: countUnread(items),
    }),
  setUnreadCount: (count) => set({ unreadCount: count }),
  markRead: (id) =>
    set((state) => {
      const notifications = state.notifications.map((item) =>
        item.id === id ? { ...item, read: true } : item,
      );
      return {
        notifications,
        unreadCount: countUnread(notifications),
      };
    }),
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((item) => ({
        ...item,
        read: true,
      })),
      unreadCount: 0,
    })),
}));

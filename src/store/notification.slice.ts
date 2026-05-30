import { create } from "zustand";
import type { Notification } from "@/modules/notifications/types/notification.types";

interface NotificationState {
  unreadCount: number;
  notifications: Notification[];
  setNotifications: (items: Notification[]) => void;
  setUnreadCount: (count: number) => void;
  syncUnreadCount: (count: number) => void;
  syncFromItems: (items: Notification[]) => void;
  markRead: (id: string) => void;
  markUnread: (id: string) => void;
  markAllRead: () => void;
  remove: (id: string) => void;
}

function countUnread(items: Notification[]): number {
  return items.filter((item) => !item.read).length;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  unreadCount: 0,
  notifications: [],
  setNotifications: (items) =>
    set({
      notifications: items,
      unreadCount: countUnread(items),
    }),
  setUnreadCount: (count) => set({ unreadCount: count }),
  syncUnreadCount: (count) => set({ unreadCount: count }),
  syncFromItems: (items) =>
    set({
      notifications: items,
      unreadCount: countUnread(items),
    }),
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
  markUnread: (id) =>
    set((state) => {
      const notifications = state.notifications.map((item) =>
        item.id === id ? { ...item, read: false } : item,
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
  remove: (id) =>
    set((state) => {
      const notifications = state.notifications.filter(
        (item) => item.id !== id,
      );
      return {
        notifications,
        unreadCount: countUnread(notifications),
      };
    }),
}));

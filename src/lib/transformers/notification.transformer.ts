import { parseApiDate, toApiTimestamp } from "@/lib/transformers/common";
import type { Notification } from "@/modules/notifications/types/notification.types";
import type { NotificationDto } from "@/types/dto/notification.dto";

export function toNotification(dto: NotificationDto): Notification {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    category: dto.category,
    type: dto.type,
    read: dto.read,
    createdAt: parseApiDate(dto.created_at),
    linkHref: dto.link_href,
  };
}

export function toNotificationDto(notification: Notification): NotificationDto {
  return {
    id: notification.id,
    title: notification.title,
    description: notification.description,
    category: notification.category,
    type: notification.type,
    read: notification.read,
    created_at: toApiTimestamp(notification.createdAt),
    link_href: notification.linkHref,
  };
}

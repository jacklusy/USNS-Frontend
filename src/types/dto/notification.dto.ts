import type { ApiTimestamp } from "@/types/dto/common.dto";
import type {
  NotificationCategory,
  NotificationType,
} from "@/modules/notifications/types/notification.types";

export interface NotificationDto {
  id: string;
  title: string;
  description: string;
  category: NotificationCategory;
  type: NotificationType;
  read: boolean;
  created_at: ApiTimestamp;
  link_href?: string;
}

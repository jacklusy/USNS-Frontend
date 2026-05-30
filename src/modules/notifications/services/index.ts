import { resolveService } from "@/lib/service-resolver";
import type { INotificationService } from "./notification.service";
import { mockNotificationService } from "./notification.service.mock";
import { realNotificationService } from "./notification.service.real";

export const notificationService = resolveService<INotificationService>(
  mockNotificationService,
  realNotificationService,
);

export type { INotificationService } from "./notification.service";

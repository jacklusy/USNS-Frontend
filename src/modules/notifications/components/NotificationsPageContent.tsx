"use client";

import { NOTIFICATIONS_COPY } from "@/constants/notifications-management.constants";
import { NotificationsTabs } from "./NotificationsTabs";

export function NotificationsPageContent() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] text-foreground md:text-[32px]">
          {NOTIFICATIONS_COPY.pageTitle}
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-fg">
          {NOTIFICATIONS_COPY.pageDescription}
        </p>
      </div>
      <NotificationsTabs />
    </div>
  );
}

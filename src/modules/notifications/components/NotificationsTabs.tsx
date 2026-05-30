"use client";

import { TabsWithUrl } from "@/components/ui/Tabs";
import {
  NOTIFICATIONS_COPY,
  NOTIFICATIONS_TAB_IDS,
} from "@/constants/notifications-management.constants";
import { NotificationsCenterSection } from "./NotificationsCenterSection";
import { NotificationPreferencesSection } from "./NotificationPreferencesSection";

export function NotificationsTabs() {
  return (
    <TabsWithUrl
      items={[
        {
          id: NOTIFICATIONS_TAB_IDS.center,
          label: NOTIFICATIONS_COPY.centerTab,
          content: <NotificationsCenterSection />,
        },
        {
          id: NOTIFICATIONS_TAB_IDS.preferences,
          label: NOTIFICATIONS_COPY.preferencesTab,
          content: <NotificationPreferencesSection />,
        },
      ]}
      urlParam="tab"
      defaultTabId={NOTIFICATIONS_TAB_IDS.center}
      className="mt-6"
    />
  );
}

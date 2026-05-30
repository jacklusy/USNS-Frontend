"use client";

import { TabsWithUrl } from "@/components/ui/Tabs";
import { SETTINGS_TABS_COPY } from "@/constants/settings-tabs.constants";

const SETTINGS_TAB_ITEMS = [
  {
    id: "general",
    label: SETTINGS_TABS_COPY.generalTitle,
    content: (
      <p className="text-[15px] text-muted-fg">
        {SETTINGS_TABS_COPY.generalDescription}
      </p>
    ),
  },
  {
    id: "security",
    label: SETTINGS_TABS_COPY.securityTitle,
    content: (
      <p className="text-[15px] text-muted-fg">
        {SETTINGS_TABS_COPY.securityDescription}
      </p>
    ),
  },
] as const;

export function SettingsTabs() {
  return (
    <TabsWithUrl
      items={SETTINGS_TAB_ITEMS}
      urlParam="tab"
      defaultTabId="general"
      className="mt-8"
    />
  );
}

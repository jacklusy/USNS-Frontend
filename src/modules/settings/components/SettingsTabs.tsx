"use client";

import { useMemo } from "react";
import { TabsWithUrl, type TabItem } from "@/components/ui/Tabs";
import { SETTINGS_TAB_IDS } from "@/constants/settings-tabs.constants";
import { SETTINGS_TABS_COPY } from "@/constants/settings-tabs.constants";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { GeneralSettingsSection } from "./sections/GeneralSettingsSection";
import { MailSettingsSection } from "./sections/MailSettingsSection";
import { StorageSettingsSection } from "./sections/StorageSettingsSection";
import { SecuritySettingsSection } from "./sections/SecuritySettingsSection";
import { FeaturesSettingsSection } from "./sections/FeaturesSettingsSection";
import { OperationsSettingsSection } from "./operations/OperationsSettingsSection";
import { EmailTemplatesSection } from "./email-templates/EmailTemplatesSection";

export function SettingsTabs() {
  const { role } = useAuth();

  const items = useMemo(() => {
    const tabs: TabItem[] = [
      {
        id: SETTINGS_TAB_IDS.general,
        label: SETTINGS_TABS_COPY.generalTitle,
        content: <GeneralSettingsSection />,
      },
      {
        id: SETTINGS_TAB_IDS.mail,
        label: SETTINGS_TABS_COPY.mailTitle,
        content: <MailSettingsSection />,
      },
      {
        id: SETTINGS_TAB_IDS.storage,
        label: SETTINGS_TABS_COPY.storageTitle,
        content: <StorageSettingsSection />,
      },
      {
        id: SETTINGS_TAB_IDS.security,
        label: SETTINGS_TABS_COPY.securityTitle,
        content: <SecuritySettingsSection />,
      },
      {
        id: SETTINGS_TAB_IDS.features,
        label: SETTINGS_TABS_COPY.featuresTitle,
        content: <FeaturesSettingsSection />,
      },
      {
        id: SETTINGS_TAB_IDS.emailTemplates,
        label: SETTINGS_TABS_COPY.emailTemplatesTitle,
        content: <EmailTemplatesSection />,
      },
    ];
    if (role === "dba") {
      tabs.splice(5, 0, {
        id: SETTINGS_TAB_IDS.operations,
        label: SETTINGS_TABS_COPY.operationsTitle,
        content: <OperationsSettingsSection />,
      });
    }
    return tabs;
  }, [role]);

  return (
    <TabsWithUrl
      items={items}
      urlParam="tab"
      defaultTabId={SETTINGS_TAB_IDS.general}
      className="mt-8"
    />
  );
}

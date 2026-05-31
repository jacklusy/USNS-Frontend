"use client";

import { TabsWithUrl } from "@/components/ui/Tabs";
import {
  PROFILE_COPY,
  PROFILE_TAB_IDS,
} from "../constants/profile-management.constants";
import { AccountPreferencesSection } from "./AccountPreferencesSection";
import { ChangePasswordSection } from "./ChangePasswordSection";
import { ProfileOverviewSection } from "./ProfileOverviewSection";

export function ProfileTabs() {
  return (
    <TabsWithUrl
      items={[
        {
          id: PROFILE_TAB_IDS.profile,
          label: PROFILE_COPY.tabProfile,
          content: <ProfileOverviewSection />,
        },
        {
          id: PROFILE_TAB_IDS.password,
          label: PROFILE_COPY.tabPassword,
          content: <ChangePasswordSection />,
        },
        {
          id: PROFILE_TAB_IDS.preferences,
          label: PROFILE_COPY.tabPreferences,
          content: <AccountPreferencesSection />,
        },
      ]}
      urlParam="tab"
      defaultTabId={PROFILE_TAB_IDS.profile}
      className="mt-6"
    />
  );
}

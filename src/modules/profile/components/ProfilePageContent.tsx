"use client";

import { PROFILE_COPY } from "../constants/profile-management.constants";
import { useAccountPreferences } from "../hooks/useAccountPreferences";
import { ProfileTabs } from "./ProfileTabs";

function ProfilePreferencesBootstrap() {
  useAccountPreferences();
  return null;
}

export function ProfilePageContent() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] text-foreground md:text-[32px]">
          {PROFILE_COPY.pageTitle}
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-fg">
          {PROFILE_COPY.pageDescription}
        </p>
      </div>
      <ProfilePreferencesBootstrap />
      <ProfileTabs />
    </div>
  );
}

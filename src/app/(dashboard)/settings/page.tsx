"use client";

import { Suspense } from "react";
import { SETTINGS_ALLOWED_ROLES } from "@/constants/auth.constants";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { SettingsTabs } from "@/modules/settings/components/SettingsTabs";
import { PERMISSIONS } from "@/types/permission.types";

function SettingsTabsFallback() {
  return <div className="mt-8 h-32 animate-pulse rounded-lg bg-border" />;
}

export default function SettingsPage() {
  return (
    <RoleRouteGuard
      requiredPermission={PERMISSIONS.settings.manage}
      allowedRoles={SETTINGS_ALLOWED_ROLES}
    >
      <div>
        <h1 className="text-[36px] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground md:text-[48px]">
          Settings
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] text-muted-fg">
          System configuration for database administrators and application
          administrators. Other roles are redirected to the access denied page.
        </p>
        <Suspense fallback={<SettingsTabsFallback />}>
          <SettingsTabs />
        </Suspense>
      </div>
    </RoleRouteGuard>
  );
}

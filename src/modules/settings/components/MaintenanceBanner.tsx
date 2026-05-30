"use client";

import { AlertTriangle } from "lucide-react";
import { MAINTENANCE_BANNER_DEFAULT_MESSAGE } from "@/constants/settings-management.constants";
import { useMaintenanceMode } from "../hooks/useSettingsQueries";

export function MaintenanceBanner() {
  const query = useMaintenanceMode();
  const maintenance = query.data?.data;

  if (!maintenance?.enabled) {
    return null;
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex items-start gap-3 border-b border-warn/30 bg-warn/10 px-6 py-3 text-[15px] text-foreground"
    >
      <AlertTriangle
        className="mt-0.5 h-5 w-5 shrink-0 text-warn"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <p>{maintenance.message || MAINTENANCE_BANNER_DEFAULT_MESSAGE}</p>
    </div>
  );
}

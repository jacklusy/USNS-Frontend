import { ROUTES } from "@/constants/routes.constants";
import { PERMISSIONS } from "@/types/permission.types";
import type { DashboardQuickActionDefinition } from "@/modules/dashboard/types/dashboard.types";

export const QUICK_ACTION_DEFINITIONS: readonly DashboardQuickActionDefinition[] =
  [
    {
      id: "qa_create_user",
      label: "Create user",
      href: "/users",
      icon: "userPlus",
      requiredPermission: PERMISSIONS.users.create,
    },
    {
      id: "qa_reports",
      label: "Generate report",
      href: "/reports",
      icon: "fileText",
      requiredPermission: PERMISSIONS.reports.view,
    },
    {
      id: "qa_settings",
      label: "System settings",
      href: ROUTES.SETTINGS,
      icon: "settings",
      requiredPermission: PERMISSIONS.settings.manage,
    },
    {
      id: "qa_announce",
      label: "Send announcement",
      href: ROUTES.ANNOUNCEMENTS,
      icon: "bell",
      requiredPermission: PERMISSIONS.notifications.manage,
    },
  ] as const;

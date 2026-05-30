"use client";

import { Menu, Search } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { DropdownMenu, type DropdownMenuItem } from "@/components/ui/DropdownMenu";
import { ROUTES } from "@/constants/routes.constants";
import { ROLE_DISPLAY_LABELS } from "@/constants/roles.constants";
import { useLogout } from "@/modules/auth/hooks/useLogout";
import { usePermissions } from "@/modules/auth/hooks/usePermissions";
import { useAuthStore } from "@/store/auth.slice";
import { NotificationBellDropdown } from "@/modules/notifications";
import { useUiStore } from "@/store/ui.slice";
import { PERMISSIONS } from "@/types/permission.types";
import { getUserInitials } from "@/utils/user-initials";

export function DashboardTopBar() {
  const user = useAuthStore((s) => s.user);
  const role = useAuthStore((s) => s.role);
  const toggleMobileSidebar = useUiStore((s) => s.toggleMobileSidebar);
  const { can } = usePermissions();
  const { logout, isLoggingOut } = useLogout();

  const menuItems: DropdownMenuItem[] = [
    {
      id: "profile",
      label: "Profile",
      href: ROUTES.PROFILE,
    },
    ...(can(PERMISSIONS.settings.manage)
      ? [
          {
            id: "settings",
            label: "Settings",
            href: ROUTES.SETTINGS,
          } satisfies DropdownMenuItem,
        ]
      : []),
    {
      id: "logout",
      label: isLoggingOut ? "Signing out…" : "Sign out",
      onSelect: () => {
        void logout();
      },
      destructive: true,
    },
  ];

  const roleLabel = role ? ROLE_DISPLAY_LABELS[role] : null;

  return (
    <header className="sticky top-0 z-30 shrink-0 border-b border-border bg-surface">
      <div className="flex min-h-14 flex-col gap-2 px-4 py-2 md:flex-row md:items-center md:justify-between md:gap-4 md:px-6 md:py-0">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={toggleMobileSidebar}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-muted-fg transition-colors hover:bg-usns-green-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-[15px] font-medium text-foreground">
                {user?.name ?? "Dashboard"}
              </p>
              {roleLabel ? <Badge variant="brand">{roleLabel}</Badge> : null}
            </div>
            <div className="mt-0.5 hidden md:block">
              <Breadcrumbs />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 md:justify-end md:gap-3">
          <div className="md:hidden">
            <Breadcrumbs />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              className="hidden h-11 w-11 items-center justify-center rounded-md text-muted-fg opacity-50 md:inline-flex"
              aria-label="Open search"
            >
              <Search className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </button>
            {can(PERMISSIONS.notifications.view) ? (
              <NotificationBellDropdown />
            ) : null}
            <DropdownMenu
              aria-label="User menu"
              align="right"
              trigger={
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand text-[13px] font-medium text-white">
                  {user ? getUserInitials(user.name) : "?"}
                </span>
              }
              items={menuItems}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

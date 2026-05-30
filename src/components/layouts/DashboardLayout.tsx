"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  LayoutDashboard,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  FileText,
  Users,
  ScrollText,
} from "lucide-react";
import type { ReactNode } from "react";
import { DASHBOARD_NAV_ITEMS } from "@/constants/navigation.constants";
import { usePermissions } from "@/modules/auth/hooks/usePermissions";
import { useAuthStore } from "@/store/auth.slice";
import { useUiStore } from "@/store/ui.slice";
import type { NavItem } from "@/constants/navigation.constants";
import type { Permission } from "@/types/permission.types";
import type { UserRole } from "@/types/user.types";

const NAV_ICONS: Record<string, typeof LayoutDashboard> = {
  Dashboard: LayoutDashboard,
  Settings: Settings,
  Reports: FileText,
  Users: Users,
  "Audit logs": ScrollText,
};

interface DashboardLayoutProps {
  children: ReactNode;
}

function isNavItemVisible(
  item: NavItem,
  can: (permission: Permission) => boolean,
  hasAnyRole: (roles: readonly UserRole[]) => boolean,
): boolean {
  if (item.requiredPermission && !can(item.requiredPermission)) {
    return false;
  }
  if (item.allowedRoles && !hasAnyRole(item.allowedRoles)) {
    return false;
  }
  return true;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const user = useAuthStore((s) => s.user);
  const { can, hasAnyRole } = usePermissions();

  const visibleNavItems = DASHBOARD_NAV_ITEMS.filter((item) =>
    isNavItemVisible(item, can, hasAnyRole),
  );

  return (
    <div className="flex min-h-full flex-1 bg-surface">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <aside
        className={`flex shrink-0 flex-col border-r border-border bg-surface-elevated transition-[width] duration-200 ${
          sidebarOpen ? "w-60" : "w-16"
        }`}
        aria-label="Main navigation"
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-3">
          {sidebarOpen ? (
            <span className="text-sm font-semibold text-foreground">USNS</span>
          ) : (
            <span className="sr-only">USNS</span>
          )}
          <button
            type="button"
            onClick={toggleSidebar}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-fg transition-colors hover:bg-usns-green-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? (
              <PanelLeftClose className="h-5 w-5" aria-hidden="true" />
            ) : (
              <PanelLeftOpen className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-2">
          {visibleNavItems.map((item) => {
            const Icon = NAV_ICONS[item.label] ?? Menu;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-usns-green-light text-brand"
                    : "text-muted-fg hover:bg-usns-green-light/60 hover:text-foreground"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                {sidebarOpen ? <span>{item.label}</span> : (
                  <span className="sr-only">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-surface-elevated px-4 md:px-6">
          <p className="truncate text-[15px] font-medium text-foreground">
            {user?.name ?? "Dashboard"}
          </p>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-fg transition-colors hover:bg-usns-green-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>
        <main id="main" className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

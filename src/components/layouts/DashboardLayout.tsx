"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopBar } from "./DashboardTopBar";
import { NotificationBootstrap } from "@/modules/notifications";
import { MaintenanceBanner } from "@/modules/settings";
import { useUiStore } from "@/store/ui.slice";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);
  const hydrated = useSyncExternalStore(
    useUiStore.persist.onFinishHydration,
    () => useUiStore.persist.hasHydrated(),
    () => false,
  );

  useEffect(() => {
    void useUiStore.persist.rehydrate();
  }, []);

  const showSidebarLabels = hydrated ? sidebarOpen : true;

  return (
    <div className="flex min-h-full flex-1 bg-surface">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <DashboardSidebar variant="desktop" showLabels={showSidebarLabels} />
      <DashboardSidebar variant="mobile" showLabels />
      <div className="flex min-w-0 flex-1 flex-col">
        <NotificationBootstrap />
        <DashboardTopBar />
        <MaintenanceBanner />
        <main id="main" className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

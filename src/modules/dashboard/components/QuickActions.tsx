"use client";

import Link from "next/link";
import { Bell, FileText, Settings, UserPlus, Zap, type LucideIcon } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { DASHBOARD_SECTION_COPY } from "@/constants/dashboard.constants";
import { usePermissions } from "@/modules/auth/hooks/usePermissions";
import { useDashboardQuickActions } from "../hooks/useDashboardQuickActions";
import type { QuickActionIconKey } from "../types/dashboard.types";
import { DashboardSection } from "./DashboardSection";

const QUICK_ACTION_ICON_MAP: Record<QuickActionIconKey, LucideIcon> = {
  userPlus: UserPlus,
  fileText: FileText,
  settings: Settings,
  bell: Bell,
};

function QuickActionsSkeleton() {
  return (
    <ul className="grid gap-2" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, index) => (
        <li key={index}>
          <Skeleton className="h-11 w-full" />
        </li>
      ))}
    </ul>
  );
}

export function QuickActions() {
  const { data, isLoading, isError, isFetching, refetch } =
    useDashboardQuickActions();
  const { can } = usePermissions();

  const visibleActions = useMemo(() => {
    const actions = data?.data ?? [];
    return actions.filter(
      (action) =>
        !action.requiredPermission || can(action.requiredPermission),
    );
  }, [data?.data, can]);

  return (
    <DashboardSection
      title={DASHBOARD_SECTION_COPY.quickActions.title}
      description={DASHBOARD_SECTION_COPY.quickActions.description}
      isLoading={isLoading}
      isError={isError}
      errorMessage={DASHBOARD_SECTION_COPY.quickActions.error}
      onRefresh={() => {
        void refetch();
      }}
      isRefreshing={isFetching}
      loadingFallback={<QuickActionsSkeleton />}
    >
      {visibleActions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-surface-elevated px-6 py-12 text-center">
          <Zap
            className="h-12 w-12 text-muted-fg"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <h3 className="mt-4 text-[18px] font-semibold text-foreground">
            No actions available
          </h3>
          <p className="mt-2 max-w-sm text-[13px] text-muted-fg">
            {DASHBOARD_SECTION_COPY.quickActions.empty}
          </p>
        </div>
      ) : (
        <ul className="grid gap-2">
          {visibleActions.map((action) => {
            const Icon = QUICK_ACTION_ICON_MAP[action.icon];
            return (
              <li key={action.id}>
                <Link
                  href={action.href}
                  className="flex min-h-11 items-center gap-3 rounded-md border border-border bg-surface px-4 py-2 text-[15px] font-medium text-foreground transition-colors hover:border-brand hover:bg-usns-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <Icon
                    className="h-5 w-5 shrink-0 text-brand"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="flex-1">{action.label}</span>
                  {action.badgeCount !== undefined && action.badgeCount > 0 ? (
                    <Badge variant="brand">{action.badgeCount}</Badge>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </DashboardSection>
  );
}

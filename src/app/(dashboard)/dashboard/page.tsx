"use client";

import dynamic from "next/dynamic";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { AnnouncementBanner } from "@/modules/dashboard/components/AnnouncementBanner";
import { ActivityFeed } from "@/modules/dashboard/components/ActivityFeed";
import { ChartsSectionSkeleton } from "@/modules/dashboard/components/ChartsSectionSkeleton";
import { DashboardSection } from "@/modules/dashboard/components/DashboardSection";
import { QuickActions } from "@/modules/dashboard/components/QuickActions";
import { StatCard } from "@/modules/dashboard/components/StatCard";
import { useDashboardAnalytics } from "@/modules/dashboard/hooks/useDashboardAnalytics";
import { useDashboardKpis } from "@/modules/dashboard/hooks/useDashboardKpis";
import { DASHBOARD_SECTION_COPY } from "@/constants/dashboard.constants";
import { Skeleton } from "@/components/ui/Skeleton";

const DashboardChartsSection = dynamic(
  () =>
    import("@/modules/dashboard/components/DashboardChartsSection").then(
      (mod) => mod.DashboardChartsSection,
    ),
  {
    ssr: false,
    loading: () => <ChartsSectionSkeleton />,
  },
);

function KpiGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <StatCard
          key={index}
          title=""
          value={0}
          trend="neutral"
          changePercent={0}
          icon="users"
          isLoading
        />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const kpisQuery = useDashboardKpis();
  const analyticsQuery = useDashboardAnalytics();

  const kpis = kpisQuery.data?.data ?? [];

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8">
      <AnnouncementBanner />

      <header>
        <h1 className="text-[36px] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground md:text-[48px]">
          Dashboard
        </h1>
        {user ? (
          <p className="mt-2 text-[15px] text-muted-fg">
            Welcome back, {user.name}.
          </p>
        ) : (
          <Skeleton className="mt-2 h-5 w-48" />
        )}
      </header>

      <DashboardSection
        title={DASHBOARD_SECTION_COPY.kpis.title}
        description={DASHBOARD_SECTION_COPY.kpis.description}
        isLoading={kpisQuery.isLoading}
        isError={kpisQuery.isError}
        errorMessage={DASHBOARD_SECTION_COPY.kpis.error}
        onRefresh={() => {
          void kpisQuery.refetch();
        }}
        isRefreshing={kpisQuery.isFetching}
        loadingFallback={<KpiGridSkeleton />}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <StatCard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
              trend={kpi.trend}
              changePercent={kpi.changePercent}
              icon={kpi.icon}
            />
          ))}
        </div>
      </DashboardSection>

      <DashboardSection
        title={DASHBOARD_SECTION_COPY.analytics.title}
        description={DASHBOARD_SECTION_COPY.analytics.description}
        isLoading={analyticsQuery.isLoading}
        isError={analyticsQuery.isError}
        errorMessage={DASHBOARD_SECTION_COPY.analytics.error}
        onRefresh={() => {
          void analyticsQuery.refetch();
        }}
        isRefreshing={analyticsQuery.isFetching}
        loadingFallback={<ChartsSectionSkeleton />}
      >
        {analyticsQuery.data?.data ? (
          <DashboardChartsSection analytics={analyticsQuery.data.data} />
        ) : null}
      </DashboardSection>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}

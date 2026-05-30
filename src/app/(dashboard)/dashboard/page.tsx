"use client";

import { useDashboardStats } from "@/modules/dashboard/hooks/useDashboardStats";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();
  const { data, isLoading, isError } = useDashboardStats();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-surface">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <main
        id="main"
        className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 md:px-8"
      >
        <h1 className="text-[36px] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground md:text-[48px]">
          Dashboard
        </h1>
        {user ? (
          <p className="mt-2 text-[15px] text-muted-fg">
            Welcome back, {user.name}.
          </p>
        ) : null}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            <div
              className="col-span-full animate-pulse rounded-lg border border-border bg-surface-elevated p-6"
              aria-busy="true"
              aria-label="Loading dashboard metrics"
            >
              <div className="h-4 w-1/3 rounded-md bg-border" />
              <div className="mt-4 h-8 w-1/2 rounded-md bg-border" />
            </div>
          ) : null}
          {isError ? (
            <p className="text-[15px] text-danger" role="alert">
              Unable to load dashboard metrics.
            </p>
          ) : null}
          {data?.data ? (
            <>
              <MetricCard label="Total users" value={data.data.totalUsers} />
              <MetricCard
                label="Active sessions"
                value={data.data.activeSessions}
              />
              <MetricCard
                label="Pending approvals"
                value={data.data.pendingApprovals}
              />
              <MetricCard
                label="System alerts"
                value={data.data.systemAlerts}
              />
            </>
          ) : null}
        </section>
      </main>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: number;
}

function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface-elevated p-5">
      <p className="text-[12px] font-medium uppercase tracking-widest text-muted-fg">
        {label}
      </p>
      <p className="mt-2 font-mono text-3xl font-medium tabular-nums text-foreground">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

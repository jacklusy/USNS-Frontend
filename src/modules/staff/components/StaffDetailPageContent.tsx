"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ErrorState } from "@/components/shared/ErrorState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { STAFF_COPY } from "@/constants/staff-management.constants";
import { ROLE_DISPLAY_LABELS } from "@/constants/roles.constants";
import { ROUTES } from "@/constants/routes.constants";
import { useBreadcrumbOverrides } from "@/hooks/useBreadcrumbOverrides";
import { useStaffDetail } from "../hooks/useStaffList";
import { StaffPermissionsSection } from "./StaffPermissionsSection";

interface StaffDetailPageContentProps {
  staffId: string;
}

function locationLabel(
  departmentName: string | undefined,
  office: string,
): string {
  if (departmentName && office) {
    return `${departmentName} · ${office}`;
  }
  if (departmentName) return departmentName;
  return office;
}

export function StaffDetailPageContent({
  staffId,
}: StaffDetailPageContentProps) {
  const query = useStaffDetail(staffId);
  const staff = query.data?.data?.staff;

  const breadcrumbLabels = useMemo(
    () => (staff ? { [staffId]: staff.fullName } : {}),
    [staff, staffId],
  );
  useBreadcrumbOverrides(breadcrumbLabels);

  if (query.isLoading) {
    return <div className="h-48 animate-pulse rounded-lg bg-border" />;
  }

  if (!staff) {
    return (
      <ErrorState
        title={STAFF_COPY.notFoundTitle}
        description={STAFF_COPY.notFoundDescription}
        onRetry={() => void query.refetch()}
      />
    );
  }

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6">
      <Link href={ROUTES.STAFF} className="text-brand hover:underline">
        {STAFF_COPY.backToList}
      </Link>
      <section className="rounded-lg border border-border bg-surface-elevated p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-semibold">{staff.fullName}</h1>
            <p className="text-muted-fg">
              {staff.employeeId} · {ROLE_DISPLAY_LABELS[staff.dashboardRole]}
            </p>
          </div>
          <StatusBadge status={staff.status} />
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-wide text-muted-fg">
              {STAFF_COPY.columnDepartmentOffice}
            </dt>
            <dd className="mt-1">
              {locationLabel(staff.departmentName, staff.office)}
            </dd>
          </div>
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-wide text-muted-fg">
              {STAFF_COPY.fieldPosition}
            </dt>
            <dd className="mt-1">{staff.position}</dd>
          </div>
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-wide text-muted-fg">
              {STAFF_COPY.fieldEmail}
            </dt>
            <dd className="mt-1">{staff.email}</dd>
          </div>
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-wide text-muted-fg">
              {STAFF_COPY.fieldPhone}
            </dt>
            <dd className="mt-1">{staff.phone}</dd>
          </div>
        </dl>
      </section>
      <StaffPermissionsSection role={staff.dashboardRole} />
    </div>
  );
}

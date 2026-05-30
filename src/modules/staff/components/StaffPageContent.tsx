"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FilterChips, FilterPanel } from "@/components/shared/FilterPanel";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { SingleSelect } from "@/components/ui/select";
import { STAFF_FILTER_CONFIG } from "@/constants/staff-filter.constants";
import {
  STAFF_COPY,
  STAFF_SHARED_COPY,
} from "@/constants/staff-management.constants";
import { useFilterUrlState } from "@/hooks/useFilterUrlState";
import { useToast } from "@/hooks/useToast";
import type { EntityStatus } from "@/constants/status-badge.constants";
import type { FilterValues } from "@/types/filter.types";
import type {
  AdministrativeStaff,
  StaffDashboardRole,
} from "../types/staff.types";
import { useStaffList } from "../hooks/useStaffList";
import {
  useChangeStaffStatus,
  useDeleteStaff,
} from "../hooks/useStaffMutations";
import { useDepartmentOptions } from "../hooks/useDepartmentOptions";
import { StaffFormDrawer } from "./StaffFormDrawer";
import { StaffPageHeader } from "./StaffPageHeader";
import { StaffTable } from "./StaffTable";

const SEARCH_DEBOUNCE_MS = 300;
const DEFAULT_PER_PAGE = 10;

function parseStatusFilter(values: FilterValues): EntityStatus | undefined {
  const raw = values.status;
  if (raw === "active" || raw === "inactive" || raw === "pending") {
    return raw;
  }
  return undefined;
}

function parseRoleFilter(values: FilterValues): StaffDashboardRole | undefined {
  const raw = values.role;
  if (raw === "admin" || raw === "staff" || raw === "dba") {
    return raw;
  }
  return undefined;
}

export function StaffPageContent() {
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [drawerMember, setDrawerMember] = useState<AdministrativeStaff | null>(
    null,
  );
  const [drawerMode, setDrawerMode] = useState<"edit" | "view">("edit");
  const [pendingDelete, setPendingDelete] = useState<AdministrativeStaff | null>(
    null,
  );
  const [pendingStatus, setPendingStatus] = useState<{
    member: AdministrativeStaff;
    action: "activate" | "deactivate";
  } | null>(null);

  const departmentOptions = useDepartmentOptions();
  const deleteMutation = useDeleteStaff();
  const statusMutation = useChangeStaffStatus();

  const {
    draftValues,
    appliedValues,
    setDraftField,
    applyFilters,
    clearAllFilters,
    removeAppliedFilter,
    syncDraftFromUrl,
  } = useFilterUrlState({ config: STAFF_FILTER_CONFIG });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const statusFilter = useMemo(
    () => parseStatusFilter(appliedValues),
    [appliedValues],
  );
  const roleFilter = useMemo(
    () => parseRoleFilter(appliedValues),
    [appliedValues],
  );

  const listQuery = useStaffList({
    page,
    per_page: perPage,
    search: debouncedSearch || undefined,
    departmentId: departmentFilter || undefined,
    dashboardRole: roleFilter,
    status: statusFilter,
  });

  const handleApplyFilters = useCallback(() => {
    applyFilters();
    setPage(1);
  }, [applyFilters]);

  const handleClearFilters = useCallback(() => {
    clearAllFilters();
    setDepartmentFilter("");
    setPage(1);
  }, [clearAllFilters]);

  const confirmDelete = useCallback(() => {
    if (!pendingDelete) return;
    deleteMutation.mutate(pendingDelete.id, {
      onSuccess: () => {
        toast.success({ title: STAFF_COPY.deleteSuccess });
        setPendingDelete(null);
      },
      onError: (error) => {
        toast.error({
          title: "Delete failed",
          description:
            error instanceof Error ? error.message : "Could not delete staff",
        });
      },
    });
  }, [deleteMutation, pendingDelete, toast]);

  const confirmStatus = useCallback(() => {
    if (!pendingStatus) return;
    statusMutation.mutate(
      { id: pendingStatus.member.id, action: pendingStatus.action },
      {
        onSuccess: () => {
          toast.success({ title: STAFF_COPY.statusSuccess });
          setPendingStatus(null);
        },
      },
    );
  }, [pendingStatus, statusMutation, toast]);

  const departmentSelectOptions = useMemo(
    () => [
      { value: "", label: "All departments" },
      ...(departmentOptions.data ?? []),
    ],
    [departmentOptions.data],
  );

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <StaffPageHeader onCreateClick={() => setCreateOpen(true)} />
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <SingleSelect
          id="staff-dept-filter"
          options={departmentSelectOptions}
          value={departmentFilter}
          onChange={(value) => {
            setDepartmentFilter(value ?? "");
            setPage(1);
          }}
          placeholder="All departments"
          aria-label="Filter by department"
        />
        <FilterPanel
          config={STAFF_FILTER_CONFIG}
          values={draftValues}
          appliedValues={appliedValues}
          onFieldChange={setDraftField}
          onApply={handleApplyFilters}
          onClearAll={handleClearFilters}
          open={filterOpen}
          onOpenChange={(open) => {
            if (open) syncDraftFromUrl();
            setFilterOpen(open);
          }}
        />
      </div>
      <FilterChips
        config={STAFF_FILTER_CONFIG}
        values={appliedValues}
        onRemove={removeAppliedFilter}
        onClearAll={handleClearFilters}
      />
      <StaffTable
        rows={listQuery.data?.data ?? []}
        page={page}
        perPage={perPage}
        total={listQuery.data?.meta.total ?? 0}
        isLoading={listQuery.isLoading}
        isError={listQuery.isError}
        onSearch={setSearchInput}
        onPageChange={setPage}
        onPerPageChange={(next) => {
          setPerPage(next);
          setPage(1);
        }}
        onRetry={() => {
          void listQuery.refetch();
        }}
        onView={(member) => {
          setDrawerMember(member);
          setDrawerMode("view");
        }}
        onEdit={(member) => {
          setDrawerMember(member);
          setDrawerMode("edit");
        }}
        onDelete={setPendingDelete}
        onStatusChange={(member, action) =>
          setPendingStatus({ member, action })
        }
      />
      <StaffFormDrawer
        open={createOpen}
        mode="create"
        onClose={() => setCreateOpen(false)}
      />
      <StaffFormDrawer
        open={Boolean(drawerMember)}
        mode={drawerMode}
        member={drawerMember}
        onClose={() => setDrawerMember(null)}
      />
      <ConfirmationDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        title={STAFF_COPY.deleteTitle}
        description={STAFF_COPY.deleteDescription}
        confirmLabel={STAFF_SHARED_COPY.deleteAction}
        cancelLabel={STAFF_SHARED_COPY.cancelAction}
        destructive
        loading={deleteMutation.isPending}
        onConfirm={confirmDelete}
      />
      <ConfirmationDialog
        open={Boolean(pendingStatus)}
        onClose={() => setPendingStatus(null)}
        title={
          pendingStatus?.action === "deactivate"
            ? STAFF_COPY.statusDeactivateTitle
            : STAFF_COPY.statusActivateTitle
        }
        description={
          pendingStatus?.action === "deactivate"
            ? STAFF_COPY.statusDeactivateDescription
            : STAFF_COPY.statusActivateDescription
        }
        confirmLabel={
          pendingStatus?.action === "deactivate"
            ? STAFF_SHARED_COPY.deactivateAction
            : STAFF_SHARED_COPY.activateAction
        }
        cancelLabel={STAFF_SHARED_COPY.cancelAction}
        loading={statusMutation.isPending}
        onConfirm={confirmStatus}
      />
    </div>
  );
}

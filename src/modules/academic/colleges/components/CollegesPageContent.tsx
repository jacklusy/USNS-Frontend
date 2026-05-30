"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FilterChips, FilterPanel } from "@/components/shared/FilterPanel";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { Checkbox } from "@/components/ui/Checkbox";
import { COLLEGES_FILTER_CONFIG } from "@/constants/colleges-filter.constants";
import {
  ACADEMIC_SHARED_COPY,
  COLLEGES_COPY,
} from "@/constants/academic-management.constants";
import { useFilterUrlState } from "@/hooks/useFilterUrlState";
import { useToast } from "@/hooks/useToast";
import type { EntityStatus } from "@/constants/status-badge.constants";
import type { College } from "@/modules/academic/types/academic.types";
import type { FilterValues } from "@/types/filter.types";
import { useCollegeList } from "../hooks/useCollegeList";
import {
  useChangeCollegeStatus,
  useDeleteCollege,
} from "../hooks/useCollegeMutations";
import { CollegeFormDrawer } from "./CollegeFormDrawer";
import { CollegesPageHeader } from "./CollegesPageHeader";
import { CollegesTable } from "./CollegesTable";

const SEARCH_DEBOUNCE_MS = 300;
const DEFAULT_PER_PAGE = 10;

function parseStatusFilter(values: FilterValues): EntityStatus | undefined {
  const raw = values.status;
  if (raw === "active" || raw === "inactive" || raw === "pending") {
    return raw;
  }
  return undefined;
}

export function CollegesPageContent() {
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [drawerCollege, setDrawerCollege] = useState<College | null>(null);
  const [drawerMode, setDrawerMode] = useState<"edit" | "view">("edit");
  const [pendingDelete, setPendingDelete] = useState<College | null>(null);
  const [pendingStatus, setPendingStatus] = useState<{
    college: College;
    action: "activate" | "deactivate";
  } | null>(null);
  const [cascadeDepartments, setCascadeDepartments] = useState(true);

  const deleteMutation = useDeleteCollege();
  const statusMutation = useChangeCollegeStatus();

  const {
    draftValues,
    appliedValues,
    setDraftField,
    applyFilters,
    clearAllFilters,
    removeAppliedFilter,
    syncDraftFromUrl,
  } = useFilterUrlState({ config: COLLEGES_FILTER_CONFIG });

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

  const listQuery = useCollegeList({
    page,
    per_page: perPage,
    search: debouncedSearch || undefined,
    status: statusFilter,
  });

  const handleApplyFilters = useCallback(() => {
    applyFilters();
    setPage(1);
  }, [applyFilters]);

  const handleClearFilters = useCallback(() => {
    clearAllFilters();
    setPage(1);
  }, [clearAllFilters]);

  const confirmDelete = useCallback(() => {
    if (!pendingDelete) return;
    deleteMutation.mutate(pendingDelete.id, {
      onSuccess: () => {
        toast.success({ title: COLLEGES_COPY.toastDeleted });
        setPendingDelete(null);
      },
      onError: (error) => {
        toast.error({
          title: "Delete failed",
          description:
            error instanceof Error ? error.message : "Could not delete college",
        });
      },
    });
  }, [deleteMutation, pendingDelete, toast]);

  const confirmStatus = useCallback(() => {
    if (!pendingStatus) return;
    statusMutation.mutate(
      {
        id: pendingStatus.college.id,
        action: pendingStatus.action,
        cascadeDepartments:
          pendingStatus.action === "deactivate" ? cascadeDepartments : false,
      },
      {
        onSuccess: () => {
          toast.success({ title: COLLEGES_COPY.toastStatusUpdated });
          setPendingStatus(null);
        },
      },
    );
  }, [cascadeDepartments, pendingStatus, statusMutation, toast]);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <CollegesPageHeader onCreateClick={() => setCreateOpen(true)} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <FilterPanel
          config={COLLEGES_FILTER_CONFIG}
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
        config={COLLEGES_FILTER_CONFIG}
        values={appliedValues}
        onRemove={removeAppliedFilter}
        onClearAll={handleClearFilters}
      />
      <CollegesTable
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
        onView={(college) => {
          setDrawerCollege(college);
          setDrawerMode("view");
        }}
        onEdit={(college) => {
          setDrawerCollege(college);
          setDrawerMode("edit");
        }}
        onDelete={setPendingDelete}
        onStatusChange={(college, action) =>
          setPendingStatus({ college, action })
        }
      />
      <CollegeFormDrawer
        open={createOpen}
        mode="create"
        onClose={() => setCreateOpen(false)}
      />
      <CollegeFormDrawer
        open={Boolean(drawerCollege)}
        mode={drawerMode}
        college={drawerCollege}
        onClose={() => setDrawerCollege(null)}
      />
      <ConfirmationDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        title={COLLEGES_COPY.deleteTitle}
        description={COLLEGES_COPY.deleteDescription}
        confirmLabel={ACADEMIC_SHARED_COPY.deleteAction}
        cancelLabel={COLLEGES_COPY.cancelLabel}
        destructive
        loading={deleteMutation.isPending}
        onConfirm={confirmDelete}
      />
      <ConfirmationDialog
        open={Boolean(pendingStatus)}
        onClose={() => setPendingStatus(null)}
        title={
          pendingStatus?.action === "deactivate"
            ? COLLEGES_COPY.deactivateTitle
            : COLLEGES_COPY.activateTitle
        }
        description={
          pendingStatus?.action === "deactivate"
            ? COLLEGES_COPY.deactivateDescription
            : COLLEGES_COPY.activateDescription
        }
        confirmLabel={
          pendingStatus?.action === "deactivate"
            ? ACADEMIC_SHARED_COPY.deactivateAction
            : ACADEMIC_SHARED_COPY.activateAction
        }
        cancelLabel={COLLEGES_COPY.cancelLabel}
        loading={statusMutation.isPending}
        onConfirm={confirmStatus}
      >
        {pendingStatus?.action === "deactivate" ? (
          <label className="mt-4 flex cursor-pointer items-start gap-3 text-[14px] text-foreground">
            <Checkbox
              checked={cascadeDepartments}
              onChange={(event) =>
                setCascadeDepartments(event.target.checked)
              }
              aria-label={COLLEGES_COPY.deactivateCascadeLabel}
            />
            <span>{COLLEGES_COPY.deactivateCascadeLabel}</span>
          </label>
        ) : null}
      </ConfirmationDialog>
    </div>
  );
}

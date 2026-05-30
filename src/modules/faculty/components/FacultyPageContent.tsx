"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FilterChips, FilterPanel } from "@/components/shared/FilterPanel";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { SingleSelect } from "@/components/ui/select";
import { FACULTY_FILTER_CONFIG } from "@/constants/faculty-filter.constants";
import {
  FACULTY_COPY,
  FACULTY_SHARED_COPY,
} from "@/constants/faculty-management.constants";
import { useFilterUrlState } from "@/hooks/useFilterUrlState";
import { useToast } from "@/hooks/useToast";
import type { EntityStatus } from "@/constants/status-badge.constants";
import type { FilterValues } from "@/types/filter.types";
import type { FacultyMember, FacultyRank } from "../types/faculty.types";
import { useFacultyList } from "../hooks/useFacultyList";
import {
  useChangeFacultyStatus,
  useDeleteFaculty,
} from "../hooks/useFacultyMutations";
import { useDepartmentOptions } from "../hooks/useDepartmentOptions";
import { FacultyFormDrawer } from "./FacultyFormDrawer";
import { FacultyPageHeader } from "./FacultyPageHeader";
import { FacultyTable } from "./FacultyTable";

const SEARCH_DEBOUNCE_MS = 300;
const DEFAULT_PER_PAGE = 10;

function parseStatusFilter(values: FilterValues): EntityStatus | undefined {
  const raw = values.status;
  if (raw === "active" || raw === "inactive" || raw === "pending") {
    return raw;
  }
  return undefined;
}

function parseRankFilter(values: FilterValues): FacultyRank | undefined {
  const raw = values.rank;
  if (
    raw === "instructor" ||
    raw === "assistant_professor" ||
    raw === "associate_professor" ||
    raw === "professor"
  ) {
    return raw;
  }
  return undefined;
}

export function FacultyPageContent() {
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [drawerMember, setDrawerMember] = useState<FacultyMember | null>(null);
  const [drawerMode, setDrawerMode] = useState<"edit" | "view">("edit");
  const [pendingDelete, setPendingDelete] = useState<FacultyMember | null>(
    null,
  );
  const [pendingStatus, setPendingStatus] = useState<{
    member: FacultyMember;
    action: "activate" | "deactivate";
  } | null>(null);

  const departmentOptions = useDepartmentOptions();
  const deleteMutation = useDeleteFaculty();
  const statusMutation = useChangeFacultyStatus();

  const {
    draftValues,
    appliedValues,
    setDraftField,
    applyFilters,
    clearAllFilters,
    removeAppliedFilter,
    syncDraftFromUrl,
  } = useFilterUrlState({ config: FACULTY_FILTER_CONFIG });

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
  const rankFilter = useMemo(
    () => parseRankFilter(appliedValues),
    [appliedValues],
  );

  const listQuery = useFacultyList({
    page,
    per_page: perPage,
    search: debouncedSearch || undefined,
    departmentId: departmentFilter || undefined,
    rank: rankFilter,
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
        toast.success({ title: FACULTY_COPY.deleteSuccess });
        setPendingDelete(null);
      },
      onError: (error) => {
        toast.error({
          title: "Delete failed",
          description:
            error instanceof Error ? error.message : "Could not delete faculty",
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
          toast.success({ title: FACULTY_COPY.statusSuccess });
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
      <FacultyPageHeader onCreateClick={() => setCreateOpen(true)} />
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <SingleSelect
          id="faculty-dept-filter"
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
          config={FACULTY_FILTER_CONFIG}
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
        config={FACULTY_FILTER_CONFIG}
        values={appliedValues}
        onRemove={removeAppliedFilter}
        onClearAll={handleClearFilters}
      />
      <FacultyTable
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
      <FacultyFormDrawer
        open={createOpen}
        mode="create"
        onClose={() => setCreateOpen(false)}
      />
      <FacultyFormDrawer
        open={Boolean(drawerMember)}
        mode={drawerMode}
        member={drawerMember}
        onClose={() => setDrawerMember(null)}
      />
      <ConfirmationDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        title={FACULTY_COPY.deleteTitle}
        description={FACULTY_COPY.deleteDescription}
        confirmLabel={FACULTY_SHARED_COPY.deleteAction}
        cancelLabel={FACULTY_SHARED_COPY.cancelAction}
        destructive
        loading={deleteMutation.isPending}
        onConfirm={confirmDelete}
      />
      <ConfirmationDialog
        open={Boolean(pendingStatus)}
        onClose={() => setPendingStatus(null)}
        title={
          pendingStatus?.action === "deactivate"
            ? FACULTY_COPY.statusDeactivateTitle
            : FACULTY_COPY.statusActivateTitle
        }
        description={
          pendingStatus?.action === "deactivate"
            ? FACULTY_COPY.statusDeactivateDescription
            : FACULTY_COPY.statusActivateDescription
        }
        confirmLabel={
          pendingStatus?.action === "deactivate"
            ? FACULTY_SHARED_COPY.deactivateAction
            : FACULTY_SHARED_COPY.activateAction
        }
        cancelLabel={FACULTY_SHARED_COPY.cancelAction}
        loading={statusMutation.isPending}
        onConfirm={confirmStatus}
      />
    </div>
  );
}

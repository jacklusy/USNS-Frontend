"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FilterChips, FilterPanel } from "@/components/shared/FilterPanel";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { USERS_FILTER_CONFIG } from "@/constants/users-filter.constants";
import { USERS_COPY } from "@/constants/users.constants";
import { useFilterUrlState } from "@/hooks/useFilterUrlState";
import { useToast } from "@/hooks/useToast";
import { UserStatus } from "@/types/user.types";
import { useBulkUserActions } from "../hooks/useBulkUserActions";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useUserList } from "../hooks/useUserList";
import type { ManagedUser } from "../types/user-management.types";
import { parseUsersFilterValues } from "../utils/parse-users-filters";
import { CreateUserDrawer } from "./CreateUserDrawer";
import { EditUserDrawer } from "./EditUserDrawer";
import { UsersPageHeader } from "./UsersPageHeader";
import { UsersTable } from "./UsersTable";

const SEARCH_DEBOUNCE_MS = 300;
const DEFAULT_PER_PAGE = 10;

export function UsersPageContent() {
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<"edit" | "view">("edit");
  const [pendingDeleteUser, setPendingDeleteUser] = useState<ManagedUser | null>(
    null,
  );
  const [pendingBulkDelete, setPendingBulkDelete] = useState<ManagedUser[]>(
    [],
  );

  const {
    draftValues,
    appliedValues,
    setDraftField,
    applyFilters,
    clearAllFilters,
    removeAppliedFilter,
    syncDraftFromUrl,
  } = useFilterUrlState({ config: USERS_FILTER_CONFIG });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const filterParams = useMemo(
    () => parseUsersFilterValues(appliedValues),
    [appliedValues],
  );

  const listQuery = useUserList({
    page,
    per_page: perPage,
    search: debouncedSearch || undefined,
    ...filterParams,
  });

  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();
  const { bulkStatus, bulkDelete } = useBulkUserActions();

  const rows = listQuery.data?.data ?? [];
  const total = listQuery.data?.meta.total ?? 0;

  const handleSearch = useCallback((query: string) => {
    setSearchInput(query);
  }, []);

  const handlePageChange = useCallback((nextPage: number) => {
    setPage(nextPage);
  }, []);

  const handlePerPageChange = useCallback((nextPerPage: number) => {
    setPerPage(nextPerPage);
    setPage(1);
  }, []);

  const handleApplyFilters = useCallback(() => {
    applyFilters();
    setPage(1);
    setFilterOpen(false);
  }, [applyFilters]);

  const handleClearFilters = useCallback(() => {
    clearAllFilters();
    setPage(1);
  }, [clearAllFilters]);

  const openEdit = useCallback((user: ManagedUser) => {
    setEditUserId(user.id);
    setEditMode("edit");
  }, []);

  const openView = useCallback((user: ManagedUser) => {
    setEditUserId(user.id);
    setEditMode("view");
  }, []);

  const closeEditDrawer = useCallback(() => {
    setEditUserId(null);
  }, []);

  const toggleUserStatus = useCallback(
    (user: ManagedUser) => {
      const nextStatus =
        user.status === UserStatus.Active
          ? UserStatus.Inactive
          : UserStatus.Active;
      updateMutation.mutate(
        {
          id: user.id,
          input: {
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            departmentId: user.departmentId,
            status: nextStatus,
            forcePasswordChange: user.forcePasswordChange,
          },
        },
        {
          onSuccess: () => {
            toast.success({
              title:
                nextStatus === UserStatus.Active
                  ? USERS_COPY.toastActivated
                  : USERS_COPY.toastDeactivated,
            });
          },
        },
      );
    },
    [toast, updateMutation],
  );

  const confirmDeleteUser = useCallback(() => {
    if (!pendingDeleteUser) return;
    deleteMutation.mutate(pendingDeleteUser.id, {
      onSuccess: () => {
        toast.success({ title: USERS_COPY.toastDeleted });
        setPendingDeleteUser(null);
      },
    });
  }, [deleteMutation, pendingDeleteUser, toast]);

  const confirmBulkDelete = useCallback(() => {
    if (pendingBulkDelete.length === 0) return;
    const ids = pendingBulkDelete.map((user) => user.id);
    bulkDelete.mutate(ids, {
      onSuccess: () => {
        toast.success({
          title: USERS_COPY.toastBulkDeleted(pendingBulkDelete.length),
        });
        setPendingBulkDelete([]);
      },
    });
  }, [bulkDelete, pendingBulkDelete, toast]);

  const handleBulkActivate = useCallback(
    (users: ManagedUser[]) => {
      if (users.length === 0) return;
      bulkStatus.mutate(
        { ids: users.map((user) => user.id), action: "activate" },
        {
          onSuccess: () => {
            toast.success({
              title: USERS_COPY.toastBulkActivated(users.length),
            });
          },
        },
      );
    },
    [bulkStatus, toast],
  );

  const handleBulkDeactivate = useCallback(
    (users: ManagedUser[]) => {
      if (users.length === 0) return;
      bulkStatus.mutate(
        { ids: users.map((user) => user.id), action: "deactivate" },
        {
          onSuccess: () => {
            toast.success({
              title: USERS_COPY.toastBulkDeactivated(users.length),
            });
          },
        },
      );
    },
    [bulkStatus, toast],
  );

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <UsersPageHeader onCreateClick={() => setCreateOpen(true)} />

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <FilterPanel
            config={USERS_FILTER_CONFIG}
            values={draftValues}
            appliedValues={appliedValues}
            onFieldChange={setDraftField}
            onApply={handleApplyFilters}
            onClearAll={handleClearFilters}
            open={filterOpen}
            onOpenChange={(open) => {
              if (open) {
                syncDraftFromUrl();
              }
              setFilterOpen(open);
            }}
          />
        </div>
        <FilterChips
          config={USERS_FILTER_CONFIG}
          values={appliedValues}
          onRemove={(fieldId) => {
            removeAppliedFilter(fieldId);
            setPage(1);
          }}
          onClearAll={handleClearFilters}
        />
      </div>

      <UsersTable
        rows={rows}
        page={page}
        perPage={perPage}
        total={total}
        isLoading={listQuery.isLoading}
        isError={listQuery.isError}
        onSearch={handleSearch}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
        onRetry={() => {
          void listQuery.refetch();
        }}
        onView={openView}
        onEdit={openEdit}
        onToggleStatus={toggleUserStatus}
        onDelete={setPendingDeleteUser}
        onBulkActivate={handleBulkActivate}
        onBulkDeactivate={handleBulkDeactivate}
        onBulkDelete={setPendingBulkDelete}
      />

      <CreateUserDrawer
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />

      <EditUserDrawer
        userId={editUserId}
        open={editUserId !== null}
        mode={editMode}
        onClose={closeEditDrawer}
      />

      <ConfirmationDialog
        open={pendingDeleteUser !== null}
        onClose={() => setPendingDeleteUser(null)}
        onConfirm={confirmDeleteUser}
        title={USERS_COPY.deleteTitle}
        description={
          pendingDeleteUser
            ? USERS_COPY.deleteDescription(pendingDeleteUser.fullName)
            : ""
        }
        confirmLabel={USERS_COPY.deleteConfirmLabel}
        cancelLabel={USERS_COPY.cancelLabel}
        destructive
        loading={deleteMutation.isPending}
      />

      <ConfirmationDialog
        open={pendingBulkDelete.length > 0}
        onClose={() => setPendingBulkDelete([])}
        onConfirm={confirmBulkDelete}
        title={USERS_COPY.bulkDeleteTitle}
        description={USERS_COPY.bulkDeleteDescription(
          pendingBulkDelete.length,
        )}
        confirmLabel={USERS_COPY.deleteConfirmLabel}
        cancelLabel={USERS_COPY.cancelLabel}
        destructive
        loading={bulkDelete.isPending}
      />
    </div>
  );
}

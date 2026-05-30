"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { TabsWithUrl } from "@/components/ui/Tabs";
import { ROLES_MANAGEMENT_COPY } from "@/constants/roles-management.constants";
import { useToast } from "@/hooks/useToast";
import { useDeleteRole } from "../hooks/useDeleteRole";
import { useRoleList } from "../hooks/useRoleList";
import type { ManagedRole } from "../types/role-management.types";
import { CreateRoleDrawer } from "./CreateRoleDrawer";
import { EditRoleDrawer } from "./EditRoleDrawer";
import { PermissionMatrixView } from "./PermissionMatrixView";
import { RolesPageHeader } from "./RolesPageHeader";
import { RolesTable } from "./RolesTable";

const SEARCH_DEBOUNCE_MS = 300;
const DEFAULT_PER_PAGE = 10;

export function RolesPageContent() {
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editRoleId, setEditRoleId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<"edit" | "view">("edit");
  const [pendingDeleteRole, setPendingDeleteRole] = useState<ManagedRole | null>(
    null,
  );

  const deleteMutation = useDeleteRole();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const listQuery = useRoleList({
    page,
    per_page: perPage,
    search: debouncedSearch || undefined,
  });

  const listTabContent = useMemo(
    () => (
      <div className="flex flex-col gap-6 pt-2">
        <RolesPageHeader onCreateClick={() => setCreateOpen(true)} />
        <RolesTable
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
          onView={(role) => {
            setEditRoleId(role.id);
            setEditMode("view");
          }}
          onEdit={(role) => {
            setEditRoleId(role.id);
            setEditMode("edit");
          }}
          onDelete={setPendingDeleteRole}
        />
      </div>
    ),
    [listQuery, page, perPage],
  );

  const confirmDeleteRole = useCallback(() => {
    if (!pendingDeleteRole) return;
    deleteMutation.mutate(pendingDeleteRole.id, {
      onSuccess: () => {
        toast.success({ title: ROLES_MANAGEMENT_COPY.toastDeleted });
        setPendingDeleteRole(null);
      },
    });
  }, [deleteMutation, pendingDeleteRole, toast]);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <TabsWithUrl
        urlParam="tab"
        defaultTabId="list"
        items={[
          {
            id: "list",
            label: ROLES_MANAGEMENT_COPY.tabListLabel,
            content: listTabContent,
          },
          {
            id: "matrix",
            label: ROLES_MANAGEMENT_COPY.tabMatrixLabel,
            content: (
              <div className="pt-2">
                <PermissionMatrixView />
              </div>
            ),
          },
        ]}
      />

      <CreateRoleDrawer
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />

      <EditRoleDrawer
        roleId={editRoleId}
        open={editRoleId !== null}
        mode={editMode}
        onClose={() => setEditRoleId(null)}
      />

      <ConfirmationDialog
        open={pendingDeleteRole !== null}
        onClose={() => setPendingDeleteRole(null)}
        onConfirm={confirmDeleteRole}
        title={ROLES_MANAGEMENT_COPY.deleteTitle}
        description={
          pendingDeleteRole
            ? ROLES_MANAGEMENT_COPY.deleteDescription(pendingDeleteRole.name)
            : ""
        }
        confirmLabel={ROLES_MANAGEMENT_COPY.deleteConfirmLabel}
        cancelLabel={ROLES_MANAGEMENT_COPY.cancelLabel}
        destructive
        loading={deleteMutation.isPending}
      />
    </div>
  );
}

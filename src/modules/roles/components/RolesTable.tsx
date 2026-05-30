"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/Badge";
import { ROLES_MANAGEMENT_COPY } from "@/constants/roles-management.constants";
import { usePermissions } from "@/modules/auth/hooks/usePermissions";
import type {
  DataTableAction,
  DataTableColumn,
} from "@/types/data-table.types";
import { PERMISSIONS } from "@/types/permission.types";
import type { ManagedRole } from "../types/role-management.types";

function truncateDescription(text: string, max = 80): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

interface RolesTableProps {
  rows: ManagedRole[];
  page: number;
  perPage: number;
  total: number;
  isLoading: boolean;
  isError: boolean;
  onSearch: (query: string) => void;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  onRetry: () => void;
  onView: (role: ManagedRole) => void;
  onEdit: (role: ManagedRole) => void;
  onDelete: (role: ManagedRole) => void;
}

export function RolesTable({
  rows,
  page,
  perPage,
  total,
  isLoading,
  isError,
  onSearch,
  onPageChange,
  onPerPageChange,
  onRetry,
  onView,
  onEdit,
  onDelete,
}: RolesTableProps) {
  const { can } = usePermissions();

  const columns = useMemo<readonly DataTableColumn<ManagedRole>[]>(
    () => [
      {
        id: "name",
        header: "Role",
        cell: (row) => (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-foreground">{row.name}</span>
            {row.isSystem ? (
              <Badge variant="default">
                {ROLES_MANAGEMENT_COPY.systemRoleBadge}
              </Badge>
            ) : null}
          </div>
        ),
        sortable: true,
        searchable: true,
        priority: true,
      },
      {
        id: "description",
        header: "Description",
        cell: (row) => (
          <span className="text-muted-fg">
            {truncateDescription(row.description)}
          </span>
        ),
        sortable: true,
        searchable: true,
      },
      {
        id: "userCount",
        header: "Users",
        accessorKey: "userCount",
        sortable: true,
      },
      {
        id: "createdAt",
        header: "Created",
        cell: (row) =>
          new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
            new Date(row.createdAt),
          ),
        sortable: true,
      },
    ],
    [],
  );

  const rowActions = useMemo((): readonly DataTableAction<ManagedRole>[] => {
    const actions: DataTableAction<ManagedRole>[] = [
      {
        id: "view",
        label: ROLES_MANAGEMENT_COPY.actionView,
        icon: Eye,
        onSelect: onView,
        requiredPermission: PERMISSIONS.roles.view,
      },
    ];

    if (can(PERMISSIONS.roles.manage)) {
      actions.push({
        id: "edit",
        label: ROLES_MANAGEMENT_COPY.actionEdit,
        icon: Pencil,
        onSelect: onEdit,
        requiredPermission: PERMISSIONS.roles.manage,
      });
      actions.push({
        id: "delete",
        label: ROLES_MANAGEMENT_COPY.actionDelete,
        icon: Trash2,
        onSelect: onDelete,
        destructive: true,
        requiredPermission: PERMISSIONS.roles.manage,
        isVisible: (row) => !row.isSystem,
      });
    }

    return actions;
  }, [can, onDelete, onEdit, onView]);

  return (
    <DataTable
      columns={columns}
      data={rows}
      searchMode="server"
      isLoading={isLoading}
      isError={isError}
      errorTitle={ROLES_MANAGEMENT_COPY.loadErrorTitle}
      errorDescription={ROLES_MANAGEMENT_COPY.loadErrorDescription}
      onRetry={onRetry}
      onSearch={onSearch}
      pagination={{
        page,
        perPage,
        total,
        onPageChange,
        onPerPageChange,
      }}
      rowActions={rowActions}
      emptyState={
        <div className="px-6 py-12 text-center">
          <p className="text-[18px] font-semibold text-foreground">
            {ROLES_MANAGEMENT_COPY.emptyTitle}
          </p>
          <p className="mt-2 text-[13px] text-muted-fg">
            {ROLES_MANAGEMENT_COPY.emptyDescription}
          </p>
        </div>
      }
      ariaLabel="Roles table"
    />
  );
}

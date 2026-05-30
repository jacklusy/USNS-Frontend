"use client";

import {
  Ban,
  Eye,
  Pencil,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/Badge";
import { ROLE_DISPLAY_LABELS } from "@/constants/roles.constants";
import { userDetailRoute } from "@/constants/routes.constants";
import { USERS_COPY } from "@/constants/users.constants";
import { usePermissions } from "@/modules/auth/hooks/usePermissions";
import type {
  DataTableAction,
  DataTableColumn,
} from "@/types/data-table.types";
import { PERMISSIONS } from "@/types/permission.types";
import { UserStatus } from "@/types/user.types";
import type {
  ManagedUser,
  UserStatusAction,
} from "../types/user-management.types";
import { formatUserStatusLabel } from "../utils/user-status-display";

function statusBadgeVariant(
  status: UserStatus,
): "success" | "warning" | "default" {
  if (status === UserStatus.Active) return "success";
  if (status === UserStatus.Suspended) return "warning";
  return "default";
}

interface UsersTableProps {
  rows: ManagedUser[];
  page: number;
  perPage: number;
  total: number;
  isLoading: boolean;
  isError: boolean;
  onSearch: (query: string) => void;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  onRetry: () => void;
  onEdit: (user: ManagedUser) => void;
  onStatusAction: (user: ManagedUser, action: UserStatusAction) => void;
  onDelete: (user: ManagedUser) => void;
  onBulkActivate: (users: ManagedUser[]) => void;
  onBulkDeactivate: (users: ManagedUser[]) => void;
  onBulkSuspend: (users: ManagedUser[]) => void;
  onBulkDelete: (users: ManagedUser[]) => void;
}

export function UsersTable({
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
  onEdit,
  onStatusAction,
  onDelete,
  onBulkActivate,
  onBulkDeactivate,
  onBulkSuspend,
  onBulkDelete,
}: UsersTableProps) {
  const router = useRouter();
  const { can } = usePermissions();

  const columns = useMemo<readonly DataTableColumn<ManagedUser>[]>(
    () => [
      {
        id: "fullName",
        header: "Name",
        accessorKey: "fullName",
        sortable: true,
        searchable: true,
        priority: true,
      },
      {
        id: "email",
        header: "Email",
        accessorKey: "email",
        sortable: true,
        searchable: true,
      },
      {
        id: "role",
        header: "Role",
        cell: (row) => ROLE_DISPLAY_LABELS[row.role],
        sortable: true,
      },
      {
        id: "status",
        header: "Status",
        cell: (row) => (
          <Badge variant={statusBadgeVariant(row.status)}>
            {formatUserStatusLabel(row.status)}
          </Badge>
        ),
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

  const rowActions = useMemo((): readonly DataTableAction<ManagedUser>[] => {
    const actions: DataTableAction<ManagedUser>[] = [
      {
        id: "view",
        label: USERS_COPY.actionViewProfile,
        icon: Eye,
        onSelect: (user) => {
          router.push(userDetailRoute(user.id));
        },
        requiredPermission: PERMISSIONS.users.view,
      },
    ];

    if (can(PERMISSIONS.users.edit)) {
      actions.push(
        {
          id: "edit",
          label: USERS_COPY.actionEditUser,
          icon: Pencil,
          onSelect: onEdit,
          requiredPermission: PERMISSIONS.users.edit,
        },
        {
          id: "deactivate",
          label: USERS_COPY.actionDeactivate,
          icon: UserX,
          onSelect: (user) => onStatusAction(user, "deactivate"),
          requiredPermission: PERMISSIONS.users.edit,
          isVisible: (row) => row.status === UserStatus.Active,
        },
        {
          id: "suspend",
          label: USERS_COPY.actionSuspend,
          icon: Ban,
          onSelect: (user) => onStatusAction(user, "suspend"),
          requiredPermission: PERMISSIONS.users.edit,
          isVisible: (row) => row.status === UserStatus.Active,
        },
        {
          id: "activate",
          label: USERS_COPY.actionActivate,
          icon: UserCheck,
          onSelect: (user) => onStatusAction(user, "activate"),
          requiredPermission: PERMISSIONS.users.edit,
          isVisible: (row) => row.status !== UserStatus.Active,
        },
      );
    }

    if (can(PERMISSIONS.users.delete)) {
      actions.push({
        id: "delete",
        label: USERS_COPY.actionDelete,
        icon: Trash2,
        onSelect: onDelete,
        destructive: true,
        requiredPermission: PERMISSIONS.users.delete,
      });
    }

    return actions;
  }, [can, onDelete, onEdit, onStatusAction, router]);

  const bulkActions = useMemo(() => {
    const actions = [];
    if (can(PERMISSIONS.users.edit)) {
      actions.push(
        {
          id: "bulk-activate",
          label: USERS_COPY.bulkActivate,
          onAction: onBulkActivate,
        },
        {
          id: "bulk-deactivate",
          label: USERS_COPY.bulkDeactivate,
          onAction: onBulkDeactivate,
        },
        {
          id: "bulk-suspend",
          label: USERS_COPY.bulkSuspend,
          onAction: onBulkSuspend,
        },
      );
    }
    if (can(PERMISSIONS.users.delete)) {
      actions.push({
        id: "bulk-delete",
        label: USERS_COPY.bulkDelete,
        onAction: onBulkDelete,
      });
    }
    return actions;
  }, [can, onBulkActivate, onBulkDeactivate, onBulkDelete, onBulkSuspend]);

  return (
    <DataTable
      columns={columns}
      data={rows}
      searchMode="server"
      enableSelection={bulkActions.length > 0}
      isLoading={isLoading}
      isError={isError}
      errorTitle={USERS_COPY.loadErrorTitle}
      errorDescription={USERS_COPY.loadErrorDescription}
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
      bulkActions={bulkActions}
      emptyState={
        <div className="px-6 py-12 text-center">
          <p className="text-[18px] font-semibold text-foreground">
            {USERS_COPY.emptyTitle}
          </p>
          <p className="mt-2 text-[13px] text-muted-fg">
            {USERS_COPY.emptyDescription}
          </p>
        </div>
      }
      ariaLabel="Users table"
    />
  );
}

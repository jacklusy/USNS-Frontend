import type { PermissionMatrixData } from "@/modules/roles/types/role-management.types";
import type { Permission } from "@/types/permission.types";

function escapeCsvCell(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function roleHasPermission(
  rolePermissions: readonly Permission[],
  permission: Permission,
): boolean {
  return rolePermissions.includes(permission);
}

export function exportPermissionMatrixCsv(
  data: PermissionMatrixData,
  filename: string,
): void {
  const headers = [
    "Permission",
    "Category",
    ...data.roles.map((role) => role.name),
  ];

  const rows: string[][] = [headers];

  for (const group of data.permissionGroups) {
    for (const permission of group.permissions) {
      const row = [
        permission.label,
        group.category,
        ...data.roles.map((role) =>
          roleHasPermission(role.permissions, permission.key) ? "Yes" : "No",
        ),
      ];
      rows.push(row);
    }
  }

  const csv = rows
    .map((row) => row.map((cell) => escapeCsvCell(cell)).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

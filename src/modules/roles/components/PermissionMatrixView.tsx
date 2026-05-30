"use client";

import { Check, Download, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ErrorState } from "@/components/shared/ErrorState";
import { Button } from "@/components/ui/Button";
import { SkeletonTable } from "@/components/ui/loading-skeleton";
import { SingleSelect } from "@/components/ui/select";
import { ROLES_MANAGEMENT_COPY } from "@/constants/roles-management.constants";
import { useToast } from "@/hooks/useToast";
import { exportPermissionMatrixCsv } from "@/utils/export-permission-matrix-csv";
import type { Permission } from "@/types/permission.types";
import { usePermissionMatrix } from "../hooks/usePermissionMatrix";

function roleHasPermission(
  rolePermissions: readonly Permission[],
  permission: Permission,
): boolean {
  return rolePermissions.includes(permission);
}

export function PermissionMatrixView() {
  const toast = useToast();
  const matrixQuery = usePermissionMatrix();
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const matrix = matrixQuery.data?.data;
  const roles = matrix?.roles ?? [];

  const categoryOptions = useMemo(() => {
    const groups = matrix?.permissionGroups ?? [];
    return [
      { value: "all", label: ROLES_MANAGEMENT_COPY.matrixFilterPlaceholder },
      ...groups.map((group) => ({
        value: group.category,
        label: group.category,
      })),
    ];
  }, [matrix?.permissionGroups]);

  const filteredGroups = useMemo(() => {
    const groups = matrix?.permissionGroups ?? [];
    if (!categoryFilter || categoryFilter === "all") {
      return groups;
    }
    return groups.filter((group) => group.category === categoryFilter);
  }, [categoryFilter, matrix?.permissionGroups]);

  if (matrixQuery.isLoading) {
    return <SkeletonTable columns={5} rows={8} />;
  }

  if (matrixQuery.isError || !matrix) {
    return (
      <ErrorState
        title={ROLES_MANAGEMENT_COPY.matrixLoadErrorTitle}
        description={ROLES_MANAGEMENT_COPY.matrixLoadErrorDescription}
        variant="inPage"
        onRetry={() => {
          void matrixQuery.refetch();
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-[24px] font-semibold text-foreground">
            {ROLES_MANAGEMENT_COPY.matrixTitle}
          </h2>
          <p className="mt-1 max-w-2xl text-[15px] text-muted-fg">
            {ROLES_MANAGEMENT_COPY.matrixDescription}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SingleSelect
            id="matrix-category-filter"
            aria-label={ROLES_MANAGEMENT_COPY.matrixFilterLabel}
            options={categoryOptions}
            value={categoryFilter ?? "all"}
            onChange={(value) => setCategoryFilter(value)}
            placeholder={ROLES_MANAGEMENT_COPY.matrixFilterPlaceholder}
          />
          <Button
            type="button"
            variant="outline"
            leadingIcon={<Download className="h-5 w-5" strokeWidth={1.75} />}
            onClick={() => {
              exportPermissionMatrixCsv(
                {
                  roles: matrix.roles,
                  permissionGroups: matrix.permissionGroups,
                },
                "usns-permission-matrix.csv",
              );
              toast.success({
                title: ROLES_MANAGEMENT_COPY.matrixExportSuccess,
              });
            }}
          >
            {ROLES_MANAGEMENT_COPY.matrixExportLabel}
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-surface-elevated">
        <table className="min-w-full border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-border bg-surface-elevated">
              <th
                scope="col"
                className="sticky left-0 z-20 min-w-[220px] bg-surface-elevated px-4 py-3 text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg"
              >
                {ROLES_MANAGEMENT_COPY.matrixPermissionColumn}
              </th>
              <th
                scope="col"
                className="min-w-[140px] px-4 py-3 text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg"
              >
                {ROLES_MANAGEMENT_COPY.matrixCategoryColumn}
              </th>
              {roles.map((role) => (
                <th
                  key={role.id}
                  scope="col"
                  className="min-w-[120px] px-4 py-3 text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg"
                >
                  {role.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredGroups.flatMap((group) =>
              group.permissions.map((permission) => (
                <tr
                  key={permission.key}
                  className="border-b border-border last:border-b-0"
                >
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-surface-elevated px-4 py-3 font-medium text-foreground"
                  >
                    {permission.label}
                  </th>
                  <td className="px-4 py-3 text-muted-fg">{group.category}</td>
                  {roles.map((role) => {
                    const granted = roleHasPermission(
                      role.permissions,
                      permission.key,
                    );
                    return (
                      <td key={`${role.id}-${permission.key}`} className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5">
                          {granted ? (
                            <Check
                              className="h-4 w-4 text-success"
                              strokeWidth={1.75}
                              aria-hidden="true"
                            />
                          ) : (
                            <X
                              className="h-4 w-4 text-muted-fg"
                              strokeWidth={1.75}
                              aria-hidden="true"
                            />
                          )}
                          <span className="sr-only">
                            {granted
                              ? ROLES_MANAGEMENT_COPY.matrixGrantedLabel
                              : ROLES_MANAGEMENT_COPY.matrixDeniedLabel}
                          </span>
                        </span>
                      </td>
                    );
                  })}
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

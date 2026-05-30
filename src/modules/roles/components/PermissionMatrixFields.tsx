"use client";

import { useMemo } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { listAllPermissionsGrouped } from "@/constants/permission-display.constants";
import { ROLES_MANAGEMENT_COPY } from "@/constants/roles-management.constants";
import type { Permission } from "@/types/permission.types";

interface PermissionMatrixFieldsProps {
  value: readonly Permission[];
  onChange: (permissions: Permission[]) => void;
  disabled?: boolean;
  error?: string;
}

export function PermissionMatrixFields({
  value,
  onChange,
  disabled = false,
  error,
}: PermissionMatrixFieldsProps) {
  const groups = useMemo(() => listAllPermissionsGrouped(), []);
  const selected = useMemo(() => new Set(value), [value]);

  function togglePermission(permission: Permission, checked: boolean) {
    const next = new Set(selected);
    if (checked) {
      next.add(permission);
    } else {
      next.delete(permission);
    }
    onChange(Array.from(next));
  }

  function toggleGroup(
    groupPermissions: readonly { key: Permission }[],
    checked: boolean,
  ) {
    const next = new Set(selected);
    for (const item of groupPermissions) {
      if (checked) {
        next.add(item.key);
      } else {
        next.delete(item.key);
      }
    }
    onChange(Array.from(next));
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg">
        {ROLES_MANAGEMENT_COPY.permissionsLegend}
      </p>
      {error ? (
        <p className="text-[13px] text-danger" role="alert">
          {error}
        </p>
      ) : null}
      {groups.map((group) => {
        const keys = group.permissions.map((item) => item.key);
        const selectedCount = keys.filter((key) => selected.has(key)).length;
        const allSelected = selectedCount === keys.length && keys.length > 0;
        const indeterminate =
          selectedCount > 0 && selectedCount < keys.length;

        return (
          <fieldset
            key={group.category}
            className="rounded-lg border border-border bg-surface p-4"
          >
            <legend className="px-1 text-[18px] font-semibold text-foreground">
              {group.category}
            </legend>
            <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-3 text-[15px] text-foreground">
              <Checkbox
                checked={allSelected}
                indeterminate={indeterminate}
                disabled={disabled}
                onChange={(event) => {
                  toggleGroup(group.permissions, event.target.checked);
                }}
                aria-label={ROLES_MANAGEMENT_COPY.selectAllGroup(group.category)}
              />
              <span>{ROLES_MANAGEMENT_COPY.selectAllGroup(group.category)}</span>
            </label>
            <ul className="mt-2 flex flex-col gap-1">
              {group.permissions.map((permission) => (
                <li key={permission.key}>
                  <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-1 text-[15px] text-foreground hover:bg-usns-green-light/30">
                    <Checkbox
                      checked={selected.has(permission.key)}
                      disabled={disabled}
                      onChange={(event) => {
                        togglePermission(
                          permission.key,
                          event.target.checked,
                        );
                      }}
                    />
                    <span>{permission.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        );
      })}
    </div>
  );
}

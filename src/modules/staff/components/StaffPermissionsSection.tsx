"use client";

import { groupPermissionsByCategory } from "@/constants/permission-display.constants";
import { STAFF_COPY } from "@/constants/staff-management.constants";
import type { StaffDashboardRole } from "../types/staff.types";

interface StaffPermissionsSectionProps {
  role: StaffDashboardRole;
}

export function StaffPermissionsSection({
  role,
}: StaffPermissionsSectionProps) {
  const groups = groupPermissionsByCategory(role);

  return (
    <section
      aria-labelledby="staff-permissions-heading"
      className="rounded-lg border border-border bg-surface-elevated p-6"
    >
      <h2
        id="staff-permissions-heading"
        className="text-[24px] font-semibold text-foreground"
      >
        {STAFF_COPY.sectionPermissions}
      </h2>
      {groups.length === 0 ? (
        <p className="mt-4 text-[15px] text-muted-fg">
          {STAFF_COPY.permissionsEmpty}
        </p>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {groups.map((group) => (
            <div key={group.category}>
              <h3 className="text-[18px] font-semibold text-foreground">
                {group.category}
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {group.permissions.map((permission) => (
                  <li
                    key={permission.key}
                    className="text-[13px] text-muted-fg"
                  >
                    {permission.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

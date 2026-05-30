"use client";

import { groupPermissionsByCategory } from "@/constants/permission-display.constants";
import { USERS_COPY } from "@/constants/users.constants";
import type { UserRole } from "@/types/user.types";

interface UserPermissionsSectionProps {
  role: UserRole;
}

export function UserPermissionsSection({ role }: UserPermissionsSectionProps) {
  const groups = groupPermissionsByCategory(role);

  return (
    <section
      aria-labelledby="user-permissions-heading"
      className="rounded-lg border border-border bg-surface-elevated p-6"
    >
      <h2
        id="user-permissions-heading"
        className="text-[24px] font-semibold text-foreground"
      >
        {USERS_COPY.sectionPermissions}
      </h2>
      {groups.length === 0 ? (
        <p className="mt-4 text-[15px] text-muted-fg">
          {USERS_COPY.permissionsEmpty}
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

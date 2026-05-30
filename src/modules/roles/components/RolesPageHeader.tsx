"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROLES_MANAGEMENT_COPY } from "@/constants/roles-management.constants";
import { usePermissions } from "@/modules/auth/hooks/usePermissions";
import { PERMISSIONS } from "@/types/permission.types";

interface RolesPageHeaderProps {
  onCreateClick: () => void;
}

export function RolesPageHeader({ onCreateClick }: RolesPageHeaderProps) {
  const { can } = usePermissions();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-[36px] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground md:text-[48px]">
          {ROLES_MANAGEMENT_COPY.pageTitle}
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] text-muted-fg">
          {ROLES_MANAGEMENT_COPY.pageDescription}
        </p>
      </div>
      {can(PERMISSIONS.roles.manage) ? (
        <Button
          type="button"
          variant="primary"
          leadingIcon={<Plus className="h-5 w-5" strokeWidth={1.75} />}
          onClick={onCreateClick}
        >
          {ROLES_MANAGEMENT_COPY.createRoleLabel}
        </Button>
      ) : null}
    </div>
  );
}

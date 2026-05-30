"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FACULTY_COPY } from "@/constants/faculty-management.constants";
import { usePermissions } from "@/modules/auth/hooks/usePermissions";
import { PERMISSIONS } from "@/types/permission.types";

interface FacultyPageHeaderProps {
  onCreateClick: () => void;
}

export function FacultyPageHeader({ onCreateClick }: FacultyPageHeaderProps) {
  const { can } = usePermissions();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] text-foreground md:text-[32px]">
          {FACULTY_COPY.pageTitle}
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-fg">
          {FACULTY_COPY.pageDescription}
        </p>
      </div>
      {can(PERMISSIONS.faculty.manage) ? (
        <Button type="button" variant="primary" onClick={onCreateClick}>
          <Plus className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          {FACULTY_COPY.createButton}
        </Button>
      ) : null}
    </div>
  );
}

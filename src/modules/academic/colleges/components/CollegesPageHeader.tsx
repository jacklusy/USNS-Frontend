"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { COLLEGES_COPY } from "@/constants/academic-management.constants";

interface CollegesPageHeaderProps {
  onCreateClick: () => void;
}

export function CollegesPageHeader({ onCreateClick }: CollegesPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] text-foreground md:text-[32px]">
          {COLLEGES_COPY.pageTitle}
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-fg">
          {COLLEGES_COPY.pageDescription}
        </p>
      </div>
      <Button type="button" variant="primary" onClick={onCreateClick}>
        <Plus className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        {COLLEGES_COPY.createButton}
      </Button>
    </div>
  );
}

"use client";

import { X } from "lucide-react";
import { FILTER_COPY } from "@/constants/filter.constants";
import type { FilterFieldConfig, FilterValues } from "@/types/filter.types";
import { getFilterChipLabel } from "@/utils/filter-url";

interface FilterChipsProps {
  config: readonly FilterFieldConfig[];
  values: FilterValues;
  onRemove: (fieldId: string) => void;
  onClearAll: () => void;
}

export function FilterChips({
  config,
  values,
  onRemove,
  onClearAll,
}: FilterChipsProps) {
  const chips = config
    .map((field) => {
      const label = getFilterChipLabel(field, values[field.id]);
      if (!label) return null;
      return { fieldId: field.id, label };
    })
    .filter((chip): chip is { fieldId: string; label: string } => chip !== null);

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[13px] text-muted-fg">
        {FILTER_COPY.activeFiltersLabel}
      </span>
      {chips.map((chip) => (
        <span
          key={chip.fieldId}
          className="inline-flex min-h-9 items-center gap-1 rounded-pill border border-border bg-surface-elevated px-3 text-[13px] text-foreground"
        >
          {chip.label}
          <button
            type="button"
            onClick={() => {
              onRemove(chip.fieldId);
            }}
            className="inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-fg transition-colors hover:bg-usns-green-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={FILTER_COPY.removeFilter(chip.label)}
          >
            <X className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-[13px] font-medium text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        {FILTER_COPY.clearAllLabel}
      </button>
    </div>
  );
}

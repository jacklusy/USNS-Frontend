"use client";

import { SlidersHorizontal } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { FILTER_COPY } from "@/constants/filter.constants";
import type { FilterFieldConfig, FilterValues } from "@/types/filter.types";
import { countActiveFilters } from "@/utils/filter-url";
import { FilterField } from "./FilterField";

interface FilterPanelProps {
  config: readonly FilterFieldConfig[];
  values: FilterValues;
  appliedValues: FilterValues;
  onFieldChange: (fieldId: string, value: FilterValues[string]) => void;
  onApply: () => void;
  onClearAll: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  useDrawerOnMobile?: boolean;
}

function FilterFieldsForm({
  config,
  values,
  onFieldChange,
  onApply,
  onClearAll,
  onClose,
}: {
  config: readonly FilterFieldConfig[];
  values: FilterValues;
  onFieldChange: (fieldId: string, value: FilterValues[string]) => void;
  onApply: () => void;
  onClearAll: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      {config.map((field) => (
        <FilterField
          key={field.id}
          field={field}
          value={values[field.id]}
          onChange={(next) => {
            onFieldChange(field.id, next);
          }}
        />
      ))}
      <div className="flex flex-wrap gap-2 border-t border-border pt-4">
        <Button
          type="button"
          variant="brand"
          onClick={() => {
            onApply();
            onClose();
          }}
        >
          {FILTER_COPY.applyLabel}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            onClearAll();
            onClose();
          }}
        >
          {FILTER_COPY.clearAllLabel}
        </Button>
      </div>
    </div>
  );
}

export function FilterPanel({
  config,
  values,
  appliedValues,
  onFieldChange,
  onApply,
  onClearAll,
  open,
  onOpenChange,
  useDrawerOnMobile = true,
}: FilterPanelProps) {
  const panelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCount = countActiveFilters(config, appliedValues);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onOpenChange(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOpenChange, open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => {
          onOpenChange(!open);
        }}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-surface px-4 text-[15px] font-medium text-foreground transition-colors hover:bg-usns-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <SlidersHorizontal
          className="h-5 w-5 text-muted-fg"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        {FILTER_COPY.toggleLabel}
        {activeCount > 0 ? (
          <Badge variant="success">{String(activeCount)}</Badge>
        ) : null}
      </button>
      {open && !useDrawerOnMobile ? (
        <div
          id={panelId}
          className="absolute right-0 z-40 mt-2 w-[min(100vw-2rem,420px)] rounded-lg border border-border bg-surface-elevated p-5 shadow-[var(--shadow-e3)]"
        >
          <FilterFieldsForm
            config={config}
            values={values}
            onFieldChange={onFieldChange}
            onApply={onApply}
            onClearAll={onClearAll}
            onClose={() => {
              onOpenChange(false);
            }}
          />
        </div>
      ) : null}
      {useDrawerOnMobile ? (
        <div className="md:hidden">
          <Drawer
            open={open}
            onClose={() => {
              onOpenChange(false);
            }}
            title={FILTER_COPY.drawerTitle}
            width="md"
          >
            <FilterFieldsForm
              config={config}
              values={values}
              onFieldChange={onFieldChange}
              onApply={onApply}
              onClearAll={onClearAll}
              onClose={() => {
                onOpenChange(false);
              }}
            />
          </Drawer>
        </div>
      ) : null}
      {open && useDrawerOnMobile ? (
        <div
          id={panelId}
          className="absolute right-0 z-40 mt-2 hidden w-[420px] rounded-lg border border-border bg-surface-elevated p-5 shadow-[var(--shadow-e3)] md:block"
        >
          <FilterFieldsForm
            config={config}
            values={values}
            onFieldChange={onFieldChange}
            onApply={onApply}
            onClearAll={onClearAll}
            onClose={() => {
              onOpenChange(false);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

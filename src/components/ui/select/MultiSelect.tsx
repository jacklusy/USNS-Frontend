"use client";

import { ChevronDown, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { SELECT_COPY } from "@/constants/select.constants";
import { useListboxKeyboard } from "@/hooks/useListboxKeyboard";
import { useSelectPopover } from "@/hooks/useSelectPopover";
import type { SelectOption } from "@/types/select.types";
import { filterSelectOptions } from "@/utils/select-options";
import { getInputClassName } from "@/utils/input-classes";
import { SelectListbox } from "./SelectListbox";

interface MultiSelectProps<TValue extends string> {
  id: string;
  options: readonly SelectOption<TValue>[];
  value: readonly TValue[];
  onChange: (value: TValue[]) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  searchable?: boolean;
  hasError?: boolean;
  showSelectAll?: boolean;
  "aria-label"?: string;
  "aria-invalid"?: boolean;
}

export function MultiSelect<TValue extends string>({
  id,
  options,
  value,
  onChange,
  placeholder = SELECT_COPY.placeholder,
  disabled = false,
  loading = false,
  searchable = true,
  hasError = false,
  showSelectAll = false,
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
}: MultiSelectProps<TValue>) {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    open,
    listboxId,
    containerRef,
    triggerRef,
    openPopover,
    closePopover,
  } = useSelectPopover();

  const filteredOptions = useMemo(
    () => filterSelectOptions(options, searchQuery),
    [options, searchQuery],
  );

  const selectedOptions = useMemo(
    () => options.filter((option) => value.includes(option.value)),
    [options, value],
  );

  const { activeIndex, setActiveIndex, resetActiveIndex, handleKeyDown } =
    useListboxKeyboard({
      optionCount: filteredOptions.length,
      isOpen: open,
      onOpen: openPopover,
      onClose: () => {
        closePopover();
        resetActiveIndex();
      },
      onSelect: (index) => {
        const option = filteredOptions[index];
        if (option && !option.disabled) {
          toggleValue(option.value);
        }
      },
      disabled,
    });

  function toggleValue(optionValue: TValue) {
    if (value.includes(optionValue)) {
      onChange(value.filter((item) => item !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  }

  function handleSelectAll() {
    const enabled = options.filter((option) => !option.disabled);
    onChange(enabled.map((option) => option.value));
  }

  const activeDescendant =
    activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined;

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        disabled={disabled || loading}
        aria-label={ariaLabel}
        aria-invalid={ariaInvalid}
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-activedescendant={open ? activeDescendant : undefined}
        onClick={() => {
          if (open) {
            closePopover();
            resetActiveIndex();
          } else {
            openPopover();
            setActiveIndex(filteredOptions.length > 0 ? 0 : -1);
          }
        }}
        className={`${getInputClassName(hasError, disabled || loading)} min-h-11 h-auto flex-wrap items-center justify-between gap-2 py-2 text-left`}
      >
        <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
          {selectedOptions.length === 0 ? (
            <span className="text-muted-fg">
              {loading ? SELECT_COPY.loading : placeholder}
            </span>
          ) : (
            selectedOptions.map((option) => (
              <Badge key={option.value} variant="brand" className="gap-1">
                {option.label}
                <span
                  role="button"
                  tabIndex={0}
                  aria-label={`${SELECT_COPY.removeOption} ${option.label}`}
                  className="inline-flex h-4 w-4 items-center justify-center rounded-sm hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleValue(option.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.stopPropagation();
                      toggleValue(option.value);
                    }
                  }}
                >
                  <X className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
                </span>
              </Badge>
            ))
          )}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-fg transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <div className="absolute z-40 mt-1 w-full rounded-md border border-border bg-surface-elevated shadow-[var(--shadow-e3)]">
          {searchable ? (
            <div className="border-b border-border p-2">
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setActiveIndex(0);
                }}
                placeholder={SELECT_COPY.searchPlaceholder}
                className={getInputClassName(false, false)}
                aria-controls={listboxId}
              />
            </div>
          ) : null}
          {showSelectAll ? (
            <div className="border-b border-border px-3 py-2">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-[13px] font-medium text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {SELECT_COPY.selectAll}
              </button>
            </div>
          ) : null}
          <SelectListbox
            listboxId={listboxId}
            options={filteredOptions}
            activeIndex={activeIndex}
            loading={loading}
            selectedValues={value}
            multi
            onOptionSelect={(index) => {
              const option = filteredOptions[index];
              if (option && !option.disabled) {
                toggleValue(option.value);
              }
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

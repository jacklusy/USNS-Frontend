"use client";

import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SELECT_COPY } from "@/constants/select.constants";
import { useListboxKeyboard } from "@/hooks/useListboxKeyboard";
import { useSelectPopover } from "@/hooks/useSelectPopover";
import type { SelectOption } from "@/types/select.types";
import { filterSelectOptions, findOptionLabel } from "@/utils/select-options";
import { getInputClassName } from "@/utils/input-classes";
import { SelectListbox } from "./SelectListbox";

interface SingleSelectProps<TValue extends string> {
  id: string;
  options: readonly SelectOption<TValue>[];
  value: TValue | null;
  onChange: (value: TValue | null) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  searchable?: boolean;
  hasError?: boolean;
  "aria-label"?: string;
  "aria-invalid"?: boolean;
}

export function SingleSelect<TValue extends string>({
  id,
  options,
  value,
  onChange,
  placeholder = SELECT_COPY.placeholder,
  disabled = false,
  loading = false,
  searchable = false,
  hasError = false,
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
}: SingleSelectProps<TValue>) {
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
    () =>
      searchable
        ? filterSelectOptions(options, searchQuery)
        : [...options],
    [options, searchQuery, searchable],
  );

  const displayLabel = findOptionLabel(options, value) || placeholder;

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
          onChange(option.value);
          closePopover();
          resetActiveIndex();
          setSearchQuery("");
        }
      },
      disabled,
    });

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
        className={`${getInputClassName(hasError, disabled || loading)} flex items-center justify-between gap-2 text-left`}
      >
        <span className={value ? "text-foreground" : "text-muted-fg"}>
          {loading ? SELECT_COPY.loading : displayLabel}
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
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-fg"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setActiveIndex(0);
                  }}
                  placeholder={SELECT_COPY.searchPlaceholder}
                  className={`${getInputClassName(false, false)} pl-9`}
                  aria-controls={listboxId}
                />
              </div>
            </div>
          ) : null}
          <SelectListbox
            listboxId={listboxId}
            options={filteredOptions}
            activeIndex={activeIndex}
            loading={loading}
            selectedValues={value ? [value] : []}
            onOptionSelect={(index) => {
              const option = filteredOptions[index];
              if (option && !option.disabled) {
                onChange(option.value);
                closePopover();
                resetActiveIndex();
                setSearchQuery("");
              }
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

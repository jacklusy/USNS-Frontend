"use client";

import { useId, useMemo, useRef, useState } from "react";
import { SELECT_COPY } from "@/constants/select.constants";
import { useListboxKeyboard } from "@/hooks/useListboxKeyboard";
import type { SelectOption } from "@/types/select.types";
import { filterSelectOptions, findOptionLabel } from "@/utils/select-options";
import { getInputClassName } from "@/utils/input-classes";
import { SelectListbox } from "./SelectListbox";

interface ComboboxProps<TValue extends string> {
  id: string;
  options: readonly SelectOption<TValue>[];
  value: TValue | null;
  onChange: (value: TValue | null) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  allowCustomValue?: boolean;
  hasError?: boolean;
  "aria-label"?: string;
  "aria-invalid"?: boolean;
}

export function Combobox<TValue extends string>({
  id,
  options,
  value,
  onChange,
  placeholder = SELECT_COPY.searchPlaceholder,
  disabled = false,
  loading = false,
  allowCustomValue = false,
  hasError = false,
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
}: ComboboxProps<TValue>) {
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const closedLabel = findOptionLabel(options, value);

  const filteredOptions = useMemo(
    () => filterSelectOptions(options, open ? query : ""),
    [options, query, open],
  );

  const inputValue = open ? query : closedLabel;

  const closePopover = () => {
    setOpen(false);
    setQuery("");
  };

  const { activeIndex, setActiveIndex, resetActiveIndex, handleKeyDown } =
    useListboxKeyboard({
      optionCount: filteredOptions.length,
      isOpen: open,
      onOpen: () => {
        setOpen(true);
        setQuery(closedLabel);
      },
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
        }
      },
      disabled,
    });

  const activeDescendant =
    activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined;

  return (
    <div ref={containerRef} className="relative">
      <input
        id={id}
        type="text"
        role="combobox"
        disabled={disabled || loading}
        aria-label={ariaLabel}
        aria-invalid={ariaInvalid}
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-activedescendant={open ? activeDescendant : undefined}
        aria-autocomplete="list"
        value={loading ? SELECT_COPY.loading : inputValue}
        placeholder={placeholder}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          setActiveIndex(0);
          if (allowCustomValue) {
            onChange(event.target.value as TValue);
          }
        }}
        onFocus={() => {
          setOpen(true);
          setQuery(closedLabel);
          setActiveIndex(0);
        }}
        onKeyDown={handleKeyDown}
        onBlur={(event) => {
          if (
            containerRef.current &&
            !containerRef.current.contains(event.relatedTarget as Node)
          ) {
            closePopover();
            resetActiveIndex();
          }
        }}
        className={getInputClassName(hasError, disabled || loading)}
      />
      {open ? (
        <div
          className="absolute z-40 mt-1 w-full rounded-md border border-border bg-surface-elevated shadow-[var(--shadow-e3)]"
          onMouseDown={(event) => {
            event.preventDefault();
          }}
        >
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
              }
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

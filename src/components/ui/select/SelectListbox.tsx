"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { SELECT_COPY } from "@/constants/select.constants";
import type { SelectOption } from "@/types/select.types";

interface SelectListboxProps<TValue extends string> {
  listboxId: string;
  options: readonly SelectOption<TValue>[];
  activeIndex: number;
  loading?: boolean;
  selectedValues?: readonly TValue[];
  onOptionSelect: (index: number) => void;
  multi?: boolean;
}

export function SelectListbox<TValue extends string>({
  listboxId,
  options,
  activeIndex,
  loading = false,
  selectedValues = [],
  onOptionSelect,
  multi = false,
}: SelectListboxProps<TValue>) {
  if (loading) {
    return (
      <ul
        id={listboxId}
        role="listbox"
        aria-busy="true"
        className="max-h-60 overflow-y-auto py-1"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index} className="px-3 py-2">
            <Skeleton className="h-4 w-full" />
          </li>
        ))}
      </ul>
    );
  }

  if (options.length === 0) {
    return (
      <p
        id={listboxId}
        role="status"
        className="px-3 py-4 text-center text-[13px] text-muted-fg"
      >
        {SELECT_COPY.empty}
      </p>
    );
  }

  return (
    <ul
      id={listboxId}
      role="listbox"
      aria-multiselectable={multi || undefined}
      className="max-h-60 overflow-y-auto py-1"
    >
      {options.map((option, index) => {
        const isSelected = selectedValues.includes(option.value);
        const isActive = index === activeIndex;
        return (
          <li
            key={option.value}
            id={`${listboxId}-option-${index}`}
            role="option"
            aria-selected={isSelected}
            aria-disabled={option.disabled || undefined}
          >
            <button
              type="button"
              disabled={option.disabled}
              onClick={() => {
                onOptionSelect(index);
              }}
              className={`flex w-full min-h-11 items-center px-3 text-left text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50 ${
                isActive
                  ? "bg-usns-green-light text-brand"
                  : isSelected
                    ? "bg-usns-green-light/60 text-foreground"
                    : "text-foreground hover:bg-usns-green-light/40"
              }`}
            >
              {option.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

"use client";

import { Calendar } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { DATE_PICKER_COPY } from "@/constants/date-picker.constants";
import { useSelectPopover } from "@/hooks/useSelectPopover";
import type { DateFormatPreset } from "@/types/date-picker.types";
import {
  addMonths,
  formatDateValue,
} from "@/utils/date/calendar";
import { getInputClassName } from "@/utils/input-classes";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarHeader } from "./CalendarHeader";

interface DatePickerProps {
  id: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  format?: DateFormatPreset;
  disabled?: boolean;
  hasError?: boolean;
  clearable?: boolean;
  placeholder?: string;
  "aria-label"?: string;
}

export function DatePicker({
  id,
  value,
  onChange,
  minDate,
  maxDate,
  format = "medium",
  disabled = false,
  hasError = false,
  clearable = true,
  placeholder = DATE_PICKER_COPY.chooseDate,
  "aria-label": ariaLabel,
}: DatePickerProps) {
  const [viewDate, setViewDate] = useState(value ?? new Date());
  const { open, containerRef, openPopover, closePopover } = useSelectPopover();

  const panelId = `${id}-calendar`;
  const displayValue = formatDateValue(value, format);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        month: "long",
        year: "numeric",
      }).format(viewDate),
    [viewDate],
  );

  function handleSelect(date: Date) {
    onChange(date);
    closePopover();
  }

  function handleClear() {
    onChange(null);
    closePopover();
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="flex gap-2">
        <input
          id={id}
          type="text"
          role="combobox"
          readOnly
          disabled={disabled}
          value={displayValue}
          placeholder={placeholder}
          aria-label={ariaLabel ?? DATE_PICKER_COPY.chooseDate}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          onClick={() => {
            if (!disabled) openPopover();
          }}
          onFocus={() => {
            if (!disabled) openPopover();
          }}
          className={`${getInputClassName(hasError, disabled)} flex-1 cursor-pointer`}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            openPopover();
          }}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-muted-fg transition-colors hover:bg-usns-green-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={DATE_PICKER_COPY.chooseDate}
        >
          <Calendar className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
      {open ? (
        <div
          id={panelId}
          className="absolute z-40 mt-1 w-[280px] rounded-md border border-border bg-surface-elevated p-1 shadow-[var(--shadow-e3)]"
          role="dialog"
          onMouseDown={(event) => {
            event.preventDefault();
          }}
        >
          <CalendarHeader
            label={monthLabel}
            onPrevious={() => {
              setViewDate((prev) => addMonths(prev, -1));
            }}
            onNext={() => {
              setViewDate((prev) => addMonths(prev, 1));
            }}
          />
          <CalendarGrid
            viewDate={viewDate}
            selectedDate={value}
            minDate={minDate}
            maxDate={maxDate}
            onSelectDate={handleSelect}
          />
          {clearable ? (
            <div className="border-t border-border px-2 py-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="min-w-0 w-full"
                onClick={handleClear}
              >
                {DATE_PICKER_COPY.clear}
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { Calendar } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { DATE_PICKER_COPY } from "@/constants/date-picker.constants";
import { useDateRangeSelection } from "@/hooks/useDateRangeSelection";
import { useSelectPopover } from "@/hooks/useSelectPopover";
import type { DateFormatPreset, DateRangeValue } from "@/types/date-picker.types";
import {
  addMonths,
  formatDateValue,
} from "@/utils/date/calendar";
import { getInputClassName } from "@/utils/input-classes";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarHeader } from "./CalendarHeader";

interface DateRangePickerProps {
  id: string;
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  minDate?: Date;
  maxDate?: Date;
  format?: DateFormatPreset;
  disabled?: boolean;
  hasError?: boolean;
  clearable?: boolean;
  placeholder?: string;
  "aria-label"?: string;
}

function formatRangeDisplay(
  value: DateRangeValue,
  format: DateFormatPreset,
): string {
  const start = formatDateValue(value.start, format);
  const end = formatDateValue(value.end, format);
  if (start && end) return `${start} – ${end}`;
  if (start) return `${start} –`;
  return "";
}

export function DateRangePicker({
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
}: DateRangePickerProps) {
  const [leftView, setLeftView] = useState(value.start ?? new Date());
  const rightView = useMemo(() => addMonths(leftView, 1), [leftView]);
  const { open, containerRef, openPopover, closePopover } = useSelectPopover();
  const { selectDate, clear } = useDateRangeSelection(value, onChange);

  const panelId = `${id}-calendar`;
  const displayValue = formatRangeDisplay(value, format);

  function handleSelectDate(date: Date) {
    if (value.start && !value.end) {
      selectDate(date);
      closePopover();
      return;
    }
    selectDate(date);
  }

  const leftLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        month: "long",
        year: "numeric",
      }).format(leftView),
    [leftView],
  );

  const rightLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        month: "long",
        year: "numeric",
      }).format(rightView),
    [rightView],
  );

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
          className={`${getInputClassName(hasError, disabled)} flex-1 cursor-pointer`}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={openPopover}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-muted-fg transition-colors hover:bg-usns-green-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={DATE_PICKER_COPY.chooseDate}
        >
          <Calendar className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
      {open ? (
        <div
          id={panelId}
          className="absolute z-40 mt-1 rounded-md border border-border bg-surface-elevated p-1 shadow-[var(--shadow-e3)]"
          role="dialog"
          onMouseDown={(event) => {
            event.preventDefault();
          }}
        >
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="w-[280px]">
              <CalendarHeader
                label={leftLabel}
                onPrevious={() => {
                  setLeftView((prev) => addMonths(prev, -1));
                }}
                onNext={() => {
                  setLeftView((prev) => addMonths(prev, 1));
                }}
              />
              <CalendarGrid
                viewDate={leftView}
                rangeStart={value.start}
                rangeEnd={value.end}
                minDate={minDate}
                maxDate={maxDate}
                onSelectDate={handleSelectDate}
              />
            </div>
            <div className="w-[280px]">
              <CalendarHeader
                label={rightLabel}
                onPrevious={() => {
                  setLeftView((prev) => addMonths(prev, -1));
                }}
                onNext={() => {
                  setLeftView((prev) => addMonths(prev, 1));
                }}
              />
              <CalendarGrid
                viewDate={rightView}
                rangeStart={value.start}
                rangeEnd={value.end}
                minDate={minDate}
                maxDate={maxDate}
                onSelectDate={handleSelectDate}
              />
            </div>
          </div>
          {clearable ? (
            <div className="border-t border-border px-2 py-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="min-w-0 w-full"
                onClick={() => {
                  clear();
                  closePopover();
                }}
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

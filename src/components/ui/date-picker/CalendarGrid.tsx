"use client";

import { useMemo } from "react";
import { WEEKDAY_LABELS } from "@/constants/date-picker.constants";
import { useCalendarKeyboard } from "@/hooks/useCalendarKeyboard";
import {
  getMonthMatrix,
  isDateDisabled,
  isDateInRange,
  isSameDay,
} from "@/utils/date/calendar";

interface CalendarGridProps {
  viewDate: Date;
  selectedDate?: Date | null;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  onSelectDate: (date: Date) => void;
}

export function CalendarGrid({
  viewDate,
  selectedDate,
  rangeStart,
  rangeEnd,
  minDate,
  maxDate,
  onSelectDate,
}: CalendarGridProps) {
  const matrix = useMemo(() => getMonthMatrix(viewDate), [viewDate]);

  const isDateSelectable = (date: Date) => !isDateDisabled(date, minDate, maxDate);

  const { focusedIndex, setFocusedIndex, handleKeyDown, flatDays } =
    useCalendarKeyboard({
      viewDate,
      onSelectDate,
      isDateSelectable,
    });

  return (
    <div role="grid" aria-label="Calendar" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-7 gap-1 px-2 pb-1" role="row">
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            className="text-center text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg"
            role="columnheader"
          >
            {label}
          </div>
        ))}
      </div>
      {matrix.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7 gap-1 px-2" role="row">
          {week.map((day, dayIndex) => {
            if (!day) {
              return <div key={`${weekIndex}-${dayIndex}`} role="gridcell" />;
            }

            const flatIndex = flatDays.findIndex((item) =>
              isSameDay(item, day),
            );
            const selected = selectedDate
              ? isSameDay(day, selectedDate)
              : false;
            const inRange = isDateInRange(day, rangeStart ?? null, rangeEnd ?? null);
            const isStart =
              rangeStart !== undefined &&
              rangeStart !== null &&
              isSameDay(day, rangeStart);
            const isEnd =
              rangeEnd !== undefined &&
              rangeEnd !== null &&
              isSameDay(day, rangeEnd);
            const disabled = isDateDisabled(day, minDate, maxDate);
            const focused = flatIndex === focusedIndex;

            return (
              <button
                key={day.toISOString()}
                type="button"
                role="gridcell"
                disabled={disabled}
                tabIndex={focused ? 0 : -1}
                aria-selected={selected || isStart || isEnd}
                onFocus={() => {
                  if (flatIndex >= 0) setFocusedIndex(flatIndex);
                }}
                onClick={() => {
                  if (!disabled) onSelectDate(day);
                }}
                className={`inline-flex h-11 w-full items-center justify-center rounded-md text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 ${
                  selected || isStart || isEnd
                    ? "bg-brand text-white"
                    : inRange
                      ? "bg-usns-green-light/60 text-foreground"
                      : focused
                        ? "bg-usns-green-light text-brand"
                        : "text-foreground hover:bg-usns-green-light/40"
                }`}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

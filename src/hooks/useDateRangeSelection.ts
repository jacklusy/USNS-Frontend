"use client";

import { useCallback } from "react";
import type { DateRangeValue } from "@/types/date-picker.types";
import { startOfDay } from "@/utils/date/calendar";

export function useDateRangeSelection(
  value: DateRangeValue,
  onChange: (value: DateRangeValue) => void,
) {
  const selectDate = useCallback(
    (date: Date) => {
      const day = startOfDay(date);

      if (!value.start || (value.start && value.end)) {
        onChange({ start: day, end: null });
        return;
      }

      if (day.getTime() < startOfDay(value.start).getTime()) {
        onChange({ start: day, end: value.start });
      } else {
        onChange({ start: value.start, end: day });
      }
    },
    [onChange, value.end, value.start],
  );

  const clear = useCallback(() => {
    onChange({ start: null, end: null });
  }, [onChange]);

  return { selectDate, clear };
}

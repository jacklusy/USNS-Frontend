"use client";

import { useCallback, useState, type KeyboardEvent } from "react";
import { getMonthMatrix } from "@/utils/date/calendar";

interface UseCalendarKeyboardOptions {
  viewDate: Date;
  onSelectDate: (date: Date) => void;
  isDateSelectable: (date: Date) => boolean;
}

export function useCalendarKeyboard({
  viewDate,
  onSelectDate,
  isDateSelectable,
}: UseCalendarKeyboardOptions) {
  const matrix = getMonthMatrix(viewDate);
  const flatDays = matrix.flat().filter((day): day is Date => day !== null);

  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (flatDays.length === 0) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % flatDays.length);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setFocusedIndex((prev) =>
          prev <= 0 ? flatDays.length - 1 : prev - 1,
        );
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 7, flatDays.length - 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 7, 0));
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const date = flatDays[focusedIndex];
        if (date && isDateSelectable(date)) {
          onSelectDate(date);
        }
      }
    },
    [flatDays, focusedIndex, isDateSelectable, onSelectDate],
  );

  return { focusedIndex, setFocusedIndex, handleKeyDown, flatDays };
}

import type { DateFormatPreset } from "@/types/date-picker.types";

export const DATE_PICKER_COPY = {
  clear: "Clear",
  previousMonth: "Previous month",
  nextMonth: "Next month",
  chooseDate: "Choose date",
} as const;

export const DATE_FORMAT_OPTIONS: Record<
  DateFormatPreset,
  Intl.DateTimeFormatOptions
> = {
  short: { month: "numeric", day: "numeric", year: "2-digit" },
  medium: { month: "short", day: "numeric", year: "numeric" },
  long: { month: "long", day: "numeric", year: "numeric" },
};

export const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

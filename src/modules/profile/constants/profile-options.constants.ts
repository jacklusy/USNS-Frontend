import type { DateFormatPreset } from "@/types/date-picker.types";
import type { ThemeMode } from "@/store/ui.slice";
import { LOCALE_OPTIONS, TIMEZONE_OPTIONS } from "@/constants/settings-management.constants";

export const PROFILE_LANGUAGE_OPTIONS = [...LOCALE_OPTIONS];

export const PROFILE_TIMEZONE_OPTIONS = [...TIMEZONE_OPTIONS];

export const PROFILE_DATE_FORMAT_OPTIONS: readonly {
  value: DateFormatPreset;
  label: string;
}[] = [
  { value: "short", label: "Short (MM/DD/YY)" },
  { value: "medium", label: "Medium (Jan 1, 2026)" },
  { value: "long", label: "Long (January 1, 2026)" },
];

export const PROFILE_THEME_OPTIONS: readonly {
  value: ThemeMode;
  label: string;
}[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

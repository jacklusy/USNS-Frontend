import type { AccountPreferences } from "../types/profile.types";
import { useUiStore } from "@/store/ui.slice";

export function applyAccountPreferencesToUi(
  preferences: AccountPreferences,
): void {
  const { setTheme, setLanguage, setTimezone, setDateFormat } =
    useUiStore.getState();
  setTheme(preferences.theme);
  setLanguage(preferences.language);
  setTimezone(preferences.timezone);
  setDateFormat(preferences.dateFormat);
  if (typeof document !== "undefined") {
    document.documentElement.lang = preferences.language;
  }
}

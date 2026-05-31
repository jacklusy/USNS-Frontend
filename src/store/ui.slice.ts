import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DateFormatPreset } from "@/types/date-picker.types";

export type ThemeMode = "light" | "dark" | "system";

interface UiState {
  sidebarOpen: boolean;
  mobileSidebarOpen: boolean;
  theme: ThemeMode;
  language: string;
  timezone: string;
  dateFormat: DateFormatPreset;
  breadcrumbSegmentLabels: Record<string, string>;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;
  setMobileSidebarOpen: (open: boolean) => void;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: string) => void;
  setTimezone: (timezone: string) => void;
  setDateFormat: (dateFormat: DateFormatPreset) => void;
  setBreadcrumbSegmentLabels: (labels: Record<string, string>) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      mobileSidebarOpen: false,
      theme: "light",
      language: "en-US",
      timezone: "America/New_York",
      dateFormat: "medium",
      breadcrumbSegmentLabels: {},
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleMobileSidebar: () =>
        set((state) => ({ mobileSidebarOpen: !state.mobileSidebarOpen })),
      setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setTimezone: (timezone) => set({ timezone }),
      setDateFormat: (dateFormat) => set({ dateFormat }),
      setBreadcrumbSegmentLabels: (labels) =>
        set({ breadcrumbSegmentLabels: labels }),
    }),
    {
      name: "usns-ui",
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        theme: state.theme,
        language: state.language,
        timezone: state.timezone,
        dateFormat: state.dateFormat,
      }),
    },
  ),
);

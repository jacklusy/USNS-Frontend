import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";

interface UiState {
  sidebarOpen: boolean;
  mobileSidebarOpen: boolean;
  theme: ThemeMode;
  breadcrumbSegmentLabels: Record<string, string>;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;
  setMobileSidebarOpen: (open: boolean) => void;
  setTheme: (theme: ThemeMode) => void;
  setBreadcrumbSegmentLabels: (labels: Record<string, string>) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      mobileSidebarOpen: false,
      theme: "light",
      breadcrumbSegmentLabels: {},
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleMobileSidebar: () =>
        set((state) => ({ mobileSidebarOpen: !state.mobileSidebarOpen })),
      setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
      setTheme: (theme) => set({ theme }),
      setBreadcrumbSegmentLabels: (labels) =>
        set({ breadcrumbSegmentLabels: labels }),
    }),
    {
      name: "usns-ui",
      partialize: (state) => ({ sidebarOpen: state.sidebarOpen }),
    },
  ),
);

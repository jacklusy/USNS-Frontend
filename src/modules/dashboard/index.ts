export { dashboardService } from "./services";
export type { IDashboardService } from "./services";
export { useDashboardActivity } from "./hooks/useDashboardActivity";
export { useDashboardActivityFeed } from "./hooks/useDashboardActivityFeed";
export { useDashboardAnnouncements } from "./hooks/useDashboardAnnouncements";
export { useDashboardBannerAnnouncement } from "./hooks/useDashboardBannerAnnouncement";
export { useDashboardAnalytics } from "./hooks/useDashboardAnalytics";
export { useDashboardAnnouncement } from "./hooks/useDashboardAnnouncement";
export { useDashboardKpis } from "./hooks/useDashboardKpis";
export { useDashboardQuickActions } from "./hooks/useDashboardQuickActions";
export { useDashboardStats } from "./hooks/useDashboardStats";
export type {
  ActivityActionType,
  DashboardActivityItem,
  DashboardAnalytics,
  DashboardAnnouncement,
  DashboardKpi,
  DashboardQuickAction,
  DashboardStats,
  StatIconKey,
  StatTrend,
} from "./types/dashboard.types";

import type { Permission } from "@/types/permission.types";

export interface DashboardStats {
  totalUsers: number;
  activeSessions: number;
  pendingApprovals: number;
  systemAlerts: number;
}

export type StatTrend = "up" | "down" | "neutral";

export type StatIconKey = "users" | "sessions" | "approvals" | "alerts";

export interface DashboardKpi {
  id: string;
  title: string;
  value: number;
  trend: StatTrend;
  changePercent: number;
  icon: StatIconKey;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface DashboardLineSeries {
  name: string;
  points: ChartDataPoint[];
}

export interface DashboardAnalytics {
  enrollmentTrend: DashboardLineSeries[];
  approvalsByMonth: ChartDataPoint[];
  usersByRole: ChartDataPoint[];
}

export type QuickActionIconKey =
  | "userPlus"
  | "fileText"
  | "settings"
  | "bell";

export interface DashboardQuickAction {
  id: string;
  label: string;
  href: string;
  icon: QuickActionIconKey;
  badgeCount?: number;
  requiredPermission?: Permission;
}

export type AnnouncementPriority = "critical" | "normal";

export interface DashboardAnnouncement {
  id: string;
  title: string;
  body: string;
  priority: AnnouncementPriority;
  createdAt: string;
}

export interface DashboardActivityItem {
  id: string;
  actorName: string;
  action: string;
  resourceType: string;
  createdAt: string;
}

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

export interface DashboardQuickActionDefinition {
  id: string;
  label: string;
  href: string;
  icon: QuickActionIconKey;
  requiredPermission?: Permission;
}

export interface DashboardQuickAction extends DashboardQuickActionDefinition {
  badgeCount?: number;
}

export type AnnouncementPriority = "critical" | "normal";

export interface DashboardAnnouncement {
  id: string;
  title: string;
  body: string;
  priority: AnnouncementPriority;
  authorName: string;
  createdAt: string;
}

export type ActivityActionType =
  | "created"
  | "updated"
  | "deleted"
  | "exported"
  | "approved"
  | "viewed";

export interface DashboardActivityItem {
  id: string;
  actorName: string;
  action: string;
  actionType: ActivityActionType;
  resourceType: string;
  targetLabel: string;
  createdAt: string;
}

export interface ActivityQueryParams {
  page?: number;
  per_page?: number;
}

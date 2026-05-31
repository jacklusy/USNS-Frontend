import type { ApiTimestamp } from "@/types/dto/common.dto";
import type { Permission } from "@/types/permission.types";
import type {
  ActivityActionType,
  AnnouncementPriority,
  DashboardAnalytics,
  DashboardKpi,
  DashboardQuickActionDefinition,
  DashboardStats,
  StatIconKey,
  StatTrend,
} from "@/modules/dashboard/types/dashboard.types";

export interface DashboardStatsDto {
  total_users: number;
  active_sessions: number;
  pending_approvals: number;
  system_alerts: number;
}

export interface DashboardKpiDto {
  id: string;
  title: string;
  value: number;
  trend: StatTrend;
  change_percent: number;
  icon: StatIconKey;
}

export interface ChartDataPointDto {
  label: string;
  value: number;
}

export interface DashboardLineSeriesDto {
  name: string;
  points: ChartDataPointDto[];
}

export interface DashboardAnalyticsDto {
  enrollment_trend: DashboardLineSeriesDto[];
  approvals_by_month: ChartDataPointDto[];
  users_by_role: ChartDataPointDto[];
}

export interface DashboardQuickActionDefinitionDto {
  id: string;
  label: string;
  href: string;
  icon: DashboardQuickActionDefinition["icon"];
  required_permission?: Permission;
}

export interface DashboardQuickActionDto extends DashboardQuickActionDefinitionDto {
  badge_count?: number;
}

export interface DashboardAnnouncementDto {
  id: string;
  title: string;
  body: string;
  priority: AnnouncementPriority;
  author_name: string;
  created_at: ApiTimestamp;
}

export interface DashboardActivityItemDto {
  id: string;
  actor_name: string;
  action: string;
  action_type: ActivityActionType;
  resource_type: string;
  target_label: string;
  created_at: ApiTimestamp;
}

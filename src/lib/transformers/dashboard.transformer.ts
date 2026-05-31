import { parseApiDate, toApiTimestamp } from "@/lib/transformers/common";
import type {
  DashboardActivityItem,
  DashboardAnalytics,
  DashboardAnnouncement,
  DashboardKpi,
  DashboardLineSeries,
  DashboardQuickAction,
  DashboardQuickActionDefinition,
  DashboardStats,
} from "@/modules/dashboard/types/dashboard.types";
import type {
  ChartDataPointDto,
  DashboardActivityItemDto,
  DashboardAnalyticsDto,
  DashboardAnnouncementDto,
  DashboardKpiDto,
  DashboardLineSeriesDto,
  DashboardQuickActionDefinitionDto,
  DashboardQuickActionDto,
  DashboardStatsDto,
} from "@/types/dto/dashboard.dto";

export function toDashboardStats(dto: DashboardStatsDto): DashboardStats {
  return {
    totalUsers: dto.total_users,
    activeSessions: dto.active_sessions,
    pendingApprovals: dto.pending_approvals,
    systemAlerts: dto.system_alerts,
  };
}

export function toDashboardKpi(dto: DashboardKpiDto): DashboardKpi {
  return {
    id: dto.id,
    title: dto.title,
    value: dto.value,
    trend: dto.trend,
    changePercent: dto.change_percent,
    icon: dto.icon,
  };
}

function toChartDataPoint(dto: ChartDataPointDto) {
  return { label: dto.label, value: dto.value };
}

function toDashboardLineSeries(dto: DashboardLineSeriesDto): DashboardLineSeries {
  return {
    name: dto.name,
    points: dto.points.map(toChartDataPoint),
  };
}

export function toDashboardAnalytics(dto: DashboardAnalyticsDto): DashboardAnalytics {
  return {
    enrollmentTrend: dto.enrollment_trend.map(toDashboardLineSeries),
    approvalsByMonth: dto.approvals_by_month.map(toChartDataPoint),
    usersByRole: dto.users_by_role.map(toChartDataPoint),
  };
}

export function toDashboardQuickActionDefinition(
  dto: DashboardQuickActionDefinitionDto,
): DashboardQuickActionDefinition {
  return {
    id: dto.id,
    label: dto.label,
    href: dto.href,
    icon: dto.icon,
    requiredPermission: dto.required_permission,
  };
}

export function toDashboardQuickAction(dto: DashboardQuickActionDto): DashboardQuickAction {
  return {
    ...toDashboardQuickActionDefinition(dto),
    badgeCount: dto.badge_count,
  };
}

export function toDashboardAnnouncement(
  dto: DashboardAnnouncementDto,
): DashboardAnnouncement {
  return {
    id: dto.id,
    title: dto.title,
    body: dto.body,
    priority: dto.priority,
    authorName: dto.author_name,
    createdAt: toApiTimestamp(parseApiDate(dto.created_at)),
  };
}

export function toDashboardActivityItem(
  dto: DashboardActivityItemDto,
): DashboardActivityItem {
  return {
    id: dto.id,
    actorName: dto.actor_name,
    action: dto.action,
    actionType: dto.action_type,
    resourceType: dto.resource_type,
    targetLabel: dto.target_label,
    createdAt: toApiTimestamp(parseApiDate(dto.created_at)),
  };
}

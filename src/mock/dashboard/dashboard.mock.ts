import type { ApiResponse } from "@/types/api.types";
import { PERMISSIONS } from "@/types/permission.types";
import type {
  DashboardActivityItem,
  DashboardAnalytics,
  DashboardAnnouncement,
  DashboardKpi,
  DashboardQuickAction,
  DashboardStats,
} from "@/modules/dashboard/types/dashboard.types";

export const mockDashboardStats: ApiResponse<DashboardStats> = {
  data: {
    totalUsers: 1240,
    activeSessions: 86,
    pendingApprovals: 14,
    systemAlerts: 3,
  },
};

export const mockDashboardKpis: ApiResponse<DashboardKpi[]> = {
  data: [
    {
      id: "kpi_users",
      title: "Total users",
      value: 1240,
      trend: "up",
      changePercent: 12.5,
      icon: "users",
    },
    {
      id: "kpi_sessions",
      title: "Active sessions",
      value: 86,
      trend: "up",
      changePercent: 4.2,
      icon: "sessions",
    },
    {
      id: "kpi_approvals",
      title: "Pending approvals",
      value: 14,
      trend: "down",
      changePercent: 8.1,
      icon: "approvals",
    },
    {
      id: "kpi_alerts",
      title: "System alerts",
      value: 3,
      trend: "neutral",
      changePercent: 0,
      icon: "alerts",
    },
  ],
};

export const mockDashboardAnalytics: ApiResponse<DashboardAnalytics> = {
  data: {
    enrollmentTrend: [
      {
        name: "Enrollments",
        points: [
          { label: "Jan", value: 420 },
          { label: "Feb", value: 480 },
          { label: "Mar", value: 510 },
          { label: "Apr", value: 540 },
          { label: "May", value: 590 },
          { label: "Jun", value: 620 },
        ],
      },
    ],
    approvalsByMonth: [
      { label: "Jan", value: 22 },
      { label: "Feb", value: 18 },
      { label: "Mar", value: 26 },
      { label: "Apr", value: 19 },
      { label: "May", value: 14 },
      { label: "Jun", value: 11 },
    ],
    usersByRole: [
      { label: "Faculty", value: 420 },
      { label: "Staff", value: 310 },
      { label: "Admin", value: 85 },
      { label: "Students", value: 425 },
    ],
  },
};

export const mockDashboardQuickActions: ApiResponse<DashboardQuickAction[]> = {
  data: [
    {
      id: "qa_create_user",
      label: "Create user",
      href: "/users",
      icon: "userPlus",
      requiredPermission: PERMISSIONS.users.create,
    },
    {
      id: "qa_reports",
      label: "Generate report",
      href: "/reports",
      icon: "fileText",
      badgeCount: 2,
      requiredPermission: PERMISSIONS.reports.view,
    },
    {
      id: "qa_settings",
      label: "System settings",
      href: "/settings",
      icon: "settings",
      requiredPermission: PERMISSIONS.settings.manage,
    },
    {
      id: "qa_announce",
      label: "Send announcement",
      href: "/dashboard",
      icon: "bell",
      requiredPermission: PERMISSIONS.notifications.manage,
    },
  ],
};

export const mockDashboardAnnouncement: ApiResponse<DashboardAnnouncement | null> =
  {
    data: {
      id: "ann_001",
      title: "Scheduled maintenance — June 2",
      body: "The administration portal will be unavailable from 02:00–04:00 UTC for database upgrades.",
      priority: "critical",
      createdAt: "2026-05-30T07:00:00Z",
    },
  };

export const mockDashboardActivity: ApiResponse<DashboardActivityItem[]> = {
  data: [
    {
      id: "act_001",
      actorName: "Ahmed Al-Rashidi",
      action: "updated",
      resourceType: "user",
      createdAt: "2026-05-30T09:15:00Z",
    },
    {
      id: "act_002",
      actorName: "Sara Mitchell",
      action: "created",
      resourceType: "role",
      createdAt: "2026-05-30T08:42:00Z",
    },
    {
      id: "act_003",
      actorName: "James Okonkwo",
      action: "exported",
      resourceType: "report",
      createdAt: "2026-05-29T16:30:00Z",
    },
    {
      id: "act_004",
      actorName: "Omar Farouk",
      action: "approved",
      resourceType: "user request",
      createdAt: "2026-05-29T11:05:00Z",
    },
    {
      id: "act_005",
      actorName: "Elena Vasquez",
      action: "viewed",
      resourceType: "dashboard",
      createdAt: "2026-05-28T14:20:00Z",
    },
  ],
};

import type { ApiResponse } from "@/types/api.types";
import type { PaginatedResponse } from "@/types/api.types";
import { QUICK_ACTION_DEFINITIONS } from "@/constants/dashboard-quick-actions.constants";
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

const QUICK_ACTION_BADGE_COUNTS: Record<string, number | undefined> = {
  qa_reports: 2,
};

export function buildMockQuickActions(): DashboardQuickAction[] {
  return QUICK_ACTION_DEFINITIONS.map((definition) => ({
    ...definition,
    badgeCount: QUICK_ACTION_BADGE_COUNTS[definition.id],
  }));
}

export const mockDashboardQuickActions: ApiResponse<DashboardQuickAction[]> = {
  data: buildMockQuickActions(),
};

export const mockDashboardAnnouncementsList: ApiResponse<DashboardAnnouncement[]> =
  {
    data: [
      {
        id: "ann_001",
        title: "Scheduled maintenance — June 2",
        body: "The administration portal will be unavailable from 02:00–04:00 UTC for database upgrades. Plan access accordingly and notify your teams.",
        priority: "critical",
        authorName: "Omar Farouk",
        createdAt: "2026-05-30T07:00:00Z",
      },
      {
        id: "ann_002",
        title: "New enrollment reporting available",
        body: "The reports module now includes semester-over-semester enrollment comparisons. Visit Reports to explore the new dashboards.",
        priority: "normal",
        authorName: "Sara Mitchell",
        createdAt: "2026-05-28T14:00:00Z",
      },
      {
        id: "ann_003",
        title: "Password policy update",
        body: "All administrative accounts must enable two-factor authentication by June 15. Users without 2FA will be prompted at next login.",
        priority: "critical",
        authorName: "James Okonkwo",
        createdAt: "2026-05-25T09:30:00Z",
      },
      {
        id: "ann_004",
        title: "Faculty onboarding webinar",
        body: "Join the DBA team on June 10 for a walkthrough of user provisioning and role assignments for the upcoming academic term.",
        priority: "normal",
        authorName: "Ahmed Al-Rashidi",
        createdAt: "2026-05-22T16:45:00Z",
      },
      {
        id: "ann_005",
        title: "Audit log retention extended",
        body: "System audit logs are now retained for 24 months to support compliance reviews. Export options are unchanged.",
        priority: "normal",
        authorName: "Elena Vasquez",
        createdAt: "2026-05-18T11:20:00Z",
      },
      {
        id: "ann_006",
        title: "Emergency contact verification",
        body: "Please verify department emergency contacts in Settings by May 31. Incomplete records will be flagged in the weekly summary.",
        priority: "critical",
        authorName: "Sara Mitchell",
        createdAt: "2026-05-15T08:00:00Z",
      },
    ],
  };

export const mockDashboardAllActivity: DashboardActivityItem[] = [
  {
    id: "act_001",
    actorName: "Ahmed Al-Rashidi",
    action: "updated",
    actionType: "updated",
    resourceType: "user",
    targetLabel: "Fatima Hassan",
    createdAt: "2026-05-30T09:15:00Z",
  },
  {
    id: "act_002",
    actorName: "Sara Mitchell",
    action: "created",
    actionType: "created",
    resourceType: "role",
    targetLabel: "Department Lead",
    createdAt: "2026-05-30T08:42:00Z",
  },
  {
    id: "act_003",
    actorName: "James Okonkwo",
    action: "exported",
    actionType: "exported",
    resourceType: "report",
    targetLabel: "Enrollment Summary Q2",
    createdAt: "2026-05-29T16:30:00Z",
  },
  {
    id: "act_004",
    actorName: "Omar Farouk",
    action: "approved",
    actionType: "approved",
    resourceType: "user request",
    targetLabel: "New faculty account",
    createdAt: "2026-05-29T11:05:00Z",
  },
  {
    id: "act_005",
    actorName: "Elena Vasquez",
    action: "viewed",
    actionType: "viewed",
    resourceType: "dashboard",
    targetLabel: "Executive overview",
    createdAt: "2026-05-28T14:20:00Z",
  },
  {
    id: "act_006",
    actorName: "James Okonkwo",
    action: "deleted",
    actionType: "deleted",
    resourceType: "user",
    targetLabel: "Inactive test account",
    createdAt: "2026-05-28T10:00:00Z",
  },
  {
    id: "act_007",
    actorName: "Sara Mitchell",
    action: "created",
    actionType: "created",
    resourceType: "announcement",
    targetLabel: "Enrollment reporting launch",
    createdAt: "2026-05-27T15:30:00Z",
  },
  {
    id: "act_008",
    actorName: "Ahmed Al-Rashidi",
    action: "updated",
    actionType: "updated",
    resourceType: "settings",
    targetLabel: "Mail delivery",
    createdAt: "2026-05-27T09:45:00Z",
  },
  {
    id: "act_009",
    actorName: "Omar Farouk",
    action: "approved",
    actionType: "approved",
    resourceType: "user request",
    targetLabel: "Staff role change",
    createdAt: "2026-05-26T13:10:00Z",
  },
  {
    id: "act_010",
    actorName: "Elena Vasquez",
    action: "exported",
    actionType: "exported",
    resourceType: "audit log",
    targetLabel: "May compliance export",
    createdAt: "2026-05-26T08:55:00Z",
  },
  {
    id: "act_011",
    actorName: "James Okonkwo",
    action: "created",
    actionType: "created",
    resourceType: "user",
    targetLabel: "Marcus Chen",
    createdAt: "2026-05-25T17:20:00Z",
  },
  {
    id: "act_012",
    actorName: "Sara Mitchell",
    action: "viewed",
    actionType: "viewed",
    resourceType: "report",
    targetLabel: "Faculty headcount",
    createdAt: "2026-05-25T11:00:00Z",
  },
];

export function paginateMockActivity(
  page: number,
  perPage: number,
): PaginatedResponse<DashboardActivityItem> {
  const total = mockDashboardAllActivity.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), lastPage);
  const start = (safePage - 1) * perPage;
  const data = mockDashboardAllActivity.slice(start, start + perPage);

  return {
    data,
    meta: {
      total,
      page: safePage,
      per_page: perPage,
      last_page: lastPage,
    },
  };
}

export function getMockBannerAnnouncement(): DashboardAnnouncement | null {
  const critical = mockDashboardAnnouncementsList.data.filter(
    (item) => item.priority === "critical",
  );
  if (critical.length === 0) {
    return null;
  }
  return critical.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )[0];
}

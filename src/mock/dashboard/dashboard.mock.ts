import type { ApiResponse } from "@/types/api.types";
import type {
  DashboardActivityItem,
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
  ],
};

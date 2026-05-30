export interface DashboardStats {
  totalUsers: number;
  activeSessions: number;
  pendingApprovals: number;
  systemAlerts: number;
}

export interface DashboardActivityItem {
  id: string;
  actorName: string;
  action: string;
  resourceType: string;
  createdAt: string;
}

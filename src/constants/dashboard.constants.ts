export const DASHBOARD_SECTION_COPY = {
  kpis: {
    title: "Key metrics",
    description: "Overview of platform health and workload",
    error: "Unable to load key metrics.",
  },
  analytics: {
    title: "Analytics",
    description: "Enrollment, approvals, and role distribution",
    error: "Unable to load analytics.",
  },
  activity: {
    title: "Recent activity",
    description: "Latest actions across the administration portal",
    error: "Unable to load recent activity.",
    empty: "No recent activity to display.",
  },
  quickActions: {
    title: "Quick actions",
    description: "Shortcuts for frequent administrative tasks",
    error: "Unable to load quick actions.",
    empty: "No quick actions available for your role.",
  },
} as const;

export const DASHBOARD_CHART_TITLES = {
  enrollment: "Enrollment trend",
  approvals: "Approvals by month",
  usersByRole: "Users by role",
} as const;

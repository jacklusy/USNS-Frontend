import type {
  DailyActiveUserPoint,
  FeatureUsageRow,
  PeakHourCell,
  PeakHourDayOfWeek,
  TopActiveUser,
  UsageReportData,
  UsageReportParams,
} from "@/modules/reports/types/usage-report.types";

const DAYS: PeakHourDayOfWeek[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const TOP_USERS_SEED: TopActiveUser[] = [
  {
    id: "usr_admin",
    name: "James Carter",
    role: "Administrator",
    actionCount: 842,
    lastActiveAt: "2026-05-30T18:22:00.000Z",
  },
  {
    id: "usr_dean",
    name: "Sara Mitchell",
    role: "Dean",
    actionCount: 615,
    lastActiveAt: "2026-05-30T16:10:00.000Z",
  },
  {
    id: "usr_dba",
    name: "Omar Farouk",
    role: "DBA",
    actionCount: 590,
    lastActiveAt: "2026-05-30T17:45:00.000Z",
  },
  {
    id: "usr_faculty",
    name: "Elena Vasquez",
    role: "Faculty",
    actionCount: 412,
    lastActiveAt: "2026-05-29T14:30:00.000Z",
  },
  {
    id: "usr_staff",
    name: "Nina Brooks",
    role: "Staff",
    actionCount: 388,
    lastActiveAt: "2026-05-30T09:15:00.000Z",
  },
];

const FEATURE_USAGE_SEED: FeatureUsageRow[] = [
  { id: "feat_users", module: "User management", sessionCount: 1240, sharePercent: 28 },
  { id: "feat_academic", module: "Academic structure", sessionCount: 980, sharePercent: 22 },
  { id: "feat_reports", module: "Reports", sessionCount: 720, sharePercent: 16 },
  { id: "feat_audit", module: "Audit & monitoring", sessionCount: 540, sharePercent: 12 },
  { id: "feat_settings", module: "Settings", sessionCount: 480, sharePercent: 11 },
  { id: "feat_notifications", module: "Notifications", sessionCount: 490, sharePercent: 11 },
];

function resolveDateBounds(params: UsageReportParams): {
  dateFrom: string;
  dateTo: string;
  dayCount: number;
} {
  const end = params.dateTo
    ? new Date(params.dateTo)
    : new Date("2026-05-30T00:00:00.000Z");
  let start: Date;
  if (params.preset === "7d") {
    start = new Date(end);
    start.setDate(start.getDate() - 6);
  } else if (params.preset === "30d") {
    start = new Date(end);
    start.setDate(start.getDate() - 29);
  } else if (params.preset === "90d") {
    start = new Date(end);
    start.setDate(start.getDate() - 89);
  } else if (params.dateFrom) {
    start = new Date(params.dateFrom);
  } else {
    start = new Date(end);
    start.setDate(start.getDate() - 29);
  }
  const dayCount =
    Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000) + 1);
  return {
    dateFrom: start.toISOString().slice(0, 10),
    dateTo: end.toISOString().slice(0, 10),
    dayCount: Math.min(dayCount, 90),
  };
}

function buildDailyActiveUsers(dayCount: number, seed: number): DailyActiveUserPoint[] {
  const points: DailyActiveUserPoint[] = [];
  const end = new Date("2026-05-30T00:00:00.000Z");
  for (let i = dayCount - 1; i >= 0; i -= 1) {
    const date = new Date(end);
    date.setDate(date.getDate() - i);
    const label = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const weekday = date.getDay();
    const weekendFactor = weekday === 0 || weekday === 6 ? 0.65 : 1;
    const value = Math.round(
      (120 + (seed % 40) + (i % 7) * 8) * weekendFactor,
    );
    points.push({ label, value });
  }
  return points;
}

function buildPeakHours(seed: number): PeakHourCell[] {
  const cells: PeakHourCell[] = [];
  for (const dayOfWeek of DAYS) {
    for (let hour = 0; hour < 24; hour += 1) {
      const isWeekday = dayOfWeek !== "saturday" && dayOfWeek !== "sunday";
      const businessHour =
        hour >= 8 && hour <= 18 ? (isWeekday ? 1 : 0.35) : 0.15;
      const lunchBump = hour >= 11 && hour <= 14 ? 1.25 : 1;
      const count = Math.round(
        (5 + (seed % 12) + hour * 0.4) * businessHour * lunchBump,
      );
      cells.push({ dayOfWeek, hour, count });
    }
  }
  return cells;
}

export function buildUsageReport(params: UsageReportParams): UsageReportData {
  const bounds = resolveDateBounds(params);
  const seedKey = `${bounds.dateFrom}-${bounds.dateTo}-${params.preset}`;
  let seed = 0;
  for (let i = 0; i < seedKey.length; i += 1) {
    seed = (seed * 31 + seedKey.charCodeAt(i)) % 500;
  }
  const scale = bounds.dayCount / 30;
  const topUsers = TOP_USERS_SEED.map((user, index) => ({
    ...user,
    actionCount: Math.round(user.actionCount * scale * (0.9 + (index % 3) * 0.05)),
  }));
  const featureUsage = FEATURE_USAGE_SEED.map((row) => ({
    ...row,
    sessionCount: Math.round(row.sessionCount * scale),
  }));
  return {
    dailyActiveUsers: buildDailyActiveUsers(bounds.dayCount, seed),
    topActiveUsers: topUsers,
    featureUsage,
    peakHours: buildPeakHours(seed),
    dateFrom: bounds.dateFrom,
    dateTo: bounds.dateTo,
  };
}

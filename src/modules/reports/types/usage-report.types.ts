import type { ChartDataPoint } from "@/modules/dashboard/types/dashboard.types";

export type UsageDatePreset = "7d" | "30d" | "90d" | "custom";

export interface UsageReportParams {
  preset: UsageDatePreset;
  dateFrom?: string;
  dateTo?: string;
}

export interface DailyActiveUserPoint extends ChartDataPoint {
  label: string;
  value: number;
}

export interface TopActiveUser {
  id: string;
  name: string;
  role: string;
  actionCount: number;
  lastActiveAt: string;
}

export interface FeatureUsageRow {
  id: string;
  module: string;
  sessionCount: number;
  sharePercent: number;
}

export type PeakHourDayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export const PEAK_HOUR_DAY_LABELS: Record<PeakHourDayOfWeek, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

export interface PeakHourCell {
  dayOfWeek: PeakHourDayOfWeek;
  hour: number;
  count: number;
}

export interface UsageReportData {
  dailyActiveUsers: DailyActiveUserPoint[];
  topActiveUsers: TopActiveUser[];
  featureUsage: FeatureUsageRow[];
  peakHours: PeakHourCell[];
  dateFrom: string;
  dateTo: string;
}

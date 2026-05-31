import type { UsageDatePreset, UsageReportParams } from "../types/usage-report.types";

function isUsagePreset(value: string): value is UsageDatePreset {
  return value === "7d" || value === "30d" || value === "90d" || value === "custom";
}

export function parseUsageSearchParams(
  searchParams: URLSearchParams,
): UsageReportParams {
  const presetRaw = searchParams.get("preset") ?? "30d";
  const preset = isUsagePreset(presetRaw) ? presetRaw : "30d";
  const dateFrom = searchParams.get("dateFrom") ?? undefined;
  const dateTo = searchParams.get("dateTo") ?? undefined;
  if (preset === "custom") {
    return { preset, dateFrom, dateTo };
  }
  return { preset };
}

export function buildUsagePresetHref(preset: UsageDatePreset): string {
  const params = new URLSearchParams({ preset });
  return `?${params.toString()}`;
}

export const CHART_COLORS = {
  brand: "var(--brand)",
  muted: "var(--muted-fg)",
  danger: "var(--danger)",
  border: "var(--border)",
  accent: "var(--accent)",
} as const;

export const CHART_SERIES_COLORS = [
  CHART_COLORS.brand,
  CHART_COLORS.muted,
  CHART_COLORS.danger,
  CHART_COLORS.accent,
] as const;

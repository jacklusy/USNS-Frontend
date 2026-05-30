import type { CSSProperties } from "react";

export type SkeletonBorderRadius = "sm" | "md" | "lg" | "pill" | number;

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: SkeletonBorderRadius;
  className?: string;
}

const RADIUS_MAP: Record<Exclude<SkeletonBorderRadius, number>, string> = {
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  pill: "var(--radius-pill)",
};

function resolveRadius(borderRadius: SkeletonBorderRadius | undefined): string {
  if (borderRadius === undefined) {
    return RADIUS_MAP.md;
  }
  if (typeof borderRadius === "number") {
    return `${borderRadius}px`;
  }
  return RADIUS_MAP[borderRadius];
}

export function Skeleton({
  width,
  height,
  borderRadius,
  className = "",
}: SkeletonProps) {
  const style: CSSProperties = {
    width: width ?? undefined,
    height: height ?? undefined,
    borderRadius: resolveRadius(borderRadius),
  };

  return (
    <div
      className={`skeleton-shimmer ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

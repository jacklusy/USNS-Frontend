"use client";

import { useMemo } from "react";
import {
  BREADCRUMB_ROUTE_LABELS,
  BREADCRUMB_SEGMENT_LABELS,
  formatSegmentLabel,
} from "@/constants/breadcrumb.constants";

export interface BreadcrumbItem {
  href: string;
  label: string;
  isCurrent: boolean;
}

interface UseBreadcrumbsOptions {
  pathname: string;
  dynamicLabels?: Record<string, string>;
}

function resolveSegmentLabel(
  segment: string,
  dynamicLabels: Record<string, string>,
): string {
  if (dynamicLabels[segment]) {
    return dynamicLabels[segment];
  }
  if (BREADCRUMB_SEGMENT_LABELS[segment]) {
    return BREADCRUMB_SEGMENT_LABELS[segment];
  }
  return formatSegmentLabel(segment);
}

export function useBreadcrumbs({
  pathname,
  dynamicLabels = {},
}: UseBreadcrumbsOptions): BreadcrumbItem[] {
  return useMemo(() => {
    const routeLabel = BREADCRUMB_ROUTE_LABELS[pathname];
    if (routeLabel) {
      const segments = pathname.split("/").filter(Boolean);
      if (segments.length <= 1) {
        return [
          {
            href: pathname,
            label: routeLabel,
            isCurrent: true,
          },
        ];
      }
    }

    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      return [];
    }

    return segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const isCurrent = index === segments.length - 1;
      const fullPathLabel = BREADCRUMB_ROUTE_LABELS[href];
      const label =
        isCurrent && BREADCRUMB_ROUTE_LABELS[pathname]
          ? BREADCRUMB_ROUTE_LABELS[pathname]
          : fullPathLabel ?? resolveSegmentLabel(segment, dynamicLabels);

      return {
        href,
        label,
        isCurrent,
      };
    });
  }, [pathname, dynamicLabels]);
}

"use client";

import { useEffect } from "react";
import { useUiStore } from "@/store/ui.slice";

export function useBreadcrumbOverrides(labels: Record<string, string>) {
  const setBreadcrumbSegmentLabels = useUiStore(
    (s) => s.setBreadcrumbSegmentLabels,
  );

  const serialized = JSON.stringify(labels);

  useEffect(() => {
    setBreadcrumbSegmentLabels(
      serialized ? (JSON.parse(serialized) as Record<string, string>) : {},
    );
    return () => {
      setBreadcrumbSegmentLabels({});
    };
  }, [serialized, setBreadcrumbSegmentLabels]);
}

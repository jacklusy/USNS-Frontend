"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import type { FilterFieldConfig, FilterValues } from "@/types/filter.types";
import {
  createDefaultFilterValues,
  parseFilterState,
  serializeFilterState,
} from "@/utils/filter-url";

interface UseFilterUrlStateOptions {
  config: readonly FilterFieldConfig[];
}

export function useFilterUrlState({ config }: UseFilterUrlStateOptions) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlValues = useMemo(
    () => parseFilterState(config, searchParams),
    [config, searchParams],
  );

  const [draftValues, setDraftValues] = useState<FilterValues>(urlValues);

  const appliedValues = urlValues;

  const syncDraftFromUrl = useCallback(() => {
    setDraftValues(urlValues);
  }, [urlValues]);

  const setDraftField = useCallback((fieldId: string, value: FilterValues[string]) => {
    setDraftValues((prev) => ({ ...prev, [fieldId]: value }));
  }, []);

  const applyFilters = useCallback(() => {
    const params = serializeFilterState(config, draftValues);
    const preserved = new URLSearchParams(searchParams.toString());
    const filterKeys = new Set<string>();
    for (const field of config) {
      const key = field.urlKey ?? field.id;
      filterKeys.add(key);
      filterKeys.add(`${key}Start`);
      filterKeys.add(`${key}End`);
    }
    for (const key of Array.from(preserved.keys())) {
      if (filterKeys.has(key)) {
        preserved.delete(key);
      }
    }
    params.forEach((value, key) => {
      preserved.set(key, value);
    });
    const query = preserved.toString();
    router.replace(query ? `?${query}` : "?", { scroll: false });
  }, [config, draftValues, router, searchParams]);

  const clearAllFilters = useCallback(() => {
    const defaults = createDefaultFilterValues(config);
    setDraftValues(defaults);
    const preserved = new URLSearchParams(searchParams.toString());
    const filterKeys = new Set<string>();
    for (const field of config) {
      const key = field.urlKey ?? field.id;
      filterKeys.add(key);
      filterKeys.add(`${key}Start`);
      filterKeys.add(`${key}End`);
    }
    for (const key of Array.from(preserved.keys())) {
      if (filterKeys.has(key)) {
        preserved.delete(key);
      }
    }
    const query = preserved.toString();
    router.replace(query ? `?${query}` : "?", { scroll: false });
  }, [config, router, searchParams]);

  const removeAppliedFilter = useCallback(
    (fieldId: string) => {
      const next = { ...appliedValues };
      const field = config.find((item) => item.id === fieldId);
      if (!field) return;
      const defaults = createDefaultFilterValues([field]);
      next[fieldId] = defaults[fieldId];
      const params = serializeFilterState(config, next);
      const preserved = new URLSearchParams(searchParams.toString());
      const filterKeys = new Set<string>();
      for (const item of config) {
        const key = item.urlKey ?? item.id;
        filterKeys.add(key);
        filterKeys.add(`${key}Start`);
        filterKeys.add(`${key}End`);
      }
      for (const key of Array.from(preserved.keys())) {
        if (filterKeys.has(key)) {
          preserved.delete(key);
        }
      }
      params.forEach((value, key) => {
        preserved.set(key, value);
      });
      const query = preserved.toString();
      router.replace(query ? `?${query}` : "?", { scroll: false });
      setDraftValues(next);
    },
    [appliedValues, config, router, searchParams],
  );

  return {
    draftValues,
    appliedValues,
    setDraftField,
    setDraftValues,
    applyFilters,
    clearAllFilters,
    removeAppliedFilter,
    syncDraftFromUrl,
  };
}

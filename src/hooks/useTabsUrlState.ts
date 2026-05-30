"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

interface UseTabsUrlStateOptions {
  paramName: string;
  tabIds: readonly string[];
  defaultTabId: string;
}

export function useTabsUrlState({
  paramName,
  tabIds,
  defaultTabId,
}: UseTabsUrlStateOptions) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const value = useMemo(() => {
    const fromUrl = searchParams.get(paramName);
    if (fromUrl && tabIds.includes(fromUrl)) {
      return fromUrl;
    }
    return defaultTabId;
  }, [defaultTabId, paramName, searchParams, tabIds]);

  const onChange = useCallback(
    (tabId: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (tabId === defaultTabId) {
        params.delete(paramName);
      } else {
        params.set(paramName, tabId);
      }
      const query = params.toString();
      router.replace(query ? `?${query}` : "?", { scroll: false });
    },
    [defaultTabId, paramName, router, searchParams],
  );

  return { value, onChange };
}

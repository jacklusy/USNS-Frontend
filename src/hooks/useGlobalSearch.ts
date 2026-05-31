"use client";

import { useEffect, useState } from "react";
import { globalSearchService } from "@/services/search";
import type { GlobalSearchResult } from "@/types/global-search.types";

export function useGlobalSearch(query: string) {
  const [results, setResults] = useState<GlobalSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(() => {
      if (cancelled) {
        return;
      }
      setIsLoading(true);
      globalSearchService
        .search(query)
        .then((data) => {
          if (!cancelled) {
            setResults(data);
            setIsLoading(false);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setResults([]);
            setIsLoading(false);
          }
        });
    }, 180);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  return { results, isLoading };
}

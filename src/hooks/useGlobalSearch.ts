"use client";

import { useEffect, useState } from "react";
import { searchGlobal } from "@/services/search/global-search.service.mock";
import type { GlobalSearchResult } from "@/types/global-search.types";

export function useGlobalSearch(query: string) {
  const [results, setResults] = useState<GlobalSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(() => {
      if (cancelled) return;
      setIsLoading(true);
      searchGlobal(query)
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

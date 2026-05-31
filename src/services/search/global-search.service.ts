import type { GlobalSearchResult } from "@/types/global-search.types";

export interface IGlobalSearchService {
  search(query: string): Promise<GlobalSearchResult[]>;
}

import { get } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { GlobalSearchResult } from "@/types/global-search.types";
import type { IGlobalSearchService } from "./global-search.service";

export class RealGlobalSearchService implements IGlobalSearchService {
  async search(query: string): Promise<GlobalSearchResult[]> {
    const params = new URLSearchParams({ q: query });
    const url = `${ENDPOINTS.search.global}?${params.toString()}`;
    return get<GlobalSearchResult[]>(url);
  }
}

export const realGlobalSearchService = new RealGlobalSearchService();

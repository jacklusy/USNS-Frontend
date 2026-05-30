import {
  getGlobalSearchTypeIcon,
  searchGlobalMock,
} from "@/mock/search/global-search.mock";
import type { GlobalSearchResult } from "@/types/global-search.types";

export { getGlobalSearchTypeIcon };

export async function searchGlobal(
  query: string,
): Promise<GlobalSearchResult[]> {
  return searchGlobalMock(query);
}

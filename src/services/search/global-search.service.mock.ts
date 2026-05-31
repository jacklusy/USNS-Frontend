import { MockServiceBase } from "@/lib/mock-service-base";
import {
  getGlobalSearchTypeIcon,
  searchGlobalMock,
} from "@/mock/search/global-search.mock";
import type { GlobalSearchResult } from "@/types/global-search.types";
import type { IGlobalSearchService } from "./global-search.service";

export { getGlobalSearchTypeIcon };

export class MockGlobalSearchService
  extends MockServiceBase
  implements IGlobalSearchService
{
  async search(query: string): Promise<GlobalSearchResult[]> {
    await this.delay();
    return searchGlobalMock(query);
  }
}

export const mockGlobalSearchService = new MockGlobalSearchService();

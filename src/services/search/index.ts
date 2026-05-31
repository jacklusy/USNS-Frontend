import { resolveService } from "@/lib/service-resolver";
import type { IGlobalSearchService } from "./global-search.service";
import { mockGlobalSearchService } from "./global-search.service.mock";
import { realGlobalSearchService } from "./global-search.service.real";

export const globalSearchService = resolveService<IGlobalSearchService>(
  mockGlobalSearchService,
  realGlobalSearchService,
);

export type { IGlobalSearchService } from "./global-search.service";
export { getGlobalSearchTypeIcon } from "./global-search.service.mock";

import { resolveService } from "@/lib/service-resolver";
import type { IProfileService } from "./profile.service";
import { mockProfileService } from "./profile.service.mock";
import { realProfileService } from "./profile.service.real";

export const profileService = resolveService<IProfileService>(
  mockProfileService,
  realProfileService,
);

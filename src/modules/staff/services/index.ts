import { resolveService } from "@/lib/service-resolver";
import type { IStaffService } from "./staff.service";
import { mockStaffService } from "./staff.service.mock";
import { realStaffService } from "./staff.service.real";

export const staffService = resolveService<IStaffService>(
  mockStaffService,
  realStaffService,
);

export type { IStaffService } from "./staff.service";

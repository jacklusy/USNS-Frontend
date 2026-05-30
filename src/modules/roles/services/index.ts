import { resolveService } from "@/lib/service-resolver";
import type { IRoleManagementService } from "./role-management.service";
import { mockRoleManagementService } from "./role-management.service.mock";
import { realRoleManagementService } from "./role-management.service.real";

export const roleManagementService = resolveService<IRoleManagementService>(
  mockRoleManagementService,
  realRoleManagementService,
);

export type { IRoleManagementService } from "./role-management.service";

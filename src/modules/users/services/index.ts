import { resolveService } from "@/lib/service-resolver";
import type { IDepartmentsService } from "./departments.service";
import { mockDepartmentsService } from "./departments.service.mock";
import { realDepartmentsService } from "./departments.service.real";
import type { IRolesService } from "./roles.service";
import { mockRolesService } from "./roles.service.mock";
import { realRolesService } from "./roles.service.real";
import type { IUserService } from "./user.service";
import { mockUserService } from "./user.service.mock";
import { realUserService } from "./user.service.real";

export const userService = resolveService<IUserService>(
  mockUserService,
  realUserService,
);

export const rolesService = resolveService<IRolesService>(
  mockRolesService,
  realRolesService,
);

export const departmentsService = resolveService<IDepartmentsService>(
  mockDepartmentsService,
  realDepartmentsService,
);

export type { IUserService } from "./user.service";

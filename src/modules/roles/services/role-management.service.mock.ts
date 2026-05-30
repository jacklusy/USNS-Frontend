import { listAllPermissionsGrouped } from "@/constants/permission-display.constants";
import { MockServiceBase } from "@/lib/mock-service-base";
import {
  findRoleById,
  generateRoleId,
  generateUniqueSlug,
  getRolesStore,
  listSystemRoleOptions,
  nameExists,
  refreshRolesListParams,
  slugExists,
} from "@/mock/roles/roles.mock";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { AppError } from "@/types/error.types";
import type {
  CreateRoleInput,
  ManagedRole,
  PermissionMatrixData,
  RoleListQueryParams,
  RoleOption,
  UpdateRoleInput,
} from "../types/role-management.types";
import type { IRoleManagementService } from "./role-management.service";

function validationError(details: Record<string, string[]>): AppError {
  return {
    code: "VALIDATION_ERROR",
    message: "Validation failed",
    details,
  };
}

function notFound(message: string): AppError {
  return {
    code: "NOT_FOUND",
    message,
  };
}

function forbidden(message: string): AppError {
  return {
    code: "FORBIDDEN",
    message,
  };
}

export class MockRoleManagementService
  extends MockServiceBase
  implements IRoleManagementService
{
  async list(
    params: RoleListQueryParams,
  ): Promise<PaginatedResponse<ManagedRole>> {
    await this.delay();
    return refreshRolesListParams(params);
  }

  async listOptions(): Promise<ApiResponse<RoleOption[]>> {
    await this.delay(100);
    return { data: listSystemRoleOptions() };
  }

  async getById(id: string): Promise<ApiResponse<ManagedRole>> {
    await this.delay();
    const role = findRoleById(id);
    if (!role) {
      throw notFound("Role not found");
    }
    return { data: { ...role } };
  }

  async getPermissionMatrix(): Promise<ApiResponse<PermissionMatrixData>> {
    await this.delay();
    refreshRolesListParams({ page: 1, per_page: 1000 });
    return {
      data: {
        roles: [...getRolesStore()],
        permissionGroups: listAllPermissionsGrouped(),
      },
    };
  }

  async create(input: CreateRoleInput): Promise<ApiResponse<ManagedRole>> {
    await this.delay(350);
    if (nameExists(input.name)) {
      throw validationError({ name: ["Role name is already in use"] });
    }

    const slug = generateUniqueSlug(input.name);
    const role: ManagedRole = {
      id: generateRoleId(),
      slug,
      name: input.name.trim(),
      description: input.description.trim(),
      isSystem: false,
      permissions: [...input.permissions],
      userCount: 0,
      createdAt: new Date().toISOString(),
    };

    getRolesStore().unshift(role);
    return { data: role, message: "Role created" };
  }

  async update(
    id: string,
    input: UpdateRoleInput,
  ): Promise<ApiResponse<ManagedRole>> {
    await this.delay(350);
    const index = getRolesStore().findIndex((role) => role.id === id);
    if (index < 0) {
      throw notFound("Role not found");
    }

    const existing = getRolesStore()[index];

    if (existing.isSystem && input.name.trim() !== existing.name) {
      throw validationError({ name: ["System role name cannot be changed"] });
    }

    if (!existing.isSystem && nameExists(input.name, id)) {
      throw validationError({ name: ["Role name is already in use"] });
    }

    const nextSlug = existing.isSystem
      ? existing.slug
      : generateUniqueSlug(input.name, id);

    if (!existing.isSystem && slugExists(nextSlug, id)) {
      throw validationError({ name: ["Could not generate a unique role slug"] });
    }

    const updated: ManagedRole = {
      ...existing,
      name: existing.isSystem ? existing.name : input.name.trim(),
      slug: nextSlug,
      description: input.description.trim(),
      permissions: [...input.permissions],
    };

    getRolesStore()[index] = updated;
    return { data: updated, message: "Role updated" };
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    await this.delay(300);
    const index = getRolesStore().findIndex((role) => role.id === id);
    if (index < 0) {
      throw notFound("Role not found");
    }

    if (getRolesStore()[index].isSystem) {
      throw forbidden("System roles cannot be deleted");
    }

    getRolesStore().splice(index, 1);
    return { data: null, message: "Role deleted" };
  }
}

export const mockRoleManagementService = new MockRoleManagementService();

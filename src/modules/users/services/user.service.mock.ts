import { MockServiceBase } from "@/lib/mock-service-base";
import {
  emailExistsInStore,
  filterUsers,
  generateUserId,
  getUsersStore,
  paginateUsers,
  withDepartmentName,
} from "@/mock/users/users.mock";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { AppError } from "@/types/error.types";
import { UserStatus } from "@/types/user.types";
import type {
  BulkUserStatusAction,
  CreateUserInput,
  ManagedUser,
  UpdateUserInput,
  UserListQueryParams,
} from "../types/user-management.types";
import type { IUserService } from "./user.service";

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

function findUserIndex(id: string): number {
  return getUsersStore().findIndex((user) => user.id === id);
}

function findUser(id: string): ManagedUser | undefined {
  return getUsersStore().find((user) => user.id === id);
}

export class MockUserService extends MockServiceBase implements IUserService {
  async list(
    params: UserListQueryParams,
  ): Promise<PaginatedResponse<ManagedUser>> {
    await this.delay();
    const filtered = filterUsers(getUsersStore(), params);
    return paginateUsers(filtered, params.page, params.per_page);
  }

  async getById(id: string): Promise<ApiResponse<ManagedUser>> {
    await this.delay();
    const user = findUser(id);
    if (!user) {
      throw notFound("User not found");
    }
    return { data: user };
  }

  async create(input: CreateUserInput): Promise<ApiResponse<ManagedUser>> {
    await this.delay(350);
    if (emailExistsInStore(input.email)) {
      throw validationError({ email: ["Email is already in use"] });
    }

    const user = withDepartmentName(input.departmentId, {
      id: generateUserId(),
      fullName: input.fullName.trim(),
      email: input.email.trim().toLowerCase(),
      role: input.role,
      departmentId: input.departmentId,
      status: UserStatus.Active,
      createdAt: new Date().toISOString(),
      forcePasswordChange: input.forcePasswordChange,
    });

    getUsersStore().unshift(user);
    return { data: user, message: "User created" };
  }

  async update(
    id: string,
    input: UpdateUserInput,
  ): Promise<ApiResponse<ManagedUser>> {
    await this.delay(350);
    const index = findUserIndex(id);
    if (index < 0) {
      throw notFound("User not found");
    }

    if (emailExistsInStore(input.email, id)) {
      throw validationError({ email: ["Email is already in use"] });
    }

    const existing = getUsersStore()[index];
    const updated = withDepartmentName(input.departmentId, {
      ...existing,
      fullName: input.fullName.trim(),
      email: input.email.trim().toLowerCase(),
      role: input.role,
      departmentId: input.departmentId,
      status: input.status ?? existing.status,
      forcePasswordChange:
        input.forcePasswordChange ?? existing.forcePasswordChange,
    });

    getUsersStore()[index] = updated;
    return { data: updated, message: "User updated" };
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    await this.delay(300);
    const index = findUserIndex(id);
    if (index < 0) {
      throw notFound("User not found");
    }
    getUsersStore().splice(index, 1);
    return { data: null, message: "User deleted" };
  }

  async bulkUpdateStatus(
    ids: string[],
    action: BulkUserStatusAction,
  ): Promise<ApiResponse<ManagedUser[]>> {
    await this.delay(400);
    const nextStatus =
      action === "activate" ? UserStatus.Active : UserStatus.Inactive;
    const updated: ManagedUser[] = [];

    for (const id of ids) {
      const index = findUserIndex(id);
      if (index < 0) continue;
      const record = {
        ...getUsersStore()[index],
        status: nextStatus,
      };
      getUsersStore()[index] = record;
      updated.push(record);
    }

    return { data: updated };
  }

  async bulkDelete(ids: string[]): Promise<ApiResponse<null>> {
    await this.delay(400);
    const idSet = new Set(ids);
    const remaining = getUsersStore().filter((user) => !idSet.has(user.id));
    getUsersStore().length = 0;
    getUsersStore().push(...remaining);
    return { data: null };
  }
}

export const mockUserService = new MockUserService();

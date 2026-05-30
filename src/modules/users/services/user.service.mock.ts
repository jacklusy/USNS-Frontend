import { MockServiceBase } from "@/lib/mock-service-base";
import {
  getAccountStatsForUser,
  seedAccountStatsForUser,
} from "@/mock/users/user-account-stats.mock";
import {
  appendUserAuditEntry,
  buildStatusAuditDescription,
  listUserAuditEntries,
  statusActionToAuditAction,
  statusActionToAuditType,
} from "@/mock/users/user-audit.mock";
import {
  emailExistsInStore,
  filterUsers,
  generateUserId,
  getUsersStore,
  paginateUsers,
  withDepartmentName,
} from "@/mock/users/users.mock";
import { useAuthStore } from "@/store/auth.slice";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { AppError } from "@/types/error.types";
import type { UserActivityQueryParams } from "../types/user-audit.types";
import type { UserAuditEntry } from "../types/user-audit.types";
import { UserStatus } from "@/types/user.types";
import type { UserRole } from "@/types/user.types";
import type {
  AssigneeOption,
  BulkUserStatusAction,
  CreateUserInput,
  ManagedUser,
  UpdateUserInput,
  UserDetail,
  UserListQueryParams,
  UserStatusAction,
} from "../types/user-management.types";
import { statusFromUserStatusAction } from "../utils/user-status-action";
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

function getActorName(): string {
  return useAuthStore.getState().user?.name ?? "System";
}

function applyStatusChange(
  user: ManagedUser,
  action: UserStatusAction,
  actorName: string,
): ManagedUser {
  const nextStatus = statusFromUserStatusAction(action);
  const auditAction = statusActionToAuditAction(action);
  appendUserAuditEntry({
    userId: user.id,
    actorName,
    action: auditAction,
    actionType: statusActionToAuditType(),
    description: buildStatusAuditDescription(auditAction, user.fullName),
  });
  return { ...user, status: nextStatus };
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

  async getDetail(id: string): Promise<ApiResponse<UserDetail>> {
    await this.delay();
    const user = findUser(id);
    if (!user) {
      throw notFound("User not found");
    }
    return {
      data: {
        ...user,
        account: getAccountStatsForUser(id),
      },
    };
  }

  async listActivity(
    userId: string,
    params?: UserActivityQueryParams,
  ): Promise<PaginatedResponse<UserAuditEntry>> {
    await this.delay();
    if (!findUser(userId)) {
      throw notFound("User not found");
    }
    return listUserAuditEntries(userId, params);
  }

  async changeStatus(
    id: string,
    action: UserStatusAction,
  ): Promise<ApiResponse<ManagedUser>> {
    await this.delay(350);
    const index = findUserIndex(id);
    if (index < 0) {
      throw notFound("User not found");
    }
    const actorName = getActorName();
    const updated = applyStatusChange(
      getUsersStore()[index],
      action,
      actorName,
    );
    getUsersStore()[index] = updated;
    return { data: updated, message: "Status updated" };
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
      status: statusFromUserStatusAction("activate"),
      createdAt: new Date().toISOString(),
      forcePasswordChange: input.forcePasswordChange,
    });

    getUsersStore().unshift(user);
    seedAccountStatsForUser(user.id);
    appendUserAuditEntry({
      userId: user.id,
      actorName: getActorName(),
      action: "created",
      actionType: "created",
      description: `User account created for ${user.fullName}`,
    });
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
    const actorName = getActorName();
    const updated: ManagedUser[] = [];

    for (const id of ids) {
      const index = findUserIndex(id);
      if (index < 0) continue;
      const record = applyStatusChange(
        getUsersStore()[index],
        action,
        actorName,
      );
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

  async listAssigneeOptions(params?: {
    roles?: readonly UserRole[];
  }): Promise<ApiResponse<AssigneeOption[]>> {
    await this.delay(100);
    const roleSet = params?.roles ? new Set(params.roles) : null;
    const data = getUsersStore()
      .filter((user) => user.status === UserStatus.Active)
      .filter((user) => (roleSet ? roleSet.has(user.role) : true))
      .map((user) => ({
        value: user.id,
        label: user.fullName,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
    return { data };
  }
}

export const mockUserService = new MockUserService();

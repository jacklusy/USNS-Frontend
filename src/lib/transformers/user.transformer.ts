import {
  mapNullable,
  parseApiDate,
  parseOptionalApiDate,
  toApiTimestamp,
} from "@/lib/transformers/common";
import type {
  ManagedUser,
  UserAccountStats,
  UserDetail,
} from "@/modules/users/types/user-management.types";
import type { UserAuditEntry } from "@/modules/users/types/user-audit.types";
import type {
  ManagedUserDto,
  UserAccountStatsDto,
  UserAuditEntryDto,
  UserDetailDto,
} from "@/types/dto/user.dto";

export function toManagedUser(dto: ManagedUserDto): ManagedUser {
  return {
    id: dto.id,
    fullName: dto.full_name,
    email: dto.email,
    role: dto.role,
    departmentId: dto.department_id,
    departmentName: dto.department_name,
    status: dto.status,
    createdAt: parseApiDate(dto.created_at),
    forcePasswordChange: dto.force_password_change,
  };
}

export function toManagedUserDto(user: ManagedUser): ManagedUserDto {
  return {
    id: user.id,
    full_name: user.fullName,
    email: user.email,
    role: user.role,
    department_id: user.departmentId,
    department_name: user.departmentName,
    status: user.status,
    created_at: toApiTimestamp(user.createdAt),
    force_password_change: user.forcePasswordChange,
  };
}

export function toUserAccountStats(dto: UserAccountStatsDto): UserAccountStats {
  return {
    lastLoginAt: parseOptionalApiDate(dto.last_login_at),
    loginCount: dto.login_count,
    failedLoginAttempts: dto.failed_login_attempts,
  };
}

export function toUserDetail(dto: UserDetailDto): UserDetail {
  return {
    ...toManagedUser(dto),
    account: toUserAccountStats(dto.account),
  };
}

export function toUserAuditEntry(dto: UserAuditEntryDto): UserAuditEntry {
  return {
    id: dto.id,
    userId: dto.user_id,
    actorName: dto.actor_name,
    action: dto.action,
    actionType: dto.action_type,
    description: dto.description,
    createdAt: parseApiDate(dto.created_at),
  };
}

export function toUserAuditEntryDto(entry: UserAuditEntry): UserAuditEntryDto {
  return {
    id: entry.id,
    user_id: entry.userId,
    actor_name: entry.actorName,
    action: entry.action,
    action_type: entry.actionType,
    description: entry.description,
    created_at: toApiTimestamp(entry.createdAt),
  };
}

export function mapNullableUserFields<T>(value: T | null | undefined): T | undefined {
  return mapNullable(value);
}

export interface ManagedUserSeedRecord {
  id: string;
  fullName: string;
  email: string;
  role: ManagedUser["role"];
  departmentId: string;
  departmentName: string;
  status: ManagedUser["status"];
  createdAt: string;
  forcePasswordChange: boolean;
}

export function managedUserDtoFromSeed(
  record: ManagedUserSeedRecord,
): ManagedUserDto {
  return {
    id: record.id,
    full_name: record.fullName,
    email: record.email,
    role: record.role,
    department_id: record.departmentId,
    department_name: record.departmentName,
    status: record.status,
    created_at: record.createdAt,
    force_password_change: record.forcePasswordChange,
  };
}

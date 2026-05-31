import type { ApiTimestamp } from "@/types/dto/common.dto";
import type { UserAuditActionType } from "@/modules/users/types/user-audit.types";
import type { UserRole, UserStatus } from "@/types/user.types";

export interface ManagedUserDto {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  department_id: string;
  department_name: string;
  status: UserStatus;
  created_at: ApiTimestamp;
  force_password_change: boolean;
}

export interface UserAccountStatsDto {
  last_login_at: ApiTimestamp | null;
  login_count: number;
  failed_login_attempts: number;
}

export interface UserDetailDto extends ManagedUserDto {
  account: UserAccountStatsDto;
}

export interface UserAuditEntryDto {
  id: string;
  user_id: string;
  actor_name: string;
  action: string;
  action_type: UserAuditActionType;
  description: string;
  created_at: ApiTimestamp;
}

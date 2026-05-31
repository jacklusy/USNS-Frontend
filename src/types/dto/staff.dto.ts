import type { ApiTimestamp } from "@/types/dto/common.dto";
import type { StaffDashboardRole } from "@/modules/staff/types/staff.types";
import type { EntityStatus } from "@/constants/status-badge.constants";

export interface AdministrativeStaffDto {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  department_id: string;
  department_name?: string;
  office: string;
  position: string;
  dashboard_role: StaffDashboardRole;
  status: EntityStatus;
  created_at: ApiTimestamp;
}

export interface StaffDetailDto {
  staff: AdministrativeStaffDto;
}

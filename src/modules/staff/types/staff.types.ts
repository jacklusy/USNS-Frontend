import type { EntityStatus } from "@/constants/status-badge.constants";
import type { DataTableRowBase } from "@/types/data-table.types";
import type { UserRole } from "@/types/user.types";

export type StaffDashboardRole = Extract<UserRole, "admin" | "staff" | "dba">;

export interface AdministrativeStaff extends DataTableRowBase {
  employeeId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  departmentId?: string;
  departmentName?: string;
  office: string;
  position: string;
  dashboardRole: StaffDashboardRole;
  status: EntityStatus;
  createdAt: string;
}

export interface StaffDetail {
  staff: AdministrativeStaff;
}

export interface StaffListQueryParams {
  page: number;
  per_page: number;
  search?: string;
  departmentId?: string;
  office?: string;
  dashboardRole?: StaffDashboardRole;
  status?: EntityStatus;
}

export interface CreateStaffInput {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId?: string;
  office: string;
  position: string;
  dashboardRole: StaffDashboardRole;
  status: EntityStatus;
}

export type UpdateStaffInput = CreateStaffInput;

export type EntityStatusAction = "activate" | "deactivate";

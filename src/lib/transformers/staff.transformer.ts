import { parseApiDate, toApiTimestamp } from "@/lib/transformers/common";
import type {
  AdministrativeStaff,
  StaffDetail,
} from "@/modules/staff/types/staff.types";
import type {
  AdministrativeStaffDto,
  StaffDetailDto,
} from "@/types/dto/staff.dto";

export function toAdministrativeStaff(
  dto: AdministrativeStaffDto,
): AdministrativeStaff {
  return {
    id: dto.id,
    employeeId: dto.employee_id,
    firstName: dto.first_name,
    lastName: dto.last_name,
    fullName: dto.full_name,
    email: dto.email,
    phone: dto.phone,
    departmentId: dto.department_id,
    departmentName: dto.department_name,
    office: dto.office ?? "",
    position: dto.position,
    dashboardRole: dto.dashboard_role,
    status: dto.status,
    createdAt: parseApiDate(dto.created_at),
  };
}

export function toStaffDetail(dto: StaffDetailDto): StaffDetail {
  return { staff: toAdministrativeStaff(dto.staff) };
}

export function toAdministrativeStaffDto(
  staff: AdministrativeStaff,
): AdministrativeStaffDto {
  return {
    id: staff.id,
    employee_id: staff.employeeId,
    first_name: staff.firstName,
    last_name: staff.lastName,
    full_name: staff.fullName,
    email: staff.email,
    phone: staff.phone,
    department_id: staff.departmentId ?? "",
    department_name: staff.departmentName,
    office: staff.office,
    position: staff.position,
    dashboard_role: staff.dashboardRole,
    status: staff.status,
    created_at: toApiTimestamp(staff.createdAt),
  };
}

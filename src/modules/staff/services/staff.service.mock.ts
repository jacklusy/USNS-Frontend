import { MockServiceBase } from "@/lib/mock-service-base";
import { findDepartmentById } from "@/mock/academic/departments.mock";
import {
  findStaffById,
  generateStaffId,
  getStaffStore,
  listStaffPaginated,
  recomputeStaffDisplayFields,
  setStaffStatus,
  staffEmployeeIdExists,
} from "@/mock/staff/staff.mock";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { EntityStatus } from "@/constants/status-badge.constants";
import {
  notFoundError,
  validationError,
} from "../utils/staff-errors";
import type {
  AdministrativeStaff,
  CreateStaffInput,
  EntityStatusAction,
  StaffDetail,
  StaffListQueryParams,
  UpdateStaffInput,
} from "../types/staff.types";
import type { IStaffService } from "./staff.service";

function assertDepartmentOrOffice(
  departmentId: string | undefined,
  office: string,
): void {
  const trimmedOffice = office.trim();
  if (!departmentId && !trimmedOffice) {
    throw validationError({
      office: ["Enter an office or select a department"],
      departmentId: ["Select a department or enter an office"],
    });
  }
  if (departmentId && !findDepartmentById(departmentId)) {
    throw validationError({ departmentId: ["Department is invalid"] });
  }
}

function toStaffMember(
  input: CreateStaffInput,
  id: string,
): AdministrativeStaff {
  const dept = input.departmentId
    ? findDepartmentById(input.departmentId)
    : undefined;
  return {
    id,
    employeeId: input.employeeId.trim().toUpperCase(),
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    fullName: `${input.firstName.trim()} ${input.lastName.trim()}`,
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    departmentId: input.departmentId,
    departmentName: dept?.name,
    office: input.office.trim(),
    position: input.position.trim(),
    dashboardRole: input.dashboardRole,
    status: input.status,
    createdAt: new Date().toISOString(),
  };
}

export class MockStaffService extends MockServiceBase implements IStaffService {
  async list(
    params: StaffListQueryParams,
  ): Promise<PaginatedResponse<AdministrativeStaff>> {
    await this.delay();
    return listStaffPaginated(params);
  }

  async getById(id: string): Promise<ApiResponse<AdministrativeStaff>> {
    await this.delay();
    recomputeStaffDisplayFields();
    const member = findStaffById(id);
    if (!member) throw notFoundError("Staff member not found");
    return { data: { ...member } };
  }

  async getDetail(id: string): Promise<ApiResponse<StaffDetail>> {
    await this.delay();
    recomputeStaffDisplayFields();
    const member = findStaffById(id);
    if (!member) throw notFoundError("Staff member not found");
    return { data: { staff: { ...member } } };
  }

  async create(
    input: CreateStaffInput,
  ): Promise<ApiResponse<AdministrativeStaff>> {
    await this.delay(350);
    if (staffEmployeeIdExists(input.employeeId)) {
      throw validationError({
        employeeId: ["Employee ID is already in use"],
      });
    }
    assertDepartmentOrOffice(input.departmentId, input.office);
    const member = toStaffMember(input, generateStaffId());
    getStaffStore().unshift(member);
    recomputeStaffDisplayFields();
    return { data: { ...member }, message: "Staff member created" };
  }

  async update(
    id: string,
    input: UpdateStaffInput,
  ): Promise<ApiResponse<AdministrativeStaff>> {
    await this.delay(350);
    const index = getStaffStore().findIndex((m) => m.id === id);
    if (index < 0) throw notFoundError("Staff member not found");
    if (staffEmployeeIdExists(input.employeeId, id)) {
      throw validationError({
        employeeId: ["Employee ID is already in use"],
      });
    }
    assertDepartmentOrOffice(input.departmentId, input.office);
    const updated = toStaffMember(input, id);
    updated.createdAt = getStaffStore()[index].createdAt;
    getStaffStore()[index] = updated;
    recomputeStaffDisplayFields();
    return { data: { ...updated }, message: "Staff member updated" };
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    await this.delay(300);
    const index = getStaffStore().findIndex((m) => m.id === id);
    if (index < 0) throw notFoundError("Staff member not found");
    getStaffStore().splice(index, 1);
    return { data: null, message: "Staff member deleted" };
  }

  async changeStatus(
    id: string,
    action: EntityStatusAction,
  ): Promise<ApiResponse<AdministrativeStaff>> {
    await this.delay(300);
    const status: EntityStatus =
      action === "activate" ? "active" : "inactive";
    const member = setStaffStatus(id, status);
    if (!member) throw notFoundError("Staff member not found");
    return { data: { ...member }, message: "Status updated" };
  }
}

export const mockStaffService = new MockStaffService();

import { findDepartmentById } from "@/mock/academic/departments.mock";
import { matchesSearch, paginate } from "@/mock/academic/academic-mock-utils";
import type { EntityStatus } from "@/constants/status-badge.constants";
import type { PaginatedResponse } from "@/types/api.types";
import type {
  AdministrativeStaff,
  StaffDashboardRole,
  StaffListQueryParams,
} from "@/modules/staff/types/staff.types";

const OFFICES = [
  "Registrar",
  "Bursar",
  "Admissions",
  "Human Resources",
  "Facilities",
  "Student Affairs",
  "IT Service Desk",
  "Library Administration",
] as const;

const POSITIONS = [
  "Director",
  "Coordinator",
  "Specialist",
  "Analyst",
  "Administrator",
  "Assistant",
  "Manager",
  "Officer",
] as const;

const DEPT_IDS = [
  "dept_executive",
  "dept_it",
  "dept_registrar",
  "dept_finance",
  "dept_operations",
  undefined,
  undefined,
] as const;

const ROLES: readonly StaffDashboardRole[] = ["admin", "staff", "dba"];

const FIRST_NAMES = [
  "Aisha",
  "Marcus",
  "Priya",
  "Daniel",
  "Elena",
  "James",
  "Sofia",
  "Wei",
  "Chloe",
  "Andre",
  "Nina",
  "Lucas",
  "Grace",
  "Mohammed",
  "Olivia",
  "Ethan",
  "Zara",
  "Noah",
  "Hiro",
  "Emma",
  "Victor",
  "Lina",
  "Chris",
  "Mira",
  "Paul",
  "Anya",
] as const;

const LAST_NAMES = [
  "Bennett",
  "Cole",
  "Patel",
  "Nguyen",
  "Garcia",
  "Wright",
  "Lopez",
  "Chen",
  "Brooks",
  "Silva",
  "Kim",
  "Rivera",
  "Scott",
  "Ali",
  "Turner",
  "Reed",
  "Ahmed",
  "Foster",
  "Tanaka",
  "Bell",
  "Price",
  "Okafor",
  "Hayes",
  "Singh",
  "Murphy",
  "Volkov",
] as const;

function buildSeedStaff(): AdministrativeStaff[] {
  const members: AdministrativeStaff[] = [];
  for (let index = 0; index < 26; index += 1) {
    const deptId = DEPT_IDS[index % DEPT_IDS.length];
    const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
    const lastName = LAST_NAMES[index % LAST_NAMES.length];
    const employeeNum = String(2000 + index).padStart(4, "0");
    const office =
      deptId === undefined
        ? OFFICES[index % OFFICES.length]
        : "";
    members.push({
      id: `staff_${String(index + 1).padStart(3, "0")}`,
      employeeId: `ADM-${employeeNum}`,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@usns.edu`,
      phone: `+1-555-02${String(index).padStart(2, "0")}`,
      departmentId: deptId,
      departmentName: undefined,
      office,
      position: POSITIONS[index % POSITIONS.length],
      dashboardRole: ROLES[index % ROLES.length],
      status: index % 10 === 0 ? "inactive" : "active",
      createdAt: `2022-1${index % 2}-${(index % 28) + 1}T09:00:00.000Z`,
    });
  }
  return members;
}

const SEED_STAFF: AdministrativeStaff[] = buildSeedStaff();

let staffStore: AdministrativeStaff[] = structuredClone(SEED_STAFF);

export function getStaffStore(): AdministrativeStaff[] {
  return staffStore;
}

export function resetStaffStore(): void {
  staffStore = structuredClone(SEED_STAFF);
}

export function findStaffById(id: string): AdministrativeStaff | undefined {
  return staffStore.find((member) => member.id === id);
}

export function staffEmployeeIdExists(
  employeeId: string,
  excludeId?: string,
): boolean {
  const normalized = employeeId.trim().toUpperCase();
  return staffStore.some(
    (member) =>
      member.employeeId.toUpperCase() === normalized && member.id !== excludeId,
  );
}

export function generateStaffId(): string {
  return `staff_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

export function recomputeStaffDisplayFields(): void {
  for (const member of staffStore) {
    if (member.departmentId) {
      const dept = findDepartmentById(member.departmentId);
      member.departmentName = dept?.name ?? member.departmentId;
    } else {
      member.departmentName = undefined;
    }
    member.fullName = `${member.firstName} ${member.lastName}`.trim();
  }
}

function filterStaff(params: StaffListQueryParams): AdministrativeStaff[] {
  recomputeStaffDisplayFields();
  return staffStore.filter((member) => {
    if (params.departmentId && member.departmentId !== params.departmentId) {
      return false;
    }
    if (params.dashboardRole && member.dashboardRole !== params.dashboardRole) {
      return false;
    }
    if (params.status && member.status !== params.status) return false;
    if (params.office?.trim()) {
      const officeQuery = params.office.trim().toLowerCase();
      const officeValue = (member.office || member.departmentName || "")
        .toLowerCase();
      if (!officeValue.includes(officeQuery)) return false;
    }
    return matchesSearch(params.search, [
      member.fullName,
      member.employeeId,
      member.email,
      member.departmentName ?? "",
      member.office,
      member.position,
    ]);
  });
}

export function listStaffPaginated(
  params: StaffListQueryParams,
): PaginatedResponse<AdministrativeStaff> {
  return paginate(filterStaff(params), params.page, params.per_page);
}

export function setStaffStatus(
  id: string,
  status: EntityStatus,
): AdministrativeStaff | undefined {
  const member = findStaffById(id);
  if (!member) return undefined;
  member.status = status;
  recomputeStaffDisplayFields();
  return member;
}

export function administrativeStaffCountByDepartmentId(
  departmentId: string,
): number {
  recomputeStaffDisplayFields();
  return staffStore.filter(
    (m) => m.departmentId === departmentId && m.status === "active",
  ).length;
}

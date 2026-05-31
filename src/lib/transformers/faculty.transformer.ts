import { parseApiDate, toApiTimestamp } from "@/lib/transformers/common";
import type {
  FacultyDetail,
  FacultyMember,
  FacultySemesterAssignment,
} from "@/modules/faculty/types/faculty.types";
import type {
  FacultyDetailDto,
  FacultyMemberDto,
  FacultySemesterAssignmentDto,
} from "@/types/dto/faculty.dto";

export function toFacultyMember(dto: FacultyMemberDto): FacultyMember {
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
    specialization: dto.specialization,
    rank: dto.rank,
    status: dto.status,
    assignedCourseIds: [...dto.assigned_course_ids],
    publicationsCount: dto.publications_count,
    createdAt: parseApiDate(dto.created_at),
  };
}

function toFacultySemesterAssignment(
  dto: FacultySemesterAssignmentDto,
): FacultySemesterAssignment {
  return {
    id: dto.id,
    courseId: dto.course_id,
    courseCode: dto.course_code,
    courseName: dto.course_name,
    creditHours: dto.credit_hours,
    semesterLabel: dto.semester_label,
  };
}

export function toFacultyDetail(dto: FacultyDetailDto): FacultyDetail {
  return {
    member: toFacultyMember(dto.member),
    semesterAssignments: dto.semester_assignments.map(toFacultySemesterAssignment),
    workloadCreditHours: dto.workload_credit_hours,
    maxCreditHours: dto.max_credit_hours,
  };
}

export function toFacultyMemberDto(member: FacultyMember): FacultyMemberDto {
  return {
    id: member.id,
    employee_id: member.employeeId,
    first_name: member.firstName,
    last_name: member.lastName,
    full_name: member.fullName,
    email: member.email,
    phone: member.phone,
    department_id: member.departmentId,
    department_name: member.departmentName,
    specialization: member.specialization,
    rank: member.rank,
    status: member.status,
    assigned_course_ids: [...member.assignedCourseIds],
    publications_count: member.publicationsCount,
    created_at: toApiTimestamp(member.createdAt),
  };
}

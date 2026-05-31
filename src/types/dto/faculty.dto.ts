import type { ApiTimestamp } from "@/types/dto/common.dto";
import type { FacultyRank } from "@/modules/faculty/types/faculty.types";
import type { EntityStatus } from "@/constants/status-badge.constants";

export interface FacultyMemberDto {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  department_id: string;
  department_name: string;
  specialization: string;
  rank: FacultyRank;
  status: EntityStatus;
  assigned_course_ids: string[];
  publications_count: number;
  created_at: ApiTimestamp;
}

export interface FacultySemesterAssignmentDto {
  id: string;
  course_id: string;
  course_code: string;
  course_name: string;
  credit_hours: number;
  semester_label: string;
}

export interface FacultyDetailDto {
  member: FacultyMemberDto;
  semester_assignments: FacultySemesterAssignmentDto[];
  workload_credit_hours: number;
  max_credit_hours: number;
}

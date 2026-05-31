import type { EntityStatus } from "@/constants/status-badge.constants";
import type { ApiTimestamp } from "@/types/dto/common.dto";
import type { ProgramType } from "@/modules/academic/types/academic.types";

export interface CollegeDto {
  id: string;
  code: string;
  name: string;
  description: string;
  dean_user_id: string;
  dean_name: string;
  status: EntityStatus;
  department_count: number;
  student_count: number;
  created_at: ApiTimestamp;
}

export interface DepartmentDto {
  id: string;
  code: string;
  name: string;
  college_id: string;
  college_name: string;
  head_user_id: string;
  head_name: string;
  description: string;
  status: EntityStatus;
  course_count: number;
  staff_count: number;
  created_at: ApiTimestamp;
}

export interface ProgramDto {
  id: string;
  code: string;
  name: string;
  type: ProgramType;
  department_id: string;
  department_name: string;
  duration_years: number;
  description: string;
  status: EntityStatus;
  enrolled_count: number;
  course_count: number;
  course_ids: string[];
  created_at: ApiTimestamp;
}

export interface CourseDto {
  id: string;
  code: string;
  name: string;
  credit_hours: number;
  department_id: string;
  department_name: string;
  description: string;
  prerequisite_ids: string[];
  status: EntityStatus;
  section_count: number;
  enrollment_count: number;
  program_ids: string[];
  created_at: ApiTimestamp;
}

export interface CollegeDetailDto {
  college: CollegeDto;
  departments: DepartmentDto[];
}

export interface DepartmentDetailDto {
  department: DepartmentDto;
  courses: CourseDto[];
}

export interface DepartmentOptionDto {
  value: string;
  label: string;
}

export interface ProgramDetailDto {
  program: ProgramDto;
  courses: CourseDto[];
}

export interface CourseSectionDto {
  id: string;
  course_id: string;
  term_label: string;
  capacity: number;
  enrolled: number;
}

export interface CourseDetailDto {
  course: CourseDto;
  sections: CourseSectionDto[];
}

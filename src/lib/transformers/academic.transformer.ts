import { parseApiDate, toApiTimestamp } from "@/lib/transformers/common";
import type {
  College,
  Course,
  CourseDetail,
  CourseSection,
  Department,
  Program,
} from "@/modules/academic/types/academic.types";
import type {
  CollegeDetailDto,
  CollegeDto,
  CourseDetailDto,
  CourseDto,
  CourseSectionDto,
  DepartmentDetailDto,
  DepartmentDto,
  DepartmentOptionDto,
  ProgramDetailDto,
  ProgramDto,
} from "@/types/dto/academic.dto";
import type {
  CollegeDetail,
  DepartmentDetail,
  DepartmentOption,
  ProgramDetail,
} from "@/modules/academic/types/academic.types";

export function toCollege(dto: CollegeDto): College {
  return {
    id: dto.id,
    code: dto.code,
    name: dto.name,
    description: dto.description,
    deanUserId: dto.dean_user_id,
    deanName: dto.dean_name,
    status: dto.status,
    departmentCount: dto.department_count,
    studentCount: dto.student_count,
    createdAt: parseApiDate(dto.created_at),
  };
}

export function toCollegeDto(college: College): CollegeDto {
  return {
    id: college.id,
    code: college.code,
    name: college.name,
    description: college.description,
    dean_user_id: college.deanUserId,
    dean_name: college.deanName,
    status: college.status,
    department_count: college.departmentCount,
    student_count: college.studentCount,
    created_at: toApiTimestamp(college.createdAt),
  };
}

export function toDepartment(dto: DepartmentDto): Department {
  return {
    id: dto.id,
    code: dto.code,
    name: dto.name,
    collegeId: dto.college_id,
    collegeName: dto.college_name,
    headUserId: dto.head_user_id,
    headName: dto.head_name,
    description: dto.description,
    status: dto.status,
    courseCount: dto.course_count,
    staffCount: dto.staff_count,
    createdAt: parseApiDate(dto.created_at),
  };
}

export function toDepartmentDto(department: Department): DepartmentDto {
  return {
    id: department.id,
    code: department.code,
    name: department.name,
    college_id: department.collegeId,
    college_name: department.collegeName,
    head_user_id: department.headUserId,
    head_name: department.headName,
    description: department.description,
    status: department.status,
    course_count: department.courseCount,
    staff_count: department.staffCount,
    created_at: toApiTimestamp(department.createdAt),
  };
}

export function toProgram(dto: ProgramDto): Program {
  return {
    id: dto.id,
    code: dto.code,
    name: dto.name,
    type: dto.type,
    departmentId: dto.department_id,
    departmentName: dto.department_name,
    durationYears: dto.duration_years,
    description: dto.description,
    status: dto.status,
    enrolledCount: dto.enrolled_count,
    courseCount: dto.course_count,
    courseIds: [...dto.course_ids],
    createdAt: parseApiDate(dto.created_at),
  };
}

export function toProgramDto(program: Program): ProgramDto {
  return {
    id: program.id,
    code: program.code,
    name: program.name,
    type: program.type,
    department_id: program.departmentId,
    department_name: program.departmentName,
    duration_years: program.durationYears,
    description: program.description,
    status: program.status,
    enrolled_count: program.enrolledCount,
    course_count: program.courseCount,
    course_ids: [...program.courseIds],
    created_at: toApiTimestamp(program.createdAt),
  };
}

export function toCourse(dto: CourseDto): Course {
  return {
    id: dto.id,
    code: dto.code,
    name: dto.name,
    creditHours: dto.credit_hours,
    departmentId: dto.department_id,
    departmentName: dto.department_name,
    description: dto.description,
    prerequisiteIds: [...dto.prerequisite_ids],
    status: dto.status,
    sectionCount: dto.section_count,
    enrollmentCount: dto.enrollment_count,
    programIds: [...dto.program_ids],
    createdAt: parseApiDate(dto.created_at),
  };
}

export interface CollegeSeedRecord {
  id: string;
  code: string;
  name: string;
  description: string;
  deanUserId: string;
  deanName: string;
  status: College["status"];
  departmentCount: number;
  studentCount: number;
  createdAt: string;
}

export interface DepartmentSeedRecord {
  id: string;
  code: string;
  name: string;
  collegeId: string;
  collegeName: string;
  headUserId: string;
  headName: string;
  description: string;
  status: Department["status"];
  courseCount: number;
  staffCount: number;
  createdAt: string;
}

export function collegeDtoFromSeed(record: CollegeSeedRecord): CollegeDto {
  return {
    id: record.id,
    code: record.code,
    name: record.name,
    description: record.description,
    dean_user_id: record.deanUserId,
    dean_name: record.deanName,
    status: record.status,
    department_count: record.departmentCount,
    student_count: record.studentCount,
    created_at: record.createdAt,
  };
}

export function departmentDtoFromSeed(record: DepartmentSeedRecord): DepartmentDto {
  return {
    id: record.id,
    code: record.code,
    name: record.name,
    college_id: record.collegeId,
    college_name: record.collegeName,
    head_user_id: record.headUserId,
    head_name: record.headName,
    description: record.description,
    status: record.status,
    course_count: record.courseCount,
    staff_count: record.staffCount,
    created_at: record.createdAt,
  };
}

export function toCollegeDetail(dto: CollegeDetailDto): CollegeDetail {
  return {
    college: toCollege(dto.college),
    departments: dto.departments.map(toDepartment),
  };
}

export function toDepartmentDetail(dto: DepartmentDetailDto): DepartmentDetail {
  return {
    department: toDepartment(dto.department),
    courses: dto.courses.map(toCourse),
  };
}

export function toDepartmentOption(dto: DepartmentOptionDto): DepartmentOption {
  return { value: dto.value, label: dto.label };
}

export function toProgramDetail(dto: ProgramDetailDto): ProgramDetail {
  return {
    program: toProgram(dto.program),
    courses: dto.courses.map(toCourse),
  };
}

function toCourseSection(dto: CourseSectionDto): CourseSection {
  return {
    id: dto.id,
    courseId: dto.course_id,
    termLabel: dto.term_label,
    capacity: dto.capacity,
    enrolled: dto.enrolled,
  };
}

export function toCourseDetail(dto: CourseDetailDto): CourseDetail {
  return {
    course: toCourse(dto.course),
    sections: dto.sections.map(toCourseSection),
  };
}

export function toCourseDto(course: Course): CourseDto {
  return {
    id: course.id,
    code: course.code,
    name: course.name,
    credit_hours: course.creditHours,
    department_id: course.departmentId,
    department_name: course.departmentName,
    description: course.description,
    prerequisite_ids: [...course.prerequisiteIds],
    status: course.status,
    section_count: course.sectionCount,
    enrollment_count: course.enrollmentCount,
    program_ids: [...course.programIds],
    created_at: toApiTimestamp(course.createdAt),
  };
}

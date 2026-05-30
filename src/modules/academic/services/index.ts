import { resolveService } from "@/lib/service-resolver";
import type { IAcademicCalendarService } from "./calendar.service";
import { mockAcademicCalendarService } from "./calendar.service.mock";
import { realAcademicCalendarService } from "./calendar.service.real";
import type { ICollegeService } from "./college.service";
import { mockCollegeService } from "./college.service.mock";
import { realCollegeService } from "./college.service.real";
import type { ICourseService } from "./course.service";
import { mockCourseService } from "./course.service.mock";
import { realCourseService } from "./course.service.real";
import type { IDepartmentService } from "./department.service";
import { mockDepartmentService } from "./department.service.mock";
import { realDepartmentService } from "./department.service.real";
import type { IProgramService } from "./program.service";
import { mockProgramService } from "./program.service.mock";
import { realProgramService } from "./program.service.real";

export const collegeService = resolveService<ICollegeService>(
  mockCollegeService,
  realCollegeService,
);

export const departmentService = resolveService<IDepartmentService>(
  mockDepartmentService,
  realDepartmentService,
);

export const programService = resolveService<IProgramService>(
  mockProgramService,
  realProgramService,
);

export const courseService = resolveService<ICourseService>(
  mockCourseService,
  realCourseService,
);

export const academicCalendarService = resolveService<IAcademicCalendarService>(
  mockAcademicCalendarService,
  realAcademicCalendarService,
);

export type { ICollegeService } from "./college.service";
export type { IDepartmentService } from "./department.service";
export type { IProgramService } from "./program.service";
export type { ICourseService } from "./course.service";
export type { IAcademicCalendarService } from "./calendar.service";

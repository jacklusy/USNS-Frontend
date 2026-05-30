import { resolveService } from "@/lib/service-resolver";
import type { IFacultyService } from "./faculty.service";
import { mockFacultyService } from "./faculty.service.mock";
import { realFacultyService } from "./faculty.service.real";

export const facultyService = resolveService<IFacultyService>(
  mockFacultyService,
  realFacultyService,
);

export type { IFacultyService } from "./faculty.service";

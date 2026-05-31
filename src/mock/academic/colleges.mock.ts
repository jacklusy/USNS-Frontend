import {
  collegeDtoFromSeed,
  toCollege,
  type CollegeSeedRecord,
} from "@/lib/transformers/academic.transformer";
import type { College } from "@/modules/academic/types/academic.types";
import type { CollegeListQueryParams } from "@/modules/academic/types/academic.types";
import type { PaginatedResponse } from "@/types/api.types";
import type { EntityStatus } from "@/constants/status-badge.constants";
import { findUserNameById } from "@/mock/academic/user-labels.mock";
import { getDepartmentsStore } from "@/mock/academic/departments.mock";
import { matchesSearch, paginate } from "@/mock/academic/academic-mock-utils";

const SEED_COLLEGES: CollegeSeedRecord[] = [
  {
    id: "col_engineering",
    code: "ENG",
    name: "College of Engineering",
    description:
      "Engineering, computing, and applied sciences programs across undergraduate and graduate levels.",
    deanUserId: "usr_dean",
    deanName: "Sara Mitchell",
    status: "active",
    departmentCount: 0,
    studentCount: 0,
    createdAt: "2023-08-01T00:00:00.000Z",
  },
  {
    id: "col_business",
    code: "BUS",
    name: "College of Business",
    description:
      "Business administration, finance, marketing, and executive leadership programs.",
    deanUserId: "usr_dean",
    deanName: "Sara Mitchell",
    status: "active",
    departmentCount: 0,
    studentCount: 0,
    createdAt: "2023-08-01T00:00:00.000Z",
  },
  {
    id: "col_arts",
    code: "ART",
    name: "College of Arts & Humanities",
    description:
      "Liberal arts, languages, and humanities education supporting interdisciplinary study.",
    deanUserId: "usr_faculty",
    deanName: "Elena Vasquez",
    status: "active",
    departmentCount: 0,
    studentCount: 0,
    createdAt: "2023-09-15T00:00:00.000Z",
  },
];

function hydrateColleges(records: CollegeSeedRecord[]): College[] {
  return records.map((record) => toCollege(collegeDtoFromSeed(record)));
}

let collegesStore: College[] = hydrateColleges(SEED_COLLEGES);

export function getCollegesStore(): College[] {
  return collegesStore;
}

export function resetCollegesStore(): void {
  collegesStore = hydrateColleges(SEED_COLLEGES);
}

export function findCollegeById(id: string): College | undefined {
  return collegesStore.find((college) => college.id === id);
}

export function collegeCodeExists(code: string, excludeId?: string): boolean {
  const normalized = code.trim().toUpperCase();
  return collegesStore.some(
    (college) =>
      college.code.toUpperCase() === normalized && college.id !== excludeId,
  );
}

export function generateCollegeId(): string {
  return `col_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

export function recomputeCollegeCounts(): void {
  const departments = getDepartmentsStore();
  for (const college of collegesStore) {
    const linked = departments.filter((dept) => dept.collegeId === college.id);
    college.departmentCount = linked.length;
    college.studentCount = linked.reduce(
      (sum, dept) => sum + Math.max(dept.staffCount * 12, 0),
      0,
    );
    college.deanName = findUserNameById(college.deanUserId);
  }
}

function filterColleges(
  params: CollegeListQueryParams,
): College[] {
  recomputeCollegeCounts();
  return collegesStore.filter((college) => {
    if (params.status && college.status !== params.status) return false;
    return matchesSearch(params.search, [
      college.name,
      college.code,
      college.deanName,
      college.description,
    ]);
  });
}

export function listCollegesPaginated(
  params: CollegeListQueryParams,
): PaginatedResponse<College> {
  return paginate(filterColleges(params), params.page, params.per_page);
}

export function setCollegeStatus(
  id: string,
  status: EntityStatus,
  cascadeDepartments: boolean,
): College | undefined {
  const college = findCollegeById(id);
  if (!college) return undefined;
  college.status = status;
  if (cascadeDepartments && status === "inactive") {
    const departments = getDepartmentsStore();
    for (const dept of departments) {
      if (dept.collegeId === id) {
        dept.status = "inactive";
      }
    }
  }
  recomputeCollegeCounts();
  return college;
}

import type { AcademicYear } from "@/modules/academic/types/academic.types";
import type { Semester } from "@/modules/academic/types/academic.types";
import type { SemesterStatus } from "@/modules/academic/types/academic.types";
const SEED_YEARS: AcademicYear[] = [
  {
    id: "year_2023_24",
    label: "2023–2024",
    startDate: "2023-09-01",
    endDate: "2024-08-31",
    isActive: false,
    semesterCount: 0,
    hasLinkedData: true,
    createdAt: "2023-06-01T00:00:00.000Z",
  },
  {
    id: "year_2024_25",
    label: "2024–2025",
    startDate: "2024-09-01",
    endDate: "2025-08-31",
    isActive: false,
    semesterCount: 0,
    hasLinkedData: true,
    createdAt: "2024-06-01T00:00:00.000Z",
  },
  {
    id: "year_2025_26",
    label: "2025–2026",
    startDate: "2025-09-01",
    endDate: "2026-08-31",
    isActive: true,
    semesterCount: 0,
    hasLinkedData: true,
    createdAt: "2025-06-01T00:00:00.000Z",
  },
];

const SEED_SEMESTERS: Semester[] = [
  {
    id: "sem_2023_fall",
    academicYearId: "year_2023_24",
    name: "Fall 2023",
    type: "fall",
    startDate: "2023-09-01",
    endDate: "2023-12-20",
    status: "closed",
    activeRegistrationCount: 0,
  },
  {
    id: "sem_2023_spring",
    academicYearId: "year_2023_24",
    name: "Spring 2024",
    type: "spring",
    startDate: "2024-01-15",
    endDate: "2024-05-15",
    status: "closed",
    activeRegistrationCount: 0,
  },
  {
    id: "sem_2024_fall",
    academicYearId: "year_2024_25",
    name: "Fall 2024",
    type: "fall",
    startDate: "2024-09-01",
    endDate: "2024-12-20",
    status: "closed",
    activeRegistrationCount: 0,
  },
  {
    id: "sem_2024_spring",
    academicYearId: "year_2024_25",
    name: "Spring 2025",
    type: "spring",
    startDate: "2025-01-15",
    endDate: "2025-05-15",
    status: "closed",
    activeRegistrationCount: 0,
  },
  {
    id: "sem_2025_fall",
    academicYearId: "year_2025_26",
    name: "Fall 2025",
    type: "fall",
    startDate: "2025-09-01",
    endDate: "2025-12-20",
    status: "active",
    activeRegistrationCount: 128,
  },
  {
    id: "sem_2025_spring",
    academicYearId: "year_2025_26",
    name: "Spring 2026",
    type: "spring",
    startDate: "2026-01-15",
    endDate: "2026-05-15",
    status: "draft",
    activeRegistrationCount: 0,
  },
  {
    id: "sem_2025_summer",
    academicYearId: "year_2025_26",
    name: "Summer 2026",
    type: "summer",
    startDate: "2026-06-01",
    endDate: "2026-08-15",
    status: "draft",
    activeRegistrationCount: 0,
  },
];

let yearsStore: AcademicYear[] = structuredClone(SEED_YEARS);
let semestersStore: Semester[] = structuredClone(SEED_SEMESTERS);

export function getAcademicYearsStore(): AcademicYear[] {
  return yearsStore;
}

export function getSemestersStore(): Semester[] {
  return semestersStore;
}

export function resetAcademicCalendarStore(): void {
  yearsStore = structuredClone(SEED_YEARS);
  semestersStore = structuredClone(SEED_SEMESTERS);
}

export function findAcademicYearById(id: string): AcademicYear | undefined {
  return yearsStore.find((y) => y.id === id);
}

export function findSemesterById(id: string): Semester | undefined {
  return semestersStore.find((s) => s.id === id);
}

export function generateAcademicYearId(): string {
  return `year_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

export function generateSemesterId(): string {
  return `sem_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

export function recomputeYearMeta(): void {
  for (const year of yearsStore) {
    const linked = semestersStore.filter((s) => s.academicYearId === year.id);
    year.semesterCount = linked.length;
    year.hasLinkedData =
      linked.length > 0 ||
      linked.some((s) => s.activeRegistrationCount > 0);
  }
}

export function semestersByYearId(yearId: string): Semester[] {
  recomputeYearMeta();
  return semestersStore.filter((s) => s.academicYearId === yearId);
}

export function setActiveAcademicYear(id: string): void {
  for (const year of yearsStore) {
    year.isActive = year.id === id;
  }
}

export function setSemesterStatus(
  id: string,
  status: SemesterStatus,
): Semester | undefined {
  const semester = findSemesterById(id);
  if (!semester) return undefined;
  if (status === "active") {
    for (const other of semestersStore) {
      if (other.id !== id && other.status === "active") {
        other.status = "closed";
      }
    }
  }
  semester.status = status;
  recomputeYearMeta();
  return semester;
}

export function yearHasBlockingLinks(yearId: string): boolean {
  recomputeYearMeta();
  const year = findAcademicYearById(yearId);
  if (!year) return true;
  return (
    year.hasLinkedData ||
    semestersStore.some(
      (s) =>
        s.academicYearId === yearId && s.activeRegistrationCount > 0,
    )
  );
}

import type { FacultyListQueryParams } from "../types/faculty.types";

const facultyRoot = ["faculty"] as const;

export const facultyQueryKeys = {
  root: facultyRoot,
  list: (params: FacultyListQueryParams) =>
    [...facultyRoot, "list", params] as const,
  detail: (id: string) => [...facultyRoot, "detail", id] as const,
  all: [...facultyRoot] as const,
};

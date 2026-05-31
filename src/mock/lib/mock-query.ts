import type { PaginatedResponse } from "@/types/api.types";

export function paginate<T>(
  items: T[],
  page: number,
  perPage: number,
): PaginatedResponse<T> {
  const lastPage = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(Math.max(1, page), lastPage);
  const start = (safePage - 1) * perPage;
  return {
    data: items.slice(start, start + perPage),
    meta: {
      total: items.length,
      page: safePage,
      per_page: perPage,
      last_page: lastPage,
    },
  };
}

export function matchesSearch(
  query: string | undefined,
  fields: readonly string[],
): boolean {
  if (!query?.trim()) {
    return true;
  }
  const normalized = query.trim().toLowerCase();
  return fields.some((field) => field.toLowerCase().includes(normalized));
}

export function sortByField<T>(
  items: T[],
  getValue: (item: T) => string | number,
  direction: "asc" | "desc" = "asc",
): T[] {
  const sorted = [...items].sort((left, right) => {
    const leftValue = getValue(left);
    const rightValue = getValue(right);
    if (leftValue < rightValue) {
      return direction === "asc" ? -1 : 1;
    }
    if (leftValue > rightValue) {
      return direction === "asc" ? 1 : -1;
    }
    return 0;
  });
  return sorted;
}

import type { SelectOption } from "@/types/select.types";

export function filterSelectOptions<TValue extends string>(
  options: readonly SelectOption<TValue>[],
  query: string,
): SelectOption<TValue>[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [...options];
  }
  return options.filter((option) =>
    option.label.toLowerCase().includes(normalized),
  );
}

export function findOptionLabel<TValue extends string>(
  options: readonly SelectOption<TValue>[],
  value: TValue | null | undefined,
): string {
  if (value === null || value === undefined) {
    return "";
  }
  const match = options.find((option) => option.value === value);
  return match?.label ?? "";
}

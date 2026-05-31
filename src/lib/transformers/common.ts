import type { ApiTimestamp } from "@/types/dto/common.dto";

export function parseApiDate(iso: ApiTimestamp): Date {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid API date: ${iso}`);
  }
  return date;
}

export function toApiTimestamp(date: Date): ApiTimestamp {
  return date.toISOString();
}

export function parseOptionalApiDate(
  iso: ApiTimestamp | null | undefined,
): Date | null {
  if (iso === null || iso === undefined) {
    return null;
  }
  return parseApiDate(iso);
}

export function mapNullable<T>(value: T | null | undefined): T | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }
  return value;
}

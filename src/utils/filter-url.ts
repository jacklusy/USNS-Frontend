import type {
  FilterFieldConfig,
  FilterValues,
  SelectFilterField,
} from "@/types/filter.types";
import type { DateRangeValue } from "@/types/date-picker.types";
import { startOfDay } from "@/utils/date/calendar";

function getUrlKey(field: FilterFieldConfig): string {
  return field.urlKey ?? field.id;
}

function parseDateParam(value: string): Date | null {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return startOfDay(parsed);
}

function isFilterValueEmpty(value: FilterValues[string]): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (typeof value === "boolean") return value === false;
  if (Array.isArray(value)) return value.length === 0;
  const range = value as DateRangeValue;
  return !range.start && !range.end;
}

export function createDefaultFilterValues(
  config: readonly FilterFieldConfig[],
): FilterValues {
  const values: FilterValues = {};
  for (const field of config) {
    if (field.type === "text") {
      values[field.id] = "";
    } else if (field.type === "select") {
      values[field.id] = field.multiple ? [] : null;
    } else if (field.type === "dateRange") {
      values[field.id] = { start: null, end: null };
    } else if (field.type === "checkbox") {
      values[field.id] = false;
    }
  }
  return values;
}

export function serializeFilterState(
  config: readonly FilterFieldConfig[],
  values: FilterValues,
): URLSearchParams {
  const params = new URLSearchParams();

  for (const field of config) {
    const key = getUrlKey(field);
    const value = values[field.id];
    if (isFilterValueEmpty(value)) continue;

    if (field.type === "text" && typeof value === "string") {
      params.set(key, value.trim());
    } else if (field.type === "select") {
      if (field.multiple && Array.isArray(value)) {
        params.set(key, value.join(","));
      } else if (typeof value === "string" && value) {
        params.set(key, value);
      }
    } else if (field.type === "dateRange") {
      const range = value as DateRangeValue;
      if (range.start) {
        params.set(`${key}Start`, range.start.toISOString().slice(0, 10));
      }
      if (range.end) {
        params.set(`${key}End`, range.end.toISOString().slice(0, 10));
      }
    } else if (field.type === "checkbox" && value === true) {
      params.set(key, "true");
    }
  }

  return params;
}

export function parseFilterState(
  config: readonly FilterFieldConfig[],
  searchParams: URLSearchParams,
): FilterValues {
  const values = createDefaultFilterValues(config);

  for (const field of config) {
    const key = getUrlKey(field);

    if (field.type === "text") {
      const raw = searchParams.get(key);
      if (raw) values[field.id] = raw;
    } else if (field.type === "select") {
      const raw = searchParams.get(key);
      if (!raw) continue;
      const selectField = field as SelectFilterField;
      if (selectField.multiple) {
        values[field.id] = raw.split(",").filter(Boolean);
      } else {
        values[field.id] = raw;
      }
    } else if (field.type === "dateRange") {
      const startRaw = searchParams.get(`${key}Start`);
      const endRaw = searchParams.get(`${key}End`);
      const range: DateRangeValue = { start: null, end: null };
      if (startRaw) range.start = parseDateParam(startRaw);
      if (endRaw) range.end = parseDateParam(endRaw);
      if (range.start || range.end) {
        values[field.id] = range;
      }
    } else if (field.type === "checkbox") {
      if (searchParams.get(key) === "true") {
        values[field.id] = true;
      }
    }
  }

  return values;
}

export function countActiveFilters(
  config: readonly FilterFieldConfig[],
  values: FilterValues,
): number {
  return config.filter((field) => !isFilterValueEmpty(values[field.id])).length;
}

export function getFilterChipLabel(
  field: FilterFieldConfig,
  value: FilterValues[string],
): string | null {
  if (isFilterValueEmpty(value)) return null;

  if (field.type === "text" && typeof value === "string") {
    return `${field.label}: ${value}`;
  }

  if (field.type === "select") {
    if (Array.isArray(value) && value.length > 0) {
      const labels = value
        .map(
          (v) =>
            field.options.find((option) => option.value === v)?.label ?? v,
        )
        .join(", ");
      return `${field.label}: ${labels}`;
    }
    if (typeof value === "string" && value) {
      const label =
        field.options.find((option) => option.value === value)?.label ?? value;
      return `${field.label}: ${label}`;
    }
  }

  if (field.type === "dateRange") {
    const range = value as DateRangeValue;
    const formatter = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" });
    const start = range.start ? formatter.format(range.start) : "";
    const end = range.end ? formatter.format(range.end) : "";
    if (start && end) return `${field.label}: ${start} – ${end}`;
    if (start) return `${field.label}: ${start} –`;
    if (end) return `${field.label}: – ${end}`;
  }

  if (field.type === "checkbox" && value === true) {
    return field.checkboxLabel ?? field.label;
  }

  return null;
}

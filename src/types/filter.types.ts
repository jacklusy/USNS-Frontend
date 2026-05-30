import type { DateRangeValue } from "@/types/date-picker.types";
import type { SelectOption } from "@/types/select.types";

export type FilterFieldType = "text" | "select" | "dateRange" | "checkbox";

interface FilterFieldBase {
  id: string;
  label: string;
  urlKey?: string;
}

export interface TextFilterField extends FilterFieldBase {
  type: "text";
  placeholder?: string;
}

export interface SelectFilterField<TValue extends string = string>
  extends FilterFieldBase {
  type: "select";
  multiple?: boolean;
  options: readonly SelectOption<TValue>[];
  placeholder?: string;
}

export interface DateRangeFilterField extends FilterFieldBase {
  type: "dateRange";
}

export interface CheckboxFilterField extends FilterFieldBase {
  type: "checkbox";
  checkboxLabel?: string;
}

export type FilterFieldConfig =
  | TextFilterField
  | SelectFilterField
  | DateRangeFilterField
  | CheckboxFilterField;

export type FilterValue =
  | string
  | string[]
  | boolean
  | DateRangeValue
  | null;

export type FilterValues = Record<string, FilterValue>;

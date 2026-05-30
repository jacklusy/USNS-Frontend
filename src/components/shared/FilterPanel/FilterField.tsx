"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { DateRangePicker } from "@/components/ui/date-picker/DateRangePicker";
import { FormField } from "@/components/ui/FormField";
import { TextInput } from "@/components/ui/inputs/TextInput";
import { MultiSelect } from "@/components/ui/select/MultiSelect";
import { SingleSelect } from "@/components/ui/select/SingleSelect";
import type {
  FilterFieldConfig,
  FilterValue,
  FilterValues,
} from "@/types/filter.types";
import type { DateRangeValue } from "@/types/date-picker.types";

interface FilterFieldProps {
  field: FilterFieldConfig;
  value: FilterValues[string];
  onChange: (value: FilterValue) => void;
}

export function FilterField({ field, value, onChange }: FilterFieldProps) {
  if (field.type === "text") {
    return (
      <FormField name={field.id} label={field.label}>
        <TextInput
          id={field.id}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          placeholder={field.placeholder}
        />
      </FormField>
    );
  }

  if (field.type === "select" && field.multiple) {
    const selected = Array.isArray(value) ? value : [];
    return (
      <FormField name={field.id} label={field.label}>
        <MultiSelect
          id={field.id}
          options={field.options}
          value={selected}
          onChange={(next) => {
            onChange(next);
          }}
          placeholder={field.placeholder}
        />
      </FormField>
    );
  }

  if (field.type === "select") {
    const selected = typeof value === "string" ? value : null;
    return (
      <FormField name={field.id} label={field.label}>
        <SingleSelect
          id={field.id}
          options={field.options}
          value={selected}
          onChange={(next) => {
            onChange(next);
          }}
          placeholder={field.placeholder}
        />
      </FormField>
    );
  }

  if (field.type === "dateRange") {
    const range =
      value && typeof value === "object" && "start" in value
        ? (value as DateRangeValue)
        : { start: null, end: null };
    return (
      <FormField name={field.id} label={field.label}>
        <DateRangePicker
          id={field.id}
          value={range}
          onChange={(next) => {
            onChange(next);
          }}
        />
      </FormField>
    );
  }

  if (field.type === "checkbox") {
    const checked = value === true;
    const checkboxId = `${field.id}-checkbox`;
    return (
      <div className="flex flex-col gap-2">
        <span className="text-[12px] font-medium uppercase tracking-wide text-muted-fg">
          {field.label}
        </span>
        <label
          htmlFor={checkboxId}
          className="inline-flex min-h-11 cursor-pointer items-center gap-3 text-[15px] text-foreground"
        >
          <Checkbox
            id={checkboxId}
            checked={checked}
            onChange={() => {
              onChange(!checked);
            }}
            aria-label={field.checkboxLabel ?? field.label}
          />
          {field.checkboxLabel ?? field.label}
        </label>
      </div>
    );
  }

  return null;
}

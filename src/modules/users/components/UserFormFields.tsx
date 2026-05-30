"use client";

import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField } from "@/components/ui/FormField";
import { EmailInput, PasswordInput, TextInput } from "@/components/ui/inputs";
import { SingleSelect } from "@/components/ui/select";
import { USERS_COPY } from "@/constants/users.constants";
import type {
  DepartmentOption,
  RoleOption,
} from "../types/user-management.types";
import type { UserFormValues } from "../types/user-form.types";

interface UserFormFieldsProps {
  control: Control<UserFormValues>;
  errors: FieldErrors<UserFormValues>;
  roleOptions: readonly RoleOption[];
  departmentOptions: readonly DepartmentOption[];
  disabled?: boolean;
  showPassword?: boolean;
}

export function UserFormFields({
  control,
  errors,
  roleOptions,
  departmentOptions,
  disabled = false,
  showPassword = false,
}: UserFormFieldsProps) {
  return (
    <div className="flex flex-col gap-4">
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <FormField
            name="fullName"
            label={USERS_COPY.fieldFullName}
            required
            error={errors.fullName?.message}
          >
            <TextInput
              id="fullName"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={disabled}
              hasError={Boolean(errors.fullName)}
            />
          </FormField>
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <FormField
            name="email"
            label={USERS_COPY.fieldEmail}
            required
            error={errors.email?.message}
          >
            <EmailInput
              id="email"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={disabled}
              hasError={Boolean(errors.email)}
            />
          </FormField>
        )}
      />
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <FormField
            name="role"
            label={USERS_COPY.fieldRole}
            required
            error={errors.role?.message}
          >
            <SingleSelect
              id="role"
              options={roleOptions}
              value={field.value || null}
              onChange={(value) => {
                field.onChange(value ?? "");
              }}
              disabled={disabled}
              hasError={Boolean(errors.role)}
              placeholder={USERS_COPY.selectRolePlaceholder}
            />
          </FormField>
        )}
      />
      <Controller
        name="departmentId"
        control={control}
        render={({ field }) => (
          <FormField
            name="departmentId"
            label={USERS_COPY.fieldDepartment}
            required
            error={errors.departmentId?.message}
          >
            <SingleSelect
              id="departmentId"
              options={departmentOptions}
              value={field.value || null}
              onChange={(value) => {
                field.onChange(value ?? "");
              }}
              disabled={disabled}
              hasError={Boolean(errors.departmentId)}
              placeholder={USERS_COPY.selectDepartmentPlaceholder}
            />
          </FormField>
        )}
      />
      {showPassword ? (
        <Controller
          name="temporaryPassword"
          control={control}
          render={({ field }) => (
            <FormField
              name="temporaryPassword"
              label={USERS_COPY.fieldTemporaryPassword}
              required
              error={errors.temporaryPassword?.message}
            >
              <PasswordInput
                id="temporaryPassword"
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={disabled}
                hasError={Boolean(errors.temporaryPassword)}
              />
            </FormField>
          )}
        />
      ) : null}
      <Controller
        name="forcePasswordChange"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <label
              htmlFor="forcePasswordChange"
              className="inline-flex min-h-11 cursor-pointer items-center gap-3 text-[15px] text-foreground"
            >
              <Checkbox
                id="forcePasswordChange"
                checked={field.value}
                onChange={(checked) => {
                  field.onChange(checked);
                }}
                disabled={disabled}
                aria-label={USERS_COPY.fieldForcePasswordChange}
              />
              {USERS_COPY.fieldForcePasswordChange}
            </label>
          </div>
        )}
      />
    </div>
  );
}

"use client";

import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField } from "@/components/ui/FormField";
import { NumberInput, PasswordInput } from "@/components/ui/inputs";
import { SETTINGS_MANAGEMENT_COPY } from "@/constants/settings-management.constants";
import { SETTINGS_TABS_COPY } from "@/constants/settings-tabs.constants";
import { useSecuritySettings } from "../../hooks/useSettingsQueries";
import { useUpdateSecuritySettings } from "../../hooks/useSettingsMutations";
import {
  securitySettingsSchema,
  type SecuritySettingsFormData,
} from "../../schemas/settings.schemas";
import { SettingsSectionPanel } from "../SettingsSectionPanel";

const EMPTY: SecuritySettingsFormData = {
  sessionTimeoutMinutes: 60,
  minPasswordLength: 8,
  lockoutAttempts: 5,
  mfaRequired: false,
  apiRotationKey: "",
};

export function SecuritySettingsSection() {
  const query = useSecuritySettings();
  const mutation = useUpdateSecuritySettings();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[15px] text-muted-fg">
        {SETTINGS_TABS_COPY.securityDescription}
      </p>
      <SettingsSectionPanel
        sectionLabel={SETTINGS_TABS_COPY.securityTitle}
        query={query}
        schema={securitySettingsSchema}
        defaultValues={EMPTY}
        isSaving={mutation.isPending}
        onSave={async (values) => {
          await mutation.mutateAsync(values);
        }}
      >
        {({ register, control, errors }) => (
          <>
            <FormField
              name="sessionTimeoutMinutes"
              label={SETTINGS_MANAGEMENT_COPY.fieldSessionTimeout}
              required
              error={errors.sessionTimeoutMinutes?.message}
            >
              <NumberInput
                id="settings-session-timeout"
                {...register("sessionTimeoutMinutes", { valueAsNumber: true })}
                hasError={Boolean(errors.sessionTimeoutMinutes)}
              />
            </FormField>
            <FormField
              name="minPasswordLength"
              label={SETTINGS_MANAGEMENT_COPY.fieldMinPasswordLength}
              required
              error={errors.minPasswordLength?.message}
            >
              <NumberInput
                id="settings-min-password"
                {...register("minPasswordLength", { valueAsNumber: true })}
                hasError={Boolean(errors.minPasswordLength)}
              />
            </FormField>
            <FormField
              name="lockoutAttempts"
              label={SETTINGS_MANAGEMENT_COPY.fieldLockoutAttempts}
              required
              error={errors.lockoutAttempts?.message}
            >
              <NumberInput
                id="settings-lockout"
                {...register("lockoutAttempts", { valueAsNumber: true })}
                hasError={Boolean(errors.lockoutAttempts)}
              />
            </FormField>
            <Controller
              name="mfaRequired"
              control={control}
              render={({ field }) => (
                <label className="flex cursor-pointer items-center gap-3 text-[15px]">
                  <Checkbox
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                    aria-label={SETTINGS_MANAGEMENT_COPY.fieldMfaRequired}
                  />
                  <span>{SETTINGS_MANAGEMENT_COPY.fieldMfaRequired}</span>
                </label>
              )}
            />
            <FormField
              name="apiRotationKey"
              label={SETTINGS_MANAGEMENT_COPY.fieldApiRotationKey}
              error={errors.apiRotationKey?.message}
            >
              <PasswordInput
                id="settings-api-key"
                {...register("apiRotationKey")}
                hasError={Boolean(errors.apiRotationKey)}
                autoComplete="new-password"
              />
            </FormField>
          </>
        )}
      </SettingsSectionPanel>
    </div>
  );
}

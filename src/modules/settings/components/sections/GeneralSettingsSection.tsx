"use client";

import { Controller } from "react-hook-form";
import { FormField } from "@/components/ui/FormField";
import { EmailInput, TextInput } from "@/components/ui/inputs";
import { SingleSelect } from "@/components/ui/select";
import {
  LOCALE_OPTIONS,
  SETTINGS_MANAGEMENT_COPY,
  TIMEZONE_OPTIONS,
} from "@/constants/settings-management.constants";
import { SETTINGS_TABS_COPY } from "@/constants/settings-tabs.constants";
import { useGeneralSettings } from "../../hooks/useSettingsQueries";
import { useUpdateGeneralSettings } from "../../hooks/useSettingsMutations";
import {
  generalSettingsSchema,
  type GeneralSettingsFormData,
} from "../../schemas/settings.schemas";
import { SettingsSectionPanel } from "../SettingsSectionPanel";

const EMPTY: GeneralSettingsFormData = {
  institutionName: "",
  supportEmail: "",
  defaultTimezone: "UTC",
  defaultLocale: "en-US",
};

export function GeneralSettingsSection() {
  const query = useGeneralSettings();
  const mutation = useUpdateGeneralSettings();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[15px] text-muted-fg">
        {SETTINGS_TABS_COPY.generalDescription}
      </p>
      <SettingsSectionPanel
        sectionLabel={SETTINGS_TABS_COPY.generalTitle}
        query={query}
        schema={generalSettingsSchema}
        defaultValues={EMPTY}
        isSaving={mutation.isPending}
        onSave={async (values) => {
          await mutation.mutateAsync(values);
        }}
      >
        {({ register, control, errors }) => (
          <>
            <FormField
              name="institutionName"
              label={SETTINGS_MANAGEMENT_COPY.fieldInstitutionName}
              required
              error={errors.institutionName?.message}
            >
              <TextInput
                id="settings-institution"
                {...register("institutionName")}
                hasError={Boolean(errors.institutionName)}
              />
            </FormField>
            <FormField
              name="supportEmail"
              label={SETTINGS_MANAGEMENT_COPY.fieldSupportEmail}
              required
              error={errors.supportEmail?.message}
            >
              <EmailInput
                id="settings-support-email"
                {...register("supportEmail")}
                hasError={Boolean(errors.supportEmail)}
              />
            </FormField>
            <Controller
              name="defaultTimezone"
              control={control}
              render={({ field }) => (
                <FormField
                  name="defaultTimezone"
                  label={SETTINGS_MANAGEMENT_COPY.fieldTimezone}
                  required
                  error={errors.defaultTimezone?.message}
                >
                  <SingleSelect
                    id="settings-timezone"
                    options={[...TIMEZONE_OPTIONS]}
                    value={field.value}
                    onChange={field.onChange}
                    hasError={Boolean(errors.defaultTimezone)}
                  />
                </FormField>
              )}
            />
            <Controller
              name="defaultLocale"
              control={control}
              render={({ field }) => (
                <FormField
                  name="defaultLocale"
                  label={SETTINGS_MANAGEMENT_COPY.fieldLocale}
                  required
                  error={errors.defaultLocale?.message}
                >
                  <SingleSelect
                    id="settings-locale"
                    options={[...LOCALE_OPTIONS]}
                    value={field.value}
                    onChange={field.onChange}
                    hasError={Boolean(errors.defaultLocale)}
                  />
                </FormField>
              )}
            />
          </>
        )}
      </SettingsSectionPanel>
    </div>
  );
}

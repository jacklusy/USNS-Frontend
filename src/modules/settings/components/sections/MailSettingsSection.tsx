"use client";

import { Controller } from "react-hook-form";
import { FormField } from "@/components/ui/FormField";
import { EmailInput, NumberInput, PasswordInput, TextInput } from "@/components/ui/inputs";
import { SingleSelect } from "@/components/ui/select";
import {
  MAIL_ENCRYPTION_OPTIONS,
  SETTINGS_MANAGEMENT_COPY,
} from "@/constants/settings-management.constants";
import { SETTINGS_TABS_COPY } from "@/constants/settings-tabs.constants";
import { useMailSettings } from "../../hooks/useSettingsQueries";
import { useUpdateMailSettings } from "../../hooks/useSettingsMutations";
import {
  mailSettingsSchema,
  type MailSettingsFormData,
} from "../../schemas/settings.schemas";
import { SettingsSectionPanel } from "../SettingsSectionPanel";

const EMPTY: MailSettingsFormData = {
  smtpHost: "",
  smtpPort: 587,
  encryption: "tls",
  smtpUsername: "",
  smtpPassword: "",
  fromName: "",
  fromAddress: "",
};

export function MailSettingsSection() {
  const query = useMailSettings();
  const mutation = useUpdateMailSettings();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[15px] text-muted-fg">{SETTINGS_TABS_COPY.mailDescription}</p>
      <SettingsSectionPanel
        sectionLabel={SETTINGS_TABS_COPY.mailTitle}
        query={query}
        schema={mailSettingsSchema}
        defaultValues={EMPTY}
        isSaving={mutation.isPending}
        onSave={async (values) => {
          await mutation.mutateAsync(values);
        }}
      >
        {({ register, control, errors }) => (
          <>
            <FormField
              name="smtpHost"
              label={SETTINGS_MANAGEMENT_COPY.fieldSmtpHost}
              required
              error={errors.smtpHost?.message}
            >
              <TextInput
                id="settings-smtp-host"
                {...register("smtpHost")}
                hasError={Boolean(errors.smtpHost)}
              />
            </FormField>
            <FormField
              name="smtpPort"
              label={SETTINGS_MANAGEMENT_COPY.fieldSmtpPort}
              required
              error={errors.smtpPort?.message}
            >
              <NumberInput
                id="settings-smtp-port"
                {...register("smtpPort", { valueAsNumber: true })}
                hasError={Boolean(errors.smtpPort)}
              />
            </FormField>
            <Controller
              name="encryption"
              control={control}
              render={({ field }) => (
                <FormField
                  name="encryption"
                  label={SETTINGS_MANAGEMENT_COPY.fieldEncryption}
                  required
                  error={errors.encryption?.message}
                >
                  <SingleSelect
                    id="settings-mail-encryption"
                    options={[...MAIL_ENCRYPTION_OPTIONS]}
                    value={field.value}
                    onChange={field.onChange}
                    hasError={Boolean(errors.encryption)}
                  />
                </FormField>
              )}
            />
            <FormField
              name="smtpUsername"
              label={SETTINGS_MANAGEMENT_COPY.fieldSmtpUsername}
              required
              error={errors.smtpUsername?.message}
            >
              <TextInput
                id="settings-smtp-user"
                {...register("smtpUsername")}
                hasError={Boolean(errors.smtpUsername)}
              />
            </FormField>
            <FormField
              name="smtpPassword"
              label={SETTINGS_MANAGEMENT_COPY.fieldSmtpPassword}
              error={errors.smtpPassword?.message}
            >
              <PasswordInput
                id="settings-smtp-password"
                {...register("smtpPassword")}
                hasError={Boolean(errors.smtpPassword)}
                autoComplete="new-password"
              />
            </FormField>
            <FormField
              name="fromName"
              label={SETTINGS_MANAGEMENT_COPY.fieldFromName}
              required
              error={errors.fromName?.message}
            >
              <TextInput
                id="settings-from-name"
                {...register("fromName")}
                hasError={Boolean(errors.fromName)}
              />
            </FormField>
            <FormField
              name="fromAddress"
              label={SETTINGS_MANAGEMENT_COPY.fieldFromAddress}
              required
              error={errors.fromAddress?.message}
            >
              <EmailInput
                id="settings-from-address"
                {...register("fromAddress")}
                hasError={Boolean(errors.fromAddress)}
              />
            </FormField>
          </>
        )}
      </SettingsSectionPanel>
    </div>
  );
}

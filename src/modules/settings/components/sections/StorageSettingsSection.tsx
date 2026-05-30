"use client";

import { Controller } from "react-hook-form";
import { FormField } from "@/components/ui/FormField";
import { NumberInput, PasswordInput, TextInput } from "@/components/ui/inputs";
import { SingleSelect } from "@/components/ui/select";
import {
  SETTINGS_MANAGEMENT_COPY,
  STORAGE_DRIVER_OPTIONS,
} from "@/constants/settings-management.constants";
import { SETTINGS_TABS_COPY } from "@/constants/settings-tabs.constants";
import { useStorageSettings } from "../../hooks/useSettingsQueries";
import { useUpdateStorageSettings } from "../../hooks/useSettingsMutations";
import {
  storageSettingsSchema,
  type StorageSettingsFormData,
} from "../../schemas/settings.schemas";
import { SettingsSectionPanel } from "../SettingsSectionPanel";

const EMPTY: StorageSettingsFormData = {
  driver: "local",
  bucket: "",
  rootPath: "",
  maxUploadMb: 25,
  secretKey: "",
};

export function StorageSettingsSection() {
  const query = useStorageSettings();
  const mutation = useUpdateStorageSettings();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[15px] text-muted-fg">
        {SETTINGS_TABS_COPY.storageDescription}
      </p>
      <SettingsSectionPanel
        sectionLabel={SETTINGS_TABS_COPY.storageTitle}
        query={query}
        schema={storageSettingsSchema}
        defaultValues={EMPTY}
        isSaving={mutation.isPending}
        onSave={async (values) => {
          await mutation.mutateAsync(values);
        }}
      >
        {({ register, control, errors }) => (
          <>
            <Controller
              name="driver"
              control={control}
              render={({ field }) => (
                <FormField
                  name="driver"
                  label={SETTINGS_MANAGEMENT_COPY.fieldStorageDriver}
                  required
                  error={errors.driver?.message}
                >
                  <SingleSelect
                    id="settings-storage-driver"
                    options={[...STORAGE_DRIVER_OPTIONS]}
                    value={field.value}
                    onChange={field.onChange}
                    hasError={Boolean(errors.driver)}
                  />
                </FormField>
              )}
            />
            <FormField
              name="bucket"
              label={SETTINGS_MANAGEMENT_COPY.fieldBucket}
              required
              error={errors.bucket?.message}
            >
              <TextInput
                id="settings-bucket"
                {...register("bucket")}
                hasError={Boolean(errors.bucket)}
              />
            </FormField>
            <FormField
              name="rootPath"
              label={SETTINGS_MANAGEMENT_COPY.fieldRootPath}
              required
              error={errors.rootPath?.message}
            >
              <TextInput
                id="settings-root-path"
                {...register("rootPath")}
                hasError={Boolean(errors.rootPath)}
              />
            </FormField>
            <FormField
              name="maxUploadMb"
              label={SETTINGS_MANAGEMENT_COPY.fieldMaxUpload}
              required
              error={errors.maxUploadMb?.message}
            >
              <NumberInput
                id="settings-max-upload"
                {...register("maxUploadMb", { valueAsNumber: true })}
                hasError={Boolean(errors.maxUploadMb)}
              />
            </FormField>
            <FormField
              name="secretKey"
              label={SETTINGS_MANAGEMENT_COPY.fieldSecretKey}
              error={errors.secretKey?.message}
            >
              <PasswordInput
                id="settings-secret-key"
                {...register("secretKey")}
                hasError={Boolean(errors.secretKey)}
                autoComplete="new-password"
              />
            </FormField>
          </>
        )}
      </SettingsSectionPanel>
    </div>
  );
}

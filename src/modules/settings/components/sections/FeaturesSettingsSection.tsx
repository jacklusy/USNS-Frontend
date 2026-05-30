"use client";

import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/Checkbox";
import { SETTINGS_MANAGEMENT_COPY } from "@/constants/settings-management.constants";
import { SETTINGS_TABS_COPY } from "@/constants/settings-tabs.constants";
import { useFeatureSettings } from "../../hooks/useSettingsQueries";
import { useUpdateFeatureSettings } from "../../hooks/useSettingsMutations";
import {
  featureFlagsSchema,
  type FeatureFlagsFormData,
} from "../../schemas/settings.schemas";
import { SettingsSectionPanel } from "../SettingsSectionPanel";

const EMPTY: FeatureFlagsFormData = {
  announcementsEnabled: true,
  reportsExportEnabled: true,
  facultyModuleEnabled: true,
  staffModuleEnabled: true,
  academicCalendarEnabled: true,
  auditLogExportEnabled: true,
};

const FEATURE_FIELDS: {
  name: keyof FeatureFlagsFormData;
  label: string;
}[] = [
  {
    name: "announcementsEnabled",
    label: SETTINGS_MANAGEMENT_COPY.featureAnnouncements,
  },
  {
    name: "reportsExportEnabled",
    label: SETTINGS_MANAGEMENT_COPY.featureReportsExport,
  },
  {
    name: "facultyModuleEnabled",
    label: SETTINGS_MANAGEMENT_COPY.featureFacultyModule,
  },
  {
    name: "staffModuleEnabled",
    label: SETTINGS_MANAGEMENT_COPY.featureStaffModule,
  },
  {
    name: "academicCalendarEnabled",
    label: SETTINGS_MANAGEMENT_COPY.featureAcademicCalendar,
  },
  {
    name: "auditLogExportEnabled",
    label: SETTINGS_MANAGEMENT_COPY.featureAuditExport,
  },
];

export function FeaturesSettingsSection() {
  const query = useFeatureSettings();
  const mutation = useUpdateFeatureSettings();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[15px] text-muted-fg">
        {SETTINGS_TABS_COPY.featuresDescription}
      </p>
      <SettingsSectionPanel
        sectionLabel={SETTINGS_TABS_COPY.featuresTitle}
        query={query}
        schema={featureFlagsSchema}
        defaultValues={EMPTY}
        isSaving={mutation.isPending}
        onSave={async (values) => {
          await mutation.mutateAsync(values);
        }}
      >
        {({ control }) => (
          <fieldset className="flex flex-col gap-3">
            <legend className="sr-only">{SETTINGS_TABS_COPY.featuresTitle}</legend>
            {FEATURE_FIELDS.map((field) => (
              <Controller
                key={field.name}
                name={field.name}
                control={control}
                render={({ field: controllerField }) => (
                  <label className="flex cursor-pointer items-center gap-3 text-[15px]">
                    <Checkbox
                      checked={controllerField.value}
                      onChange={(event) =>
                        controllerField.onChange(event.target.checked)
                      }
                      aria-label={field.label}
                    />
                    <span>{field.label}</span>
                  </label>
                )}
              />
            ))}
          </fieldset>
        )}
      </SettingsSectionPanel>
    </div>
  );
}

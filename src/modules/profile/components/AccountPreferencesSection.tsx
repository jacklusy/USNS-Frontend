"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { SingleSelect } from "@/components/ui/select";
import { ErrorState } from "@/components/shared/ErrorState";
import { useToast } from "@/hooks/useToast";
import { PROFILE_COPY } from "../constants/profile-management.constants";
import {
  PROFILE_DATE_FORMAT_OPTIONS,
  PROFILE_LANGUAGE_OPTIONS,
  PROFILE_THEME_OPTIONS,
  PROFILE_TIMEZONE_OPTIONS,
} from "../constants/profile-options.constants";
import {
  accountPreferencesSchema,
  type AccountPreferencesFormData,
} from "../schemas/account-preferences.schema";
import {
  useAccountPreferences,
  useUpdateAccountPreferences,
} from "../hooks/useAccountPreferences";

export function AccountPreferencesSection() {
  const toast = useToast();
  const query = useAccountPreferences();
  const updateMutation = useUpdateAccountPreferences();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccountPreferencesFormData>({
    resolver: zodResolver(accountPreferencesSchema),
    defaultValues: {
      language: "en-US",
      timezone: "America/New_York",
      dateFormat: "medium",
      theme: "light",
    },
  });

  useEffect(() => {
    if (query.data?.data) {
      reset(query.data.data);
    }
  }, [query.data?.data, reset]);

  if (query.isLoading) {
    return <div className="h-64 animate-pulse rounded-lg bg-border" />;
  }

  if (query.isError || !query.data?.data) {
    return (
      <ErrorState
        title={PROFILE_COPY.preferencesLoadErrorTitle}
        description={PROFILE_COPY.preferencesLoadErrorDescription}
        onRetry={() => void query.refetch()}
      />
    );
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateMutation.mutateAsync(data);
      toast.success({
        title: PROFILE_COPY.preferencesSuccessTitle,
        description: PROFILE_COPY.preferencesSuccessDescription,
      });
    } catch {
      toast.error({ title: PROFILE_COPY.saveErrorTitle });
    }
  });

  return (
    <section
      aria-labelledby="account-preferences-heading"
      className="max-w-[420px] rounded-lg border border-border bg-surface-elevated p-6"
    >
      <h2
        id="account-preferences-heading"
        className="text-[18px] font-semibold leading-[1.3] text-foreground"
      >
        {PROFILE_COPY.sectionPreferences}
      </h2>
      <p className="mt-2 text-[15px] text-muted-fg">
        {PROFILE_COPY.preferencesDescription}
      </p>
      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4" noValidate>
        <Controller
          name="language"
          control={control}
          render={({ field }) => (
            <FormField
              name="language"
              label={PROFILE_COPY.fieldLanguage}
              required
              error={errors.language?.message}
            >
              <SingleSelect
                id="profile-language"
                options={[...PROFILE_LANGUAGE_OPTIONS]}
                value={field.value}
                onChange={field.onChange}
                hasError={Boolean(errors.language)}
              />
            </FormField>
          )}
        />
        <Controller
          name="timezone"
          control={control}
          render={({ field }) => (
            <FormField
              name="timezone"
              label={PROFILE_COPY.fieldTimezone}
              required
              error={errors.timezone?.message}
            >
              <SingleSelect
                id="profile-timezone"
                options={[...PROFILE_TIMEZONE_OPTIONS]}
                value={field.value}
                onChange={field.onChange}
                hasError={Boolean(errors.timezone)}
              />
            </FormField>
          )}
        />
        <Controller
          name="dateFormat"
          control={control}
          render={({ field }) => (
            <FormField
              name="dateFormat"
              label={PROFILE_COPY.fieldDateFormat}
              required
              error={errors.dateFormat?.message}
            >
              <SingleSelect
                id="profile-date-format"
                options={[...PROFILE_DATE_FORMAT_OPTIONS]}
                value={field.value}
                onChange={field.onChange}
                hasError={Boolean(errors.dateFormat)}
              />
            </FormField>
          )}
        />
        <Controller
          name="theme"
          control={control}
          render={({ field }) => (
            <FormField
              name="theme"
              label={PROFILE_COPY.fieldTheme}
              required
              error={errors.theme?.message}
            >
              <SingleSelect
                id="profile-theme"
                options={[...PROFILE_THEME_OPTIONS]}
                value={field.value}
                onChange={field.onChange}
                hasError={Boolean(errors.theme)}
              />
            </FormField>
          )}
        />
        <Button type="submit" variant="primary" loading={updateMutation.isPending}>
          {PROFILE_COPY.savePreferences}
        </Button>
      </form>
    </section>
  );
}

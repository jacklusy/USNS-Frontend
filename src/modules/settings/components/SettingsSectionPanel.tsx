"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, type ReactNode } from "react";
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Resolver,
} from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/Button";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { ErrorState } from "@/components/shared/ErrorState";
import { SETTINGS_MANAGEMENT_COPY } from "@/constants/settings-management.constants";
import { useToast } from "@/hooks/useToast";
import type { UseQueryResult } from "@tanstack/react-query";
import type { ApiResponse } from "@/types/api.types";

interface SettingsSectionPanelProps<T extends FieldValues> {
  sectionLabel: string;
  query: UseQueryResult<ApiResponse<T>>;
  schema: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
  onSave: (values: T) => Promise<void>;
  isSaving?: boolean;
  children: (ctx: {
    register: ReturnType<typeof useForm<T>>["register"];
    control: ReturnType<typeof useForm<T>>["control"];
    errors: ReturnType<typeof useForm<T>>["formState"]["errors"];
  }) => ReactNode;
}

export function SettingsSectionPanel<T extends FieldValues>({
  sectionLabel,
  query,
  schema,
  defaultValues,
  onSave,
  isSaving = false,
  children,
}: SettingsSectionPanelProps<T>) {
  const toast = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<T | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<T>({
    resolver: zodResolver(schema as never) as Resolver<T>,
    defaultValues,
  });

  useEffect(() => {
    if (query.data?.data) {
      reset(query.data.data as DefaultValues<T>);
    }
  }, [query.data?.data, reset]);

  const openConfirm = handleSubmit((values) => {
    setPendingValues(values);
    setConfirmOpen(true);
  });

  const confirmSave = async () => {
    if (!pendingValues) return;
    try {
      await onSave(pendingValues);
      toast.success({
        title: SETTINGS_MANAGEMENT_COPY.saveSuccess,
        description: sectionLabel,
      });
      setConfirmOpen(false);
      setPendingValues(null);
    } catch {
      toast.error({
        title: "Save failed",
        description: `Could not save ${sectionLabel.toLowerCase()}.`,
      });
    }
  };

  if (query.isLoading) {
    return <div className="h-48 animate-pulse rounded-lg bg-border" />;
  }

  if (query.isError || !query.data?.data) {
    return (
      <ErrorState
        title={SETTINGS_MANAGEMENT_COPY.loadErrorTitle}
        description={SETTINGS_MANAGEMENT_COPY.loadErrorDescription}
        onRetry={() => void query.refetch()}
      />
    );
  }

  return (
    <>
      <form
        className="flex max-w-xl flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          void openConfirm();
        }}
        noValidate
      >
        {children({ register, control, errors })}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            disabled={!isDirty}
            loading={isSaving}
          >
            {SETTINGS_MANAGEMENT_COPY.saveButton}
          </Button>
        </div>
      </form>
      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          setPendingValues(null);
        }}
        title={SETTINGS_MANAGEMENT_COPY.confirmSaveTitle}
        description={SETTINGS_MANAGEMENT_COPY.confirmSaveDescription.replace(
          "settings",
          sectionLabel.toLowerCase(),
        )}
        confirmLabel={SETTINGS_MANAGEMENT_COPY.confirmSaveLabel}
        cancelLabel={SETTINGS_MANAGEMENT_COPY.cancelButton}
        loading={isSaving}
        onConfirm={() => void confirmSave()}
      />
    </>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { FormField } from "@/components/ui/FormField";
import { NumberInput, TextInput } from "@/components/ui/inputs";
import { SingleSelect } from "@/components/ui/select";
import {
  BACKUP_FREQUENCY_OPTIONS,
  SETTINGS_MANAGEMENT_COPY,
} from "@/constants/settings-management.constants";
import { useToast } from "@/hooks/useToast";
import type { DataTableColumn } from "@/types/data-table.types";
import type { BackupHistoryEntry, BackupRunStatus } from "../../types/settings.types";
import {
  useBackupHistory,
  useBackupSettings,
  useMaintenanceMode,
} from "../../hooks/useSettingsQueries";
import {
  useSetMaintenanceMode,
  useTriggerBackup,
  useUpdateBackupSchedule,
} from "../../hooks/useSettingsMutations";
import {
  backupScheduleSchema,
  maintenanceFormSchema,
  type BackupScheduleFormData,
  type MaintenanceFormData,
} from "../../schemas/settings.schemas";

function backupStatusLabel(status: BackupRunStatus): string {
  if (status === "success") return "Success";
  if (status === "failed") return "Failed";
  if (status === "running") return "Running";
  return "Pending";
}

function backupStatusTone(
  status: BackupRunStatus,
): "success" | "danger" | "default" {
  if (status === "success") return "success";
  if (status === "failed") return "danger";
  return "default";
}

export function OperationsSettingsSection() {
  const toast = useToast();
  const backupQuery = useBackupSettings();
  const historyQuery = useBackupHistory();
  const maintenanceQuery = useMaintenanceMode();
  const updateSchedule = useUpdateBackupSchedule();
  const triggerBackup = useTriggerBackup();
  const setMaintenance = useSetMaintenanceMode();

  const [scheduleConfirmOpen, setScheduleConfirmOpen] = useState(false);
  const [backupConfirmOpen, setBackupConfirmOpen] = useState(false);
  const [maintenanceStep, setMaintenanceStep] = useState<0 | 1 | 2>(0);
  const [pendingMaintenance, setPendingMaintenance] =
    useState<MaintenanceFormData | null>(null);
  const [backupProgress, setBackupProgress] = useState(0);
  const [backupRunning, setBackupRunning] = useState(false);

  const scheduleForm = useForm<BackupScheduleFormData>({
    resolver: zodResolver(backupScheduleSchema),
    defaultValues: {
      frequency: "daily",
      runTime: "03:00",
      retentionDays: 14,
    },
  });

  const maintenanceForm = useForm<MaintenanceFormData>({
    resolver: zodResolver(maintenanceFormSchema),
    defaultValues: { enabled: false, message: "" },
  });

  useEffect(() => {
    if (backupQuery.data?.data) {
      scheduleForm.reset({
        frequency: backupQuery.data.data.frequency,
        runTime: backupQuery.data.data.runTime,
        retentionDays: backupQuery.data.data.retentionDays,
      });
    }
  }, [backupQuery.data?.data, scheduleForm]);

  useEffect(() => {
    if (maintenanceQuery.data?.data) {
      maintenanceForm.reset({
        enabled: maintenanceQuery.data.data.enabled,
        message: maintenanceQuery.data.data.message,
      });
    }
  }, [maintenanceQuery.data?.data, maintenanceForm]);

  const confirmScheduleSave = scheduleForm.handleSubmit(async (values) => {
    await updateSchedule.mutateAsync(values);
    toast.success({ title: SETTINGS_MANAGEMENT_COPY.saveSuccess });
    setScheduleConfirmOpen(false);
  });

  const runManualBackup = useCallback(async () => {
    setBackupRunning(true);
    setBackupProgress(0);
    const interval = window.setInterval(() => {
      setBackupProgress((prev) => Math.min(prev + 10, 90));
    }, 200);
    try {
      await triggerBackup.mutateAsync();
      setBackupProgress(100);
      toast.success({ title: SETTINGS_MANAGEMENT_COPY.backupSuccess });
    } catch {
      toast.error({ title: "Backup failed" });
    } finally {
      window.clearInterval(interval);
      window.setTimeout(() => {
        setBackupRunning(false);
        setBackupProgress(0);
      }, 400);
      setBackupConfirmOpen(false);
    }
  }, [toast, triggerBackup]);

  const historyColumns: readonly DataTableColumn<BackupHistoryEntry>[] = [
    {
      id: "started",
      header: "Started",
      cell: (row) =>
        new Intl.DateTimeFormat(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(row.startedAt)),
    },
    {
      id: "type",
      header: "Type",
      cell: (row) => (row.type === "manual" ? "Manual" : "Scheduled"),
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => (
        <Badge variant={backupStatusTone(row.status)}>
          {backupStatusLabel(row.status)}
        </Badge>
      ),
    },
    {
      id: "size",
      header: "Size",
      cell: (row) => <span className="tabular-nums">{row.sizeLabel}</span>,
    },
  ];

  const backup = backupQuery.data?.data;
  const history = historyQuery.data?.data ?? [];

  if (backupQuery.isLoading || maintenanceQuery.isLoading) {
    return <div className="h-48 animate-pulse rounded-lg bg-border" />;
  }

  if (!backup || !maintenanceQuery.data?.data) {
    return (
      <ErrorState
        title={SETTINGS_MANAGEMENT_COPY.loadErrorTitle}
        description={SETTINGS_MANAGEMENT_COPY.loadErrorDescription}
        onRetry={() => {
          void backupQuery.refetch();
          void maintenanceQuery.refetch();
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <p className="text-[15px] text-muted-fg">
        {SETTINGS_MANAGEMENT_COPY.operationsTabDescription}
      </p>
      <section className="rounded-lg border border-border bg-surface-elevated p-6">
        <h2 className="text-[18px] font-semibold">
          {SETTINGS_MANAGEMENT_COPY.backupScheduleTitle}
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[13px] text-muted-fg">
          <span>{SETTINGS_MANAGEMENT_COPY.backupLastRun}</span>
          {backup.lastBackupAt ? (
            <span>
              {new Intl.DateTimeFormat(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(backup.lastBackupAt))}
            </span>
          ) : (
            <span>—</span>
          )}
          <Badge variant={backupStatusTone(backup.lastBackupStatus)}>
            {backupStatusLabel(backup.lastBackupStatus)}
          </Badge>
          <span className="tabular-nums">{backup.lastBackupSizeLabel}</span>
        </div>
        <form
          className="mt-6 flex max-w-md flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            setScheduleConfirmOpen(true);
          }}
          noValidate
        >
          <Controller
            name="frequency"
            control={scheduleForm.control}
            render={({ field }) => (
              <FormField
                name="frequency"
                label={SETTINGS_MANAGEMENT_COPY.fieldBackupFrequency}
                required
              >
                <SingleSelect
                  id="backup-frequency"
                  options={[...BACKUP_FREQUENCY_OPTIONS]}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormField>
            )}
          />
          <FormField
            name="runTime"
            label={SETTINGS_MANAGEMENT_COPY.fieldBackupTime}
            required
          >
            <TextInput
              id="backup-time"
              {...scheduleForm.register("runTime")}
            />
          </FormField>
          <FormField
            name="retentionDays"
            label={SETTINGS_MANAGEMENT_COPY.fieldRetentionDays}
            required
          >
            <NumberInput
              id="backup-retention"
              {...scheduleForm.register("retentionDays", {
                valueAsNumber: true,
              })}
            />
          </FormField>
          <Button
            type="submit"
            variant="primary"
            disabled={!scheduleForm.formState.isDirty}
            loading={updateSchedule.isPending}
          >
            {SETTINGS_MANAGEMENT_COPY.saveButton}
          </Button>
        </form>
      </section>
      <section className="rounded-lg border border-border bg-surface-elevated p-6">
        <h2 className="text-[18px] font-semibold">
          {SETTINGS_MANAGEMENT_COPY.backupManualTitle}
        </h2>
        <p className="mt-2 text-[13px] text-muted-fg">
          {SETTINGS_MANAGEMENT_COPY.backupManualDescription}
        </p>
        <Button
          type="button"
          variant="primary"
          className="mt-4"
          disabled={backupRunning}
          onClick={() => setBackupConfirmOpen(true)}
        >
          {SETTINGS_MANAGEMENT_COPY.backupManualButton}
        </Button>
        {backupRunning ? (
          <div className="mt-4">
            <p className="text-[13px] text-muted-fg">
              {SETTINGS_MANAGEMENT_COPY.backupProgressLabel}
            </p>
            <div
              className="mt-2 h-2 overflow-hidden rounded-full bg-border"
              role="progressbar"
              aria-valuenow={backupProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full bg-brand transition-[width] duration-200"
                style={{ width: `${backupProgress}%` }}
              />
            </div>
          </div>
        ) : null}
      </section>
      <section>
        <h2 className="mb-3 text-[18px] font-semibold">
          {SETTINGS_MANAGEMENT_COPY.backupHistoryTitle}
        </h2>
        <DataTable
          columns={historyColumns}
          data={history}
          enableClientPagination
          clientPerPage={5}
          isLoading={historyQuery.isLoading}
          ariaLabel="Backup history"
        />
      </section>
      <section className="rounded-lg border border-border bg-surface-elevated p-6">
        <h2 className="text-[18px] font-semibold">
          {SETTINGS_MANAGEMENT_COPY.maintenanceTitle}
        </h2>
        <p className="mt-2 text-[13px] text-muted-fg">
          {SETTINGS_MANAGEMENT_COPY.maintenanceDescription}
        </p>
        <form className="mt-6 flex max-w-xl flex-col gap-4">
          <Controller
            name="enabled"
            control={maintenanceForm.control}
            render={({ field }) => (
              <label className="flex cursor-pointer items-center gap-3 text-[15px]">
                <Checkbox
                  checked={field.value}
                  onChange={(event) => field.onChange(event.target.checked)}
                  aria-label={SETTINGS_MANAGEMENT_COPY.maintenanceTitle}
                />
                <span>{SETTINGS_MANAGEMENT_COPY.maintenanceTitle}</span>
              </label>
            )}
          />
          <FormField
            name="message"
            label={SETTINGS_MANAGEMENT_COPY.maintenanceMessageLabel}
            required
          >
            <TextInput
              id="maintenance-message"
              {...maintenanceForm.register("message")}
            />
          </FormField>
          <Button
            type="button"
            variant="primary"
            disabled={!maintenanceForm.formState.isDirty}
            onClick={() => {
              setPendingMaintenance(maintenanceForm.getValues());
              setMaintenanceStep(1);
            }}
          >
            {SETTINGS_MANAGEMENT_COPY.saveButton}
          </Button>
        </form>
      </section>
      <ConfirmationDialog
        open={scheduleConfirmOpen}
        onClose={() => setScheduleConfirmOpen(false)}
        title={SETTINGS_MANAGEMENT_COPY.confirmSaveTitle}
        description={SETTINGS_MANAGEMENT_COPY.confirmSaveDescription}
        confirmLabel={SETTINGS_MANAGEMENT_COPY.confirmSaveLabel}
        cancelLabel={SETTINGS_MANAGEMENT_COPY.cancelButton}
        loading={updateSchedule.isPending}
        onConfirm={() => void confirmScheduleSave()}
      />
      <ConfirmationDialog
        open={backupConfirmOpen}
        onClose={() => setBackupConfirmOpen(false)}
        title={SETTINGS_MANAGEMENT_COPY.backupManualConfirmTitle}
        description={SETTINGS_MANAGEMENT_COPY.backupManualConfirmDescription}
        confirmLabel={SETTINGS_MANAGEMENT_COPY.backupManualButton}
        cancelLabel={SETTINGS_MANAGEMENT_COPY.cancelButton}
        loading={backupRunning}
        onConfirm={() => void runManualBackup()}
      />
      <ConfirmationDialog
        open={maintenanceStep === 1}
        onClose={() => {
          setMaintenanceStep(0);
          setPendingMaintenance(null);
        }}
        title={
          pendingMaintenance?.enabled
            ? SETTINGS_MANAGEMENT_COPY.maintenanceEnableFirstTitle
            : SETTINGS_MANAGEMENT_COPY.maintenanceDisableTitle
        }
        description={
          pendingMaintenance?.enabled
            ? SETTINGS_MANAGEMENT_COPY.maintenanceEnableFirstDescription
            : SETTINGS_MANAGEMENT_COPY.maintenanceDisableDescription
        }
        confirmLabel={
          pendingMaintenance?.enabled ? "Continue" : SETTINGS_MANAGEMENT_COPY.maintenanceConfirmDisable
        }
        cancelLabel={SETTINGS_MANAGEMENT_COPY.cancelButton}
        onConfirm={() => {
          if (pendingMaintenance?.enabled) {
            setMaintenanceStep(2);
          } else {
            void setMaintenance.mutateAsync(pendingMaintenance!).then(() => {
              toast.success({ title: SETTINGS_MANAGEMENT_COPY.maintenanceSuccess });
              setMaintenanceStep(0);
              setPendingMaintenance(null);
            });
          }
        }}
      />
      <ConfirmationDialog
        open={maintenanceStep === 2}
        onClose={() => {
          setMaintenanceStep(0);
          setPendingMaintenance(null);
        }}
        title={SETTINGS_MANAGEMENT_COPY.maintenanceEnableSecondTitle}
        description={SETTINGS_MANAGEMENT_COPY.maintenanceEnableSecondDescription}
        confirmLabel={SETTINGS_MANAGEMENT_COPY.maintenanceConfirmEnable}
        cancelLabel={SETTINGS_MANAGEMENT_COPY.cancelButton}
        destructive
        loading={setMaintenance.isPending}
        onConfirm={() => {
          if (!pendingMaintenance) return;
          void setMaintenance.mutateAsync(pendingMaintenance).then(() => {
            toast.success({ title: SETTINGS_MANAGEMENT_COPY.maintenanceSuccess });
            setMaintenanceStep(0);
            setPendingMaintenance(null);
          });
        }}
      />
    </div>
  );
}

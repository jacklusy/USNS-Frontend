"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsQueryKeys } from "../constants/settings.query-keys";
import { settingsService } from "../services";
import type {
  FeatureFlagsSettings,
  GeneralSettings,
  UpdateMailInput,
  UpdateSecurityInput,
  UpdateStorageInput,
} from "../types/settings.types";
import type { BackupScheduleSettings } from "../types/settings.types";

export function useUpdateGeneralSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: GeneralSettings) => settingsService.updateGeneral(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.general,
      });
    },
  });
}

export function useUpdateMailSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateMailInput) => settingsService.updateMail(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: settingsQueryKeys.mail });
    },
  });
}

export function useUpdateStorageSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateStorageInput) => settingsService.updateStorage(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.storage,
      });
    },
  });
}

export function useUpdateSecuritySettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateSecurityInput) =>
      settingsService.updateSecurity(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.security,
      });
    },
  });
}

export function useUpdateFeatureSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: FeatureFlagsSettings) =>
      settingsService.updateFeatures(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.features,
      });
    },
  });
}

export function useUpdateBackupSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      input: Pick<BackupScheduleSettings, "frequency" | "runTime" | "retentionDays">,
    ) => settingsService.updateBackupSchedule(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: settingsQueryKeys.backup });
      await queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.backupHistory,
      });
    },
  });
}

export function useTriggerBackup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => settingsService.triggerBackup(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: settingsQueryKeys.backup });
      await queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.backupHistory,
      });
    },
  });
}

export function useSetMaintenanceMode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { enabled: boolean; message: string }) =>
      settingsService.setMaintenance(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.maintenance,
      });
    },
  });
}

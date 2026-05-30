"use client";

import { useQuery } from "@tanstack/react-query";
import { settingsQueryKeys } from "../constants/settings.query-keys";
import { settingsService } from "../services";

export function useGeneralSettings() {
  return useQuery({
    queryKey: settingsQueryKeys.general,
    queryFn: () => settingsService.getGeneral(),
  });
}

export function useMailSettings() {
  return useQuery({
    queryKey: settingsQueryKeys.mail,
    queryFn: () => settingsService.getMail(),
  });
}

export function useStorageSettings() {
  return useQuery({
    queryKey: settingsQueryKeys.storage,
    queryFn: () => settingsService.getStorage(),
  });
}

export function useSecuritySettings() {
  return useQuery({
    queryKey: settingsQueryKeys.security,
    queryFn: () => settingsService.getSecurity(),
  });
}

export function useFeatureSettings() {
  return useQuery({
    queryKey: settingsQueryKeys.features,
    queryFn: () => settingsService.getFeatures(),
  });
}

export function useBackupSettings() {
  return useQuery({
    queryKey: settingsQueryKeys.backup,
    queryFn: () => settingsService.getBackup(),
  });
}

export function useBackupHistory() {
  return useQuery({
    queryKey: settingsQueryKeys.backupHistory,
    queryFn: () => settingsService.listBackupHistory(),
  });
}

export function useMaintenanceMode() {
  return useQuery({
    queryKey: settingsQueryKeys.maintenance,
    queryFn: () => settingsService.getMaintenance(),
    staleTime: 30_000,
  });
}

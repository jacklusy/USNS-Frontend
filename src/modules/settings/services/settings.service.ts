import type { ApiResponse } from "@/types/api.types";
import type {
  BackupHistoryEntry,
  BackupScheduleSettings,
  FeatureFlagsSettings,
  GeneralSettings,
  MailSettings,
  MaintenanceSettings,
  SecuritySettings,
  StorageSettings,
  TriggerBackupResult,
  UpdateMailInput,
  UpdateSecurityInput,
  UpdateStorageInput,
} from "../types/settings.types";

export interface ISettingsService {
  getGeneral(): Promise<ApiResponse<GeneralSettings>>;
  updateGeneral(input: GeneralSettings): Promise<ApiResponse<GeneralSettings>>;
  getMail(): Promise<ApiResponse<MailSettings>>;
  updateMail(input: UpdateMailInput): Promise<ApiResponse<MailSettings>>;
  getStorage(): Promise<ApiResponse<StorageSettings>>;
  updateStorage(input: UpdateStorageInput): Promise<ApiResponse<StorageSettings>>;
  getSecurity(): Promise<ApiResponse<SecuritySettings>>;
  updateSecurity(input: UpdateSecurityInput): Promise<ApiResponse<SecuritySettings>>;
  getFeatures(): Promise<ApiResponse<FeatureFlagsSettings>>;
  updateFeatures(
    input: FeatureFlagsSettings,
  ): Promise<ApiResponse<FeatureFlagsSettings>>;
  getBackup(): Promise<ApiResponse<BackupScheduleSettings>>;
  updateBackupSchedule(
    input: Pick<BackupScheduleSettings, "frequency" | "runTime" | "retentionDays">,
  ): Promise<ApiResponse<BackupScheduleSettings>>;
  triggerBackup(): Promise<ApiResponse<TriggerBackupResult>>;
  listBackupHistory(): Promise<ApiResponse<BackupHistoryEntry[]>>;
  getMaintenance(): Promise<ApiResponse<MaintenanceSettings>>;
  setMaintenance(
    input: Pick<MaintenanceSettings, "enabled" | "message">,
  ): Promise<ApiResponse<MaintenanceSettings>>;
}

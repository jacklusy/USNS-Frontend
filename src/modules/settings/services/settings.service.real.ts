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
import type { ISettingsService } from "./settings.service";

export class RealSettingsService implements ISettingsService {
  async getGeneral(): Promise<ApiResponse<GeneralSettings>> {
    throw new Error("Settings API not integrated");
  }

  async updateGeneral(
    _input: GeneralSettings,
  ): Promise<ApiResponse<GeneralSettings>> {
    throw new Error("Settings API not integrated");
  }

  async getMail(): Promise<ApiResponse<MailSettings>> {
    throw new Error("Settings API not integrated");
  }

  async updateMail(_input: UpdateMailInput): Promise<ApiResponse<MailSettings>> {
    throw new Error("Settings API not integrated");
  }

  async getStorage(): Promise<ApiResponse<StorageSettings>> {
    throw new Error("Settings API not integrated");
  }

  async updateStorage(
    _input: UpdateStorageInput,
  ): Promise<ApiResponse<StorageSettings>> {
    throw new Error("Settings API not integrated");
  }

  async getSecurity(): Promise<ApiResponse<SecuritySettings>> {
    throw new Error("Settings API not integrated");
  }

  async updateSecurity(
    _input: UpdateSecurityInput,
  ): Promise<ApiResponse<SecuritySettings>> {
    throw new Error("Settings API not integrated");
  }

  async getFeatures(): Promise<ApiResponse<FeatureFlagsSettings>> {
    throw new Error("Settings API not integrated");
  }

  async updateFeatures(
    _input: FeatureFlagsSettings,
  ): Promise<ApiResponse<FeatureFlagsSettings>> {
    throw new Error("Settings API not integrated");
  }

  async getBackup(): Promise<ApiResponse<BackupScheduleSettings>> {
    throw new Error("Settings API not integrated");
  }

  async updateBackupSchedule(
    _input: Pick<BackupScheduleSettings, "frequency" | "runTime" | "retentionDays">,
  ): Promise<ApiResponse<BackupScheduleSettings>> {
    throw new Error("Settings API not integrated");
  }

  async triggerBackup(): Promise<ApiResponse<TriggerBackupResult>> {
    throw new Error("Settings API not integrated");
  }

  async listBackupHistory(): Promise<ApiResponse<BackupHistoryEntry[]>> {
    throw new Error("Settings API not integrated");
  }

  async getMaintenance(): Promise<ApiResponse<MaintenanceSettings>> {
    throw new Error("Settings API not integrated");
  }

  async setMaintenance(
    _input: Pick<MaintenanceSettings, "enabled" | "message">,
  ): Promise<ApiResponse<MaintenanceSettings>> {
    throw new Error("Settings API not integrated");
  }
}

export const realSettingsService = new RealSettingsService();

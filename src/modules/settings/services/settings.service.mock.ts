import { MockServiceBase } from "@/lib/mock-service-base";
import {
  appendBackupHistory,
  getBackupSettings,
  getFeatureSettings,
  getGeneralSettings,
  getMailSettings,
  getMaintenanceSettings,
  getSecuritySettings,
  getStorageSettings,
  listBackupHistory,
  setMaintenanceSettings,
  updateBackupSchedule,
  updateFeatureSettings,
  updateGeneralSettings,
  updateMailSettings,
  updateSecuritySettings,
  updateStorageSettings,
} from "@/mock/settings/settings.mock";
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

function delayProgress(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class MockSettingsService
  extends MockServiceBase
  implements ISettingsService
{
  async getGeneral(): Promise<ApiResponse<GeneralSettings>> {
    await this.delay();
    return { data: getGeneralSettings() };
  }

  async updateGeneral(
    input: GeneralSettings,
  ): Promise<ApiResponse<GeneralSettings>> {
    await this.delay(350);
    return {
      data: updateGeneralSettings(input),
      message: "General settings saved",
    };
  }

  async getMail(): Promise<ApiResponse<MailSettings>> {
    await this.delay();
    return { data: getMailSettings() };
  }

  async updateMail(input: UpdateMailInput): Promise<ApiResponse<MailSettings>> {
    await this.delay(350);
    return {
      data: updateMailSettings(input),
      message: "Mail settings saved",
    };
  }

  async getStorage(): Promise<ApiResponse<StorageSettings>> {
    await this.delay();
    return { data: getStorageSettings() };
  }

  async updateStorage(
    input: UpdateStorageInput,
  ): Promise<ApiResponse<StorageSettings>> {
    await this.delay(350);
    return {
      data: updateStorageSettings(input),
      message: "Storage settings saved",
    };
  }

  async getSecurity(): Promise<ApiResponse<SecuritySettings>> {
    await this.delay();
    return { data: getSecuritySettings() };
  }

  async updateSecurity(
    input: UpdateSecurityInput,
  ): Promise<ApiResponse<SecuritySettings>> {
    await this.delay(350);
    return {
      data: updateSecuritySettings(input),
      message: "Security settings saved",
    };
  }

  async getFeatures(): Promise<ApiResponse<FeatureFlagsSettings>> {
    await this.delay();
    return { data: getFeatureSettings() };
  }

  async updateFeatures(
    input: FeatureFlagsSettings,
  ): Promise<ApiResponse<FeatureFlagsSettings>> {
    await this.delay(350);
    return {
      data: updateFeatureSettings(input),
      message: "Feature flags saved",
    };
  }

  async getBackup(): Promise<ApiResponse<BackupScheduleSettings>> {
    await this.delay();
    return { data: getBackupSettings() };
  }

  async updateBackupSchedule(
    input: Pick<BackupScheduleSettings, "frequency" | "runTime" | "retentionDays">,
  ): Promise<ApiResponse<BackupScheduleSettings>> {
    await this.delay(350);
    return {
      data: updateBackupSchedule(input),
      message: "Backup schedule saved",
    };
  }

  async triggerBackup(): Promise<ApiResponse<TriggerBackupResult>> {
    await delayProgress(2000);
    const startedAt = new Date().toISOString();
    appendBackupHistory({
      startedAt,
      completedAt: new Date().toISOString(),
      type: "manual",
      status: "success",
      sizeLabel: "2.4 GB",
    });
    return {
      data: { jobId: `job_${Date.now()}` },
      message: "Backup completed",
    };
  }

  async listBackupHistory(): Promise<ApiResponse<BackupHistoryEntry[]>> {
    await this.delay();
    return { data: listBackupHistory() };
  }

  async getMaintenance(): Promise<ApiResponse<MaintenanceSettings>> {
    await this.delay();
    return { data: getMaintenanceSettings() };
  }

  async setMaintenance(
    input: Pick<MaintenanceSettings, "enabled" | "message">,
  ): Promise<ApiResponse<MaintenanceSettings>> {
    await this.delay(300);
    return {
      data: setMaintenanceSettings(input),
      message: "Maintenance mode updated",
    };
  }
}

export const mockSettingsService = new MockSettingsService();

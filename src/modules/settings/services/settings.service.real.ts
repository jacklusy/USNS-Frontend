import {
  toBackupHistoryEntry,
  toBackupScheduleSettings,
  toFeatureFlagsSettings,
  toGeneralSettings,
  toMailSettings,
  toMaintenanceSettings,
  toSecuritySettings,
  toStorageSettings,
  toTriggerBackupResult,
} from "@/lib/transformers/settings.transformer";
import { get, post, put } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse } from "@/types/api.types";
import type {
  BackupHistoryEntryDto,
  BackupScheduleSettingsDto,
  FeatureFlagsSettingsDto,
  GeneralSettingsDto,
  MailSettingsDto,
  MaintenanceSettingsDto,
  SecuritySettingsDto,
  StorageSettingsDto,
  TriggerBackupResultDto,
} from "@/types/dto/settings.dto";
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
    const data = await get<GeneralSettingsDto>(ENDPOINTS.settings.general);
    return { data: toGeneralSettings(data) };
  }

  async updateGeneral(input: GeneralSettings): Promise<ApiResponse<GeneralSettings>> {
    const data = await put<GeneralSettingsDto, GeneralSettings>(
      ENDPOINTS.settings.general,
      input,
    );
    return { data: toGeneralSettings(data) };
  }

  async getMail(): Promise<ApiResponse<MailSettings>> {
    const data = await get<MailSettingsDto>(ENDPOINTS.settings.mail);
    return { data: toMailSettings(data) };
  }

  async updateMail(input: UpdateMailInput): Promise<ApiResponse<MailSettings>> {
    const data = await put<MailSettingsDto, UpdateMailInput>(
      ENDPOINTS.settings.mail,
      input,
    );
    return { data: toMailSettings(data) };
  }

  async getStorage(): Promise<ApiResponse<StorageSettings>> {
    const data = await get<StorageSettingsDto>(ENDPOINTS.settings.storage);
    return { data: toStorageSettings(data) };
  }

  async updateStorage(
    input: UpdateStorageInput,
  ): Promise<ApiResponse<StorageSettings>> {
    const data = await put<StorageSettingsDto, UpdateStorageInput>(
      ENDPOINTS.settings.storage,
      input,
    );
    return { data: toStorageSettings(data) };
  }

  async getSecurity(): Promise<ApiResponse<SecuritySettings>> {
    const data = await get<SecuritySettingsDto>(ENDPOINTS.settings.security);
    return { data: toSecuritySettings(data) };
  }

  async updateSecurity(
    input: UpdateSecurityInput,
  ): Promise<ApiResponse<SecuritySettings>> {
    const data = await put<SecuritySettingsDto, UpdateSecurityInput>(
      ENDPOINTS.settings.security,
      input,
    );
    return { data: toSecuritySettings(data) };
  }

  async getFeatures(): Promise<ApiResponse<FeatureFlagsSettings>> {
    const data = await get<FeatureFlagsSettingsDto>(ENDPOINTS.settings.features);
    return { data: toFeatureFlagsSettings(data) };
  }

  async updateFeatures(
    input: FeatureFlagsSettings,
  ): Promise<ApiResponse<FeatureFlagsSettings>> {
    const data = await put<FeatureFlagsSettingsDto, FeatureFlagsSettings>(
      ENDPOINTS.settings.features,
      input,
    );
    return { data: toFeatureFlagsSettings(data) };
  }

  async getBackup(): Promise<ApiResponse<BackupScheduleSettings>> {
    const data = await get<BackupScheduleSettingsDto>(ENDPOINTS.settings.backup);
    return { data: toBackupScheduleSettings(data) };
  }

  async updateBackupSchedule(
    input: Pick<BackupScheduleSettings, "frequency" | "runTime" | "retentionDays">,
  ): Promise<ApiResponse<BackupScheduleSettings>> {
    const data = await put<
      BackupScheduleSettingsDto,
      Pick<BackupScheduleSettings, "frequency" | "runTime" | "retentionDays">
    >(ENDPOINTS.settings.backup, input);
    return { data: toBackupScheduleSettings(data) };
  }

  async triggerBackup(): Promise<ApiResponse<TriggerBackupResult>> {
    const data = await post<TriggerBackupResultDto, Record<string, never>>(
      ENDPOINTS.settings.backupTrigger,
      {},
    );
    return { data: toTriggerBackupResult(data) };
  }

  async listBackupHistory(): Promise<ApiResponse<BackupHistoryEntry[]>> {
    const data = await get<BackupHistoryEntryDto[]>(
      ENDPOINTS.settings.backupHistory,
    );
    return { data: data.map(toBackupHistoryEntry) };
  }

  async getMaintenance(): Promise<ApiResponse<MaintenanceSettings>> {
    const data = await get<MaintenanceSettingsDto>(ENDPOINTS.settings.maintenance);
    return { data: toMaintenanceSettings(data) };
  }

  async setMaintenance(
    input: Pick<MaintenanceSettings, "enabled" | "message">,
  ): Promise<ApiResponse<MaintenanceSettings>> {
    const data = await put<
      MaintenanceSettingsDto,
      Pick<MaintenanceSettings, "enabled" | "message">
    >(ENDPOINTS.settings.maintenance, input);
    return { data: toMaintenanceSettings(data) };
  }
}

export const realSettingsService = new RealSettingsService();

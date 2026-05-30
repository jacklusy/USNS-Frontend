import { z } from "zod";

export const generalSettingsSchema = z.object({
  institutionName: z.string().trim().min(2).max(120),
  supportEmail: z.string().trim().email(),
  defaultTimezone: z.string().min(1),
  defaultLocale: z.string().min(1),
});

export const mailSettingsSchema = z.object({
  smtpHost: z.string().trim().min(1).max(200),
  smtpPort: z.number().int().min(1).max(65535),
  encryption: z.enum(["none", "tls", "ssl"]),
  smtpUsername: z.string().trim().min(1).max(200),
  smtpPassword: z.string(),
  fromName: z.string().trim().min(1).max(120),
  fromAddress: z.string().trim().email(),
});

export const storageSettingsSchema = z.object({
  driver: z.enum(["local", "s3"]),
  bucket: z.string().trim().min(1).max(200),
  rootPath: z.string().trim().min(1).max(200),
  maxUploadMb: z.number().int().min(1).max(500),
  secretKey: z.string(),
});

export const securitySettingsSchema = z.object({
  sessionTimeoutMinutes: z.number().int().min(5).max(480),
  minPasswordLength: z.number().int().min(6).max(32),
  lockoutAttempts: z.number().int().min(1).max(20),
  mfaRequired: z.boolean(),
  apiRotationKey: z.string(),
});

export const featureFlagsSchema = z.object({
  announcementsEnabled: z.boolean(),
  reportsExportEnabled: z.boolean(),
  facultyModuleEnabled: z.boolean(),
  staffModuleEnabled: z.boolean(),
  academicCalendarEnabled: z.boolean(),
  auditLogExportEnabled: z.boolean(),
});

export const backupScheduleSchema = z.object({
  frequency: z.enum(["daily", "weekly"]),
  runTime: z.string().trim().min(1),
  retentionDays: z.number().int().min(1).max(90),
});

export const maintenanceFormSchema = z.object({
  enabled: z.boolean(),
  message: z.string().trim().min(10).max(500),
});

export const emailTemplateSchema = z.object({
  subject: z.string().trim().min(1).max(200),
  preheader: z.string().trim().max(200),
  body: z.string().trim().min(1),
});

export type GeneralSettingsFormData = z.infer<typeof generalSettingsSchema>;
export type MailSettingsFormData = z.infer<typeof mailSettingsSchema>;
export type StorageSettingsFormData = z.infer<typeof storageSettingsSchema>;
export type SecuritySettingsFormData = z.infer<typeof securitySettingsSchema>;
export type FeatureFlagsFormData = z.infer<typeof featureFlagsSchema>;
export type BackupScheduleFormData = z.infer<typeof backupScheduleSchema>;
export type MaintenanceFormData = z.infer<typeof maintenanceFormSchema>;
export type EmailTemplateFormData = z.infer<typeof emailTemplateSchema>;

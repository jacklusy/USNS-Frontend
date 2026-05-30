import { resolveService } from "@/lib/service-resolver";
import type { IEmailTemplateService } from "./email-template.service";
import { mockEmailTemplateService } from "./email-template.service.mock";
import { realEmailTemplateService } from "./email-template.service.real";
import type { ISettingsService } from "./settings.service";
import { mockSettingsService } from "./settings.service.mock";
import { realSettingsService } from "./settings.service.real";

export const settingsService = resolveService<ISettingsService>(
  mockSettingsService,
  realSettingsService,
);

export const emailTemplateService = resolveService<IEmailTemplateService>(
  mockEmailTemplateService,
  realEmailTemplateService,
);

export type { ISettingsService } from "./settings.service";
export type { IEmailTemplateService } from "./email-template.service";

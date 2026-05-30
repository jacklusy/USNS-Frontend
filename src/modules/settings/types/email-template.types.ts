import type { DataTableRowBase } from "@/types/data-table.types";

export type EmailTemplateCategory =
  | "auth"
  | "notifications"
  | "academic"
  | "system";

export interface TemplateVariable {
  key: string;
  label: string;
  description: string;
  sampleValue: string;
}

export interface EmailTemplateListItem extends DataTableRowBase {
  name: string;
  slug: string;
  category: EmailTemplateCategory;
  subject: string;
  lastModifiedAt: string;
}

export interface EmailTemplateDetail {
  id: string;
  name: string;
  slug: string;
  category: EmailTemplateCategory;
  subject: string;
  preheader: string;
  body: string;
  lastModifiedAt: string;
  variables: readonly TemplateVariable[];
}

export interface UpdateEmailTemplateInput {
  subject: string;
  preheader: string;
  body: string;
}

export interface EmailTemplatePreviewResult {
  subject: string;
  preheader: string;
  htmlBody: string;
  plainBody: string;
}

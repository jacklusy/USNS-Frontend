import {
  EMAIL_TEMPLATE_DEFAULT_BODIES,
  EMAIL_TEMPLATE_VARIABLES,
} from "@/constants/settings-email-templates.constants";
import type {
  EmailTemplateDetail,
  EmailTemplateListItem,
  UpdateEmailTemplateInput,
} from "@/modules/settings/types/email-template.types";

interface TemplateRecord extends EmailTemplateDetail {
  defaultBody: string;
}

const SEED_TEMPLATES: TemplateRecord[] = [
  {
    id: "tpl_welcome",
    slug: "welcome_email",
    name: "Welcome email",
    category: "auth",
    subject: "Welcome to {{institution_name}}",
    preheader: "Your account is ready",
    body: EMAIL_TEMPLATE_DEFAULT_BODIES.welcome_email,
    defaultBody: EMAIL_TEMPLATE_DEFAULT_BODIES.welcome_email,
    lastModifiedAt: "2026-04-10T10:00:00.000Z",
    variables: EMAIL_TEMPLATE_VARIABLES.welcome_email,
  },
  {
    id: "tpl_reset",
    slug: "password_reset",
    name: "Password reset",
    category: "auth",
    subject: "Reset your password",
    preheader: "Password reset request",
    body: EMAIL_TEMPLATE_DEFAULT_BODIES.password_reset,
    defaultBody: EMAIL_TEMPLATE_DEFAULT_BODIES.password_reset,
    lastModifiedAt: "2026-04-12T11:30:00.000Z",
    variables: EMAIL_TEMPLATE_VARIABLES.password_reset,
  },
  {
    id: "tpl_activated",
    slug: "account_activated",
    name: "Account activated",
    category: "auth",
    subject: "Your account is active",
    preheader: "",
    body: EMAIL_TEMPLATE_DEFAULT_BODIES.account_activated,
    defaultBody: EMAIL_TEMPLATE_DEFAULT_BODIES.account_activated,
    lastModifiedAt: "2026-04-15T09:00:00.000Z",
    variables: EMAIL_TEMPLATE_VARIABLES.account_activated,
  },
  {
    id: "tpl_digest",
    slug: "announcement_digest",
    name: "Announcement digest",
    category: "notifications",
    subject: "You have {{announcement_count}} new announcements",
    preheader: "Weekly digest",
    body: EMAIL_TEMPLATE_DEFAULT_BODIES.announcement_digest,
    defaultBody: EMAIL_TEMPLATE_DEFAULT_BODIES.announcement_digest,
    lastModifiedAt: "2026-05-01T08:00:00.000Z",
    variables: EMAIL_TEMPLATE_VARIABLES.announcement_digest,
  },
  {
    id: "tpl_maintenance",
    slug: "maintenance_notice",
    name: "Maintenance notice",
    category: "system",
    subject: "Scheduled maintenance on {{maintenance_date}}",
    preheader: "Planned downtime",
    body: EMAIL_TEMPLATE_DEFAULT_BODIES.maintenance_notice,
    defaultBody: EMAIL_TEMPLATE_DEFAULT_BODIES.maintenance_notice,
    lastModifiedAt: "2026-05-10T12:00:00.000Z",
    variables: EMAIL_TEMPLATE_VARIABLES.maintenance_notice,
  },
  {
    id: "tpl_enrollment",
    slug: "enrollment_confirmation",
    name: "Enrollment confirmation",
    category: "academic",
    subject: "Enrollment confirmed: {{course_name}}",
    preheader: "",
    body: EMAIL_TEMPLATE_DEFAULT_BODIES.enrollment_confirmation,
    defaultBody: EMAIL_TEMPLATE_DEFAULT_BODIES.enrollment_confirmation,
    lastModifiedAt: "2026-05-12T14:00:00.000Z",
    variables: EMAIL_TEMPLATE_VARIABLES.enrollment_confirmation,
  },
  {
    id: "tpl_grade",
    slug: "grade_published",
    name: "Grade published",
    category: "academic",
    subject: "Grade posted for {{course_name}}",
    preheader: "",
    body: EMAIL_TEMPLATE_DEFAULT_BODIES.grade_published,
    defaultBody: EMAIL_TEMPLATE_DEFAULT_BODIES.grade_published,
    lastModifiedAt: "2026-05-18T16:00:00.000Z",
    variables: EMAIL_TEMPLATE_VARIABLES.grade_published,
  },
  {
    id: "tpl_backup",
    slug: "backup_completed",
    name: "Backup completed",
    category: "system",
    subject: "System backup completed",
    preheader: "Backup success",
    body: EMAIL_TEMPLATE_DEFAULT_BODIES.backup_completed,
    defaultBody: EMAIL_TEMPLATE_DEFAULT_BODIES.backup_completed,
    lastModifiedAt: "2026-05-20T03:05:00.000Z",
    variables: EMAIL_TEMPLATE_VARIABLES.backup_completed,
  },
];

let templatesStore: TemplateRecord[] = structuredClone(SEED_TEMPLATES);

export function getEmailTemplatesStore(): TemplateRecord[] {
  return templatesStore;
}

export function resetEmailTemplatesStore(): void {
  templatesStore = structuredClone(SEED_TEMPLATES);
}

export function findEmailTemplateById(id: string): TemplateRecord | undefined {
  return templatesStore.find((tpl) => tpl.id === id);
}

export function listEmailTemplateItems(): EmailTemplateListItem[] {
  return templatesStore.map((tpl) => ({
    id: tpl.id,
    name: tpl.name,
    slug: tpl.slug,
    category: tpl.category,
    subject: tpl.subject,
    lastModifiedAt: tpl.lastModifiedAt,
  }));
}

export function getEmailTemplateDetail(id: string): EmailTemplateDetail | undefined {
  const tpl = findEmailTemplateById(id);
  if (!tpl) return undefined;
  const { defaultBody: _d, ...detail } = tpl;
  return { ...detail };
}

export function updateEmailTemplate(
  id: string,
  input: UpdateEmailTemplateInput,
): EmailTemplateDetail | undefined {
  const index = templatesStore.findIndex((tpl) => tpl.id === id);
  if (index < 0) return undefined;
  const existing = templatesStore[index];
  templatesStore[index] = {
    ...existing,
    subject: input.subject.trim(),
    preheader: input.preheader.trim(),
    body: input.body,
    lastModifiedAt: new Date().toISOString(),
  };
  return getEmailTemplateDetail(id);
}

export function resetEmailTemplateToDefault(
  id: string,
): EmailTemplateDetail | undefined {
  const seed = SEED_TEMPLATES.find((tpl) => tpl.id === id);
  const index = templatesStore.findIndex((tpl) => tpl.id === id);
  if (!seed || index < 0) return undefined;
  templatesStore[index] = structuredClone(seed);
  return getEmailTemplateDetail(id);
}

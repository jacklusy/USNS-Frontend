import type { TemplateVariable } from "@/modules/settings/types/email-template.types";

export const EMAIL_TEMPLATE_CATEGORY_LABELS = {
  auth: "Authentication",
  notifications: "Notifications",
  academic: "Academic",
  system: "System",
} as const;

export const EMAIL_TEMPLATE_VARIABLES: Record<string, readonly TemplateVariable[]> =
  {
    welcome_email: [
      {
        key: "user_name",
        label: "User name",
        description: "Full name of the recipient",
        sampleValue: "Layla Hassan",
      },
      {
        key: "institution_name",
        label: "Institution",
        description: "University display name",
        sampleValue: "USNS University",
      },
    ],
    password_reset: [
      {
        key: "user_name",
        label: "User name",
        description: "Account holder name",
        sampleValue: "Admin User",
      },
      {
        key: "reset_link",
        label: "Reset link",
        description: "Password reset URL",
        sampleValue: "https://dashboard.usns.edu/reset-password?token=sample",
      },
      {
        key: "expiry_hours",
        label: "Expiry hours",
        description: "Hours until link expires",
        sampleValue: "24",
      },
    ],
    account_activated: [
      {
        key: "user_name",
        label: "User name",
        description: "Activated account name",
        sampleValue: "Dean User",
      },
    ],
    announcement_digest: [
      {
        key: "recipient_name",
        label: "Recipient",
        description: "Digest recipient name",
        sampleValue: "Faculty Member",
      },
      {
        key: "announcement_count",
        label: "Count",
        description: "Number of announcements",
        sampleValue: "3",
      },
    ],
    maintenance_notice: [
      {
        key: "maintenance_date",
        label: "Date",
        description: "Scheduled maintenance date",
        sampleValue: "June 2, 2026",
      },
      {
        key: "maintenance_window",
        label: "Window",
        description: "Time window",
        sampleValue: "02:00–06:00 UTC",
      },
    ],
    enrollment_confirmation: [
      {
        key: "student_name",
        label: "Student",
        description: "Student full name",
        sampleValue: "Sara Nasser",
      },
      {
        key: "course_name",
        label: "Course",
        description: "Enrolled course",
        sampleValue: "Introduction to Algorithms",
      },
    ],
    grade_published: [
      {
        key: "student_name",
        label: "Student",
        description: "Student name",
        sampleValue: "Omar Khalil",
      },
      {
        key: "course_name",
        label: "Course",
        description: "Course title",
        sampleValue: "Data Structures",
      },
      {
        key: "grade",
        label: "Grade",
        description: "Published grade",
        sampleValue: "A",
      },
    ],
    backup_completed: [
      {
        key: "backup_size",
        label: "Size",
        description: "Backup archive size",
        sampleValue: "2.4 GB",
      },
      {
        key: "completed_at",
        label: "Completed at",
        description: "Completion timestamp",
        sampleValue: "2026-05-31 03:00 UTC",
      },
    ],
  };

export const EMAIL_TEMPLATE_DEFAULT_BODIES: Record<string, string> = {
  welcome_email: `<p>Hello {{user_name}},</p><p>Welcome to {{institution_name}}. Your dashboard account is ready.</p>`,
  password_reset: `<p>Hello {{user_name}},</p><p>Reset your password using this link (expires in {{expiry_hours}} hours):</p><p><a href="{{reset_link}}">Reset password</a></p>`,
  account_activated: `<p>Hello {{user_name}},</p><p>Your account has been activated.</p>`,
  announcement_digest: `<p>Hello {{recipient_name}},</p><p>You have {{announcement_count}} new announcements.</p>`,
  maintenance_notice: `<p>Scheduled maintenance on {{maintenance_date}} from {{maintenance_window}}.</p>`,
  enrollment_confirmation: `<p>{{student_name}} is enrolled in {{course_name}}.</p>`,
  grade_published: `<p>{{student_name}} received grade {{grade}} in {{course_name}}.</p>`,
  backup_completed: `<p>Backup completed at {{completed_at}}. Size: {{backup_size}}.</p>`,
};

import type {
  SystemEvent,
  SystemEventDetail,
  SystemEventListQueryParams,
} from "@/modules/audit/types/system-event.types";
import type { PaginatedResponse } from "@/types/api.types";

const SEED_SYSTEM_EVENTS: SystemEventDetail[] = [
  {
    id: "sevt_001",
    timestamp: "2026-05-31T06:00:00.000Z",
    category: "backup",
    severity: "info",
    title: "Scheduled backup completed",
    summary: "Nightly database backup finished successfully.",
    context: {
      jobId: "backup_job_8842",
      duration: "4m 12s",
      size: "2.4 GB",
      destination: "s3://usns-backups/prod",
    },
  },
  {
    id: "sevt_002",
    timestamp: "2026-05-30T22:15:00.000Z",
    category: "configuration",
    severity: "warning",
    title: "Maintenance mode enabled",
    summary: "Dashboard maintenance mode toggled on by DBA.",
    context: {
      actor: "Omar Farouk",
      actorId: "usr_dba",
      message: "Planned schema migration window",
    },
  },
  {
    id: "sevt_003",
    timestamp: "2026-05-30T14:00:00.000Z",
    category: "security",
    severity: "critical",
    title: "Password policy updated",
    summary: "Minimum password length increased to 12 characters.",
    context: {
      section: "security",
      previousMinLength: "8",
      newMinLength: "12",
      changedBy: "usr_dba",
    },
  },
  {
    id: "sevt_004",
    timestamp: "2026-05-29T03:30:00.000Z",
    category: "system",
    severity: "info",
    title: "Application service restarted",
    summary: "Next.js dashboard worker pool restarted after deploy.",
    context: {
      service: "usns-dashboard",
      version: "0.1.0",
      node: "worker-02",
      reason: "rolling_deploy",
    },
  },
  {
    id: "sevt_005",
    timestamp: "2026-05-28T18:45:00.000Z",
    category: "backup",
    severity: "critical",
    title: "Manual backup failed",
    summary: "DBA-triggered backup job terminated with storage error.",
    context: {
      jobId: "backup_job_8831",
      error: "S3AccessDenied",
      bucket: "usns-backups-staging",
    },
  },
  {
    id: "sevt_006",
    timestamp: "2026-05-27T10:20:00.000Z",
    category: "configuration",
    severity: "info",
    title: "Mail settings updated",
    summary: "SMTP host and from address changed in system settings.",
    context: {
      section: "mail",
      smtpHost: "smtp.usns.edu",
      fromAddress: "noreply@usns.edu",
    },
  },
  {
    id: "sevt_007",
    timestamp: "2026-05-26T08:00:00.000Z",
    category: "system",
    severity: "warning",
    title: "High memory utilization",
    summary: "Dashboard node exceeded 85% memory for 10 minutes.",
    context: {
      node: "app-server-01",
      peakPercent: "87",
      durationMinutes: "10",
    },
  },
  {
    id: "sevt_008",
    timestamp: "2026-05-25T16:30:00.000Z",
    category: "security",
    severity: "warning",
    title: "API key rotation reminder",
    summary: "Security API key rotation due within 14 days.",
    context: {
      keyAlias: "dashboard_integration",
      expiresAt: "2026-06-08",
    },
  },
  {
    id: "sevt_009",
    timestamp: "2026-05-24T12:00:00.000Z",
    category: "backup",
    severity: "info",
    title: "Backup retention policy changed",
    summary: "Retention increased from 14 to 30 days.",
    context: {
      previousDays: "14",
      newDays: "30",
      changedBy: "usr_dba",
    },
  },
  {
    id: "sevt_010",
    timestamp: "2026-05-23T09:45:00.000Z",
    category: "configuration",
    severity: "info",
    title: "Feature flags updated",
    summary: "Faculty module enabled for all colleges.",
    context: {
      flag: "facultyModuleEnabled",
      value: "true",
      changedBy: "usr_admin",
    },
  },
  {
    id: "sevt_011",
    timestamp: "2026-05-22T21:10:00.000Z",
    category: "system",
    severity: "critical",
    title: "Queue worker crash loop",
    summary: "Background export worker restarted 5 times in 2 minutes.",
    context: {
      queue: "exports",
      restartCount: "5",
      lastError: "ConnectionTimeout",
    },
  },
  {
    id: "sevt_012",
    timestamp: "2026-05-21T07:30:00.000Z",
    category: "security",
    severity: "info",
    title: "Session timeout updated",
    summary: "Idle session timeout set to 45 minutes.",
    context: {
      previousMinutes: "30",
      newMinutes: "45",
    },
  },
  {
    id: "sevt_013",
    timestamp: "2026-05-20T15:55:00.000Z",
    category: "backup",
    severity: "info",
    title: "Manual backup completed",
    summary: "DBA manual backup job finished successfully.",
    context: {
      jobId: "backup_job_8820",
      triggeredBy: "usr_dba",
      size: "2.3 GB",
    },
  },
  {
    id: "sevt_014",
    timestamp: "2026-05-19T11:20:00.000Z",
    category: "configuration",
    severity: "warning",
    title: "Storage driver changed",
    summary: "File storage driver switched from local to S3.",
    context: {
      previousDriver: "local",
      newDriver: "s3",
      bucket: "usns-uploads",
    },
  },
  {
    id: "sevt_015",
    timestamp: "2026-05-18T04:00:00.000Z",
    category: "system",
    severity: "info",
    title: "Certificate renewed",
    summary: "TLS certificate auto-renewed for dashboard.usns.edu.",
    context: {
      domain: "dashboard.usns.edu",
      issuer: "Let's Encrypt",
      expiresAt: "2026-08-18",
    },
  },
  {
    id: "sevt_016",
    timestamp: "2026-05-17T13:40:00.000Z",
    category: "security",
    severity: "critical",
    title: "Brute force lockout triggered",
    summary: "Account lockout policy activated for admin@usns.edu.",
    context: {
      email: "admin@usns.edu",
      failedAttempts: "5",
      lockoutMinutes: "30",
    },
  },
  {
    id: "sevt_017",
    timestamp: "2026-05-16T10:05:00.000Z",
    category: "backup",
    severity: "warning",
    title: "Backup duration exceeded SLA",
    summary: "Scheduled backup took longer than 30 minute threshold.",
    context: {
      jobId: "backup_job_8812",
      duration: "38m 02s",
      threshold: "30m",
    },
  },
  {
    id: "sevt_018",
    timestamp: "2026-05-15T08:30:00.000Z",
    category: "configuration",
    severity: "info",
    title: "Maintenance mode disabled",
    summary: "Dashboard returned to normal operation.",
    context: {
      actor: "Omar Farouk",
      downtimeMinutes: "120",
    },
  },
  {
    id: "sevt_019",
    timestamp: "2026-05-14T19:00:00.000Z",
    category: "system",
    severity: "warning",
    title: "Disk space warning",
    summary: "Upload volume reached 80% capacity.",
    context: {
      mount: "/var/uploads",
      usedPercent: "80",
    },
  },
  {
    id: "sevt_020",
    timestamp: "2026-05-13T12:15:00.000Z",
    category: "security",
    severity: "info",
    title: "MFA policy enabled",
    summary: "Multi-factor authentication required for admin roles.",
    context: {
      roles: "admin,dba",
      enforcedAt: "2026-05-13T12:15:00.000Z",
    },
  },
];

let systemEventStore: SystemEventDetail[] = structuredClone(SEED_SYSTEM_EVENTS);

function matchesDate(
  timestamp: string,
  dateFrom?: string,
  dateTo?: string,
): boolean {
  const day = timestamp.slice(0, 10);
  if (dateFrom && day < dateFrom) return false;
  if (dateTo && day > dateTo) return false;
  return true;
}

export function filterSystemEvents(
  items: SystemEventDetail[],
  params: Omit<SystemEventListQueryParams, "page" | "per_page">,
): SystemEventDetail[] {
  return items.filter((item) => {
    if (params.category && item.category !== params.category) return false;
    if (params.severity && item.severity !== params.severity) return false;
    if (!matchesDate(item.timestamp, params.dateFrom, params.dateTo)) {
      return false;
    }
    return true;
  });
}

export function paginateSystemEvents(
  items: SystemEvent[],
  page: number,
  perPage: number,
): PaginatedResponse<SystemEvent> {
  const total = items.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), lastPage);
  const start = (safePage - 1) * perPage;
  return {
    data: items.slice(start, start + perPage),
    meta: { total, page: safePage, per_page: perPage, last_page: lastPage },
  };
}

export function listSystemEventsFromStore(
  params: SystemEventListQueryParams,
): PaginatedResponse<SystemEvent> {
  const filtered = filterSystemEvents(systemEventStore, params);
  const sorted = [...filtered].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
  return paginateSystemEvents(sorted, params.page, params.per_page);
}

export function listAllSystemEventsFromStore(
  params: Omit<SystemEventListQueryParams, "page" | "per_page">,
): SystemEvent[] {
  const filtered = filterSystemEvents(systemEventStore, params);
  return [...filtered].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
}

export function getSystemEventByIdFromStore(
  id: string,
): SystemEventDetail | null {
  return systemEventStore.find((item) => item.id === id) ?? null;
}

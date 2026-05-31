import { exportRowsToCsv } from "@/utils/export-csv";
import type { AuditLog } from "../types/audit-log.types";
import type { LoginHistoryEntry } from "../types/login-history.types";
import type { SystemEvent } from "../types/system-event.types";
import {
  AUDIT_LOG_RESULT_LABELS,
  LOGIN_RESULT_LABELS,
  SYSTEM_EVENT_CATEGORY_LABELS,
  SYSTEM_EVENT_SEVERITY_LABELS,
} from "@/constants/audit-log.constants";

function formatTimestamp(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function downloadAuditLogsCsv(rows: AuditLog[], filename: string): void {
  exportRowsToCsv(
    [
      "Timestamp",
      "Actor",
      "Action",
      "Resource type",
      "Resource ID",
      "IP address",
      "Result",
    ],
    rows.map((row) => [
      formatTimestamp(row.timestamp),
      row.actorName,
      row.action,
      row.resourceType,
      row.resourceId,
      row.ipAddress,
      AUDIT_LOG_RESULT_LABELS[row.result],
    ]),
    filename,
  );
}

export function downloadLoginHistoryCsv(
  rows: LoginHistoryEntry[],
  filename: string,
): void {
  exportRowsToCsv(
    [
      "Timestamp",
      "User",
      "Email",
      "IP address",
      "Browser",
      "Device",
      "Location",
      "Result",
      "Suspicious reasons",
    ],
    rows.map((row) => [
      formatTimestamp(row.timestamp),
      row.userName,
      row.userEmail,
      row.ipAddress,
      row.browser,
      row.device,
      `${row.locationCity}, ${row.locationCountry}`,
      LOGIN_RESULT_LABELS[row.result],
      row.suspiciousReasons.join("; "),
    ]),
    filename,
  );
}

export function downloadSystemEventsCsv(
  rows: SystemEvent[],
  filename: string,
): void {
  exportRowsToCsv(
    ["Timestamp", "Category", "Severity", "Title", "Summary"],
    rows.map((row) => [
      formatTimestamp(row.timestamp),
      SYSTEM_EVENT_CATEGORY_LABELS[row.category],
      SYSTEM_EVENT_SEVERITY_LABELS[row.severity],
      row.title,
      row.summary,
    ]),
    filename,
  );
}

import { exportRowsToCsv } from "@/utils/export-csv";
import type { EnrollmentDepartmentRow } from "../types/enrollment-report.types";
import type { GeneratedReport } from "../types/reports.types";

export function downloadGeneratedReportCsv(
  report: GeneratedReport,
): void {
  const headers = ["Report", "Generated at", "Status"];
  const rows: (readonly string[])[] = [
    [
      report.name,
      report.generatedAt,
      report.status,
    ],
    ["Metric", "Value"],
    ["Sample row 1", "100"],
    ["Sample row 2", "250"],
    ["Sample row 3", "180"],
  ];
  exportRowsToCsv(headers, rows, report.filename);
}

export function downloadEnrollmentReportCsv(
  rows: EnrollmentDepartmentRow[],
  filename: string,
): void {
  const headers = [
    "Department",
    "Enrolled",
    "New enrollments",
    "Withdrawals",
    "Completion rate",
  ];
  const dataRows = rows.map((row) => [
    row.department,
    String(row.enrolled),
    String(row.newEnrollments),
    String(row.withdrawals),
    `${row.completionRate}%`,
  ]);
  exportRowsToCsv(headers, dataRows, filename);
}

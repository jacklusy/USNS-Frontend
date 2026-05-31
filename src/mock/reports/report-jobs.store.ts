import type { ReportJob } from "@/modules/reports/types/reports.types";

interface JobRecord extends ReportJob {
  startedAt: number;
}

const JOB_DURATION_MS = 2000;

let jobsStore: Map<string, JobRecord> = new Map();

export function createReportJob(
  reportId: string,
  reportName: string,
): ReportJob {
  const id = `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const record: JobRecord = {
    id,
    reportId,
    reportName,
    status: "pending",
    progress: 0,
    startedAt: Date.now(),
  };
  jobsStore.set(id, record);
  return toPublicJob(record);
}

export function getReportJobStatus(jobId: string): ReportJob | undefined {
  const record = jobsStore.get(jobId);
  if (!record) return undefined;
  const elapsed = Date.now() - record.startedAt;
  const ratio = Math.min(1, elapsed / JOB_DURATION_MS);
  const progress = Math.round(ratio * 100);
  if (ratio < 0.15) {
    record.status = "pending";
    record.progress = progress;
  } else if (ratio < 1) {
    record.status = "running";
    record.progress = progress;
  } else if (record.status !== "completed") {
    record.status = "completed";
    record.progress = 100;
  }
  jobsStore.set(jobId, record);
  return toPublicJob(record);
}

export function completeReportJob(
  jobId: string,
  generatedReportId: string,
): ReportJob | undefined {
  const record = jobsStore.get(jobId);
  if (!record) return undefined;
  record.status = "completed";
  record.progress = 100;
  record.generatedReportId = generatedReportId;
  jobsStore.set(jobId, record);
  return toPublicJob(record);
}

function toPublicJob(record: JobRecord): ReportJob {
  return {
    id: record.id,
    reportId: record.reportId,
    reportName: record.reportName,
    status: record.status,
    progress: record.progress,
    generatedReportId: record.generatedReportId,
  };
}

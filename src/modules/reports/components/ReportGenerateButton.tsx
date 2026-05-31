"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { REPORTS_COPY } from "@/modules/reports/constants/reports-management.constants";
import { useToast } from "@/hooks/useToast";
import { reportsQueryKeys } from "../constants/reports.query-keys";
import {
  useReportJobStatus,
  useStartReportGeneration,
} from "../hooks/useReportGeneration";
import { useQueryClient } from "@tanstack/react-query";

interface ReportGenerateButtonProps {
  reportId: string;
  reportName: string;
}

export function ReportGenerateButton({
  reportId,
  reportName,
}: ReportGenerateButtonProps) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const startMutation = useStartReportGeneration();
  const jobQuery = useReportJobStatus(activeJobId, Boolean(activeJobId));

  useEffect(() => {
    const status = jobQuery.data?.data.status;
    if (status === "completed") {
      void queryClient.invalidateQueries({ queryKey: reportsQueryKeys.recent });
      void queryClient.invalidateQueries({ queryKey: reportsQueryKeys.catalog });
      toast.success({
        title: REPORTS_COPY.generateSuccess,
        description: REPORTS_COPY.generateSuccessDescription,
      });
      setActiveJobId(null);
    }
    if (status === "failed") {
      toast.error({
        title: REPORTS_COPY.generateError,
        description: REPORTS_COPY.generateErrorDescription,
      });
      setActiveJobId(null);
    }
  }, [jobQuery.data?.data.status, queryClient, toast]);

  const jobStatus = jobQuery.data?.data.status;
  const isGenerating =
    startMutation.isPending ||
    (Boolean(activeJobId) &&
      jobStatus !== "completed" &&
      jobStatus !== "failed");

  const handleGenerate = () => {
    startMutation.mutate(reportId, {
      onSuccess: (response) => {
        setActiveJobId(response.data.jobId);
      },
      onError: () => {
        toast.error({
          title: REPORTS_COPY.generateError,
          description: REPORTS_COPY.generateErrorDescription,
        });
      },
    });
  };

  return (
    <Button
      variant="primary"
      size="sm"
      loading={isGenerating}
      onClick={handleGenerate}
      aria-label={`${REPORTS_COPY.generateLabel} ${reportName}`}
      className="min-w-[120px]"
    >
      {isGenerating ? REPORTS_COPY.generatingLabel : REPORTS_COPY.generateLabel}
    </Button>
  );
}

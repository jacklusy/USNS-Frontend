"use client";

import { useEffect, useMemo, useState } from "react";
import { FilterChips, FilterPanel } from "@/components/shared/FilterPanel";
import { ErrorState } from "@/components/shared/ErrorState";
import { AUDIT_COPY } from "@/constants/audit-management.constants";
import { SYSTEM_EVENTS_FILTER_CONFIG } from "@/constants/audit-filter.constants";
import { useFilterUrlState } from "@/hooks/useFilterUrlState";
import { useToast } from "@/hooks/useToast";
import { usePermissions } from "@/modules/auth/hooks/usePermissions";
import { PERMISSIONS } from "@/types/permission.types";
import {
  useExportSystemEvents,
  useSystemEventList,
} from "../../hooks/useSystemEvents";
import { parseSystemEventFilterValues } from "../../utils/parse-audit-filters";
import { SystemEventsTable } from "./SystemEventsTable";

const DEFAULT_PER_PAGE = 10;

export function SystemEventsSection() {
  const toast = useToast();
  const { can } = usePermissions();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [filterOpen, setFilterOpen] = useState(false);
  const exportMutation = useExportSystemEvents();

  const {
    draftValues,
    appliedValues,
    setDraftField,
    applyFilters,
    clearAllFilters,
    removeAppliedFilter,
    syncDraftFromUrl,
  } = useFilterUrlState({ config: SYSTEM_EVENTS_FILTER_CONFIG });

  const filters = useMemo(
    () => parseSystemEventFilterValues(appliedValues),
    [appliedValues],
  );

  const listParams = useMemo(
    () => ({
      page,
      per_page: perPage,
      ...filters,
    }),
    [page, perPage, filters],
  );

  const listQuery = useSystemEventList(listParams);

  useEffect(() => {
    setPage(1);
  }, [appliedValues]);

  const handleExport = () => {
    exportMutation.mutate(filters, {
      onSuccess: (response) => {
        toast.success({
          title: AUDIT_COPY.exportSuccess,
          description: `${response.data.exported} records exported to ${response.data.filename}`,
        });
      },
      onError: () => {
        toast.error({ title: AUDIT_COPY.exportError });
      },
    });
  };

  if (listQuery.isError) {
    return (
      <ErrorState
        title={AUDIT_COPY.loadErrorTitle}
        description={AUDIT_COPY.loadErrorDescription}
        onRetry={() => void listQuery.refetch()}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <FilterPanel
        config={SYSTEM_EVENTS_FILTER_CONFIG}
        values={draftValues}
        appliedValues={appliedValues}
        open={filterOpen}
        onOpenChange={(open) => {
          if (open) syncDraftFromUrl();
          setFilterOpen(open);
        }}
        onFieldChange={setDraftField}
        onApply={() => {
          applyFilters();
          setFilterOpen(false);
        }}
        onClearAll={clearAllFilters}
      />
      <FilterChips
        config={SYSTEM_EVENTS_FILTER_CONFIG}
        values={appliedValues}
        onRemove={removeAppliedFilter}
        onClearAll={clearAllFilters}
      />
      <SystemEventsTable
        rows={listQuery.data?.data ?? []}
        page={page}
        perPage={perPage}
        total={listQuery.data?.meta.total ?? 0}
        isLoading={listQuery.isLoading}
        isError={listQuery.isError}
        onPageChange={setPage}
        onPerPageChange={(value) => {
          setPerPage(value);
          setPage(1);
        }}
        onRetry={() => void listQuery.refetch()}
        onExport={
          can(PERMISSIONS.audit.export) ? handleExport : undefined
        }
        exportDisabled={exportMutation.isPending}
      />
    </div>
  );
}

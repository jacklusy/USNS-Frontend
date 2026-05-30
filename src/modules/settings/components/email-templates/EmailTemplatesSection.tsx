"use client";

import { Pencil } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/Badge";
import { EMAIL_TEMPLATE_CATEGORY_LABELS } from "@/constants/settings-email-templates.constants";
import { SETTINGS_MANAGEMENT_COPY } from "@/constants/settings-management.constants";
import type {
  DataTableAction,
  DataTableColumn,
} from "@/types/data-table.types";
import type { EmailTemplateListItem } from "../../types/email-template.types";
import { useEmailTemplateList } from "../../hooks/useEmailTemplateQueries";
import { EmailTemplateEditorDrawer } from "./EmailTemplateEditorDrawer";

export function EmailTemplatesSection() {
  const searchParams = useSearchParams();
  const templateIdFromUrl = searchParams.get("templateId");
  const listQuery = useEmailTemplateList();
  const rows = listQuery.data?.data ?? [];
  const [editorId, setEditorId] = useState<string | null>(null);

  useEffect(() => {
    if (templateIdFromUrl && rows.some((row) => row.id === templateIdFromUrl)) {
      setEditorId(templateIdFromUrl);
    }
  }, [templateIdFromUrl, rows]);

  const columns = useMemo<readonly DataTableColumn<EmailTemplateListItem>[]>(
    () => [
      {
        id: "name",
        header: SETTINGS_MANAGEMENT_COPY.emailColumnName,
        cell: (row) => <span className="font-medium">{row.name}</span>,
        priority: true,
      },
      {
        id: "category",
        header: SETTINGS_MANAGEMENT_COPY.emailColumnCategory,
        cell: (row) => (
          <Badge variant="default">
            {EMAIL_TEMPLATE_CATEGORY_LABELS[row.category]}
          </Badge>
        ),
      },
      {
        id: "modified",
        header: SETTINGS_MANAGEMENT_COPY.emailColumnModified,
        cell: (row) =>
          new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
            new Date(row.lastModifiedAt),
          ),
      },
    ],
    [],
  );

  const rowActions = useMemo<readonly DataTableAction<EmailTemplateListItem>[]>(
    () => [
      {
        id: "edit",
        label: "Edit",
        icon: Pencil,
        onSelect: (row) => setEditorId(row.id),
      },
    ],
    [],
  );

  const closeEditor = useCallback(() => setEditorId(null), []);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[15px] text-muted-fg">
        {SETTINGS_MANAGEMENT_COPY.emailTemplatesTabDescription}
      </p>
      <DataTable
        columns={columns}
        data={rows}
        isLoading={listQuery.isLoading}
        isError={listQuery.isError}
        errorTitle={SETTINGS_MANAGEMENT_COPY.loadErrorTitle}
        errorDescription={SETTINGS_MANAGEMENT_COPY.loadErrorDescription}
        onRetry={() => void listQuery.refetch()}
        rowActions={rowActions}
        enableClientPagination
        clientPerPage={10}
        emptyState={
          <div className="px-6 py-12 text-center">
            <p className="text-[18px] font-semibold">
              {SETTINGS_MANAGEMENT_COPY.emailEmptyTitle}
            </p>
            <p className="mt-2 text-[13px] text-muted-fg">
              {SETTINGS_MANAGEMENT_COPY.emailEmptyDescription}
            </p>
          </div>
        }
        ariaLabel="Email templates"
      />
      <EmailTemplateEditorDrawer
        templateId={editorId}
        open={Boolean(editorId)}
        onClose={closeEditor}
      />
    </div>
  );
}

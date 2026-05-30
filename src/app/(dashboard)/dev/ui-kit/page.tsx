"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, Inbox, Plus, Trash2 } from "lucide-react";
import { Suspense, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { DataTable } from "@/components/shared/DataTable";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { FilterChips, FilterPanel } from "@/components/shared/FilterPanel";
import { GlobalSearch } from "@/components/shared/GlobalSearch";
import { Pagination } from "@/components/shared/Pagination";
import { FormField } from "@/components/ui/FormField";
import {
  EmailInput,
  NumberInput,
  PasswordInput,
  TextareaInput,
  TextInput,
} from "@/components/ui/inputs";
import { Combobox, MultiSelect, SingleSelect } from "@/components/ui/select";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Modal } from "@/components/ui/Modal";
import { Drawer } from "@/components/ui/Drawer";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker";
import {
  SkeletonCard,
  SkeletonForm,
  SkeletonTable,
  SkeletonText,
} from "@/components/ui/loading-skeleton";
import { TabsWithUrl } from "@/components/ui/Tabs";
import {
  UI_KIT_COPY,
  UI_KIT_DEPARTMENT_OPTIONS,
  UI_KIT_ROLE_OPTIONS,
} from "@/constants/ui-kit.constants";
import { useToast } from "@/hooks/useToast";
import { EMPTY_STATE_COPY } from "@/constants/empty-state.constants";
import { ERROR_STATE_COPY } from "@/constants/error-state.constants";
import { UI_KIT_DEMO_USERS } from "@/constants/ui-kit-demo-users.constants";
import { UI_KIT_FILTER_CONFIG } from "@/constants/ui-kit-filter.constants";
import { useFilterUrlState } from "@/hooks/useFilterUrlState";
import { filterUiKitUsers } from "@/utils/ui-kit-filter-users";
import type { UiKitUserRow } from "@/types/ui-kit.types";
import { PERMISSIONS } from "@/types/permission.types";
import type { DataTableColumn } from "@/types/data-table.types";
import type { DateRangeValue } from "@/types/date-picker.types";

const selectDemoSchema = z.object({
  role: z.string().min(1, "Select a role"),
});

const dateDemoSchema = z.object({
  startDate: z.date({ error: "Start date is required" }),
});

type SelectDemoFormData = z.infer<typeof selectDemoSchema>;
type DateDemoFormData = z.infer<typeof dateDemoSchema>;

const userColumns: DataTableColumn<UiKitUserRow>[] = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    sortable: true,
    searchable: true,
    priority: true,
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
    sortable: true,
    searchable: true,
  },
  {
    id: "role",
    header: "Role",
    accessorKey: "role",
    sortable: true,
    searchable: true,
  },
  {
    id: "department",
    header: "Department",
    accessorKey: "department",
    sortable: true,
  },
  {
    id: "status",
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />,
    sortable: true,
  },
];

function UiKitPageContent() {
  const toast = useToast();
  const [singleRole, setSingleRole] = useState<string | null>(null);
  const [multiRoles, setMultiRoles] = useState<string[]>([]);
  const [department, setDepartment] = useState<string | null>(null);
  const [serverMode, setServerMode] = useState(false);
  const [serverPage, setServerPage] = useState(1);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableError, setTableError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<DateRangeValue>({
    start: null,
    end: null,
  });
  const [perPage, setPerPage] = useState(8);
  const [filterOpen, setFilterOpen] = useState(false);
  const [paginationDemoPage, setPaginationDemoPage] = useState(1);
  const {
    draftValues,
    appliedValues,
    setDraftField,
    applyFilters,
    clearAllFilters,
    removeAppliedFilter,
    syncDraftFromUrl,
  } = useFilterUrlState({ config: UI_KIT_FILTER_CONFIG });

  const filteredUsers = useMemo(
    () => filterUiKitUsers(UI_KIT_DEMO_USERS, appliedValues),
    [appliedValues],
  );

  const selectForm = useForm<SelectDemoFormData>({
    resolver: zodResolver(selectDemoSchema),
    defaultValues: { role: "" },
  });

  const dateForm = useForm<DateDemoFormData>({
    resolver: zodResolver(dateDemoSchema),
  });

  const serverSlice = useMemo(() => {
    const start = (serverPage - 1) * perPage;
    return UI_KIT_DEMO_USERS.slice(start, start + perPage);
  }, [serverPage, perPage]);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12">
      <header>
        <h1 className="text-[36px] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground md:text-[48px]">
          {UI_KIT_COPY.title}
        </h1>
        <p className="mt-2 text-[15px] text-muted-fg">{UI_KIT_COPY.description}</p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-semibold text-foreground">
          {UI_KIT_COPY.buttonsTitle}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
          <Button
            variant="primary"
            leadingIcon={<Plus className="h-5 w-5" strokeWidth={1.75} />}
          >
            With icon
          </Button>
          <Button variant="primary" loading>
            Loading
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-semibold text-foreground">
          {UI_KIT_COPY.badgesTitle}
        </h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
          <StatusBadge status="active" />
          <StatusBadge status="pending" />
          <StatusBadge status="inactive" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-semibold text-foreground">
          {UI_KIT_COPY.skeletonsTitle}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <SkeletonText lines={4} />
          <SkeletonCard rows={3} />
          <SkeletonForm fields={3} className="md:col-span-2" />
          <div className="overflow-hidden rounded-lg border border-border md:col-span-2">
            <SkeletonTable columns={5} rows={4} showSelection showActions />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-semibold text-foreground">
          {UI_KIT_COPY.statesTitle}
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface-elevated">
            <EmptyState
              icon={Inbox}
              title={EMPTY_STATE_COPY.tableNoDataTitle}
              description={EMPTY_STATE_COPY.tableNoDataDescription}
              variant="inPage"
              actionLabel="Create record"
              onAction={() => {
                toast.info({ title: "Create action" });
              }}
            />
          </div>
          <ErrorState
            title={ERROR_STATE_COPY.defaultTitle}
            description={ERROR_STATE_COPY.defaultDescription}
            errorCode="ERR_UI_KIT_DEMO"
            variant="inPage"
            onRetry={() => {
              toast.info({ title: "Retry clicked" });
            }}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-semibold text-foreground">
          {UI_KIT_COPY.paginationTitle}
        </h2>
        <div className="overflow-hidden rounded-lg border border-border bg-surface-elevated">
          <Pagination
            page={paginationDemoPage}
            perPage={10}
            total={185}
            onPageChange={setPaginationDemoPage}
            onPerPageChange={() => {}}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-semibold text-foreground">
          {UI_KIT_COPY.tabsTitle}
        </h2>
        <TabsWithUrl
          urlParam="tab"
          defaultTabId="overview"
          items={[
            {
              id: "overview",
              label: UI_KIT_COPY.tabsOverviewLabel,
              content: (
                <p className="text-[15px] text-muted-fg">
                  {UI_KIT_COPY.tabsOverviewBody}
                </p>
              ),
            },
            {
              id: "details",
              label: UI_KIT_COPY.tabsDetailsLabel,
              content: (
                <p className="text-[15px] text-muted-fg">
                  {UI_KIT_COPY.tabsDetailsBody}
                </p>
              ),
            },
            {
              id: "disabled",
              label: UI_KIT_COPY.tabsDisabledLabel,
              content: <p className="text-[15px] text-muted-fg">Hidden</p>,
              disabled: true,
            },
          ]}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-semibold text-foreground">
          {UI_KIT_COPY.searchFiltersTitle}
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <GlobalSearch className="w-full sm:flex-1" />
          <FilterPanel
            config={UI_KIT_FILTER_CONFIG}
            values={draftValues}
            appliedValues={appliedValues}
            onFieldChange={setDraftField}
            onApply={applyFilters}
            onClearAll={clearAllFilters}
            open={filterOpen}
            onOpenChange={(open) => {
              if (open) {
                syncDraftFromUrl();
              }
              setFilterOpen(open);
            }}
          />
        </div>
        <FilterChips
          config={UI_KIT_FILTER_CONFIG}
          values={appliedValues}
          onRemove={removeAppliedFilter}
          onClearAll={clearAllFilters}
        />
        <p className="text-[13px] text-muted-fg">
          {filteredUsers.length} of {UI_KIT_DEMO_USERS.length} demo users match
          applied filters (URL-synced).
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-semibold text-foreground">
          {UI_KIT_COPY.toastsTitle}
        </h2>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast.success({ title: "Saved", description: "Changes applied." });
            }}
          >
            Success
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast.error({ title: "Error", description: "Something failed." });
            }}
          >
            Error
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast.warning({ title: "Warning", description: "Review required." });
            }}
          >
            Warning
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast.info({ title: "Info", description: "New data available." });
            }}
          >
            Info
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast.success({
                title: "With action",
                action: {
                  label: "Undo",
                  onClick: () => {
                    toast.info({ title: "Undone" });
                  },
                },
              });
            }}
          >
            With action
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              for (let index = 0; index < 5; index += 1) {
                toast.info({
                  title: `Queued toast ${index + 1}`,
                  description: "Max visible is 3; rest queue.",
                });
              }
            }}
          >
            Queue test (5)
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-semibold text-foreground">
          {UI_KIT_COPY.overlaysTitle}
        </h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={() => setModalOpen(true)}>
            Open modal
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setDrawerOpen(true)}>
            Open drawer
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setConfirmOpen(true)}
          >
            Open confirm
          </Button>
        </div>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={UI_KIT_COPY.modalDemoTitle}
          description={UI_KIT_COPY.modalDemoBody}
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                Close
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setModalOpen(false);
                  setConfirmOpen(true);
                }}
              >
                Delete…
              </Button>
            </div>
          }
        >
          <p className="text-[15px] text-muted-fg">
            Use modals for focused create/edit flows. Focus is trapped until closed.
          </p>
        </Modal>
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={UI_KIT_COPY.drawerDemoTitle}
          description={UI_KIT_COPY.drawerDemoBody}
          footer={
            <Button variant="primary" onClick={() => setDrawerOpen(false)}>
              Done
            </Button>
          }
        >
          <p className="text-[15px] text-muted-fg">
            Drawers work well for filters and record detail without leaving the page.
          </p>
        </Drawer>
        <ConfirmationDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => {
            setConfirmOpen(false);
            toast.success({ title: "Confirmed", description: "Action completed." });
          }}
          title={UI_KIT_COPY.confirmDemoTitle}
          description={UI_KIT_COPY.confirmDemoDescription}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          destructive
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-semibold text-foreground">
          {UI_KIT_COPY.datesTitle}
        </h2>
        <div className="grid max-w-md gap-4">
          <FormField name="standalone-date" label="Date picker">
            <DatePicker
              id="standalone-date"
              value={singleDate}
              onChange={setSingleDate}
              minDate={new Date(2026, 0, 1)}
              maxDate={new Date(2026, 11, 31)}
            />
          </FormField>
          <FormField name="standalone-range" label="Date range picker">
            <DateRangePicker
              id="standalone-range"
              value={dateRange}
              onChange={setDateRange}
            />
          </FormField>
          <form
            className="flex flex-col gap-3"
            onSubmit={dateForm.handleSubmit((data) => {
              toast.success({
                title: "Date saved",
                description: data.startDate.toLocaleDateString(),
              });
            })}
          >
            <Controller
              name="startDate"
              control={dateForm.control}
              render={({ field, fieldState }) => (
                <FormField
                  name="startDate"
                  label="RHF + DatePicker"
                  required
                  error={fieldState.error?.message}
                >
                  <DatePicker
                    id="startDate"
                    value={field.value ?? null}
                    onChange={field.onChange}
                    hasError={Boolean(fieldState.error)}
                  />
                </FormField>
              )}
            />
            <Button type="submit" variant="primary" size="sm">
              Submit date
            </Button>
          </form>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-semibold text-foreground">
          {UI_KIT_COPY.formsTitle}
        </h2>
        <div className="grid max-w-md gap-4">
          <FormField name="demo-text" label="Text input" helpText="Standard text field">
            <TextInput id="demo-text" placeholder="Enter text" />
          </FormField>
          <FormField name="demo-email" label="Email input" required>
            <EmailInput id="demo-email" placeholder="you@usns.edu" />
          </FormField>
          <FormField name="demo-password" label="Password input" required>
            <PasswordInput id="demo-password" placeholder="Password" />
          </FormField>
          <FormField name="demo-number" label="Number input">
            <NumberInput id="demo-number" min={0} max={100} />
          </FormField>
          <FormField
            name="demo-textarea"
            label="Textarea"
            error="Example validation message"
          >
            <TextareaInput id="demo-textarea" hasError placeholder="Notes…" />
          </FormField>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-semibold text-foreground">
          {UI_KIT_COPY.selectsTitle}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <FormField name="standalone-single" label="Single select (searchable)">
            <SingleSelect
              id="standalone-single"
              options={UI_KIT_ROLE_OPTIONS}
              value={singleRole}
              onChange={setSingleRole}
              searchable
            />
          </FormField>
          <FormField name="standalone-multi" label="Multi select">
            <MultiSelect
              id="standalone-multi"
              options={UI_KIT_ROLE_OPTIONS}
              value={multiRoles}
              onChange={setMultiRoles}
              showSelectAll
            />
          </FormField>
          <FormField name="standalone-combobox" label="Combobox">
            <Combobox
              id="standalone-combobox"
              options={UI_KIT_DEPARTMENT_OPTIONS}
              value={department}
              onChange={setDepartment}
            />
          </FormField>
          <form
            className="flex flex-col gap-3"
            onSubmit={selectForm.handleSubmit(() => {
              toast.success({ title: "Form submitted", description: "Role saved." });
            })}
          >
            <Controller
              name="role"
              control={selectForm.control}
              render={({ field, fieldState }) => (
                <FormField
                  name="role"
                  label="React Hook Form + SingleSelect"
                  required
                  error={fieldState.error?.message}
                >
                  <SingleSelect
                    id="role"
                    options={UI_KIT_ROLE_OPTIONS}
                    value={field.value || null}
                    onChange={field.onChange}
                    hasError={Boolean(fieldState.error)}
                    searchable
                  />
                </FormField>
              )}
            />
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-md bg-brand px-4 text-[15px] font-medium text-white hover:bg-usns-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Submit select demo
            </button>
          </form>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[24px] font-semibold text-foreground">
            {UI_KIT_COPY.tableTitle}
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setServerMode(false);
              }}
              className={`inline-flex h-9 items-center rounded-md px-3 text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                !serverMode
                  ? "bg-brand text-white"
                  : "border border-border text-foreground hover:bg-usns-green-light"
              }`}
            >
              {UI_KIT_COPY.tableClientLabel}
            </button>
            <button
              type="button"
              onClick={() => {
                setServerMode(true);
                setServerPage(1);
              }}
              className={`inline-flex h-9 items-center rounded-md px-3 text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                serverMode
                  ? "bg-brand text-white"
                  : "border border-border text-foreground hover:bg-usns-green-light"
              }`}
            >
              {UI_KIT_COPY.tableServerLabel}
            </button>
            <button
              type="button"
              onClick={() => {
                setTableLoading((prev) => !prev);
              }}
              className="inline-flex h-9 items-center rounded-md border border-border px-3 text-[13px] font-medium text-foreground hover:bg-usns-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Toggle loading
            </button>
            <button
              type="button"
              onClick={() => {
                setTableError((prev) => !prev);
              }}
              className="inline-flex h-9 items-center rounded-md border border-border px-3 text-[13px] font-medium text-foreground hover:bg-usns-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Toggle error
            </button>
          </div>
        </div>
        <DataTable
          columns={userColumns}
          data={serverMode ? serverSlice : UI_KIT_DEMO_USERS}
          searchMode="client"
          enableSelection
          enableClientPagination={!serverMode}
          clientPerPage={perPage}
          isLoading={tableLoading}
          isError={tableError}
          onRetry={() => {
            setTableError(false);
          }}
          pagination={
            serverMode
              ? {
                  page: serverPage,
                  perPage,
                  total: UI_KIT_DEMO_USERS.length,
                  onPageChange: setServerPage,
                  onPerPageChange: (next) => {
                    setPerPage(next);
                    setServerPage(1);
                  },
                }
              : undefined
          }
          rowActions={[
            {
              id: "view",
              label: "View",
              icon: Eye,
              onSelect: (row) => {
                toast.info({
                  title: "View user",
                  description: row.name,
                });
              },
            },
            {
              id: "delete",
              label: "Delete",
              icon: Trash2,
              destructive: true,
              requiredPermission: PERMISSIONS.users.delete,
              onSelect: (row) => {
                toast.warning({
                  title: "Delete requested",
                  description: row.email,
                });
              },
            },
          ]}
          bulkActions={[
            {
              id: "export-selected",
              label: "Export selected",
              onAction: (rows) => {
                toast.success({
                  title: "Bulk export",
                  description: `${rows.length} rows`,
                });
              },
            },
            {
              id: "delete-selected",
              label: "Delete selected",
              requiredPermission: PERMISSIONS.users.delete,
              onAction: (rows) => {
                toast.warning({
                  title: "Bulk delete",
                  description: `${rows.length} rows`,
                });
              },
            },
          ]}
          onExport={(rows) => {
            toast.success({
              title: "Export triggered",
              description: `${rows.length} rows`,
            });
          }}
        />
      </section>
    </div>
  );
}

export default function UiKitPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1200px] px-4 py-12">
          <div className="h-8 w-48 skeleton-shimmer rounded-md" />
        </div>
      }
    >
      <UiKitPageContent />
    </Suspense>
  );
}

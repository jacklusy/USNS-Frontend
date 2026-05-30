"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { DataTable } from "@/components/shared/DataTable";
import { FormField } from "@/components/ui/FormField";
import {
  EmailInput,
  NumberInput,
  PasswordInput,
  TextareaInput,
  TextInput,
} from "@/components/ui/inputs";
import { Combobox, MultiSelect, SingleSelect } from "@/components/ui/select";
import {
  UI_KIT_COPY,
  UI_KIT_DEPARTMENT_OPTIONS,
  UI_KIT_ROLE_OPTIONS,
} from "@/constants/ui-kit.constants";
import { useToast } from "@/hooks/useToast";
import { UI_KIT_DEMO_USERS } from "@/constants/ui-kit-demo-users.constants";
import type { UiKitUserRow } from "@/types/ui-kit.types";
import { PERMISSIONS } from "@/types/permission.types";
import type { DataTableColumn } from "@/types/data-table.types";

const selectDemoSchema = z.object({
  role: z.string().min(1, "Select a role"),
});

type SelectDemoFormData = z.infer<typeof selectDemoSchema>;

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
    accessorKey: "status",
    sortable: true,
  },
];

export default function UiKitPage() {
  const toast = useToast();
  const [singleRole, setSingleRole] = useState<string | null>(null);
  const [multiRoles, setMultiRoles] = useState<string[]>([]);
  const [department, setDepartment] = useState<string | null>(null);
  const [serverMode, setServerMode] = useState(false);
  const [serverPage, setServerPage] = useState(1);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableError, setTableError] = useState(false);
  const perPage = 8;

  const selectForm = useForm<SelectDemoFormData>({
    resolver: zodResolver(selectDemoSchema),
    defaultValues: { role: "" },
  });

  const serverSlice = useMemo(() => {
    const start = (serverPage - 1) * perPage;
    return UI_KIT_DEMO_USERS.slice(start, start + perPage);
  }, [serverPage]);

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

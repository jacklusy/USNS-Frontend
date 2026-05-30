"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { Drawer } from "@/components/ui/Drawer";
import { FormField } from "@/components/ui/FormField";
import { TextInput, TextareaInput } from "@/components/ui/inputs";
import { Modal } from "@/components/ui/Modal";
import { SETTINGS_MANAGEMENT_COPY } from "@/constants/settings-management.constants";
import { useToast } from "@/hooks/useToast";
import {
  useEmailTemplateDetail,
  usePreviewEmailTemplate,
  useResetEmailTemplate,
  useUpdateEmailTemplate,
} from "../../hooks/useEmailTemplateQueries";
import {
  emailTemplateSchema,
  type EmailTemplateFormData,
} from "../../schemas/settings.schemas";
import type { EmailTemplatePreviewResult } from "../../types/email-template.types";

interface EmailTemplateEditorDrawerProps {
  templateId: string | null;
  open: boolean;
  onClose: () => void;
}

export function EmailTemplateEditorDrawer({
  templateId,
  open,
  onClose,
}: EmailTemplateEditorDrawerProps) {
  const toast = useToast();
  const detailQuery = useEmailTemplateDetail(templateId ?? "");
  const updateMutation = useUpdateEmailTemplate();
  const resetMutation = useResetEmailTemplate();
  const previewMutation = usePreviewEmailTemplate();
  const [saveConfirmOpen, setSaveConfirmOpen] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] =
    useState<EmailTemplatePreviewResult | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<EmailTemplateFormData>({
    resolver: zodResolver(emailTemplateSchema),
    defaultValues: { subject: "", preheader: "", body: "" },
  });

  const detail = detailQuery.data?.data;

  useEffect(() => {
    if (!detail) return;
    reset({
      subject: detail.subject,
      preheader: detail.preheader,
      body: detail.body,
    });
  }, [detail, reset]);

  function handleClose() {
    reset({ subject: "", preheader: "", body: "" });
    setPreviewData(null);
    setPreviewOpen(false);
    onClose();
  }

  const onSave = handleSubmit((values) => {
    if (!templateId) return;
    void updateMutation
      .mutateAsync({ id: templateId, input: values })
      .then(() => {
        toast.success({ title: SETTINGS_MANAGEMENT_COPY.emailSaveSuccess });
        setSaveConfirmOpen(false);
        handleClose();
      });
  });

  const runPreview = async () => {
    if (!templateId) return;
    const result = await previewMutation.mutateAsync(templateId);
    setPreviewData(result.data);
    setPreviewOpen(true);
  };

  const runReset = async () => {
    if (!templateId) return;
    await resetMutation.mutateAsync(templateId);
    toast.success({ title: SETTINGS_MANAGEMENT_COPY.emailResetSuccess });
    setResetConfirmOpen(false);
    handleClose();
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={handleClose}
        title={SETTINGS_MANAGEMENT_COPY.emailEditTitle}
        description={detail?.name}
        width="lg"
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            <Button type="button" variant="ghost" onClick={handleClose}>
              {SETTINGS_MANAGEMENT_COPY.cancelButton}
            </Button>
            <Button
              type="button"
              variant="secondary"
              loading={previewMutation.isPending}
              onClick={() => void runPreview()}
            >
              {SETTINGS_MANAGEMENT_COPY.emailPreviewButton}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setResetConfirmOpen(true)}
            >
              {SETTINGS_MANAGEMENT_COPY.emailResetConfirm}
            </Button>
            <Button
              type="button"
              variant="primary"
              disabled={!isDirty}
              onClick={() => setSaveConfirmOpen(true)}
            >
              {SETTINGS_MANAGEMENT_COPY.saveButton}
            </Button>
          </div>
        }
      >
        {detailQuery.isLoading ? (
          <div className="h-48 animate-pulse rounded-lg bg-border" />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
            <form className="flex flex-col gap-4" noValidate>
              <FormField
                name="subject"
                label={SETTINGS_MANAGEMENT_COPY.emailFieldSubject}
                required
                error={errors.subject?.message}
              >
                <TextInput
                  id="tpl-subject"
                  {...register("subject")}
                  hasError={Boolean(errors.subject)}
                />
              </FormField>
              <FormField
                name="preheader"
                label={SETTINGS_MANAGEMENT_COPY.emailFieldPreheader}
                error={errors.preheader?.message}
              >
                <TextInput
                  id="tpl-preheader"
                  {...register("preheader")}
                  hasError={Boolean(errors.preheader)}
                />
              </FormField>
              <FormField
                name="body"
                label={SETTINGS_MANAGEMENT_COPY.emailFieldBody}
                required
                error={errors.body?.message}
              >
                <TextareaInput
                  id="tpl-body"
                  rows={14}
                  className="font-mono text-[13px]"
                  {...register("body")}
                  hasError={Boolean(errors.body)}
                />
              </FormField>
            </form>
            <aside className="rounded-lg border border-border bg-surface p-4">
              <h3 className="text-[13px] font-medium uppercase tracking-wide text-muted-fg">
                {SETTINGS_MANAGEMENT_COPY.emailVariablesTitle}
              </h3>
              <ul className="mt-3 flex flex-col gap-3">
                {(detail?.variables ?? []).map((variable) => (
                  <li key={variable.key}>
                    <p className="font-mono text-[13px] text-foreground">
                      {`{{${variable.key}}}`}
                    </p>
                    <p className="text-[13px] font-medium">{variable.label}</p>
                    <p className="text-[12px] text-muted-fg">
                      {variable.description}
                    </p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        )}
      </Drawer>
      <ConfirmationDialog
        open={saveConfirmOpen}
        onClose={() => setSaveConfirmOpen(false)}
        title={SETTINGS_MANAGEMENT_COPY.confirmSaveTitle}
        description={SETTINGS_MANAGEMENT_COPY.confirmSaveDescription}
        confirmLabel={SETTINGS_MANAGEMENT_COPY.confirmSaveLabel}
        cancelLabel={SETTINGS_MANAGEMENT_COPY.cancelButton}
        loading={updateMutation.isPending}
        onConfirm={() => void onSave()}
      />
      <ConfirmationDialog
        open={resetConfirmOpen}
        onClose={() => setResetConfirmOpen(false)}
        title={SETTINGS_MANAGEMENT_COPY.emailResetTitle}
        description={SETTINGS_MANAGEMENT_COPY.emailResetDescription}
        confirmLabel={SETTINGS_MANAGEMENT_COPY.emailResetConfirm}
        cancelLabel={SETTINGS_MANAGEMENT_COPY.cancelButton}
        destructive
        loading={resetMutation.isPending}
        onConfirm={() => void runReset()}
      />
      <Modal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title={SETTINGS_MANAGEMENT_COPY.emailPreviewTitle}
        maxWidth="lg"
      >
        {previewData ? (
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[12px] font-medium uppercase text-muted-fg">
                Subject
              </p>
              <p className="text-[15px]">{previewData.subject}</p>
            </div>
            {previewData.preheader ? (
              <div>
                <p className="text-[12px] font-medium uppercase text-muted-fg">
                  Preheader
                </p>
                <p className="text-[15px]">{previewData.preheader}</p>
              </div>
            ) : null}
            <div>
              <p className="text-[12px] font-medium uppercase text-muted-fg">
                Body
              </p>
              <div
                className="mt-2 rounded-md border border-border bg-surface p-4 text-[15px]"
                dangerouslySetInnerHTML={{ __html: previewData.htmlBody }}
              />
            </div>
            <div>
              <p className="text-[12px] font-medium uppercase text-muted-fg">
                Plain text
              </p>
              <pre className="mt-2 whitespace-pre-wrap rounded-md border border-border bg-surface p-4 font-mono text-[13px]">
                {previewData.plainBody}
              </pre>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}

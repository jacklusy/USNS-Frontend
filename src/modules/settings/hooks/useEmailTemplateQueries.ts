"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { settingsQueryKeys } from "../constants/settings.query-keys";
import { emailTemplateService } from "../services";
import type { UpdateEmailTemplateInput } from "../types/email-template.types";

export function useEmailTemplateList() {
  return useQuery({
    queryKey: settingsQueryKeys.emailTemplates.all,
    queryFn: () => emailTemplateService.list(),
  });
}

export function useEmailTemplateDetail(id: string) {
  return useQuery({
    queryKey: settingsQueryKeys.emailTemplates.detail(id),
    queryFn: () => emailTemplateService.getById(id),
    enabled: Boolean(id),
  });
}

export function useUpdateEmailTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: UpdateEmailTemplateInput;
    }) => emailTemplateService.update(id, input),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.emailTemplates.all,
      });
      await queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.emailTemplates.detail(variables.id),
      });
    },
  });
}

export function useResetEmailTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => emailTemplateService.resetToDefault(id),
    onSuccess: async (_data, id) => {
      await queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.emailTemplates.all,
      });
      await queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.emailTemplates.detail(id),
      });
    },
  });
}

export function usePreviewEmailTemplate() {
  return useMutation({
    mutationFn: (id: string) => emailTemplateService.preview(id),
  });
}

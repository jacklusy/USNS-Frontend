import type { ApiResponse } from "@/types/api.types";
import type {
  EmailTemplateDetail,
  EmailTemplateListItem,
  EmailTemplatePreviewResult,
  UpdateEmailTemplateInput,
} from "../types/email-template.types";

export interface IEmailTemplateService {
  list(): Promise<ApiResponse<EmailTemplateListItem[]>>;
  getById(id: string): Promise<ApiResponse<EmailTemplateDetail>>;
  update(
    id: string,
    input: UpdateEmailTemplateInput,
  ): Promise<ApiResponse<EmailTemplateDetail>>;
  resetToDefault(id: string): Promise<ApiResponse<EmailTemplateDetail>>;
  preview(id: string): Promise<ApiResponse<EmailTemplatePreviewResult>>;
}

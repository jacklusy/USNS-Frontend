import type { ApiResponse } from "@/types/api.types";
import type {
  EmailTemplateDetail,
  EmailTemplateListItem,
  EmailTemplatePreviewResult,
  UpdateEmailTemplateInput,
} from "../types/email-template.types";
import type { IEmailTemplateService } from "./email-template.service";

export class RealEmailTemplateService implements IEmailTemplateService {
  async list(): Promise<ApiResponse<EmailTemplateListItem[]>> {
    throw new Error("Email templates API not integrated");
  }

  async getById(_id: string): Promise<ApiResponse<EmailTemplateDetail>> {
    throw new Error("Email templates API not integrated");
  }

  async update(
    _id: string,
    _input: UpdateEmailTemplateInput,
  ): Promise<ApiResponse<EmailTemplateDetail>> {
    throw new Error("Email templates API not integrated");
  }

  async resetToDefault(
    _id: string,
  ): Promise<ApiResponse<EmailTemplateDetail>> {
    throw new Error("Email templates API not integrated");
  }

  async preview(_id: string): Promise<ApiResponse<EmailTemplatePreviewResult>> {
    throw new Error("Email templates API not integrated");
  }
}

export const realEmailTemplateService = new RealEmailTemplateService();

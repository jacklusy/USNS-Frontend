import { MockServiceBase } from "@/lib/mock-service-base";
import {
  findEmailTemplateById,
  getEmailTemplateDetail,
  listEmailTemplateItems,
  resetEmailTemplateToDefault,
  updateEmailTemplate,
} from "@/mock/settings/email-templates.mock";
import type { ApiResponse } from "@/types/api.types";
import {
  renderTemplateString,
  stripHtmlToPlain,
} from "../utils/render-email-template";
import type {
  EmailTemplateDetail,
  EmailTemplateListItem,
  EmailTemplatePreviewResult,
  UpdateEmailTemplateInput,
} from "../types/email-template.types";
import type { IEmailTemplateService } from "./email-template.service";

function notFoundError(): never {
  throw {
    code: "NOT_FOUND" as const,
    message: "Email template not found",
  };
}

export class MockEmailTemplateService
  extends MockServiceBase
  implements IEmailTemplateService
{
  async list(): Promise<ApiResponse<EmailTemplateListItem[]>> {
    await this.delay();
    return { data: listEmailTemplateItems() };
  }

  async getById(id: string): Promise<ApiResponse<EmailTemplateDetail>> {
    await this.delay();
    const detail = getEmailTemplateDetail(id);
    if (!detail) notFoundError();
    return { data: detail };
  }

  async update(
    id: string,
    input: UpdateEmailTemplateInput,
  ): Promise<ApiResponse<EmailTemplateDetail>> {
    await this.delay(350);
    const detail = updateEmailTemplate(id, input);
    if (!detail) notFoundError();
    return { data: detail, message: "Template saved" };
  }

  async resetToDefault(
    id: string,
  ): Promise<ApiResponse<EmailTemplateDetail>> {
    await this.delay(300);
    const detail = resetEmailTemplateToDefault(id);
    if (!detail) notFoundError();
    return { data: detail, message: "Template reset" };
  }

  async preview(id: string): Promise<ApiResponse<EmailTemplatePreviewResult>> {
    await this.delay(250);
    const tpl = findEmailTemplateById(id);
    if (!tpl) notFoundError();
    const htmlBody = renderTemplateString(tpl.body, tpl.variables);
    const subject = renderTemplateString(tpl.subject, tpl.variables);
    const preheader = renderTemplateString(tpl.preheader, tpl.variables);
    return {
      data: {
        subject,
        preheader,
        htmlBody,
        plainBody: stripHtmlToPlain(htmlBody),
      },
    };
  }
}

export const mockEmailTemplateService = new MockEmailTemplateService();

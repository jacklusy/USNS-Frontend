import type { TemplateVariable } from "../types/email-template.types";

export function renderTemplateString(
  template: string,
  variables: readonly TemplateVariable[],
): string {
  let output = template;
  for (const variable of variables) {
    const pattern = new RegExp(`\\{\\{\\s*${variable.key}\\s*\\}\\}`, "g");
    output = output.replace(pattern, variable.sampleValue);
  }
  return output;
}

export function stripHtmlToPlain(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

import type { Metadata } from "next";
import { HttpErrorPageView } from "@/components/shared/HttpErrorPageView";
import { HTTP_ERROR_PAGES } from "@/constants/http-error.constants";

export const metadata: Metadata = {
  title: HTTP_ERROR_PAGES.conflict.documentTitle,
};

export default function ConflictErrorPage() {
  return <HttpErrorPageView pageKey="conflict" />;
}

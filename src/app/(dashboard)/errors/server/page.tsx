import type { Metadata } from "next";
import { HttpErrorPageView } from "@/components/shared/HttpErrorPageView";
import { HTTP_ERROR_PAGES } from "@/constants/http-error.constants";

export const metadata: Metadata = {
  title: HTTP_ERROR_PAGES.server.documentTitle,
};

export default function ServerErrorPage() {
  return <HttpErrorPageView pageKey="server" />;
}

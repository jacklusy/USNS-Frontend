import type { Metadata } from "next";
import { DashboardNotFound } from "@/components/shared/DashboardNotFound";
import { NOT_FOUND_COPY } from "@/constants/not-found.constants";

export const metadata: Metadata = {
  title: NOT_FOUND_COPY.documentTitle,
};

export default function DashboardNotFoundPage() {
  return <DashboardNotFound />;
}

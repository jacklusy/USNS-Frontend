import Link from "next/link";
import { NOT_FOUND_COPY } from "@/constants/not-found.constants";
import { ROUTES } from "@/constants/routes.constants";

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 text-center">
      <h1 className="text-[24px] font-semibold text-foreground">
        {NOT_FOUND_COPY.title}
      </h1>
      <p className="mt-3 max-w-md text-[15px] text-muted-fg">
        {NOT_FOUND_COPY.description}
      </p>
      <Link
        href={ROUTES.DASHBOARD}
        className="mt-8 rounded-md bg-brand px-4 py-2 text-[15px] font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {NOT_FOUND_COPY.dashboardLabel}
      </Link>
    </div>
  );
}

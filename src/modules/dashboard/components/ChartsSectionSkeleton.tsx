import { Skeleton } from "@/components/ui/Skeleton";

export function ChartsSectionSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <div className="rounded-lg border border-border bg-surface-elevated p-5 lg:col-span-2 xl:col-span-1">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="mt-4 h-[280px] w-full" />
      </div>
      <div className="rounded-lg border border-border bg-surface-elevated p-5">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="mt-4 h-[280px] w-full" />
      </div>
      <div className="rounded-lg border border-border bg-surface-elevated p-5">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="mt-4 h-[280px] w-full" />
      </div>
    </div>
  );
}

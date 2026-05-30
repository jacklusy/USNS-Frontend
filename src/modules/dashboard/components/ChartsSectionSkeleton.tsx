import { SkeletonCard } from "@/components/ui/loading-skeleton";

export function ChartsSectionSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <SkeletonCard
        contentHeight={280}
        className="lg:col-span-2 xl:col-span-1"
      />
      <SkeletonCard contentHeight={280} />
      <SkeletonCard contentHeight={280} />
    </div>
  );
}

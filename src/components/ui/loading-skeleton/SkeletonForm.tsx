import { Skeleton } from "@/components/ui/Skeleton";

interface SkeletonFormProps {
  fields?: number;
  className?: string;
}

export function SkeletonForm({ fields = 4, className = "" }: SkeletonFormProps) {
  return (
    <div className={`flex flex-col gap-6 ${className}`} aria-hidden="true">
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Skeleton height={12} width={96} borderRadius="sm" />
          <Skeleton height={44} width="100%" borderRadius="md" />
        </div>
      ))}
    </div>
  );
}

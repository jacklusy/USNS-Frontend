import { Skeleton } from "@/components/ui/Skeleton";

interface SkeletonTableProps {
  columns: number;
  rows?: number;
  showSelection?: boolean;
  showActions?: boolean;
  asTableBody?: boolean;
  className?: string;
}

function SkeletonTableRows({
  columns,
  rows,
  showSelection,
  showActions,
}: {
  columns: number;
  rows: number;
  showSelection: boolean;
  showActions: boolean;
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-border">
          {showSelection ? (
            <td className="px-2 py-3">
              <Skeleton width={20} height={20} borderRadius="sm" />
            </td>
          ) : null}
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="px-4 py-3">
              <Skeleton height={16} width="100%" className="max-w-[200px]" />
            </td>
          ))}
          {showActions ? (
            <td className="px-4 py-3">
              <Skeleton
                height={16}
                width={32}
                className="ml-auto"
                borderRadius="sm"
              />
            </td>
          ) : null}
        </tr>
      ))}
    </>
  );
}

export function SkeletonTable({
  columns,
  rows = 5,
  showSelection = false,
  showActions = false,
  asTableBody = false,
  className = "",
}: SkeletonTableProps) {
  if (asTableBody) {
    return (
      <tbody className={className} aria-hidden="true">
        <SkeletonTableRows
          columns={columns}
          rows={rows}
          showSelection={showSelection}
          showActions={showActions}
        />
      </tbody>
    );
  }

  return (
    <table className={`w-full border-collapse ${className}`} aria-hidden="true">
      <tbody>
        <SkeletonTableRows
          columns={columns}
          rows={rows}
          showSelection={showSelection}
          showActions={showActions}
        />
      </tbody>
    </table>
  );
}

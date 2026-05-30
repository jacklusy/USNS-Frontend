import { ChevronLeft, ChevronRight } from "lucide-react";
import { DATE_PICKER_COPY } from "@/constants/date-picker.constants";

interface CalendarHeaderProps {
  label: string;
  onPrevious: () => void;
  onNext: () => void;
}

export function CalendarHeader({
  label,
  onPrevious,
  onNext,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-2 px-2 py-2">
      <button
        type="button"
        onClick={onPrevious}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-fg transition-colors hover:bg-usns-green-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        aria-label={DATE_PICKER_COPY.previousMonth}
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </button>
      <p className="text-[15px] font-medium text-foreground">{label}</p>
      <button
        type="button"
        onClick={onNext}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-fg transition-colors hover:bg-usns-green-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        aria-label={DATE_PICKER_COPY.nextMonth}
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </button>
    </div>
  );
}

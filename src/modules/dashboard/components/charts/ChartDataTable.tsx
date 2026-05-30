import type { ChartDataPoint } from "../../types/dashboard.types";

interface ChartDataTableProps {
  caption: string;
  points: ChartDataPoint[];
}

export function ChartDataTable({ caption, points }: ChartDataTableProps) {
  return (
    <table className="sr-only">
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th scope="col">Label</th>
          <th scope="col">Value</th>
        </tr>
      </thead>
      <tbody>
        {points.map((point) => (
          <tr key={point.label}>
            <td>{point.label}</td>
            <td>{point.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

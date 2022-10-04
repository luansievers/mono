import clsx from "clsx";

interface ProgressProps {
  percentage: number;
  type?: "completed" | "failed" | undefined;
  className?: string;
}

export function Progress({ percentage, type, className }: ProgressProps) {
  return (
    <div className={clsx("h-3 w-full rounded-full bg-green-90/70", className)}>
      <div
        className={clsx("h-3 rounded-full", {
          "bg-accent-2": !type,
          "bg-accent-2-opacity": type == "completed",
          "bg-accent-3-opacity": type == "failed",
        })}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

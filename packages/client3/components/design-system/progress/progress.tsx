import clsx from "clsx";

interface ProgressProps {
  percentage: number;
  type?: "completed" | "failed" | undefined;
}

export function Progress({ percentage, type }: ProgressProps) {
  return (
    <div className="h-3 w-full rounded-full bg-green-90/70">
      <div
        className={clsx("h-3 rounded-full", {
          "bg-accent-2": !type,
          "bg-green-90": type == "completed" || type == "failed",
        })}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

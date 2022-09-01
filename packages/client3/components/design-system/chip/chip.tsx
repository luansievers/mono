import clsx from "clsx";
import type { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  className?: string;
  type?: "completed" | "failed";
}

export function Chip({ children, className, type = "completed" }: ChipProps) {
  return (
    <div
      className={clsx(
        "inline-block rounded-full py-1.5 px-3",
        {
          "bg-theme-dark": type == "completed",
          "bg-theme-accent3": type == "failed",
        },
        className
      )}
    >
      <div className="text-sm text-light-4">{children}</div>
    </div>
  );
}

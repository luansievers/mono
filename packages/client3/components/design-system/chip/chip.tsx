import clsx from "clsx";
import type { ReactNode } from "react";

import { BodyText } from "../typography";

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
          "bg-green-90": type == "completed",
          "bg-accent-3": type == "failed",
        },
        className
      )}
    >
      <BodyText className="text-light-40" size="small">
        {children}
      </BodyText>
    </div>
  );
}
